import { Mail, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative bg-gradient-to-r from-black via-gray-900 to-pink-700 text-white shadow-lg backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-extrabold text-pink-400 mb-4">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Dedicated to showcasing political art throughout history, making it accessible and
              educational for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-extrabold text-pink-400 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Collection', 'Timeline', 'Artists', 'Resources'].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1, color: '#fff' }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-extrabold text-pink-400 mb-4">Connect With Us</h3>
            <div className="flex space-x-6">
              {[
                { icon: Mail, link: '#', label: 'Email' },
                { icon: Twitter, link: '#', label: 'Twitter' },
                { icon: Github, link: '#', label: 'GitHub' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 hover:text-pink-400 transition"
                >
                  <social.icon className="h-8 w-8 drop-shadow-md" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} <span className="font-bold text-pink-400">Political Art Gallery</span>. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
