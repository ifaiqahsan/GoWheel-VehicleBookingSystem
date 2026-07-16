"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2, BookOpen, IdCard, ShieldCheck,
    FileSignature, FileText, X
} from 'lucide-react';
import { uploadFiles } from "../../lib/uploadthing";
import { VehicleFormValues } from '@/lib/validation';
import { toast } from 'sonner';

interface Props {
    formData: Partial<VehicleFormValues>;
    updateFormData: (data: Partial<VehicleFormValues>) => void;
    onBack: () => void;
    onNext: () => void;
}

const getIcon = (id: string) => {
    switch (id) {
        case 'reg_book': return <BookOpen size={27} />;
        case 'cnic_front':
        case 'cnic_back': return <IdCard size={27} />;
        case 'clearance': return <ShieldCheck size={27} />;
        case 'transfer_deed': return <FileSignature size={27} />;
        default: return <FileText size={27} />;
    }
};

const GROUPS = [
    {
        title: "Identity Verification",
        docs: [
            { id: 'cnicFront', label: 'CNIC (Front)', req: true },
            { id: 'cnicBack', label: 'CNIC (Back)', req: true }
        ]
    },
    {
        title: "Registration & Legal",
        docs: [
            { id: 'registrationBook', label: 'Registration Book/Card', req: true },
            { id: 'verificationCertificate', label: 'Verification Certificate', req: true }
        ]
    },
    {
        title: "Additional Documents",
        docs: [
            { id: 'transferDeed', label: 'Transfer Deed', req: false },
            { id: 'insurancePapers', label: 'Insurance Papers', req: false }
        ]
    },
];

export default function LegalPaperwork({ formData, updateFormData, onBack, onNext }: Props) {
    const [files, setFiles] = useState<Record<string, { name: string, url: string } | null>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const processFile = async (key: string, file: File) => {
        try {
            const res = await uploadFiles("imageUploader", { files: [file] });
            if (res && res[0]) {
                const newFileData = { name: file.name, url: res[0].url };
                setFiles(prev => ({ ...prev, [key]: newFileData }));

                updateFormData({
                    legal: { ...(formData.legal ?? {}), [key]: res[0].url } as VehicleFormValues['legal']
                });
            }
        } catch (error) {
            toast.error("Upload failed.");
        }
    };

    const removeFile = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setFiles(prev => ({ ...prev, [id]: null }));
        updateFormData({
            media: {
                ...(formData.media ?? {}),
                [id]: ''
            } as VehicleFormValues['media']
        });
    };

    const handleContinue = () => {
        setIsSubmitted(true);

        let missingDoc = null;
        for (const group of GROUPS) {
            const found = group.docs.find(doc => doc.req && !files[doc.id]);
            if (found) {
                missingDoc = found;
                break;
            }
        }

        if (missingDoc) {
            toast.error(`Please upload: ${missingDoc.label}`);
            const element = document.getElementById(missingDoc.id);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        onNext();
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
        <div className="w-full max-w-[95rem] mx-auto p-8 bg-white shadow-[0_0_60px_rgba(0,0,0,0.1)] rounded-2xl space-y-8">
            <div className="relative text-center">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                    Legal <span className="text-yellow-500">Paperwork</span>
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
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Upload Your Papers</h2>
                <div className="h-px bg-gray-200 w-full"></div>

                {GROUPS.map((group) => (
                    <div key={group.title} className="space-y-4">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">{group.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {group.docs.map((slot) => {
                                const isUploaded = !!files[slot.id];
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
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            ref={el => { if (el) fileInputs.current[slot.id] = el }}
                                            onChange={(e) => e.target.files && processFile(slot.id, e.target.files[0])}
                                        />

                                        <div className={`p-3 rounded-xl transition-colors ${isUploaded ? 'bg-yellow-500 text-gray-900' : hasError ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 group-hover:bg-yellow-500 group-hover:text-black'}`}>
                                            {isUploaded ? <CheckCircle2 size={27} /> : getIcon(slot.id)}
                                        </div>

                                        <div className="flex-1 overflow-hidden">
                                            <p className={`text-sm font-black uppercase tracking-wider ${hasError ? 'text-red-600' : 'text-gray-900'}`}>
                                                {slot.label} {slot.req && <span className="text-yellow-500">*</span>}
                                            </p>
                                            <p className="text-xs font-bold text-gray-400 group-hover:text-gray-900 uppercase tracking-widest mt-1 truncate">
                                                {isUploaded ? files[slot.id]?.name : 'Click to upload'}
                                            </p>
                                        </div>

                                        {isUploaded && (
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                onClick={(e) => removeFile(e, slot.id)}
                                                className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                                            >
                                                <X size={16} />
                                            </motion.button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
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