import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleFormValues } from "@/lib/validation";

interface VehicleState {
  items: VehicleFormValues[];
  loading: boolean;
  error: string | null;
  draft: VehicleFormValues;
}

const initialState: VehicleState = {
  items: [],
  loading: false,
  error: null,
  draft: {
    listingIntent: "FOR_SALE",
    category: "",
    subcategory: "",
    vehicleCompany: "",
    vehicleName: "",
    modelYear: "",
    vehicleNumber: "",
    mileage: "",
    fuelAverage: "",
    engineSize: "",
    horsepower: "",
    registrationCity: "",
    color: "",
    seats: "",
    doors: "",
    fuelType: "",
    condition: "",
    transmission: "",
    driveType: "",
    assembly: "",
    features: {
      airConditioner: false,
      leatherSeats: false,
      powerWindows: false,
      pushStart: false,
      digitalOdometer: false,
      steeringAdjustment: false,
      ambientLighting: false,
      airbags: false,
      antiLockBraking: false,
      immobilizer: false,
      parkingSensors: false,
      stabilityControl: false,
      tractionControl: false,
      centralLocking: false,
      androidAuto: false,
      appleCarPlay: false,
      bluetooth: false,
      climateControl: false,
      cruiseControl: false,
      keylessEntry: false,
      powerSteering: false,
    },
    sellingPrice: "",
    isPriceNegotiable: false,
    vehicleDescription: "",
    media: {
      frontView: "",
      backView: "",
      leftSide: "",
      rightSide: "",
      interior: "",
      dashboard: "",
      engineBay: "",
      exteriorDetail: "",
    },
    legal: {
      cnicFront: "",
      cnicBack: "",
      registrationBook: "",
      verificationCertificate: "",
      transferDeed: undefined,
      insurancePapers: undefined,
    },
    sellerName: "",
    sellerPhone: "",
    sellerEmail: "",
    sellerLoc: "",
    socialHandle: "",
    availability: "",
    preferredContact: "WhatsApp",
    driverName: "",
    driverPhone: "",
    driverLicense: "",
  },
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<VehicleFormValues[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateDraft: (state, action: PayloadAction<Partial<VehicleFormValues>>) => {
      state.draft = {
        ...state.draft,
        ...action.payload,
        features: { ...state.draft.features, ...action.payload.features },
        media: { ...state.draft.media, ...action.payload.media },
        legal: { ...state.draft.legal, ...action.payload.legal },
      };
    },
    clearDraft: (state) => {
      state.draft = initialState.draft;
    },
  },
});

export const { setVehicles, setLoading, setError, updateDraft, clearDraft } = vehicleSlice.actions;
export default vehicleSlice.reducer;