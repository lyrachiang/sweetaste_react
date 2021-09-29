import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import prodData from '../../api/prod';
import prodTypeData from '../../api/prod_type';

const initialState = {
  isLoading: false,
  prodList: [],
  prodTypeList: [],
};

export const fetchProd = createAsyncThunk(
  'prod/fetchProd',
  async () => {
    const response = await prodData();

    return response.data;
  }
);

export const fetchProdType = createAsyncThunk(
  'prod/fetchProdType',
  async () => {
    const response = await prodTypeData();

    return response.data;
  }
);

export const prodSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProd.fulfilled, (state, action) => {
        state.isLoading = false;

        let data = [];
        action.payload.rows.map((item) => {
          data[item.id] = item;
        });

        state.prodList = data;
      })
      .addCase(fetchProdType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProdType.fulfilled, (state, action) => {
        state.isLoading = false;

        let data = [];
        action.payload.rows.map((item) => {
          data[item.id] = item;
        });

        state.prodTypeList = data;
      });
  },
});

const { reducer } = prodSlice;

export const getProd = (state) => state.prod;
export default reducer;