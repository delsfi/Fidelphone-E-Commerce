export default function RegisterPage () {
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
  
            <form className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              {/* Password Input */}
              <div>
                <label className="block text-gray-600 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              {/* Button Login */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Create Account
              </button>
  
              {/* Register Link */}
              <p className="text-sm text-center text-gray-500">
                All Ready a member?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };
  