import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginUser } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const data = await loginUser(email, password);

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        }),
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }

      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error(error.message);
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

          {/* Login Content */}
          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-[390px]">
              {/* Heading */}
              <div className="mb-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                  <ShieldCheck size={19} className="text-gray-700" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Sign in to continue to your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
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

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-gray-500 transition hover:text-gray-900"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">or</span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Signup */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gray-900 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 text-center sm:px-8 lg:px-10 lg:text-left">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} VIS Boilerplate
            </p>
          </div>
        </div>

        <div className="relative hidden flex-1 p-3 lg:block">
          {/* Image Panel */}
          <div
            className="relative h-full min-h-[650px] overflow-hidden rounded-[24px] bg-gray-200 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85')",
            }}
          >
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Bottom Glass Card */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="rounded-2xl border border-white/30 bg-black/25 p-5 text-white shadow-lg backdrop-blur-md">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white" />

                  <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    VIS Authentication
                  </span>
                </div>

                <p className="max-w-xl text-lg font-medium leading-7">
                  A secure foundation for building modern MERN applications.
                </p>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  Authentication, role-based access and user management — ready
                  for your next project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
