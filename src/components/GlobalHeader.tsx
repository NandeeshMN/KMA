import React, { useState } from 'react';
import { Menu, Camera, Edit3, X, User } from 'lucide-react';
import logo from '../assets/logo.png';
import ProfileModal from './ProfileModal';
import PhotoActionModal from './PhotoActionModal';
import { useProfile } from '../hooks/useProfile';
import { useNotification } from '../utils/NotificationContext';

interface GlobalHeaderProps {
  onMenuClick: () => void;
  userEmail?: string;
  userName?: string;
  userInitials?: string;
  rightActions?: React.ReactNode;
  showProfile?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ 
  onMenuClick, 
  userName, 
  userInitials, 
  rightActions,
  showProfile = true 
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { profile, updateProfile } = useProfile();
  const { showToast } = useNotification();

  const displayName = profile?.name || userName || 'User';
  const displayInitials = profile?.name 
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : userInitials || 'U';

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 px-6 flex items-center justify-between border-b border-zinc-200 bg-white/80 backdrop-blur-md z-20 shadow-sm overflow-hidden">
        {/* 1. Logo (Left) */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-black hover:text-zinc-600 transition-colors p-2 -ml-2"
          >
            <Menu size={20} />
          </button>
          <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm flex items-center justify-center overflow-hidden border border-zinc-100">
            <img src={logo} alt="KMA Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* 2. Title */}
        <div className="flex-1 px-4 relative z-10 overflow-hidden">
          <h2 className="text-lg lg:text-xl font-bold tracking-tight text-black font-['Outfit'] truncate">
            Kerala Mathematical Association
          </h2>
        </div>

        {/* 3. Right Actions */}
        <div className="flex items-center gap-4 relative z-10 shrink-0">
          <div className="hidden sm:block">
            {rightActions}
          </div>
          
          {/* User Profile Avatar + Dropdown */}
          {showProfile && (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-all group"
              >
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold text-black leading-none">{displayName}</p>
                  <p className="text-[7px] text-zinc-400 font-bold tracking-wider mt-0.5 uppercase">
                    {profile?.role || 'PORTAL'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px] shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                  {profile?.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    displayInitials
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-[30]"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 top-12 w-52 bg-white border border-zinc-100 rounded-2xl shadow-2xl py-2 z-[40] animate-in slide-in-from-top-2 duration-200">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-zinc-100 mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px] overflow-hidden shrink-0">
                          {profile?.profileImage ? (
                            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : displayInitials}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-black truncate">{displayName}</p>
                          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{profile?.role}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => { setIsPhotoOpen(true); setShowDropdown(false); }}
                      className="w-full px-4 py-3 text-left text-sm font-bold text-zinc-600 hover:text-black hover:bg-zinc-50 flex items-center gap-3 transition-colors"
                    >
                      <Camera size={16} className="text-zinc-400" />
                      Change Photo
                    </button>

                    <button
                      onClick={() => { setIsProfileOpen(true); setShowDropdown(false); }}
                      className="w-full px-4 py-3 text-left text-sm font-bold text-zinc-600 hover:text-black hover:bg-zinc-50 flex items-center gap-3 transition-colors"
                    >
                      <Edit3 size={16} className="text-zinc-400" />
                      Edit Details
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Edit Details Modal */}
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSave={updateProfile}
      />

      {/* Change Photo Modal */}
      <PhotoActionModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
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
    </>
  );
};

export default GlobalHeader;
