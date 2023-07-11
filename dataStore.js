import { create } from 'zustand';

const useStore = create((set) => ({
  placeData: [],
  mapRef: null,
  favorites: [],
  modalLoading: false,
  currentCity: "Fortaleza CE",
  currentState: "",
  destination: false,
  userLocation: null,
  toggleFunc: ()=>{},
  setPlaceData: (newData) => set({placeData: newData}),
  setFavorites: (newFavorites) => set({favorites: newFavorites}),
  setNewFavorite: (newFavorite) => set((state) => ({ favorites: [...state.favorites, newFavorite] })),
  removeFavorite: (removedId) => {
    set((state) => ({
      favorites: state.favorites.filter((favorite) => favorite.id !== removedId),
    }));
  },
  setToggleFunc: (newFunc) => set({ toggleFunc: newFunc }),
  setModalLoading: (newRequest) => set({modalLoading: newRequest}),
  setCurrentCity: (newCity) => set({currentCity: newCity}),
  setCurrentState: (newState) => set({currentState: newState}),
  setMapRef: (newRef) => set({mapRef: newRef}),
  setDestination: (newDestination) => set({destination: newDestination}),
  setUserLocation: (newLocation) => set({userLocation: newLocation})
}));
  
  export default useStore;
