import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";

import avatar from "~/assets/avatar.jpg";

import { useAuthStore } from "~/store/useAuthStore";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectImg, setSelectImg] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Chỉ hỗ trợ tải lên định dạng JPG hoặc PNG.");
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("Ảnh tải lên không được vượt quá 5MB.");
      return;
    }

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        if (typeof reader.result === "string") {
          setSelectImg(reader.result);
          await updateProfile({ profilePic: reader.result });
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Lỗi tải ảnh lên:", error);
      alert("Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.");
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <h1 className="text-2xl font-semibold">Hồ sơ</h1>
          <p className="mt-2">Thông tin cá nhân của bạn</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectImg || authUser?.profilePic || avatar}
              alt="profile"
              className="size-32 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute botton-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Nhấn vào icon camera để upload hình ảnh"}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Họ và tên
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.fullName}
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Thông tin tài khoản</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Thành viên kể từ</span>
              <span>{authUser?.createdAt.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Trạng thái tài khoản</span>
              <span className="text-green-500">Hoạt động</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
