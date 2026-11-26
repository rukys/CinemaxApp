import { create } from 'zustand';

const globalStore = create(set => ({
  category: 'ALL',
  setCategory: data => {
    set({ category: data });
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
