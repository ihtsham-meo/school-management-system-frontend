import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { loginApi } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, GraduationCap, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");
      dispatch(loginStart());
      const response = await loginApi(data);
      const { user, role, token } = response.data;
      dispatch(loginSuccess({ user, role, token }));
      navigate(`/${role}/dashboard`);
    } catch (error) {
      dispatch(loginFailure());
      setServerError(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">

      {/* LEFT SIDE */}
    <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">

        {/* Animated background blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-blue-600 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500 opacity-10 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative justify-center flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
            <GraduationCap size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-extrabold gap- text-white leading-tight mb-3">
            School<br />
            <span className="text-white/40">Management</span>
          </h1>
          <p className="text-white/30 text-base max-w-xs mx-auto leading-relaxed">
            Manage students, staff, classes, attendance, fees and more — all in one place.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            {[["500+", "Students"], ["50+", "Teachers"], ["30+", "Classes"]].map(([num, label], i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-white">{num}</p>
                <p className="text-xs text-white/30 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-gray-900 flex flex-col p-8 backdrop-blur-2xl border border-white/10 rounded-3xl">

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-1.5">Welcome Back</h2>
              <p className="text-white/30 text-sm">Sign in to continue to your dashboard</p>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="flex items-center gap-2 bg-red-950 border border-red-950 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                {serverError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {/* Email */}
              <div>
                <label className="block text-[13px] font-medium text-white/50 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type="email"
                    placeholder="you@school.com"
                    autoComplete="email"
                    {...register("email")}
                    className={`w-full bg-white/[0.04] border ${errors.email ? "border-red-500/40" : "border-white/[0.08]"} rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-medium text-white/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`w-full bg-white/[0.04] border ${errors.password ? "border-red-500/40" : "border-white/[0.08]"} rounded-xl pl-10 pr-11 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password
              <div className="flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[13px] text-white/35 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Forgot password?
                </button>
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-white/10 hover:bg-white/[0.14] disabled:opacity-50 disabled:cursor-not-allowed border border-white/[0.12] rounded-xl text-white text-[15px] font-semibold backdrop-blur-xl transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-white/15 text-xs mt-8">
              © 2025 School Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;