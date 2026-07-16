"use client";

import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleFormValues, stepSchemas } from '@/lib/validation';
import { toast } from 'sonner';

interface FieldProps {
    label: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    id: string;
}

interface Props {
    formData: Partial<VehicleFormValues>;
    updateFormData: (data: Partial<VehicleFormValues>) => void;
    onNext: () => void;
}

const pricingConstraints: any = {
    'Car': { 'Mini Car': { min: 2500000, max: 5000000 }, 'Sedan': { min: 6000000, max: 15000000 }, 'SUV': { min: 10000000, max: 35000000 }, 'Sports Car': { min: 30000000, max: 150000000 }, 'Luxury Car': { min: 25000000, max: 200000000 } },
    'Bike': { 'Motorbike': { min: 180000, max: 450000 }, 'Heavy Bike': { min: 2000000, max: 12000000 }, 'Scooter': { min: 150000, max: 600000 }, 'Touring Bike': { min: 1500000, max: 8000000 }, 'Bicycle': { min: 10000, max: 200000 } },
    'Van': { 'Mini Van': { min: 1500000, max: 4000000 }, 'Micro Van': { min: 1000000, max: 3000000 }, 'Cargo Van': { min: 2500000, max: 9000000 }, 'Coaster Van': { min: 8000000, max: 25000000 }, 'Camper Van': { min: 5000000, max: 25000000 } }
};

const rentPricingConstraints: any = {
    'Car': { 'Mini Car': { min: 2000, max: 5000 }, 'Sedan': { min: 4000, max: 12000 }, 'SUV': { min: 8000, max: 25000 }, 'Sports Car': { min: 25000, max: 100000 }, 'Luxury Car': { min: 20000, max: 150000 } },
    'Bike': { 'Motorbike': { min: 500, max: 1500 }, 'Heavy Bike': { min: 3000, max: 10000 }, 'Scooter': { min: 300, max: 1000 }, 'Touring Bike': { min: 2000, max: 6000 }, 'Bicycle': { min: 200, max: 800 } },
    'Van': { 'Mini Van': { min: 3000, max: 8000 }, 'Micro Van': { min: 2000, max: 6000 }, 'Cargo Van': { min: 4000, max: 15000 }, 'Coaster Van': { min: 10000, max: 30000 }, 'Camper Van': { min: 8000, max: 25000 } }
};

const featureMapping: Record<string, keyof VehicleFormValues['features']> = {
    'Air Conditioner': 'airConditioner', 'Leather Seats': 'leatherSeats', 'Power Windows': 'powerWindows', 'Push Start': 'pushStart',
    'Digital Odometer': 'digitalOdometer', 'Steering Adjustment': 'steeringAdjustment', 'Ambient Lighting': 'ambientLighting',
    'Airbags': 'airbags', 'Anti-lock Braking (ABS)': 'antiLockBraking', 'Immobilizer': 'immobilizer', 'Parking Sensors': 'parkingSensors',
    'Stability Control': 'stabilityControl', 'Traction Control': 'tractionControl', 'Central Locking': 'centralLocking',
    'Android Auto': 'androidAuto', 'Apple CarPlay': 'appleCarPlay', 'Bluetooth': 'bluetooth', 'Climate Control': 'climateControl',
    'Cruise Control': 'cruiseControl', 'Keyless Entry': 'keylessEntry', 'Power Steering': 'powerSteering'
};

const featureCategories = {
    'Interior': ['Air Conditioner', 'Leather Seats', 'Power Windows', 'Push Start', 'Digital Odometer', 'Steering Adjustment', 'Ambient Lighting'],
    'Safety': ['Airbags', 'Anti-lock Braking (ABS)', 'Immobilizer', 'Parking Sensors', 'Stability Control', 'Traction Control', 'Central Locking'],
    'Comfort & Convenience': ['Android Auto', 'Apple CarPlay', 'Bluetooth', 'Climate Control', 'Cruise Control', 'Keyless Entry', 'Power Steering']
};

const getOptionStyle = (isActive: boolean, error?: boolean) =>
    error ? 'border-2 border-red-500 bg-red-50 text-red-700' : isActive ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/40 scale-105 border-transparent' : 'bg-white text-gray-600 border border-gray-200 hover:bg-yellow-500 hover:text-black hover:border-transparent hover:shadow-lg hover:shadow-yellow-500/20';

