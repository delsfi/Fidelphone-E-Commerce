import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { EyeClosed, Eye, LoaderCircle } from "lucide-react";
import { auth, db, provider } from "../../config/firebase";
import { AuthContext } from "../Auth";
import { doc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const navigate = useNavigate();
  const stateContext = useContext(AuthContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
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
    } finally {
      setLoading(false);
    }
  };

  const HandleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.uid) {
        await setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          firstName: result.user.displayName.split(" ") [0],
          lastName: result.user.displayName.split(" ") [1],
          role : "customer"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!stateContext.loading && stateContext.userLogin) {
      navigate("/admin");
    }
  }, [navigate, stateContext]);

  if (stateContext.loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-900">
        <LoaderCircle className="animate-spin text-white" size={40} />
      </div>
    );
  }

  const overlayColor = stateContext.theme ? "bg-white/50" : "bg-black/60";

  return (
    <div
      className={`relative flex h-screen justify-center items-center bg-cover bg-center ${
        stateContext.theme ? "bg-gray-100" : "bg-gray-900 text-white"
      }`}
      style={{
        backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/yFVTwgKyQ3uuEf4DRx6imK-1200-80.jpg')`,
        backgroundSize: "fit",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Content */}
      <div
        className={`relative z-10 w-[400px] p-8 rounded-2xl shadow-2xl backdrop-blur-md ${
          stateContext.theme ? "bg-white" : "bg-gray-800/70"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center ${
            stateContext.theme ? "text-gray-800" : "text-white"
          }`}
        >
          Welcome
        </h2>
        <p
          className={`text-sm text-center mb-6 ${
            stateContext.theme ? "text-gray-500" : "text-gray-300"
          }`}
        >
          Sign in to your account
        </p>

        <form onSubmit={handleSubmitLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className={`block font-medium ${
                stateContext.theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              onChange={handleChangeInput}
              name="email"
              placeholder="Enter your email"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                stateContext.theme
                  ? "bg-gray-50 border border-gray-300 text-gray-900"
                  : "bg-gray-700 border border-gray-600 text-white"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block font-medium ${
                stateContext.theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChangeInput}
                name="password"
                type={isShowPass ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  stateContext.theme
                    ? "bg-gray-50 border border-gray-300 text-gray-900"
                    : "bg-gray-700 border border-gray-600 text-white"
                }`}
              />
              <div
                onClick={() => setIsShowPass(!isShowPass)}
                role="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {isShowPass ? (
                  <EyeClosed className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-500 transition flex justify-center items-center cursor-pointer"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
          </button>
        </form>
        {/* Button */}
        <div className="flex items-center w-full pt-3">
          <button
            onClick={HandleGoogleLogin}
            className="w-full bg-gray-100 text-slate-800 py-3 px-2 rounded-lg hover:bg-gray-200 transition flex justify-center items-center gap-3 cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="google"
              className="w-6 h-6"
            />
            Sign In With Google
          </button>
        </div>
        {/* Register */}
        <p
          className={`text-sm text-center ${
            stateContext.theme ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Don't have an account?{" "}
          <span
            className="text-slate-500 hover:underline cursor-pointer"
            onClick={() => navigate("/admin/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
