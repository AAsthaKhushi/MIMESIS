import { Menu, X, Palette, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Artists', path: '/artists' },
    { name: 'Resources', path: '/resources' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar only when at the top of the page
      if (currentScrollY <= 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -100,
        pointerEvents: visible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-600 via-pink-700 to-black shadow-lg bg-opacity-90 backdrop-blur-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.3 }}>
              <Palette className="h-10 w-10 text-white drop-shadow-md" />
            </motion.div>
            <span className="ml-2 text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
              Political Art Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className="text-white px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-pink-600 shadow-md"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-white hover:text-pink-300 transition-all"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.email}</span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/collections"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Collections
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white px-4 py-2 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-pink-600 shadow-md"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-pink-300 transition-all"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-gradient-to-br from-pink-800 to-black shadow-xl rounded-b-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className="block text-white text-lg font-medium px-4 py-2 rounded-md transition-all hover:bg-white hover:text-pink-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile User Profile */}
              {user ? (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-white mb-2">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/collections"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Collections
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-white text-lg font-medium px-4 py-2 rounded-md transition-all hover:bg-white hover:text-pink-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}