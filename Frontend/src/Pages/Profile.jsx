import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import profile from "../assets/defaultProfile.jpg";
import { Camera, User, Mail } from "lucide-react";




const Profile = () => {
  const { isUploadingProfile, authUser, updateProfile } = useAuthStore();
  const [selectImage, setSelectImage] = useState(null);
  // console.log(authUser)



  // useEffect(()=>{},[authUser])
// console.log("auth profile page checker",authUser)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectImage(base64Image);
      console.log("auth profile page checker",authUser)
      await updateProfile({profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-500 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectImage || authUser.profilePic || profile} 
                alt="profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUploadingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400  text-center">
              {isUploadingProfile
                ? "Uploading..."
                : "Click the Camera icon to update your Profile"}
            </p>
          </div>
          {/* user info */}
          <div className="space-y-6">
            {/* full name  */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-400 rounded-lg border-slate-500 border">
                {authUser && authUser?.fullName}
              </p>
            </div>
            {/* email address */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-400 rounded-lg border-slate-500 border">
                {authUser && authUser?.email}
              </p>
            </div>
          </div>
        </div>
        {/* account info */}
        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4 text-center">
            Account Information
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-zinc-700">
            <span>Member Since</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
