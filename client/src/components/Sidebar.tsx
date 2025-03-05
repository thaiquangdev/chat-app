import { useEffect, useState } from "react";

import { User } from "lucide-react";

import avatar from "~/assets/avatar.jpg";

import { useChatStore } from "~/store/useChatStore";
import SidebarSkeleton from "./sekletons/SidebarSkeleton";
import { useAuthStore } from "~/store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUser = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Liên hệ</span>
        </div>
        {/* show online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <span className="text-sm">Hiển thị người dùng hoạt động</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} hoạt động)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-3">
        {filteredUser.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || avatar}
                alt=""
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>

            {/* user info - only visible on larger screen */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Trực tuyến" : "Ngoại tuyến"}
              </div>
            </div>
          </button>
        ))}

        {filteredUser.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            Không có người dùng hoạt động
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
