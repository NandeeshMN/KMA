import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Edit3, 
  Save, 
  Loader2,
  FileText
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useNotification } from '../utils/NotificationContext';
import type { UserProfile } from '../hooks/useProfile';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSave: (newData: UserProfile) => Promise<{ success: boolean; error?: string }>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
  const { showToast } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile, isOpen]);

  if (!isOpen || !formData) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Name and Email are required', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSaving(true);
    const result = await onSave(formData);
    setIsSaving(false);

    if (result.success) {
      showToast('Profile details updated successfully', 'success');
      setIsEditing(false);
    } else {
      showToast(result.error || 'Failed to update profile', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={cn(
        "relative w-full max-w-md bg-zinc-900 text-white shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/10",
        "h-full sm:h-auto sm:rounded-[2.5rem]"
      )}>
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent z-0" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 p-6 pt-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20 shadow-lg">
            <User size={32} />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Edit Profile Details</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full border border-white/5 mb-8">
            <Shield size={12} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">{formData.role}</span>
          </div>

          {/* Form / Details Section */}
          <form onSubmit={handleSave} className="w-full space-y-4">
            <div className="grid gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} /> Full Name
                </label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium bg-white/5 border border-white/5 rounded-xl px-4 py-3">{formData.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </label>
                {isEditing ? (
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium bg-white/5 border border-white/5 rounded-xl px-4 py-3">{formData.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={12} /> Phone Number
                </label>
                {isEditing ? (
                  <input 
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                ) : (
                  <p className="text-sm font-medium bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                    {formData.phone || <span className="opacity-40 italic">No phone number provided</span>}
                  </p>
                )}
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={12} /> Bio / About
                  </label>
                  {isEditing && (
                    <span className={cn(
                      "text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-md",
                      (formData.bio?.length || 0) >= 150 ? "bg-rose-500/10 text-rose-500" : "bg-zinc-800 text-zinc-500"
                    )}>
                      {formData.bio?.length || 0} / 150
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <textarea 
                    maxLength={150}
                    rows={3}
                    placeholder="Tell people about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none scrollbar-hide"
                  />
                ) : (
                  <p className="text-sm font-medium bg-white/5 border border-white/5 rounded-xl px-4 py-3 min-h-[80px] leading-relaxed text-zinc-300">
                    {formData.bio || <span className="opacity-40 italic">Tell people about yourself...</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              {isEditing ? (
                <>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile);
                    }}
                    className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Details
                  </button>
                </>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <Edit3 size={16} />
                  Start Editing
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
