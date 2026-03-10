'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Calendar, Users, Globe, CreditCard, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';

interface BookingFormData {
  // Customer Information
  customerName: string;
  email: string;
  phone: string;
  nationality: string;
  passportNumber?: string;
  
  // Tour Information
  tourId?: string;
  tourName: string;
  tourDate: Date;
  duration: string;
  groupSize: number;
  
  // Participants
  participants: Array<{
    name: string;
    age: number;
    gender: string;
    specialRequirements?: string;
  }>;
  
  // Accommodation
  accommodationType: 'standard' | 'comfort' | 'luxury' | 'camping';
  
  // Special Requirements
  dietaryRequirements: string[];
  medicalConditions?: string;
  specialRequests?: string;
  
  // Payment
  totalAmount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'ETB';
  depositPaid: boolean;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal' | 'on_arrival';
  
  // Terms
  termsAccepted: boolean;
  newsletterSubscription: boolean;
}

interface TourOption {
  id: string;
  name: string;
  duration: string;
  price: number;
  maxParticipants: number;
  availableDates: Date[];
}

interface MultiPurposeBookingFormProps {
  tourId?: string;
  tourName?: string;
  initialTourDate?: Date;
  showTourSelector?: boolean;
  onSuccess?: (bookingNumber: string) => void;
  className?: string;
}

