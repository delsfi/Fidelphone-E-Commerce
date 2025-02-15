import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { AdminContext } from "./AdminLayout";
import { EyeClosed, Eye, LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      navigate("/admin");
      toast.success("Login Success");
    } catch (error) {
      console.log(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          break;
        case "Firebase: Error (auth/invalid-credential).":
          toast.error("Invalid Email/password");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          toast.error("Email already in use");
          break;
        default:
          toast.error("Login Failed");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  // Route protection
  useEffect(() => {
    if (!stateContext.loading && stateContext.userLogin) {
      navigate("/admin");
    }
  }, [navigate, stateContext]);

  if (stateContext.loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
        <LoaderCircle className="animate-spin text-red-600 dark:text-white" size={40} />
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${stateContext.theme ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
      <div className="w-full flex items-center justify-center">
        <div className={`w-[400px] p-8 shadow-lg rounded-lg ${stateContext.theme ? "bg-white" : "bg-gray-800"}`}>
          <h2 className="text-2xl font-bold text-center">
            Login
          </h2>
          <p className="text-sm text-center mb-6">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmitLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  stateContext.theme ? "border-gray-300" : "border-gray-600 bg-gray-700 text-white"
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="pb-5">
              <label className="block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handleChangeInput}
                  name="password"
                  id="password"
                  type={isShowPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    stateContext.theme ? "border-gray-300" : "border-gray-600 bg-gray-700 text-white"
                  }`}
                />
                <div
                  onClick={() => setIsShowPass(!isShowPass)}
                  role="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {isShowPass ? <EyeClosed /> : <Eye />}
                </div>
              </div>
            </div>

            {/* Button Login */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex justify-center items-center"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <p>Sign In</p>}
            </button>

            {/* Register Link */}
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <a
                className="text-red-600 hover:underline cursor-pointer"
                onClick={() => navigate("/admin/register")}
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
