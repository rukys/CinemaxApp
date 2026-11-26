import { create } from 'zustand';

interface GlobalState {
  category: string;
  setCategory: (category: string) => void;
  errorServer: Record<string, unknown>;
  setErrorServer: (errorServer: Record<string, unknown>) => void;
  isNetworkError: boolean;
  setIsNetworkError: (isNetworkError: boolean) => void;
}

const globalStore = create<GlobalState>()(set => ({
  category: 'ALL',
  setCategory: category => {
    set({ category });
  },

  errorServer: {},
  setErrorServer: errorServer => {
    set({ errorServer });
  },

  isNetworkError: false,
  setIsNetworkError: isNetworkError => {
    set({ isNetworkError });
  },
}));

export default globalStore;
