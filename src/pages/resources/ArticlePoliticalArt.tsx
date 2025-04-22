import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PoliticalArtUnderstanding() {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this article: ${url}`)}`, '_blank');
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'threads':
        window.open(`https://www.threads.net/share?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Failed to copy link: ', err));
        break;
    }

    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link to="/resources" className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
        
        {/* Article Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">
            Understanding Political Art
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Published: March 10, 2025</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>By: Dr. Elena Martinez</span>
            </div>
          </div>

          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
            <img 
              src="https://i.pinimg.com/474x/3f/3b/19/3f3b19fdc8dc84238e4028b28c64495b.jpg" 
              alt="Political Art"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <p>
            A comprehensive guide to interpreting and analyzing political artwork throughout history. This article explores the various ways in which artists have used their craft to comment on, criticize, and influence political systems and social movements.
          </p>
          <h2>Introduction to Political Art</h2>
          <p>
            Political art has been a powerful force throughout human history, serving as both a mirror reflecting societal conditions and a catalyst for change.
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-pink-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Share this article</h3>
            <div className="relative share-container">
              <button 
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="h-5 w-5 text-pink-400" />
              </button>

              {showShareOptions && (
                <div className="absolute right-0 bottom-12 bg-gray-800 rounded-lg shadow-xl p-3 w-48 z-10 border border-pink-500/20">
                  <div className="flex flex-col space-y-2">
                    <button onClick={() => handleShare('whatsapp')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">📱 WhatsApp</button>
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

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-pink-400 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20">
              <div className="p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Feminist Art Through History</h4>
                <p className="text-gray-400 mb-4">
                  An exploration of feminist art movements and their impact on political discourse.
                </p>
                <Link to="/articles/feminist-art-history" className="text-pink-400 hover:text-pink-300 inline-flex items-center">
                  Read More
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20">
              <div className="p-6">
                <h4 className="text-lg font-semibold text-white mb-2">Propaganda Analysis</h4>
                <p className="text-gray-400 mb-4">
                  Understanding the role of art in political propaganda throughout history.
                </p>
                <Link to="/articles/propaganda-analysis" className="text-pink-400 hover:text-pink-300 inline-flex items-center">
                  Read More
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
