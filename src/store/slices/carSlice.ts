import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CarState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  items: [],
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCars, setLoading, setError } = carSlice.actions;
export default carSlice.reducer;