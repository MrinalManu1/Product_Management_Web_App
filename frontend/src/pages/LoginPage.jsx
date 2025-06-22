import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon, MailIcon, LockIcon, LogInIcon, UserPlusIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    authFormData,
    setAuthFormData,
    login,
    register,
    loading,
    error,
  } = useAuthStore();

  const handleSubmit = (e) => {
    if (isLogin) {
      login(e);
    } else {
      register(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-base-content/60">
              {isLogin 
                ? "Sign in to your account" 
                : "Join our e-commerce platform"
              }
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-6">
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field - Only for Register */}
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Username</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                    <UserIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    value={authFormData.username}
                    onChange={(e) =>
                      setAuthFormData({ ...authFormData, username: e.target.value })
                    }
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <MailIcon className="size-5" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                  value={authFormData.email}
                  onChange={(e) =>
                    setAuthFormData({ ...authFormData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <LockIcon className="size-5" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                  value={authFormData.password}
                  onChange={(e) =>
                    setAuthFormData({ ...authFormData, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Password must be at least 6 characters
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogInIcon className="size-5 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlusIcon className="size-5 mr-2" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center mt-6">
            <p className="text-base-content/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="link link-primary ml-1 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link to="/" className="link link-secondary text-sm">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
