import React, { useState, type ChangeEvent,type SyntheticEvent } from 'react';
import { Upload, ChevronRight, CheckCircle2 } from 'lucide-react';

interface JobApplicationData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  resume: File | null;
}

const JobApplyPage: React.FC = () => {
  const [formData, setFormData] = useState<JobApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    resume: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd use FormData to send the file to your API
    console.log('Formal Application Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900">Application Received</h2>
          <p className="text-slate-600 mt-2">Thank you for your interest. Our recruitment team will review your profile and contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Company Header */}
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-900">Easy Apply</h1>
          <p className="text-slate-500 mt-1">Centennial Talent Solution</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Personal Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid for Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="e.g. Rahul Sharma"
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="rahul@example.com"
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Current Location</label>
                  <input
                    required
                    type="text"
                    name="location"
                    placeholder="e.g. Visakhapatnam, AP"
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Resume / CV</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-8 transition-colors hover:bg-slate-50 group">
                  <input
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <div className="mt-4 flex text-sm text-slate-600 justify-center">
                      <span className="relative font-semibold text-blue-600 hover:text-blue-500">
                        {formData.resume ? formData.resume.name : 'Upload a file'}
                      </span>
                      {!formData.resume && <p className="pl-1">or drag and drop</p>}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  Submit Application <ChevronRight size={18} />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By clicking "Submit Application", you agree to our Terms of Service and Privacy Policy. We process your data in accordance with international data protection standards.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplyPage;