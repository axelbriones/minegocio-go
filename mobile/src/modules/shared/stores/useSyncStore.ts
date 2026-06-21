import { create } from 'zustand';

interface SyncState {
  pendingCount: number;
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAttempt: string | null;
  setPendingCount: (count: number) => void;
  setIsOnline: (status: boolean) => void;
  setIsSyncing: (status: boolean) => void;
  setLastSyncAttempt: (date: string) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  pendingCount: 0,
  isOnline: true,
  isSyncing: false,
  lastSyncAttempt: null,
  setPendingCount: (count) => set({ pendingCount: count }),
  setIsOnline: (status) => set({ isOnline: status }),
  setIsSyncing: (status) => set({ isSyncing: status }),
  setLastSyncAttempt: (date) => set({ lastSyncAttempt: date }),
}));