export default function DetailsForm({ formData, updateFormData, onNext }: Props) {
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isDriverServiceIncluded, setIsDriverServiceIncluded] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const yearListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isYearOpen && yearListRef.current && formData.modelYear) {
            const activeElement = document.getElementById(`year-${formData.modelYear}`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [isYearOpen, formData.modelYear]);

    const categoryList = ['Car', 'Bike', 'Van'];
    const subcategoryMap: Record<string, string[]> = {
        'Car': ['Mini Car', 'Sedan', 'Sports Car', 'SUV', 'Luxury Car'],
        'Bike': ['Motorbike', 'Heavy Bike', 'Scooter', 'Touring Bike', 'Bicycle'],
        'Van': ['Mini Van', 'Micro Van', 'Cargo Van', 'Coaster Van', 'Camper Van']
    };
    const options: Record<string, string[]> = {
        fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        condition: ['New', 'Used'],
        transmission: ['Automatic', 'Manual', 'CVT'],
        driveType: ['AWD', 'FWD', 'RWD', '4WD'],
        assembly: ['Local', 'Imported']
    };

    const validYears: number[] = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 2026 - i);
    const availableSubcategories = formData.category ? subcategoryMap[formData.category] : undefined;

    const getRangeLabel = () => {
        if (!formData.category || !formData.subcategory) return "";
        const constraints = formData.listingIntent === 'FOR_SALE' ? pricingConstraints : rentPricingConstraints;
        const range = constraints[formData.category]?.[formData.subcategory];
        return range ? `(Range: ${range.min.toLocaleString()} - ${range.max.toLocaleString()})` : "";
    };

    const toggleFeature = (featureName: string) => {
        const key = featureMapping[featureName];
        const currentFeatures = (formData.features ?? {}) as Partial<VehicleFormValues['features']>;
        updateFormData({
            features: {
                ...currentFeatures,
                [key]: !currentFeatures[key as keyof typeof currentFeatures]
            } as VehicleFormValues['features']
        });
        setErrors(prev => ({ ...prev, features: "" }));
    };

    const handleSave = async () => {
        const result = stepSchemas.details.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => { fieldErrors[issue.path[0] as string] = issue.message; });
            setErrors(fieldErrors);
            const firstErrorKey = result.error.issues[0].path[0] as string;
            const element = document.getElementById(firstErrorKey);
            if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        try {
            setErrors({});
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server Validation Failed:", errorData);
                throw new Error(errorData.message || "Failed to save listing");
            }

            const data = await response.json();
            if (data._id) { updateFormData({ ...data }); }
            toast.success("Vehicle listing saved successfully!");
            onNext();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full max-w-[95rem] mx-auto p-8 bg-white shadow-[0_0_60px_rgba(0,0,0,0.2)] rounded-2xl space-y-8">
            <section id="listingIntent" className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">Listing Intent</h2>
                <div className="h-px bg-gray-300 w-full mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    {['FOR_SALE', 'FOR_RENT'].map((t) => (
                        <motion.button key={t} type="button" onClick={() => { updateFormData({ listingIntent: t as any }); setErrors(prev => ({ ...prev, listingIntent: "" })); }} className={`p-4 rounded-xl font-bold uppercase transition-all duration-300 ${getOptionStyle(formData.listingIntent === t, !!errors['listingIntent'])}`}>
                            {t === 'FOR_SALE' ? 'For Sale' : 'For Rent'}
                        </motion.button>
                    ))}
                </div>
                {errors['listingIntent'] && <p className="text-red-500 text-xs mt-2">{errors['listingIntent']}</p>}
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">Model Details</h2>
                <div className="h-px bg-gray-300 w-full mb-4"></div>
                <div id="category" className="mb-6">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Select Category</label>
                    <div className="grid grid-cols-3 gap-4">
                        {categoryList.map((cat) => (
                            <motion.button key={cat} type="button" onClick={() => { updateFormData({ category: cat, subcategory: '' }); setErrors(prev => ({ ...prev, category: "" })); }} className={`p-4 rounded-xl font-bold uppercase transition-all duration-300 text-sm ${getOptionStyle(formData.category === cat, !!errors['category'])}`}>
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div id="subcategory" className="mb-8">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Select Subcategory</label>
                    <div className="grid grid-cols-5 gap-3">
                        {availableSubcategories ? (
                            availableSubcategories.map((sub: string) => (
                                <motion.button key={sub} type="button" onClick={() => { updateFormData({ subcategory: sub }); setErrors(prev => ({ ...prev, subcategory: "" })); }} className={`px-2 py-3 rounded-lg font-bold text-[11px] uppercase transition-all duration-300 whitespace-nowrap ${getOptionStyle(formData.subcategory === sub, !!errors['subcategory'])}`}>
                                    {sub}
                                </motion.button>
                            ))
                        ) : (
                            <div className="col-span-5 p-4 border border-dashed border-gray-200 rounded-lg"><p className="text-gray-400 text-xs text-center">Please select a category above to see options.</p></div>
                        )}
                    </div>
                    {errors['subcategory'] && <p className="text-red-500 text-xs mt-2">{errors['subcategory']}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Field id="vehicleCompany" label="Vehicle Company" placeholder="e.g., Toyota" value={formData.vehicleCompany} error={errors['vehicleCompany']} onChange={(e) => { updateFormData({ vehicleCompany: e.target.value }); setErrors(prev => ({ ...prev, vehicleCompany: "" })); }} />
                    <Field id="vehicleName" label="Vehicle Name" placeholder="e.g., Corolla" value={formData.vehicleName} error={errors['vehicleName']} onChange={(e) => { updateFormData({ vehicleName: e.target.value }); setErrors(prev => ({ ...prev, vehicleName: "" })); }} />

                    <div id="modelYear" className="relative">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Model Year</label>
                        <button type="button" onClick={() => setIsYearOpen(!isYearOpen)} className={`w-full p-3 flex justify-between items-center rounded-xl font-bold border ${errors['modelYear'] ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'} ${isYearOpen ? 'border-yellow-500 text-yellow-600' : ''}`}>
                            {formData.modelYear || 'e.g., 2025'}
                            <svg className={`w-4 h-4 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {errors['modelYear'] && <p className="text-red-500 text-xs mt-1">{errors['modelYear']}</p>}
                        <AnimatePresence>
                            {isYearOpen && (
                                <motion.div ref={yearListRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                                    {validYears.map((y) => (
                                        <button id={`year-${y}`} key={y} type="button" onClick={() => { updateFormData({ modelYear: y }); setIsYearOpen(false); setErrors(prev => ({ ...prev, modelYear: "" })); }} className={`w-full p-3 text-left font-bold text-sm ${formData.modelYear === y ? 'bg-yellow-500 text-black' : 'hover:bg-gray-50'}`}>
                                            {y}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Field id="vehicleNumber" label="Vehicle Number" placeholder="e.g., ABC-1234" value={formData.vehicleNumber} error={errors['vehicleNumber']} onChange={(e) => { updateFormData({ vehicleNumber: e.target.value }); setErrors(prev => ({ ...prev, vehicleNumber: "" })); }} />
                </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">Technical Specifications</h2>
                <div className="h-px bg-gray-300 w-full mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                    <Field id="mileage" label="Mileage (miles)" placeholder="e.g., 50000" value={formData.mileage === 0 ? '' : (formData.mileage ?? '')} error={errors['mileage']} onChange={(e) => { updateFormData({ mileage: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, mileage: "" })); }} />
                    <Field id="fuelAverage" label="Fuel Average" placeholder="e.g., 12" value={formData.fuelAverage === 0 ? '' : (formData.fuelAverage ?? '')} error={errors['fuelAverage']} onChange={(e) => { updateFormData({ fuelAverage: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, fuelAverage: "" })); }} />
                    <Field id="engineSize" label="Engine Size (cc)" placeholder="e.g., 1800" value={formData.engineSize === 0 ? '' : (formData.engineSize ?? '')} error={errors['engineSize']} onChange={(e) => { updateFormData({ engineSize: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, engineSize: "" })); }} />
                    <Field id="horsepower" label="Horsepower (hp)" placeholder="e.g., 150" value={formData.horsepower === 0 ? '' : (formData.horsepower ?? '')} error={errors['horsepower']} onChange={(e) => { updateFormData({ horsepower: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, horsepower: "" })); }} />
                    <Field id="registrationCity" label="Registration City" placeholder="e.g., Islamabad" value={formData.registrationCity} error={errors['registrationCity']} onChange={(e) => { updateFormData({ registrationCity: e.target.value }); setErrors(prev => ({ ...prev, registrationCity: "" })); }} />
                    <Field id="color" label="Color" placeholder="e.g., Silver" value={formData.color} error={errors['color']} onChange={(e) => { updateFormData({ color: e.target.value }); setErrors(prev => ({ ...prev, color: "" })); }} />
                    <Field id="seats" label="Seats" placeholder="e.g., 5" value={formData.seats === 0 ? '' : (formData.seats ?? '')} error={errors['seats']} onChange={(e) => { updateFormData({ seats: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, seats: "" })); }} />
                    <Field id="doors" label="Doors" placeholder="e.g., 4" value={formData.doors === 0 ? '' : (formData.doors ?? '')} error={errors['doors']} onChange={(e) => { updateFormData({ doors: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, doors: "" })); }} />
                </div>
                <div className="space-y-6">
                    {Object.entries(options).map(([key, list]) => (
                        <div key={key} id={key}>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{key}</label>
                            <div className="flex flex-wrap gap-2">
                                {list.map((val) => (
                                    <motion.button key={val} type="button" onClick={() => { updateFormData({ [key]: val } as any); setErrors(prev => ({ ...prev, [key]: "" })); }} className={`px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 ${getOptionStyle(formData[key as keyof VehicleFormValues] === val, !!errors[key])}`}>
                                        {val}
                                    </motion.button>
                                ))}
                            </div>
                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                        </div>
                    ))}
                </div>
            </section>

            <section id="features" className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">Vehicle Features</h2>
                <div className="h-px bg-gray-300 w-full mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(featureCategories).map(([cat, list]) => (
                        <div key={cat} className="space-y-3">
                            <h3 className="font-bold text-gray-700 text-sm mb-4">{cat}</h3>
                            {list.map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={!!formData.features?.[featureMapping[item]]} onChange={() => toggleFeature(item)} className="w-5 h-5 accent-yellow-500 rounded cursor-pointer" />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{item}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                {errors['features'] && <p className="text-red-500 text-xs mt-4">{errors['features']}</p>}
            </section>

            {formData.listingIntent && (
                <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">
                        {formData.listingIntent === 'FOR_SALE' ? 'Pricing & Negotiation' : 'Rent Details'}
                    </h2>
                    {formData.listingIntent === 'FOR_SALE' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field id="sellingPrice" label={`Selling Price ${getRangeLabel()}`} placeholder="e.g., 5000000" value={formData.sellingPrice === 0 ? '' : (formData.sellingPrice ?? '')} error={errors['sellingPrice']} onChange={(e) => { updateFormData({ sellingPrice: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, sellingPrice: "" })); }} />
                            <label className="flex items-center gap-3 p-3 mt-5 bg-gray-50 rounded-xl border border-gray-300 cursor-pointer">
                                <input type="checkbox" checked={formData.isPriceNegotiable} onChange={(e) => updateFormData({ isPriceNegotiable: e.target.checked })} className="accent-yellow-500 w-4 h-4" />
                                <span className="text-xs font-bold text-gray-600 uppercase">Price Negotiable</span>
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Field id="sellingPrice" label={`Daily Rent ${getRangeLabel()}`} placeholder="e.g., 5000" value={formData.sellingPrice === 0 ? '' : (formData.sellingPrice ?? '')} error={errors['sellingPrice']} onChange={(e) => { updateFormData({ sellingPrice: e.target.value === '' ? undefined : Number(e.target.value) }); setErrors(prev => ({ ...prev, sellingPrice: "" })); }} />
                            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-300 cursor-pointer">
                                <input type="checkbox" checked={isDriverServiceIncluded} onChange={(e) => setIsDriverServiceIncluded(e.target.checked)} className="accent-yellow-500 w-4 h-4" />
                                <span className="text-sm font-bold text-gray-700">Include Chauffeur Service</span>
                            </label>
                        </div>
                    )}
                </section>
            )}

            <section className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">Vehicle Description</h2>
                <div className="h-px bg-gray-300 w-full mb-4"></div>
                <textarea
                    id="vehicleDescription"
                    value={formData.vehicleDescription}
                    onChange={(e) => { updateFormData({ vehicleDescription: e.target.value }); setErrors(prev => ({ ...prev, vehicleDescription: "" })); }}
                    className={`w-full p-4 bg-gray-50 rounded-xl border ${errors['vehicleDescription'] ? 'border-red-500' : 'border-gray-300'} h-40 focus:border-yellow-500 outline-none text-sm`}
                    placeholder="e.g., This vehicle is in excellent condition, well maintained and features..."
                />
                {errors['vehicleDescription'] && <p className="text-red-500 text-xs mt-1">{errors['vehicleDescription']}</p>}
            </section>

            <button type="button" onClick={handleSave} className="w-full bg-gray-900 text-yellow-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
                save & continue
            </button>
        </div>
    );
}

function Field({ label, placeholder, value, onChange, error, id }: FieldProps) {
    // Safety check to ensure we never pass NaN to the input value
    const displayValue = (typeof value === 'number' && Number.isNaN(value)) ? '' : (value ?? '');

    return (
        <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
            <input
                id={id}
                value={displayValue}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-3 bg-gray-50 rounded-xl border ${error ? 'border-red-500' : 'border-gray-300'} focus:border-yellow-500 outline-none text-sm`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}