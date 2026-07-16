"use client";

import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { RootState } from '@/core/store/store';
import { updateDraft } from '@/core/store/slices/vehicleSlice';
import { uploadFiles } from "@/lib/uploadthing";
import { VehicleFormValues } from '@/lib/validation';

interface Props {
    formData: Partial<VehicleFormValues>;
    updateFormData: (data: Partial<VehicleFormValues>) => void;
    onBack: () => void;
    onNext: () => void;
}

const SLOTS = [
    { id: 'front', label: 'FRONT VIEW', key: 'frontView', req: true },
    { id: 'back', label: 'BACK VIEW', key: 'backView', req: true },
    { id: 'left', label: 'LEFT SIDE', key: 'leftSide', req: true },
    { id: 'right', label: 'RIGHT SIDE', key: 'rightSide', req: true },
    { id: 'interior', label: 'INTERIOR', key: 'interior', req: true },
    { id: 'dashboard', label: 'DASHBOARD', key: 'dashboard', req: false },
    { id: 'engine', label: 'ENGINE BAY', key: 'engineBay', req: false },
    { id: 'exterior', label: 'EXTERIOR DETAIL', key: 'exteriorDetail', req: false },
];

export default function MediaGallery({ onBack, onNext }: Props) {
    const dispatch = useDispatch();

    const draft = useSelector((state: RootState) => state.vehicles.draft);
    const { media } = draft;

    const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const processFile = async (key: string, file: File) => {
        try {
            const res = await uploadFiles("imageUploader", { files: [file] });
            if (res && res[0]) {
                // Update Redux state directly
                dispatch(updateDraft({
                    media: { ...media, [key]: res[0].url }
                }));
            }
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        }
    };

    const removeImage = (e: React.MouseEvent, key: string) => {
        e.stopPropagation();
        dispatch(updateDraft({
            media: { ...media, [key]: '' }
        }));
    };

    const handleContinue = () => {
        setIsSubmitted(true);
        const missingSlot = SLOTS.find(slot => slot.req && !media[slot.key as keyof typeof media]);

        if (missingSlot) {
            toast.error(`Please upload the ${missingSlot.label.toLowerCase()} image.`);
            const element = document.getElementById(missingSlot.id);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        onNext();
    };

    const summaryItems = [
        { label: 'Intent', val: draft.listingIntent === 'FOR_SALE' ? 'For Sale' : 'For Rent' },
        { label: 'Category', val: `${draft.category || 'N/A'} / ${draft.subcategory || 'N/A'}` },
        { label: 'Company', val: draft.vehicleCompany || 'N/A' },
        { label: 'Name', val: draft.vehicleName || 'N/A' },
        { label: 'Year', val: draft.modelYear || 'N/A' },
        { label: 'Number', val: draft.vehicleNumber || 'N/A' },
    ];

    return (
        <div className="w-full max-w-[95rem] mx-auto p-8 bg-white shadow-[0_0_60px_rgba(0,0,0,0.1)] rounded-2xl space-y-8">
            <div className="relative text-center">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                    Media <span className="text-yellow-500">Gallery</span>
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
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Upload Vehicle Images</h2>
                <div className="h-px bg-gray-200 w-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SLOTS.map((slot) => {
                        const isUploaded = !!media[slot.key as keyof typeof media];
                        const hasError = isSubmitted && slot.req && !isUploaded;

                        return (
                            <motion.div
                                key={slot.id}
                                id={slot.id}
                                className={`group bg-white p-6 rounded-2xl border ${isUploaded ? 'border-yellow-500 shadow-lg' : hasError ? 'border-red-500 bg-red-50' : 'border-gray-200'} flex items-center gap-4 cursor-pointer`}
                                whileHover={{
                                    y: -4,
                                    scale: 1.01,
                                    borderColor: hasError ? "#ef4444" : "#eab308",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => !isUploaded && fileInputs.current[slot.id]?.click()}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={el => { if (el) fileInputs.current[slot.id] = el }}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && processFile(slot.key, e.target.files[0])}
                                />

                                <div className={`p-3 rounded-xl transition-colors ${isUploaded ? 'bg-yellow-500 text-gray-900' : hasError ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 group-hover:bg-yellow-500 group-hover:text-black'}`}>
                                    {isUploaded ? <CheckCircle2 size={27} /> : <Camera size={27} />}
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <p className={`text-sm font-black uppercase tracking-wider ${hasError ? 'text-red-600' : 'text-gray-900'}`}>{slot.label} {slot.req && <span className="text-yellow-500">*</span>}</p>
                                    <p className="text-xs font-bold text-gray-400 group-hover:text-gray-900 uppercase tracking-widest mt-1">
                                        {isUploaded ? 'Image uploaded' : 'Click to upload'}
                                    </p>
                                </div>

                                {isUploaded && (
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        onClick={(e) => removeImage(e, slot.key)}
                                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                                    >
                                        <X size={16} />
                                    </motion.button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <div className="flex gap-4 pt-6 border-t border-gray-100">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="w-1/3 bg-gray-100 text-gray-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                    Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="flex-1 bg-gray-900 text-yellow-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300"
                >
                    save & continue
                </motion.button>
            </div>
        </div>
    );
}