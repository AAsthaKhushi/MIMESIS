import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, Share2, BookOpen, Download, 
  ExternalLink, Copy, Instagram, Send, MessageCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PropagandaAnalysis() {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: Propaganda Analysis ${url}`;

    switch(platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`);
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`);
        break;
      case 'threads':
        window.open(`https://www.threads.net/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/resources" className="inline-flex items-center text-red-400 hover:text-red-300 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>
        
        <motion.div 
          className="bg-gray-900 rounded-xl overflow-hidden border border-red-500/20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4qtnoDwEUHsy2n0xKsbf_k_Gp7l_ZDB7FOw&s"
              alt="Propaganda Analysis"
              className="w-full h-64 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/40">
              <BookOpen className="h-16 w-16 text-white" />
            </button>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Propaganda Analysis</h1>
            <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Published: March 15, 2025</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>By: Dr. Thomas Reed</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-yellow-500/30 text-yellow-400 rounded-full text-sm">Media</span>
              <span className="px-3 py-1 bg-blue-500/30 text-blue-400 rounded-full text-sm">Politics</span>
              <span className="px-3 py-1 bg-red-500/30 text-red-400 rounded-full text-sm">Psychology</span>
            </div>

            {/* Articles Section */}
            <div className="space-y-4 mb-12">
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <h4 className="text-lg font-medium text-white mb-2">Digital Propaganda Techniques</h4>
                <p className="text-gray-300 text-sm mb-3">Emerging strategies in the social media age</p>
                <Link to="/articles/digital-propaganda" className="text-red-400 text-sm hover:text-red-300 inline-flex items-center">
                  Read More <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                </Link>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                <h4 className="text-lg font-medium text-white mb-2">Propaganda in Election Campaigns</h4>
                <p className="text-gray-300 text-sm mb-3">How messaging strategies influence voter behavior</p>
                <Link to="/articles/election-propaganda" className="text-red-400 text-sm hover:text-red-300 inline-flex items-center">
                  Read More <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Downloadable Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Download className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Propaganda Analysis Framework</h4>
                    <p className="text-sm text-gray-400">Step-by-step guide to identifying propaganda techniques</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* About the Author Section */}
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">About the Author</h3>
              <div className="flex items-start">
                <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Dr. Thomas Reed</h4>
                  <p className="text-gray-400 text-sm mb-2">Professor of Media Studies at Central University</p>
                  <p className="text-gray-300">
                    Dr. Reed specializes in propaganda analysis, media literacy, and the impact of communication technologies on public discourse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Share Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg"
          >
            <Share2 className="h-5 w-5 text-white" />
          </button>
          
          {showShareOptions && (
            <div className="absolute bottom-16 right-0 bg-gray-800 rounded-lg p-4 shadow-lg w-64">
              <h3 className="text-white font-medium mb-3">Share article</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleShare('whatsapp')} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">WhatsApp</span>
                </button>
                <button onClick={() => handleShare('instagram')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">📷 Instagram</button>
                    <button onClick={() => handleShare('threads')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">🔗 Threads</button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button onClick={() => handleShare('copy')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">🔗 Copy Link</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
