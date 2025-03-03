import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePartten from "~/components/AuthImagePartten";
import { useAuthStore } from "~/store/useAuthStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, signin } = useAuthStore();

  const validationForm = () => {
    if (!formData.email.trim())
      return toast.error("Email không được để trống ");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Email không đúng định dạng ");

    if (!formData.password) return toast.error("Mật khẩu không được để trống");

    if (formData.password.length < 6)
      return toast.error("Mật khẩu phải trên 6 ký tự");

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = validationForm();
    if (success) {
      signin(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Chào mừng trở lại</h1>
              <p className="text-base-content/60">
                Đăng nhập tài khoản của bạn
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="thaiquangqt@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mật khẩu</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Bạn chưa có tài khoản?
              <Link to="/register" className="link link-primary">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePartten
        title={"Tham gia cộng đồng của chúng tôi"}
        subTitle={
          "Kết nối với bạn bè, chia sẻ khoảnh khắc và giữ liên lạc với những người thân yêu của bạn"
        }
      />
    </div>
  );
};

export default Login;
