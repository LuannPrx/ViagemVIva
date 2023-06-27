import { create } from 'zustand';

const useStore = create((set) => ({
  placeData: [],
  favorites: [],
  toggleFunc: ()=>{},
  setPlaceData: (newData) => set({placeData: newData}),
  setFavorites: (newFavorite) => set((state) => ({ favorites: [...state.favorites, newFavorite] })),
  removeFavorite: (removedId) => {
    set((state) => ({
      favorites: state.favorites.filter((favorite) => favorite.id !== removedId),
    }));
  },
  setToggleFunc: (newFunc) => set({ toggleFunc: newFunc }),
}));
  
  export default useStore;
