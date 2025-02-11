
export default function Navbar () {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">MyLogo</div>

      {/* Menu */}
      <div className="flex gap-4">
      <button className="px-4 py-2 text-blue-600">Sign In</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Sign Up</button>
      </div>
    </nav>
  );
};
