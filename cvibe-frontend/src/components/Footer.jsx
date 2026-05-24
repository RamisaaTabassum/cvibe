const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div>
            <span className="text-xl font-bold text-purple-600">CVibe</span>
            <p className="text-sm text-gray-500 mt-1">
              Build your perfect CV with AI
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-600 transition">About</a>
            <a href="#" className="hover:text-purple-600 transition">Privacy</a>
            <a href="#" className="hover:text-purple-600 transition">Contact</a>
          </div>

        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 CVibe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;