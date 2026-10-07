import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { ArchiveService } from '../services/archiveService';
import { DESA_INFO } from '../data/mockData';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | null;
  role: UserRole;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  warga: {
    id: 'demo-warga-1',
    email: 'warga.asep@bojongloa.desa.id',
    fullName: 'Asep Saepudin',
    role: 'warga',
    nik: '3204121503920001',
    noKk: '3204120101180001',
    phone: '081234567890',
    address: 'Jl. Desa Bojongloa No. 14, RT 02/RW 03',
    rt: '02',
    rw: '03',
    dusun: 'Dusun Babakan',
    gender: 'L',
    birthPlace: 'Bandung',
    birthDate: '1992-03-15',
    occupation: 'Wiraswasta',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-10T08:00:00Z'
  },
  admin: {
    id: 'demo-admin-1',
    email: 'ajamjamaludin45@gmail.com',
    fullName: DESA_INFO.namaKasiPelayanan,
    role: 'admin',
    nik: '3204121208840001',
    noKk: '3204120101100005',
    phone: '081122334455',
    address: 'Kantor Desa Bojongloa, Rancaekek',
    rt: '01',
    rw: '01',
    dusun: 'Dusun Bojongloa Pusat',
    gender: 'L',
    birthPlace: 'Bandung',
    birthDate: '1984-08-12',
    occupation: 'Perangkat Desa',
    createdAt: '2025-01-01T08:00:00Z',
    updatedAt: '2025-01-01T08:00:00Z'
  },
  kades: {
    id: 'demo-kades-1',
    email: 'kades.bojongloa@desa.id',
    fullName: DESA_INFO.namaKades,
    role: 'kades',
    nik: '3204121405710001',
    noKk: '3204120101000001',
    phone: '081298765432',
    address: 'Jl. Raya Bojongloa No. 1, Rancaekek',
    rt: '01',
    rw: '01',
    dusun: 'Dusun Bojongloa Pusat',
    gender: 'L',
    birthPlace: 'Bandung',
    birthDate: '1971-05-14',
    occupation: 'Kepala Desa',
    createdAt: '2025-01-01T08:00:00Z',
    updatedAt: '2025-01-01T08:00:00Z'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(DEMO_PROFILES.warga);
  const [role, setRole] = useState<UserRole>('warga');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed initial demo data in background
    ArchiveService.seedInitialDataIfNeeded();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        // If current user is bootstrapped admin email
        const isUserAdmin = user.email === 'ajamjamaludin45@gmail.com';
        
        try {
          const existingProfile = await ArchiveService.getUserProfile(user.uid);
          if (existingProfile) {
            setProfile(existingProfile);
            setRole(existingProfile.role);
          } else {
            const newProfile: UserProfile = {
              id: user.uid,
              email: user.email || 'user@bojongloa.desa.id',
              fullName: user.displayName || 'Warga Desa Bojongloa',
              role: isUserAdmin ? 'admin' : 'warga',
              nik: '320412' + Math.floor(1000000000 + Math.random() * 9000000000),
              noKk: '320412' + Math.floor(1000000000 + Math.random() * 9000000000),
              phone: user.phoneNumber || '08' + Math.floor(100000000 + Math.random() * 900000000),
              address: 'Desa Bojongloa RT 01/RW 01',
              rt: '01',
              rw: '01',
              dusun: 'Dusun Bojongloa Pusat',
              gender: 'L',
              birthPlace: 'Bandung',
              birthDate: '1990-01-01',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await ArchiveService.saveUserProfile(newProfile);
            setProfile(newProfile);
            setRole(newProfile.role);
          }
        } catch {
          // Fallback if firestore rules prevent read yet
          const fallbackProfile: UserProfile = {
            id: user.uid,
            email: user.email || '',
            fullName: user.displayName || 'Pengguna Desa',
            role: isUserAdmin ? 'admin' : 'warga',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setProfile(fallbackProfile);
          setRole(fallbackProfile.role);
        }
      } else {
        // Default to demo profile if not logged in via Firebase yet
        // Retain current demo persona
        if (!profile) {
          setProfile(DEMO_PROFILES.warga);
          setRole('warga');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const switchDemoRole = (newRole: UserRole) => {
    setRole(newRole);
    setProfile(DEMO_PROFILES[newRole]);
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!profile) return;
    const newProf: UserProfile = {
      ...profile,
      ...updated,
      updatedAt: new Date().toISOString()
    };
    setProfile(newProf);
    if (newProf.role) {
      setRole(newProf.role);
    }
    try {
      await ArchiveService.saveUserProfile(newProf);
    } catch (err) {
      console.warn('Could not persist profile to server:', err);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // Ignore
    }
    setFirebaseUser(null);
    setProfile(DEMO_PROFILES.warga);
    setRole('warga');
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        role,
        loading,
        loginWithGoogle,
        switchDemoRole,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
