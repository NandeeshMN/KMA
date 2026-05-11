import React from 'react';
import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Edit3, 
  Camera,
  Calendar,
  Award
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { cn } from '../utils/cn';
import ProfileModal from '../components/ProfileModal';
import PhotoActionModal from '../components/PhotoActionModal';
import { useNotification } from '../utils/NotificationContext';

const ProfilePage = () => {
  const { profile, updateProfile } = useProfile();
  const { showToast } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Normalize role for comparison
  const role = profile?.role?.toLowerCase();

  const getSidebarContent = () => {
    switch (role) {
      case 'reader':
        return {
          title: 'Premium Status',
          desc: 'You are a verified premium member since October 2023.',
          icon: <Award size={32} />,
          iconBg: 'bg-zinc-50'
        };
      case 'admin':
        return {
          title: 'System Authority',
          desc: 'Level 10 Administrative access with global oversight permissions.',
          icon: <Shield size={32} className="text-blue-600" />,
          iconBg: 'bg-blue-50'
        };
      case 'author':
        return {
          title: 'Author Credibility',
          desc: 'Verified scholar with high-impact research contributions.',
          icon: <Award size={32} className="text-purple-600" />,
          iconBg: 'bg-purple-50'
        };
      case 'reviewer':
        return {
          title: 'Expert Status',
          desc: 'Elite peer-review panelist for Kerala Mathematical Association.',
          icon: <Shield size={32} className="text-emerald-600" />,
          iconBg: 'bg-emerald-50'
        };
      case 'developer':
        return {
          title: 'System Engineer',
          desc: 'Core architecture maintenance and infrastructure oversight.',
          icon: <Shield size={32} className="text-orange-600" />,
          iconBg: 'bg-orange-50'
        };
      default:
        return {
          title: 'Account Status',
          desc: 'Active member of the KMA digital portal ecosystem.',
          icon: <User size={32} className="text-zinc-400" />,
          iconBg: 'bg-zinc-50'
        };
    }
  };

  const sideContent = getSidebarContent();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="relative mb-8">
        {/* Cover Pattern / Black Card */}
        <div className="min-h-[320px] md:min-h-[280px] w-full bg-black rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          {/* Content inside the black card - 3 Column Layout */}
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12 z-20 h-full">
            
            {/* 1. Left Section: Profile Image (25%) */}
            <div className="w-full md:w-[25%] flex flex-col items-center justify-center shrink-0">
              <div className="relative group">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/10 border-4 border-white/20 overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                  {profile?.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} className="text-white/20" />
                  )}
                </div>
                <button 
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-200 transition-all active:scale-90 border-4 border-black z-20"
                  title="Change Profile Photo"
                >
                  <Camera size={18} />
                </button>
              </div>
            </div>

            {/* 2. Center Section: Details (40%) */}
            <div className="w-full md:w-[40%] text-center md:text-left flex flex-col justify-center space-y-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter font-['Outfit'] line-clamp-1">
                  {profile?.name || (role === 'reader' ? "Premium Reader" : "Portal User")}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
                    <Shield size={12} /> {profile?.role || "user"}
                  </span>
                  <span className="text-zinc-400 text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar size={14} /> Joined Oct 2023
                  </span>
                </div>
                <p className="mt-4 text-zinc-400 text-xs font-medium italic opacity-70">
                  Verified member of the Kerala Mathematical Association
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2 mx-auto md:mx-0"
                >
                  <Edit3 size={16} /> Edit Profile Details
                </button>
              </div>
            </div>

            {/* 3. Right Section: Bio Card (35%) */}
            <div className="w-full md:w-[35%] flex flex-col justify-center h-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-lg h-full flex flex-col group hover:bg-white/10 transition-all duration-300 border-l-4 border-l-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-4 bg-blue-500/50 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-60">About Me</h3>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-4 italic">
                    {profile?.bio || "Tell the association a little bit about your academic journey or professional background..."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-black flex items-center gap-2 font-['Outfit']">
              <User size={20} className="text-zinc-400" /> Account Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Full Name</p>
                <p className="text-black font-medium">{profile?.name || "N/A"}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Address</p>
                <p className="text-black font-medium">{profile?.email || "N/A"}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Phone Number</p>
                <p className="text-black font-medium">{profile?.phone || <span className="text-zinc-300 italic">Not provided</span>}</p>
              </div>
              {role === 'reader' && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Membership ID</p>
                  <p className="text-black font-bold tracking-tight">KMA-MEM-402</p>
                </div>
              )}
            </div>
          </div>

          {/* Membership Status (Reader Only) */}
          {role === 'reader' && (
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-black flex items-center gap-2 font-['Outfit']">
                <Award size={20} className="text-emerald-500" /> Membership Tier
              </h2>
              
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 font-bold text-lg tracking-tight">Lifetime Access</p>
                  <p className="text-xs text-zinc-500 mt-1">Full access to all scholarly publications and archives.</p>
                </div>
                <Shield size={32} className="text-emerald-500/20" />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 text-center space-y-4 shadow-sm">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-zinc-100 shadow-inner", sideContent.iconBg)}>
              {sideContent.icon}
            </div>
            <div>
              <h3 className="text-black font-bold">{sideContent.title}</h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{sideContent.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <ProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onSave={updateProfile}
      />

      <PhotoActionModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentImage={profile?.profileImage || null}
        onUpdate={async (newImage) => {
          if (profile) {
            const result = await updateProfile({ ...profile, profileImage: newImage });
            if (result.success) {
              showToast(newImage ? 'Profile photo updated' : 'Photo removed successfully', 'success');
            } else {
              showToast(result.error || 'Failed to update photo', 'error');
            }
          }
        }}
      />
    </div>
  );
};

export default ProfilePage;
