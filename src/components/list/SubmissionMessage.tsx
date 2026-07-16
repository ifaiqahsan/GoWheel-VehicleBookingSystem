"use client";

import { motion } from 'framer-motion';

interface Props {
    onNewListing: () => void;
    onViewInventory: () => void;
}

export default function SubmissionMessage({ onNewListing, onViewInventory }: Props) {
    const buttonTransition = { type: "spring" as const, stiffness: 400, damping: 17 };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-xl shadow-gray-200/50 flex flex-col items-center"
        >
            {/* Header */}
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                SUBMISSION <span className="text-yellow-500">SUCCESSFUL</span>
            </h2>

            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full border-4 border-yellow-100 flex items-center justify-center mb-6 relative"
            >
                <div className="absolute inset-0 bg-yellow-50 rounded-full animate-pulse" />
                <svg className="w-10 h-10 text-yellow-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </motion.div>

            {/* Description */}
            <p className="text-gray-500 text-center text-sm max-w-xs mb-8 leading-relaxed">
                Your vehicle listing has been captured. Our team will review your submission and publish it shortly.
            </p>

            {/* Status Timeline */}
            <div className="flex justify-between items-center w-full max-w-xs mb-8">
                <div className="flex flex-col items-center gap-1.5">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">RECEIVED</span>
                </div>
                <div className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-2" />
                <div className="flex flex-col items-center gap-1.5">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">REVIEW</span>
                </div>
                <div className="flex-1 h-[1px] border-t border-dashed border-gray-300 mx-2" />
                <div className="flex flex-col items-center gap-1.5">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19a1 1 0 001 1h2a1 1 0 001-1V5.882M11 5.882a1 1 0 011-1h2a1 1 0 011 1M11 5.882L4 3.012M11 5.882L18 3.012" /></svg>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">PUBLISHED</span>
                </div>
            </div>

            {/* Actions Section - Adjusted width to fill the card */}
            <div className="flex gap-4 pt-6 border-t border-gray-100 w-full">
                <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={buttonTransition}
                    onClick={onNewListing}
                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-black uppercase tracking-widest whitespace-nowrap hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                >
                    List Another Vehicle
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={buttonTransition}
                    onClick={onViewInventory}
                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-black uppercase tracking-widest whitespace-nowrap hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                >
                    View your Inventory
                </motion.button>
            </div>
        </motion.div>
    );
}