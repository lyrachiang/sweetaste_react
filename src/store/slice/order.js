import { createSlice } from '@reduxjs/toolkit';

const localStorageCartList = localStorage.getItem('SweetasteCart');

const initialState = {
  orderPrice: 0,
  shipPrice: 300,
  cartList: localStorageCartList ? JSON.parse(localStorageCartList) : [],
  shipInfo: {},
  orderStatus: 'init',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const item = {
        id: action.payload,
        count: 1
      };

      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
      state.cartList.push(item);

      localStorage.setItem('SweetasteCart', JSON.stringify(state.cartList));
    },
    removeCart: (state, action) => {
      let intIdx = 0;
      
      state.cartList.map((cart, idx) => {
        if (cart.id === action.payload) {
          intIdx = idx;
        }
      });
      
      state.cartList.splice(intIdx, 1);

      localStorage.setItem('SweetasteCart', JSON.stringify(state.cartList));
    },
    clearCart: (state) => {
      state.cartList = [];

      localStorage.removeItem('SweetasteCart');
    },
    updateItemCount: (state, action) => {
      let intIdx = 0;
      
      state.cartList.map((cart, idx) => {
        if (cart.id === action.payload.id) {
          intIdx = idx;
        }
      });
      
      state.cartList[intIdx].count = action.payload.count;
    },
    updateOrderPrice: (state, action) => {
      state.orderPrice = action.payload;
    },
    updateShipInfo: (state, action) => {
      state.shipInfo = action.payload;
    },
    updateOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  addCart,
  removeCart,
  clearCart,
  updateItemCount,
  updateOrderPrice,
  updateShipInfo,
  updateOrderStatus,
} = actions;
export const getOrder = (state) => state.order;
export default reducer;