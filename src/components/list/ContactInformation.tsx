"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, MapPin, AtSign, Car, Clock, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { VehicleFormValues } from '@/lib/validation';

interface Props {
    formData: Partial<VehicleFormValues>;
    updateFormData: (data: Partial<VehicleFormValues>) => void;
    onBack: () => void;
    onNext: () => void;
}
const contactSchema = z.object({
    sellerName: z.string().min(1, "Name is required"),
    sellerPhone: z.string().min(10, "Valid phone number required"),
    sellerEmail: z.string().email("Valid email required"),
    sellerLoc: z.string().min(1, "Location is required"),
    socialHandle: z.string().optional(),
    availability: z.string().min(1, "Availability is required"),
    preferredContact: z.string(),
    driverName: z.string().optional(),
    driverPhone: z.string().optional(),
    driverLicense: z.string().optional(),
});

export default function ContactInformation({ formData, updateFormData, onBack, onNext }: Props) {
    const defaultContactValues: z.infer<typeof contactSchema> = {
        sellerName: formData.sellerName ?? '',
        sellerPhone: formData.sellerPhone ?? '',
        sellerEmail: formData.sellerEmail ?? '',
        sellerLoc: formData.sellerLoc ?? '',
        socialHandle: formData.socialHandle ?? '',
        availability: formData.availability ?? '',
        preferredContact: formData.preferredContact ?? '',
        driverName: formData.driverName ?? '',
        driverPhone: formData.driverPhone ?? '',
        driverLicense: formData.driverLicense ?? ''
    };

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: defaultContactValues
    });

    const [hasDriver, setHasDriver] = useState(false);
    const watchedPreferred = watch('preferredContact');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const onSubmit = (data: any) => {
        updateFormData(data);
        onNext();
    };

    const onError = () => {
        toast.error("Please fill in all required fields correctly.");
    };

    const summaryItems = [
        { label: 'Intent', val: formData.listingIntent === 'FOR_SALE' ? 'For Sale' : 'For Rent' },
        { label: 'Category', val: `${formData.category || 'N/A'} / ${formData.subcategory || 'N/A'}` },
        { label: 'Company', val: formData.vehicleCompany || 'N/A' },
        { label: 'Name', val: formData.vehicleName || 'N/A' },
        { label: 'Year', val: formData.modelYear || 'N/A' },
        { label: 'Number', val: formData.vehicleNumber || 'N/A' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full max-w-[95rem] mx-auto p-8 bg-white shadow-[0_0_60px_rgba(0,0,0,0.1)] rounded-2xl space-y-8">
            <div className="relative text-center">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                    Contact <span className="text-yellow-500">Information</span>
                </h1>
            </div>

            <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Vehicle Summary</h2>
                <div className="h-px bg-gray-200 w-full mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {summaryItems.map((item, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</p>
                            <p className="font-black text-gray-900 truncate">{item.val}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-8">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Seller Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField icon={<User size={18} />} label="Full Name" register={register("sellerName")} error={errors.sellerName?.message} placeholder="e.g., John Doe" />
                    <InputField icon={<Phone size={18} />} label="Phone Number" register={register("sellerPhone")} error={errors.sellerPhone?.message} placeholder="e.g., +92 3XX XXXXXXX" />
                    <InputField icon={<Mail size={18} />} label="Email Address" register={register("sellerEmail")} error={errors.sellerEmail?.message} placeholder="e.g., john@example.com" />
                    <InputField icon={<MapPin size={18} />} label="Location" register={register("sellerLoc")} error={errors.sellerLoc?.message} placeholder="e.g., Downtown, NY" />
                    <InputField icon={<AtSign size={18} />} label="Social Handle" register={register("socialHandle")} placeholder="e.g., @johndoe_cars" />
                    <InputField icon={<Clock size={18} />} label="Availability Hours" register={register("availability")} error={errors.availability?.message} placeholder="e.g., 9 AM - 6 PM" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><MessageSquare size={18} /> Preferred Contact Method</label>
                    <div className="flex gap-2">
                        {['WhatsApp', 'Phone Call', 'Email'].map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => setValue('preferredContact', opt)}
                                className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${watchedPreferred === opt ? 'bg-yellow-500 text-gray-900 shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Driver Details</h2>
                    <button
                        type="button"
                        onClick={() => setHasDriver(!hasDriver)}
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${hasDriver ? 'bg-yellow-500 text-gray-900 shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        {hasDriver ? 'Driver Added ✓' : '+ Include Driver'}
                    </button>
                </div>

                <AnimatePresence>
                    {hasDriver && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                            <InputField icon={<User size={18} />} label="Driver Name" register={register("driverName")} placeholder="e.g., Jane Smith" />
                            <InputField icon={<Phone size={18} />} label="Driver Phone" register={register("driverPhone")} placeholder="e.g., +1 098 765 432" />
                            <InputField icon={<Car size={18} />} label="License Number" register={register("driverLicense")} placeholder="e.g., DL-99887766" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button type="button" onClick={onBack} className="w-1/3 bg-gray-100 text-gray-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">Back</button>
                <button type="submit" className="flex-1 bg-gray-900 text-yellow-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-gray-900 transition-all">Save & Submit</button>
            </div>
        </form>
    );
}

function InputField({ icon, label, register, error, placeholder }: { icon: React.ReactNode, label: string, register: any, error?: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${error ? 'text-red-500' : 'text-gray-400'}`}>{icon} {label}</label>
            <input {...register} className={`w-full bg-gray-50 p-4 rounded-xl border ${error ? 'border-red-500' : 'border-gray-100'} focus:border-yellow-500 outline-none transition-all font-bold text-gray-900`} placeholder={placeholder} />
            {error && <p className="text-red-500 text-[10px]">{error}</p>}
        </div>
    );
}