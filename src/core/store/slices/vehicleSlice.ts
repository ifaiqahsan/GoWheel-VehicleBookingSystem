import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type VehicleType = "all" | "bikes" | "cars" | "suvs" | "vans" | "prestige";

export interface IVehicleData {
  _id: string;
  owner: string;
  type: VehicleType;
  vehicleModel: string;
  number: string;
  imageUrl?: string;
  baseFare?: number;
  pricePerKM?: number;
  waitingCharge?: number;
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VehicleState {
  items: IVehicleData[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  items: [],
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<IVehicleData[]>) => {
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

export const { setVehicles, setLoading, setError } = vehicleSlice.actions;
export default vehicleSlice.reducer;