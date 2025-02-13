import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import AdminPage from "./AdminPage";
import { AdminContext } from "./AdminLayout";

export default function LoginPage() {

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      navigate("/admin");
      toast.success("Login Success");
    } catch (error) {
      console.log(error.message, "<<<<<<");
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          return;
        case "Firebase: Error (auth/invalid-credential).":
          toast.error("Invalid Email/password");
          return;
        case "Firebase: Error (auth/email-already-in-use).":
          toast.error("email/password already in use");
          return;

        default:
          return;
      }
    }
  };
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // route protection
  useEffect(() => {
    if (!stateContext.loading) {
      if (stateContext.userLogin) {
        navigate("/admin");
      }
    }
  }, [navigate, stateContext]);

  if (stateContext.loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-[400px] p-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmitLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-600 font-medium">
                Password
              </label>
              <input
                onChange={handleChangeInput}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button Login */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <a
                className="text-blue-600 hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-600">
        <img
          src="https://cdn.antaranews.com/cache/1200x800/2023/02/11/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.xlarge.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
