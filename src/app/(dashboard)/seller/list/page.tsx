"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/core/context/AuthContext';
import { VehicleFormValues } from '@/lib/validation';
import { toast } from 'sonner';
import ListHeroSection from '@/components/list/HeroSection';
import DetailsForm from '@/components/list/DetailsForm';
import MediaGallery from '@/components/list/MediaGallery';
import LegalPaperwork from '@/components/list/LegalPaperwork';
import ContactInformation from '@/components/list/ContactInformation';
import SubmissionMessage from '@/components/list/SubmissionMessage';

export default function ListPage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const [formData, setFormData] = useState<Partial<VehicleFormValues>>({
        listingIntent: 'FOR_SALE',
        category: '',
        subcategory: '',
        vehicleCompany: '',
        vehicleName: '',
        modelYear: 0,
        vehicleNumber: '',
        mileage: 0,
        fuelAverage: 0,
        engineSize: 0,
        horsepower: 0,
        registrationCity: '',
        color: '',
        seats: 0,
        doors: 0,
        fuelType: '',
        condition: '',
        transmission: '',
        driveType: '',
        assembly: '',
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
        sellingPrice: 0,
        isPriceNegotiable: false,
        vehicleDescription: '',
        media: {
            frontView: '',
            backView: '',
            leftSide: '',
            rightSide: '',
            interior: '',
            dashboard: '',
            engineBay: '',
            exteriorDetail: '',
        },
        legal: {
            cnicFront: '',
            cnicBack: '',
            registrationBook: '',
            verificationCertificate: '',
            transferDeed: '',
            insurancePapers: '',
        },
        sellerName: '',
        sellerPhone: '',
        sellerEmail: '',
        sellerLoc: '',
        socialHandle: '',
        availability: '',
        preferredContact: 'WhatsApp',
    });

    const updateFormData = (updates: Partial<VehicleFormValues>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const handleFinalSubmit = async () => {
        if (!user?.id) {
            toast.error("Please log in to submit your listing.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, ownerId: user.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to submit listing');
            }

            setIsSubmitted(true);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setStep(1);
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <ListHeroSection />
            <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto mt-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                    <div className="flex-1 w-full">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div
                                    key={`step-${step}`}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    {step === 1 && <DetailsForm formData={formData} updateFormData={updateFormData} onNext={() => setStep(2)} />}
                                    {step === 2 && <MediaGallery formData={formData} updateFormData={updateFormData} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
                                    {step === 3 && <LegalPaperwork formData={formData} updateFormData={updateFormData} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
                                    {step === 4 && <ContactInformation formData={formData} updateFormData={updateFormData} onBack={() => setStep(3)} onNext={handleFinalSubmit} />}
                                </motion.div>
                            ) : (
                                <SubmissionMessage
                                    onNewListing={resetForm}
                                    onViewInventory={() => router.push('/seller/inventory')}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}