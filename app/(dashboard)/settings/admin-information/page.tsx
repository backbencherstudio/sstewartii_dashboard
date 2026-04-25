"use client";

import React, { useState, useRef } from 'react';
import { Upload, Trash2, Pencil } from 'lucide-react';

export default function AdminInformationPage() {
  // --- State Management ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Sedric Stewart",
    email: "admin.atliss@gmail.com",
    accountType: "ADMINISTRATOR"
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Logic for API integration would go here
    console.log("Saving data:", { ...formData, image });
    setIsEditing(false);
  };

  return (
    <div className='space-y-6 max-w-7xl'>
      {/* Header */}
      <div className='flex justify-between items-center py-4 border-b border-[#E6E6E6]'>
        <h3 className='text-[#2A3542] font-lora text-2xl font-bold'>Admin Information</h3>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className='flex items-center gap-2 text-[#E28611] font-medium'
          >
            <Pencil size={18} /> Edit
          </button>
        ) : (
          <div className='flex gap-2'>
            <button onClick={() => setIsEditing(false)} className='h-14 px-6 py-4 rounded-2xl border border-[#70747C] text-[#585D63] font-medium'>
              Cancel
            </button>
            <button onClick={handleSave} className='h-14 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FFBB1C] to-[#E28611] text-white font-semibold'>
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Left Side: Avatar Card */}
        <div className='w-full md:w-1/3 border border-[#DFE1E7] bg-[#F8FAFB] rounded-2xl p-6 flex flex-col items-center text-center'>
          <img 
            src={imagePreview || "/path-to-your-image.jpg"} 
            alt="Sedric Stewart" 
            className='w-32 h-32 rounded-lg object-cover mb-4' 
          />
          <h4 className='text-[#697586] font-inter text-base font-normal'>{formData.name}</h4>
          <p className='text-[#313337] font-lora text-base font-bold mb-6'>{formData.accountType}</p>
          
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FFBB1C] to-[#E28611] text-white p-2.5 rounded-lg mb-2'
          >
            <Upload size={16} /> Upload Photo
          </button>
          <button 
            onClick={() => { setImage(null); setImagePreview(null); }}
            className='w-full border border-red-200 text-red-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2'
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Right Side: Form Fields */}
        <div className='flex-1 space-y-6'>
          <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} />
          <InputField label="Account Type" name="accountType" value={formData.accountType} onChange={handleInputChange} disabled={true} />
        </div>
      </div>

      <p className='text-sm text-gray-400'>Last updated: Oct 24, 2023</p>
    </div>
  );
}

function InputField({ label, name, value, onChange, disabled }: any) {
  return (
    <div>
      <label className="mb-2 block text-[#697586] font-bold font-lora">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-[54px] w-full rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#161618] outline-none focus:border-[#F59E0B] disabled:cursor-not-allowed"
      />
    </div>
  );
}