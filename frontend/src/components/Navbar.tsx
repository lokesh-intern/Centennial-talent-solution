import React, { useState } from 'react';
import { Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom';
import userStore from '../store/userStore';


interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Job Apply', href: '/job-apply' },
  
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Centennial Talent Solution
            </span>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            {/* {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5"
              >
                {link.name}
              </a>
            ))} */}
            {user && 
            <Link to="/job-apply"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5"
              >
                <p>job Apply</p>
              </Link>}
            <Link to="/">
                {user ? <button
                onClick={() => removeUser()} 
                className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
                    Logout
                </button>
                : <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
                    Login
                </button>
                }
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-slate-200 transition-all duration-300 ease-in-out ${
          isOpen ? 'top-16 opacity-100' : '-top-96 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100">
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;