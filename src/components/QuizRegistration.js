"use client";
import { useState, useEffect } from 'react';
import { registerUser, isUserRegistered } from '../utils/quizRegistration';
import { updateUserDisplayName } from '../utils/quizStorage';

const QuizRegistration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    age: '',
    gender: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    const checkRegistration = async () => {
      const registered = await isUserRegistered();
      setIsRegistered(registered);
    };
    checkRegistration();
  }, []);
  
  // Check if already registered
  if (isRegistered) {
    return null; // Don't show registration if already registered
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register user
      const registration = await registerUser(formData);
      
      // Update display name in progress
      await updateUserDisplayName(formData.name);
      
      // Call completion callback
      if (onComplete) {
        onComplete(registration);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-orange-200">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
              Welcome to Daily Quiz!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Please register to start your quiz journey
            </p>
          </div>
          
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name - Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-orange-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            {/* Email - Optional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-orange-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            {/* Phone - Optional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-orange-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit phone number"
                maxLength="10"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            
            {/* City - Optional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City (Optional)
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Your city"
              />
            </div>
            
            {/* State - Optional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                State (Optional)
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Your state"
              />
            </div>
            
            {/* Age and Gender - Optional */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Age (Optional)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Gender (Optional)
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? 'Registering...' : 'Start Quiz 🚀'}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By registering, you agree to participate in the Daily Quiz. Only name is required.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizRegistration;

