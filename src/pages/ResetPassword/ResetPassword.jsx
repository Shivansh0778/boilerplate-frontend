import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { verifyOtp, resetPassword } from "../../services/auth.service";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1: Verify OTP Handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email.trim() || !otp.trim()) {
      toast.error("Email and OTP are required");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp(email, otp.trim());
      toast.success(data.message || "OTP verified successfully!");
      setIsOtpVerified(true); // Unlock password fields
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Final Password Reset Handler
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(email, newPassword, confirmPassword);
      toast.success(data.message || "Password reset successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to reset password.");
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
                  {isOtpVerified ? "Set new password" : "Verify OTP"}
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {isOtpVerified
                    ? "Your OTP has been verified. Choose a secure new password."
                    : "Enter the 6-digit OTP sent to your email to proceed."}
                </p>
              </div>

              {/* STEP 1: Verify OTP Form */}
              {!isOtpVerified ? (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      6-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-mono tracking-widest text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 w-full rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 mt-2"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              ) : (
                /* STEP 2: Reset Password Form */
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm mb-4">
                    <CheckCircle2 size={18} />
                    <span>OTP verified successfully!</span>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-11 w-full rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 mt-2"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}

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
                    Two-Step Security
                  </span>
                </div>
                <p className="max-w-xl text-lg font-medium leading-7">
                  Verify your OTP securely before updating your account credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;