import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminLayout";

export default function RegisterPage() {
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

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      navigate("/admin/login");
      toast.success("Register Success");
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          return;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          toast.error("Password should be at least 6 characters");
          return;
          case "Firebase: Error (auth/email-already-in-use).":
          toast.error("email/password already in use");
          return;

        default:
          console.log(error.message, "<<<<<<");
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
      {/* Bagian Kiri: Form Login */}
      <div className="w-full flex items-center justify-center bg-gray-50">
        <div className="w-[400px] p-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Register
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Register to continue
          </p>

          <form onSubmit={handleSubmitRegister} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Button register */}
            <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition cursor-pointer">
              Create Account
            </button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-500">
              All Ready a member?{" "}
              <a
                className="text-red-600 hover:underline cursor-pointer"
                onClick={() => navigate("/admin/login")}
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
