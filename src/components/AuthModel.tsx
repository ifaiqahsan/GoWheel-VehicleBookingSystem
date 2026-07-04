"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type AuthModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AuthModel({ isOpen, onClose }: AuthModelProps) {
  const { setUser, setAuthOpen } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      if (isLogin) {
        console.log("Logging in with username:", formData.username, formData.password);
        
        const response = await fetch('/api/auth/login', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: String(formData.username).trim(), 
            password: String(formData.password)
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Invalid credentials.");
          setIsLoading(false);
          return;
        }

        setUser({
          name: data.user.name,
          email: data.user.email
        });
        
        setAuthOpen(false);
      } else if (!isVerifying) {
        const validationError = validateForm();
        if (validationError) { 
          setError(validationError); 
          setIsLoading(false);
          return; 
        }

        console.log("Sending verification code to:", formData.email);
        
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setIsLoading(false);
          return;
        }
        
        setIsVerifying(true);
        setVerificationCode(''); 
      } else {
        console.log("Verifying code:", verificationCode);
        
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            code: verificationCode
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Invalid verification code.");
          setIsLoading(false);
          return;
        }

        console.log("Account created successfully!");
        setIsVerifying(false);
        setIsLogin(true); 
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setVerificationCode('');
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose} 
    >
      <div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-black uppercase">
          {isVerifying ? 'Verify Email' : (isLogin ? 'Login' : 'Sign Up')}
        </h2>
        
        {error && <p className="text-red-500 text-sm mb-4 font-bold">{error}</p>}

        <div className="space-y-4 mb-6">
          {isVerifying ? (
            <input 
              type="text" 
              value={verificationCode} 
              placeholder="Enter 6-digit code" 
              onChange={(e) => setVerificationCode(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl tracking-widest" 
              maxLength={6} 
              autoComplete="one-time-code" 
            />
          ) : (
            <>
              <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg text-black" autoComplete="off" />
              {!isLogin && <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg text-black" autoComplete="off" />}
              <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg text-black" autoComplete="new-password" />
              {!isLogin && <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg text-black" autoComplete="new-password" />}
            </>
          )}
        </div>

        <button 
          onClick={handleAuth} 
          disabled={isLoading}
          className={`w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 font-black uppercase rounded-full mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : (isVerifying ? 'Verify & Create' : (isLogin ? 'Sign In' : 'Send Verification Code'))}
        </button>

        {!isVerifying && (
          <button onClick={() => {setIsLogin(!isLogin); setError(null);}} className="text-yellow-600 font-bold hover:underline">
            {isLogin ? "Don't have an account? Sign up." : 'Have an account? Login'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthModel;