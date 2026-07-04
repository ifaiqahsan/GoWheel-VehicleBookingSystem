"use client";

import React, { useState } from 'react';

type AuthModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AuthModel({ isOpen, onClose }: AuthModelProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [verificationCode, setVerificationCode] = useState('');

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) return "Username must be at least 3 characters.";
    if (!formData.email.includes('@')) return "Please enter a valid email.";
    if (formData.password.length < 6) return "Password must be at least 6 letters.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleAuth = async () => {
    setError(null);

    if (isLogin) {
      console.log("Logging in:", formData.username, formData.password);
    } else if (!isVerifying) {
      const validationError = validateForm();
      if (validationError) { setError(validationError); return; }

      const usernameExists = false; 
      if (usernameExists) { setError("Username already taken."); return; }

      console.log("Sending code to:", formData.email);
      setIsVerifying(true);
    } else {
      if (verificationCode === "123456") {
        console.log("Account created for:", formData.username);
        setIsVerifying(false);
        setIsLogin(true);
      } else {
        setError("Invalid verification code.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-black uppercase">
          {isVerifying ? 'Verify Email' : (isLogin ? 'Login' : 'Sign Up')}
        </h2>
        
        {error && <p className="text-red-500 text-sm mb-4 font-bold">{error}</p>}

        <div className="space-y-4 mb-6">
          {isVerifying ? (
            <input type="text" placeholder="Enter 6-digit code" onChange={(e) => setVerificationCode(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl tracking-widest" maxLength={6} />
          ) : (
            <>
              <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
              {!isLogin && <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />}
              <input type="password" placeholder="Password (min 6 letters)" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
              {!isLogin && <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />}
            </>
          )}
        </div>

        <button onClick={handleAuth} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 font-black uppercase rounded-full mb-4">
          {isVerifying ? 'Verify & Create' : (isLogin ? 'Sign In' : 'Send Verification Code')}
        </button>

        {!isVerifying && (
          <button onClick={() => {setIsLogin(!isLogin); setError(null);}} className="text-yellow-600 font-bold hover:underline">
            {isLogin ? 'No account? Sign Up' : 'Have an account? Login'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthModel;