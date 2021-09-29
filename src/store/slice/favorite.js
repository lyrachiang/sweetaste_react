import { createSlice } from '@reduxjs/toolkit';

const localStorageUser = localStorage.getItem('SweetasteUser');
const localStorageFav  = localStorageUser !== '' && localStorage.getItem(`SweetasteFav_${localStorageUser}`);

const initialState = {
  user: localStorageUser !== '' ? localStorageUser : '',
  favoriteList: localStorageFav ? JSON.parse(localStorageFav) : [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const item = {
        id: action.payload,
      };

      state.favoriteList = state.favoriteList.filter((item) => item.id !== action.payload);
      state.favoriteList.push(item);

      if (state.user !== '') {
        localStorage.setItem(`SweetasteFav_${state.user}`, JSON.stringify(state.favoriteList));
      }
    },
    removeFavorite: (state, action) => {
      let intIdx = 0;
      
      state.favoriteList.map((item, idx) => {
        if (item.id === action.payload) {
          intIdx = idx;
        }
      });
      
      state.favoriteList.splice(intIdx, 1);

      if (state.user !== '') {
        localStorage.setItem(`SweetasteFav_${state.user}`, JSON.stringify(state.favoriteList));
      }
    },
    setFavorite: (state, action) => {
      state.user = action.payload;
      
      const localStorageFav = localStorage.getItem(`SweetasteFav_${state.user}`);

      if (localStorageFav) {
        state.favoriteList = JSON.parse(localStorageFav);
      }
    },
  },
});

const { actions, reducer } = favoriteSlice;

export const { addFavorite, removeFavorite, setFavorite } = actions;
export const getFavorite = (state) => state.favorite;
export default reducer;