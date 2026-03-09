import React, { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import type { LoginFormData, FormErrors } from '../types/loginTypes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {loginApi} from '../api/applicantApi'
import userStore from '../store/userStore';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const setUser = userStore((state) => state.setUser);


  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required📧';
    if (formData.password.length < 6) newErrors.password = 'Security check: 6+ chars needed! 🔒';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const res = await loginApi({
      email: formData.email,
      password: formData.password
    });

    alert(res.message)
    if(res.success){
      setUser(res.user)
      console.log(res.user)
      navigate('/job-apply')
    }else {
      alert(res.message)
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-slate-100 p-10">
        
        {/* Logo/Brand Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={28} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight"> Login</h1>
          <p className="text-slate-500 mt-2 font-medium">Enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@mail.com"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-200"
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-500 font-bold ml-2 animate-bounce">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 placeholder-slate-400 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-500 font-bold ml-2">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transform active:scale-[0.98] transition-all disabled:bg-blue-300"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium">
            New to the system?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline underline-offset-4 decoration-2">
               Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;