import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminLayout";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";

export default function RegisterPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      navigate("/admin/login");
      toast.success("Register Success");
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

  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // route protection
  useEffect(() => {
    if (!stateContext.loading && stateContext.userLogin) {
      navigate("/admin");
    }
  }, [navigate, stateContext]);

  if (stateContext.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex h-screen ${
        stateContext.theme ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <div className="w-full flex items-center justify-center">
        <div
          className={`w-[400px] p-8 shadow-lg rounded-lg ${
            stateContext.theme ? "bg-white" : "bg-gray-800"
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center ${
              stateContext.theme ? "text-gray-700" : "text-white"
            }`}
          >
            Register
          </h2>
          <p
            className={`text-sm text-center mb-6 ${
              stateContext.theme ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Register to continue
          </p>

          <form onSubmit={handleSubmitRegister} className="space-y-4">
            <div>
              <label
                className={`block font-medium ${
                  stateContext.theme ? "text-gray-600" : "text-gray-300"
                }`}
              >
                Email
              </label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  stateContext.theme
                    ? "border-gray-300 bg-white text-black"
                    : "border-gray-600 bg-gray-700 text-white"
                }`}
              />
            </div>

            <div className="pb-5">
              <label
                className={`block font-medium ${
                  stateContext.theme ? "text-gray-600" : "text-gray-300"
                }`}
              >
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
                    stateContext.theme
                      ? "border-gray-300 bg-white text-black"
                      : "border-gray-600 bg-gray-700 text-white"
                  }`}
                />
                <div
                  onClick={() => setIsShowPass(!isShowPass)}
                  role="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                >
                  {isShowPass ? (
                    <EyeClosed
                      className={stateContext.theme ? "" : "text-white"}
                    />
                  ) : (
                    <Eye className={stateContext.theme ? "" : "text-white"} />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex justify-center items-center"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <p>Register</p>
              )}
            </button>

            <p
              className={`text-sm text-center ${
                stateContext.theme ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Already a member?{" "}
              <span
                className="text-red-600 hover:underline cursor-pointer"
                onClick={() => navigate("/admin/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