export default function MultiPurposeBookingForm({
  tourId,
  tourName,
  initialTourDate,
  showTourSelector = true,
  onSuccess,
  className = ''
}: MultiPurposeBookingFormProps) {
 const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableTours, setAvailableTours] = useState<TourOption[]>([]);
  const [toursLoading, setToursLoading] = useState(false);
  const [toursError, setToursError] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [bookingNumber, setBookingNumber] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    defaultValues: {
      tourName: tourName || '',
      tourDate: initialTourDate || new Date(),
      groupSize: 1,
      duration: '',
      participants: [{ name: '', age: 18, gender: 'male' }],
      accommodationType: 'standard',
      dietaryRequirements: [],
      currency: 'USD',
      depositPaid: false,
      paymentMethod: 'credit_card',
      termsAccepted: false,
      newsletterSubscription: true
    }
  });
  
  // Watch form values
  const selectedTour = watch('tourName');
  const groupSize = watch('groupSize');
  const accommodationType = watch('accommodationType');
  const tourDate = watch('tourDate');
    const modalRef = useRef<HTMLDialogElement>(null);

  // Fetch available tours
 useEffect(() => {
    if (showTourSelector) {
      fetchAvailableTours();
    }
  }, [showTourSelector]);
  
   const fetchAvailableTours = async () => {
    setToursLoading(true);
    setToursError(null);
    
    try {
      const response = await fetch('/api/tours/available');
      const data = await response.json();
      
      if (response.ok) {
        setAvailableTours(data.tours || []);
      } else {
        setToursError(data.error || 'Failed to load tours');
        setAvailableTours([]); // Set to empty array on error
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      setToursError('Network error. Please check your connection.');
      setAvailableTours([]); // Set to empty array on error
    } finally {
      setToursLoading(false);
    }
  };
  // Calculate price
  useEffect(() => {
    const tour = availableTours.find(t => t.name === selectedTour);
    if (tour) {
      let basePrice = tour.price * groupSize;
      
      // Accommodation upgrade
      const accommodationMultipliers = {
        standard: 1,
        comfort: 1.3,
        luxury: 1.8,
        camping: 0.8
      };
      
      basePrice *= accommodationMultipliers[accommodationType];
      
      // Group discount
      if (groupSize >= 4) basePrice *= 0.9; // 10% discount
      if (groupSize >= 8) basePrice *= 0.85; // 15% discount
      
      setCalculatedPrice(Math.round(basePrice));
      setValue('totalAmount', Math.round(basePrice));
      setValue('duration', tour.duration);
    }
  }, [selectedTour, groupSize, accommodationType, availableTours, setValue]);
  
  // Add/remove participants
  const addParticipant = () => {
    const currentParticipants = watch('participants');
    if (currentParticipants.length < (availableTours.find(t => t.name === selectedTour)?.maxParticipants || 20)) {
      setValue('participants', [...currentParticipants, { name: '', age: 18, gender: 'male' }]);
    }
  };
  
  const removeParticipant = (index: number) => {
    const currentParticipants = watch('participants');
    if (currentParticipants.length > 1) {
      setValue('participants', currentParticipants.filter((_, i) => i !== index));
    }
  };
  
 const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const newBookingNumber = result.bookingNumber;
        setBookingNumber(newBookingNumber);
        toast.success(`Booking successful! Your booking number: ${newBookingNumber}`);
        reset();
        setStep(1);
        onSuccess?.(newBookingNumber);
        
        // Show success modal using ref
        modalRef.current?.showModal();
      } else {
        toast.error(result.error || 'Booking failed. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };
  
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const nationalities = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Italy', 'Spain', 'Ethiopia', 'Kenya', 'South Africa', 'Other'
  ];
  
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}>
      {/* Form Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-3">
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
          BOOK YOUR ETHIOPIAN ADVENTURE
        </div>
        <h3 className="text-3xl font-heading font-bold text-gray-900 mb-3">
          Reserve Your Journey
        </h3>
        <p className="text-gray-600">
          Fill in your details to secure your spot on this unforgettable Ethiopian experience
        </p>
        
        {/* Progress Steps */}
        <div className="flex justify-center mt-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                stepNumber === step 
                  ? 'bg-primary-500 text-white border-2 border-primary-500' 
                  : stepNumber < step
                  ? 'bg-green-500 text-white border-2 border-green-500'
                  : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
              }`}>
                {stepNumber < step ? '✓' : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 ${stepNumber < step ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Tour Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <h4 className="font-semibold text-primary-700 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Tour Details
              </h4>
              <p className="text-sm text-primary-600">
                Select your preferred tour and date
              </p>
            </div>
            
            {showTourSelector && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Select Tour *</span>
                  
                  {toursLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-5 h-5 animate-spin text-primary-500 mr-2" />
                      <span className="text-gray-600">Loading tours...</span>
                    </div>
                  ) : toursError ? (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <span>{toursError}</span>
                      </div>
                      <button
                        onClick={fetchAvailableTours}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      {...register('tourName', { required: 'Tour selection is required' })}
                      disabled={availableTours.length === 0}
                    >
                      <option value="">{availableTours.length === 0 ? 'No tours available' : 'Choose a tour...'}</option>
                      {availableTours.map((tour) => (
                        <option key={tour.id} value={tour.name}>
                          {tour.name} - {tour.duration} - ${tour.price}/person
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {errors.tourName && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.tourName.message}
                    </p>
                  )}
                  
                  {!toursLoading && !toursError && availableTours.length === 0 && (
                    <p className="mt-2 text-yellow-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> No tours available at the moment. Please check back later.
                    </p>
                  )}
                </label>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Tour Date *</span>
                  <Controller
                    control={control}
                    name="tourDate"
                    rules={{ required: 'Tour date is required' }}
                    render={({ field }) => (
                      <div className="relative">
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          minDate={new Date()}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                          placeholderText="Select date"
                          dateFormat="MMMM d, yyyy"
                        />
                        <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  />
                  {errors.tourDate && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.tourDate.message}
                    </p>
                  )}
                </label>
              </div>
              
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Group Size *</span>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      {...register('groupSize', {
                        required: 'Group size is required',
                        min: { value: 1, message: 'Minimum 1 person' }
                      })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                    <Users className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.groupSize && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.groupSize.message}
                    </p>
                  )}
                </label>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Estimated Price</p>
                  <p className="text-sm text-green-600">Based on {groupSize} people</p>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  ${calculatedPrice} <span className="text-sm font-normal">{watch('currency')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <h4 className="font-semibold text-primary-700 mb-2">
                Personal Information
              </h4>
              <p className="text-sm text-primary-600">
                Please provide your contact details
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Full Name *</span>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="John Smith"
                    {...register('customerName', { required: 'Full name is required' })}
                  />
                  {errors.customerName && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.customerName.message}
                    </p>
                  )}
                </label>
              </div>
              
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Email Address *</span>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="john@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email.message}
                    </p>
                  )}
                </label>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Phone Number *</span>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="+251 912 345 678"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[\d\s-()]+$/,
                        message: 'Invalid phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone.message}
                    </p>
                  )}
                </label>
              </div>
              
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Nationality *</span>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      {...register('nationality', { required: 'Nationality is required' })}
                    >
                      <option value="">Select your nationality</option>
                      {nationalities.map((nation) => (
                        <option key={nation} value={nation}>
                          {nation}
                        </option>
                      ))}
                    </select>
                    <Globe className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.nationality && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.nationality.message}
                    </p>
                  )}
                </label>
              </div>
            </div>
            
            <div>
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Passport Number (Optional)</span>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="AB1234567"
                  {...register('passportNumber')}
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Required for international visitors. If you don't have it now, you can provide it later.
              </p>
            </div>
          </div>
        )}
        
        {/* Step 3: Accommodation & Preferences */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <h4 className="font-semibold text-primary-700 mb-2">
                Accommodation & Preferences
              </h4>
              <p className="text-sm text-primary-600">
                Customize your Ethiopian experience
              </p>
            </div>
            
            <div>
              <span className="text-gray-700 font-medium mb-4 block">Accommodation Type</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  { value: 'standard', label: 'Standard', desc: 'Comfortable hotels' },
                  { value: 'comfort', label: 'Comfort', desc: 'Upgraded hotels' },
                  { value: 'luxury', label: 'Luxury', desc: 'Premium lodges' },
                  { value: 'camping', label: 'Camping', desc: 'Nature immersion' }
                ]).map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer border rounded-xl p-4 transition-all ${
                      accommodationType === option.value
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value={option.value}
                      {...register('accommodationType')}
                    />
                    <div className="text-center">
                      <div className={`font-semibold mb-1 ${
                        accommodationType === option.value ? 'text-primary-700' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-gray-700 font-medium mb-4 block">Dietary Requirements</span>
              <div className="flex flex-wrap gap-3">
                {(['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'None']).map((requirement) => (
                  <label key={requirement} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-200"
                      value={requirement}
                      {...register('dietaryRequirements')}
                    />
                    <span className="text-gray-700">{requirement}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Medical Conditions (Optional)</span>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all h-32"
                  placeholder="Please inform us of any medical conditions, allergies, or mobility restrictions..."
                  {...register('medicalConditions')}
                />
              </label>
            </div>
            
            <div>
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Special Requests</span>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all h-32"
                  placeholder="Any special requests or additional information..."
                  {...register('specialRequests')}
                />
              </label>
            </div>
          </div>
        )}
        
        {/* Step 4: Payment & Confirmation */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <h4 className="font-semibold text-primary-700 mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h4>
              <p className="text-sm text-primary-600">
                Complete your booking with payment information
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Payment Policy</p>
                  <p className="text-sm text-yellow-700">
                    A 30% deposit is required to secure your booking. The remaining balance can be paid upon arrival in Ethiopia.
                    All major credit cards and bank transfers are accepted.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Currency</span>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    {...register('currency')}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="ETB">ETB - Ethiopian Birr</option>
                  </select>
                </label>
              </div>
              
              <div>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Payment Method</span>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    {...register('paymentMethod')}
                  >
                    <option value="credit_card">Credit/Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="on_arrival">Pay on Arrival</option>
                  </select>
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-200"
                {...register('depositPaid')}
              />
              <label className="text-gray-700">
                I will pay the 30% deposit now
              </label>
            </div>
            
            {/* Terms and Conditions */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-start gap-3 mb-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-200 mt-1"
                  {...register('termsAccepted', {
                    required: 'You must accept the terms and conditions'
                  })}
                />
                <label className="text-gray-700">
                  I have read and accept the{' '}
                  <a href="/terms" className="text-primary-500 hover:text-primary-600 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary-500 hover:text-primary-600 underline">
                    Privacy Policy
                  </a> *
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.termsAccepted.message}
                </p>
              )}
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-200 mt-1"
                  {...register('newsletterSubscription')}
                />
                <label className="text-gray-700">
                  Subscribe to our newsletter for Ethiopian travel tips and exclusive offers
                </label>
              </div>
            </div>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-4">Booking Summary</h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour:</span>
                  <span className="font-medium">{selectedTour || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {tourDate ? tourDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{groupSize} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accommodation:</span>
                  <span className="font-medium">{accommodationType.charAt(0).toUpperCase() + accommodationType.slice(1)}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-lg font-bold text-primary-600">
                    <span>Total Amount:</span>
                    <span>${calculatedPrice} {watch('currency')}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Deposit required: ${Math.round(calculatedPrice * 0.3)} {watch('currency')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-gradient-to-r from-green-500 to-primary-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Complete Booking
                </>
              )}
            </button>
          )}
        </div>
      </form>
      
      {/* Success Modal */}
 <dialog ref={modalRef} id="booking-success-modal" className="modal">
        <div className="modal-box bg-white p-8 rounded-2xl max-w-md">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your Ethiopian adventure is now secured. We've sent a confirmation email with all the details.
            </p>
            <div className="bg-primary-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-primary-600 font-medium">Booking Number:</p>
              <p className="text-xl font-bold text-primary-700">{bookingNumber || 'ETH-2024-12345'}</p>
              <p className="text-xs text-primary-500 mt-2">
                Save this number for future reference
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/my-bookings'}
                className="w-full py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => modalRef.current?.close()}
                className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}