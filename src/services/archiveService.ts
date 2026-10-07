import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { Resident, Submission, SubmissionStatus, SubmissionType, UserProfile } from '../types';
import { INITIAL_RESIDENTS, INITIAL_SUBMISSIONS } from '../data/mockData';

const SUBMISSIONS_COLLECTION = 'submissions';
const RESIDENTS_COLLECTION = 'residents';
const USERS_COLLECTION = 'users';

// In-memory sync fallback for offline/demo reliability
let localSubmissions: Submission[] = [...INITIAL_SUBMISSIONS];
let localResidents: Resident[] = [...INITIAL_RESIDENTS];

export const ArchiveService = {
  // Initialize sample data into Firestore if empty
  async seedInitialDataIfNeeded(): Promise<void> {
    try {
      const snap = await getDocs(collection(db, RESIDENTS_COLLECTION));
      if (snap.empty) {
        for (const res of INITIAL_RESIDENTS) {
          await setDoc(doc(db, RESIDENTS_COLLECTION, res.id), res);
        }
        for (const sub of INITIAL_SUBMISSIONS) {
          await setDoc(doc(db, SUBMISSIONS_COLLECTION, sub.id), sub);
        }
      }
    } catch {
      // If permission or network issue during initial seed, memory data is ready
    }
  },

  // 1. Submissions Operations
  async getSubmissions(userId?: string, role?: string): Promise<Submission[]> {
    try {
      if (role === 'warga' && userId) {
        const q = query(
          collection(db, SUBMISSIONS_COLLECTION),
          where('userId', '==', userId)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() } as Submission));
        }
        return localSubmissions.filter(s => s.userId === userId);
      } else {
        const snap = await getDocs(collection(db, SUBMISSIONS_COLLECTION));
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() } as Submission));
        }
        return [...localSubmissions];
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, SUBMISSIONS_COLLECTION);
      return role === 'warga' && userId 
        ? localSubmissions.filter(s => s.userId === userId)
        : [...localSubmissions];
    }
  },

  listenSubmissions(
    userId: string | undefined,
    role: string | undefined,
    callback: (subs: Submission[]) => void
  ): () => void {
    try {
      const colRef = collection(db, SUBMISSIONS_COLLECTION);
      const q = (role === 'warga' && userId)
        ? query(colRef, where('userId', '==', userId))
        : colRef;

      return onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Submission));
            callback(items);
          } else {
            callback(role === 'warga' && userId ? localSubmissions.filter(s => s.userId === userId) : localSubmissions);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, SUBMISSIONS_COLLECTION);
          callback(role === 'warga' && userId ? localSubmissions.filter(s => s.userId === userId) : localSubmissions);
        }
      );
    } catch {
      callback(role === 'warga' && userId ? localSubmissions.filter(s => s.userId === userId) : localSubmissions);
      return () => {};
    }
  },

  async createSubmission(submissionData: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Submission> {
    const newId = 'sub-' + Date.now();
    const now = new Date().toISOString();
    const newSubmission: Submission = {
      ...submissionData,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await setDoc(doc(db, SUBMISSIONS_COLLECTION, newId), newSubmission);
      localSubmissions.unshift(newSubmission);
      return newSubmission;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `${SUBMISSIONS_COLLECTION}/${newId}`);
      localSubmissions.unshift(newSubmission);
      return newSubmission;
    }
  },

  async updateSubmissionStatus(
    submissionId: string,
    status: SubmissionStatus,
    adminName: string,
    rejectionNote?: string,
    suratNumber?: string
  ): Promise<void> {
    const now = new Date().toISOString();
    const updates: Partial<Submission> = {
      status,
      updatedAt: now,
      approvedBy: adminName,
      approvedAt: now,
      ...(rejectionNote ? { rejectionNote } : {}),
      ...(suratNumber ? { suratNumber } : {})
    };

    try {
      await updateDoc(doc(db, SUBMISSIONS_COLLECTION, submissionId), updates);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${SUBMISSIONS_COLLECTION}/${submissionId}`);
    }

    // sync local
    localSubmissions = localSubmissions.map(s => s.id === submissionId ? { ...s, ...updates } : s);
  },

  async deleteSubmission(submissionId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, SUBMISSIONS_COLLECTION, submissionId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${SUBMISSIONS_COLLECTION}/${submissionId}`);
    }
    localSubmissions = localSubmissions.filter(s => s.id !== submissionId);
  },

  // 2. Residents Operations (Master Kependudukan)
  async getResidents(): Promise<Resident[]> {
    try {
      const snap = await getDocs(collection(db, RESIDENTS_COLLECTION));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Resident));
      }
      return [...localResidents];
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, RESIDENTS_COLLECTION);
      return [...localResidents];
    }
  },

  listenResidents(callback: (residents: Resident[]) => void): () => void {
    try {
      const colRef = collection(db, RESIDENTS_COLLECTION);
      return onSnapshot(
        colRef,
        (snap) => {
          if (!snap.empty) {
            callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as Resident)));
          } else {
            callback(localResidents);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, RESIDENTS_COLLECTION);
          callback(localResidents);
        }
      );
    } catch {
      callback(localResidents);
      return () => {};
    }
  },

  async saveResident(resident: Resident): Promise<void> {
    try {
      await setDoc(doc(db, RESIDENTS_COLLECTION, resident.id), resident);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${RESIDENTS_COLLECTION}/${resident.id}`);
    }
    const idx = localResidents.findIndex(r => r.id === resident.id);
    if (idx >= 0) {
      localResidents[idx] = resident;
    } else {
      localResidents.push(resident);
    }
  },

  async deleteResident(residentId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, RESIDENTS_COLLECTION, residentId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${RESIDENTS_COLLECTION}/${residentId}`);
    }
    localResidents = localResidents.filter(r => r.id !== residentId);
  },

  // 3. User Profile Operations
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const snap = await getDoc(doc(db, USERS_COLLECTION, userId));
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `${USERS_COLLECTION}/${userId}`);
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await setDoc(doc(db, USERS_COLLECTION, profile.id), profile);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `${USERS_COLLECTION}/${profile.id}`);
    }
  },

  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const snap = await getDocs(collection(db, USERS_COLLECTION));
      return snap.docs.map(d => d.data() as UserProfile);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, USERS_COLLECTION);
      return [];
    }
  },

  // Helper to generate Official Letter Number: 474.X / NoUrut / Desa-BJL / BulanRomawi / Tahun
  generateSuratNumber(type: SubmissionType, sequence: number = 1): string {
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const currentMonth = romanMonths[new Date().getMonth()];
    const currentYear = new Date().getFullYear();
    const padSeq = String(sequence).padStart(3, '0');

    let kodeKlasifikasi = '470';
    if (type === 'kelahiran') kodeKlasifikasi = '474.1';
    else if (type === 'kematian') kodeKlasifikasi = '474.2';
    else if (type === 'pindah_masuk') kodeKlasifikasi = '475.1';
    else if (type === 'pindah_keluar') kodeKlasifikasi = '475.2';

    return `${kodeKlasifikasi}/${padSeq}/Desa-BJL/${currentMonth}/${currentYear}`;
  }
};
