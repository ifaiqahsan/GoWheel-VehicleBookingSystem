import { z } from 'zod';

export const vehicleFormSchema = z.object({
  listingIntent: z.enum(['FOR_SALE', 'FOR_RENT'], { error: () => ({ message: "Required" }) }),
  category: z.string().min(1, "Required"),
  subcategory: z.string().min(1, "Required"),
  vehicleCompany: z.string().min(1, "Required"),
  vehicleName: z.string().min(1, "Required"),
  modelYear: z.coerce.number({ error: "Required" }).min(1950, "Must be valid year"),
  vehicleNumber: z.string().min(3, "Required"),
  
  // Numeric fields updated to ensure they are > 0
  mileage: z.coerce.number({ error: "Required" }).positive("Must be greater than 0"),
  fuelAverage: z.coerce.number({ error: "Required" }).positive("Must be greater than 0"),
  engineSize: z.coerce.number({ error: "Required" }).positive("Must be greater than 0"),
  horsepower: z.coerce.number({ error: "Required" }).positive("Must be greater than 0"),
  
  registrationCity: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  
  seats: z.coerce.number({ error: "Required" }).positive("Must be at least 1"),
  doors: z.coerce.number({ error: "Required" }).positive("Must be at least 1"),
  
  fuelType: z.string().min(1, "Required"),
  condition: z.string().min(1, "Required"),
  transmission: z.string().min(1, "Required"),
  driveType: z.string().min(1, "Required"),
  assembly: z.string().min(1, "Required"),
  
  features: z.object({
    airConditioner: z.boolean().default(false),
    leatherSeats: z.boolean().default(false),
    powerWindows: z.boolean().default(false),
    pushStart: z.boolean().default(false),
    digitalOdometer: z.boolean().default(false),
    steeringAdjustment: z.boolean().default(false),
    ambientLighting: z.boolean().default(false),
    airbags: z.boolean().default(false),
    antiLockBraking: z.boolean().default(false),
    immobilizer: z.boolean().default(false),
    parkingSensors: z.boolean().default(false),
    stabilityControl: z.boolean().default(false),
    tractionControl: z.boolean().default(false),
    centralLocking: z.boolean().default(false),
    androidAuto: z.boolean().default(false),
    appleCarPlay: z.boolean().default(false),
    bluetooth: z.boolean().default(false),
    climateControl: z.boolean().default(false),
    cruiseControl: z.boolean().default(false),
    keylessEntry: z.boolean().default(false),
    powerSteering: z.boolean().default(false),
  }),
  
  sellingPrice: z.coerce.number({ error: "Required" }).positive("Price must be greater than 0"),
  isPriceNegotiable: z.boolean().default(false),
  vehicleDescription: z.string().min(10, "Description must be at least 10 characters"),
  
  media: z.object({
    frontView: z.string(),
    backView: z.string(),
    leftSide: z.string(),
    rightSide: z.string(),
    interior: z.string(),
    dashboard: z.string(),
    engineBay: z.string(),
    exteriorDetail: z.string(),
  }).partial(),
  
  legal: z.object({
    cnicFront: z.string(),
    cnicBack: z.string(),
    registrationBook: z.string(),
    verificationCertificate: z.string(),
    transferDeed: z.string().optional(),
    insurancePapers: z.string().optional(),
  }).partial(),
  
  sellerName: z.string().min(2).optional(),
  sellerPhone: z.string().min(10).optional(),
  sellerEmail: z.string().email().optional(),
  sellerLoc: z.string().min(3).optional(),
  socialHandle: z.string().optional(),
  availability: z.string().optional(),
  preferredContact: z.enum(['WhatsApp', 'Phone Call', 'Email']).optional(),
  driverName: z.string().optional(),
  driverPhone: z.string().optional(),
  driverLicense: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export const stepSchemas = {
  details: vehicleFormSchema.pick({
    listingIntent: true, category: true, subcategory: true, vehicleCompany: true,
    vehicleName: true, modelYear: true, vehicleNumber: true, mileage: true,
    fuelAverage: true, engineSize: true, horsepower: true, registrationCity: true,
    color: true, seats: true, doors: true, fuelType: true, condition: true,
    transmission: true, driveType: true, assembly: true, features: true,
    sellingPrice: true, isPriceNegotiable: true, vehicleDescription: true
  }),
  media: vehicleFormSchema.pick({ media: true }),
  legal: vehicleFormSchema.pick({ legal: true }),
  contact: vehicleFormSchema.pick({ 
    sellerName: true, sellerPhone: true, sellerEmail: true, 
    sellerLoc: true, preferredContact: true 
  }),
};