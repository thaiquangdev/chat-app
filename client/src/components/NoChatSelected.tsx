import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-8">
        {/* Icon display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-2xl font-bold">Chào mừng tới message</div>
        <p className="text-base-content/60">
          Chọn một cuộc trò chuyện từ thanh bên để bắt đầu trò chuyện
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
