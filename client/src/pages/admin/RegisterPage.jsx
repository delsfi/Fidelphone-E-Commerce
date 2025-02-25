import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../Auth";

export default function RegisterPage() {
  const [input, setInput] = useState({ email: "", password: "", firstName: "", lastName: "" });
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const navigate = useNavigate();
  const stateContext = useContext(AuthContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
      navigate("/admin/login");
      toast.success("Register Success");
      console.log(userCredential.user.uid, "<<<<<");
      if (userCredential.user.uid) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          role : "customer"
        });
      }
      
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          toast.error("Password should be at least 6 characters");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          toast.error("Email already in use");
          break;
        default:
          console.log(error.message);
      }
    } finally {
      setLoading(false);
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Content */}
      <div
        className={`relative z-10 w-[450px] p-8 rounded-2xl shadow-2xl backdrop-blur-md ${
          stateContext.theme ? "bg-white" : "bg-gray-800/70"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center ${
            stateContext.theme ? "text-gray-800" : "text-white"
          }`}
        >
          Create an Account
        </h2>
        <p
          className={`text-sm text-center mb-6 ${
            stateContext.theme ? "text-gray-500" : "text-gray-300"
          }`}
        >
          Sign up to get started
        </p>

        <form onSubmit={handleSubmitRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              className={`block font-medium ${
                stateContext.theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              First Name
            </label>
            <input
              onChange={handleChangeInput}
              name="firstName"
              placeholder="Enter your first name"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                stateContext.theme
                  ? "bg-gray-50 border border-gray-300 text-gray-900"
                  : "bg-gray-700 border border-gray-600 text-white"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-medium ${
                stateContext.theme ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Last Name
            </label>
            <input
              onChange={handleChangeInput}
              name="lastName"
              placeholder="Enter your last name"
              className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                stateContext.theme
                  ? "bg-gray-50 border border-gray-300 text-gray-900"
                  : "bg-gray-700 border border-gray-600 text-white"
              }`}
            />
          </div>
          </div>
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
            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition flex justify-center items-center cursor-pointer"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
          </button>

          {/* Login Redirect */}
          <p
            className={`text-sm text-center ${
              stateContext.theme ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Already have an account?{" "}
            <span
              className="text-slate-500 hover:underline cursor-pointer"
              onClick={() => navigate("/admin/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
