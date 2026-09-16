import { useState } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      const data = await forgotPassword(email);
      toast.success(data.message || "OTP sent successfully to your email.");
      
      // Navigate to reset password page and pass email state
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] p-3 sm:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-[28px] bg-white shadow-sm sm:min-h-[calc(100vh-32px)]">
        <div className="relative flex w-full flex-col lg:w-[46%]">
          {/* Brand */}
          <div className="px-6 pt-6 sm:px-8 sm:pt-8 lg:px-10">
            <Link to="/" className="flex w-fit items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-xs font-bold text-white">
                V
              </div>
              <span className="text-sm font-semibold tracking-tight text-gray-900">
                VIS Boilerplate
              </span>
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-[390px]">
              <div className="mb-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                  <ShieldCheck size={19} className="text-gray-700" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                  Forgot password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your registered email address and we'll send you a 6-digit OTP to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Send Reset OTP"}
                </button>
              </form>

              <div className="mt-7 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={16} /> Back to sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 text-center sm:px-8 lg:px-10 lg:text-left">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} VIS Boilerplate
            </p>
          </div>
        </div>

        {/* Right Image Panel */}
        <div className="relative hidden flex-1 p-3 lg:block">
          <div
            className="relative h-full min-h-[650px] overflow-hidden rounded-[24px] bg-gray-200 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85')",
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="rounded-2xl border border-white/30 bg-black/25 p-5 text-white shadow-lg backdrop-blur-md">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Secure Recovery
                  </span>
                </div>
                <p className="max-w-xl text-lg font-medium leading-7">
                  Protected password recovery through secure, timed OTP tokens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;