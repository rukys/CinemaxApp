import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../../types/user';

interface UserState {
  /** Empty object when signed out. */
  user: Partial<UserProfile>;
  setUser: (user: Partial<UserProfile>) => void;
}

const userStore = create<UserState>()(
  persist(
    set => ({
      user: {},
      setUser: user => {
        set({ user });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default userStore;
