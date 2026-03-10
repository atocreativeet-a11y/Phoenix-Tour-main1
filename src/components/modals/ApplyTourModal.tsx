'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  X, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Phone,
  Calendar,
  MapPin
} from 'lucide-react';
import axios from 'axios';

interface ApplyTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: {
    id?: string;
    name: string;
    price?: number;
    duration?: string;
    difficulty?: string;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export default function ApplyTourModal({ isOpen, onClose, tour }: ApplyTourModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Close modal when ESC is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      reset();
      setSubmitStatus('idle');
      setReferenceId('');
    }
  }, [isOpen, reset]);
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/send-email`,
      {
        ...data,
        tourName: tour?.name || 'Selected Tour',
        tourId: tour?.id,
      }
    );

    if (response.data.success) {
      setSubmitStatus('success');
      setReferenceId(response.data.referenceId);
      reset();
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-orange-500 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Apply for Tour</h2>
                <p className="text-primary-100 mt-2">Start your Ethiopian adventure</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tour Info */}
            {tour && (
              <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-bold text-lg">{tour.name}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {tour.duration && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                  )}
                  {tour.difficulty && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tour.difficulty === 'Easy' ? 'bg-green-500/30 text-green-800' :
                      tour.difficulty === 'Moderate' ? 'bg-yellow-500/30 text-yellow-800' :
                      'bg-red-500/30 text-red-800'
                    }`}>
                      {tour.difficulty}
                    </div>
                  )}
                  {tour.price && (
                    <div className="ml-auto font-bold text-lg">
                      ${tour.price}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for applying. We'll contact you shortly.
                </p>
                {referenceId && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                    <p className="text-xl font-mono font-bold text-primary-500">
                      {referenceId}
                    </p>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Failed</h3>
                <p className="text-gray-600 mb-4">
                  Please try again or contact us directly.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium mr-3"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Name Field - Updated */}
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <User className="w-4 h-4" />
        Full Name *
      </label>
      <input
        type="text"
        {...register('name', { 
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
          }
        })}
        placeholder="Defar G..."
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-gray-900 bg-white"
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.name.message}
        </p>
      )}
    </div>

    {/* Email Field - Updated */}
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Mail className="w-4 h-4" />
        Email Address *
      </label>
      <input
        type="email"
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        placeholder="you@phoenix.com"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-gray-900 bg-white"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Phone Field - Updated */}
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Phone className="w-4 h-4" />
        Phone Number *
      </label>
      <input
        type="tel"
        {...register('phone', { 
          required: 'Phone number is required',
          pattern: {
            value: /^[+]?[\d\s\-\(\)]+$/,
            message: 'Invalid phone number'
          }
        })}
        placeholder="+251 912 345 678"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-gray-900 bg-white"
      />
      {errors.phone && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.phone.message}
        </p>
      )}
    </div>

    {/* Privacy Notice - Updated text color for better visibility */}
    <div className="bg-blue-50 rounded-xl p-4">
      <p className="text-sm text-blue-800">
        By submitting this form, you agree to our Terms of Service and Privacy Policy. 
        We'll contact you within 24 hours to discuss your tour details.
      </p>
    </div>

    {/* Submit Button - unchanged */}
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          Apply for This Tour
        </>
      )}
    </button>

    {/* Alternative Contact - unchanged */}
    <div className="text-center">
      <p className="text-sm text-gray-500">
        Prefer to call?{' '}
        <a 
          href="tel:+251912345678" 
          className="text-primary-500 font-medium hover:text-primary-600"
        >
          +251 (912) 345-6789
        </a>
      </p>
    </div>
  </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}