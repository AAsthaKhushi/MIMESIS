import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Share2 } from 'lucide-react';
import { artworks } from '../data/artworks';

export default function Collection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const selectedArtwork = artworks.find((art) => art.id === selectedId);

  const openArtwork = (id: string) => {
    setSelectedId(id);
    setSlideIndex(artworks.findIndex((art) => art.id === id));
    setIsClosing(false);
  };

  const closeArtwork = () => {
    setIsClosing(true);
    // Delay the actual state change to allow for exit animation
    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, 400); // Match this with your exit animation duration
  };

  const nextArtwork = () => {
    setSlideIndex((prev) => (prev + 1) % artworks.length);
    setSelectedId(artworks[(slideIndex + 1) % artworks.length].id);
  };

  const prevArtwork = () => {
    setSlideIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
    setSelectedId(artworks[(slideIndex - 1 + artworks.length) % artworks.length].id);
  };

  const handleShare = (platform: string) => {
    if (!selectedArtwork) return;
    const url = `https://yourwebsite.com/artwork/${selectedArtwork.id}`;

    const shareLinks: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out "${selectedArtwork.title}" by ${selectedArtwork.artist}!`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: ''
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
    } else {
      window.open(shareLinks[platform], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Art Collection</h1>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              layoutId={artwork.id}
              onClick={() => openArtwork(artwork.id)}
              className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-gray-100 hover:shadow-xl transition-shadow"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{artwork.title}</h3>
                <p className="text-gray-600">{artwork.artist}, {artwork.year}</p>
                <p className="text-sm text-gray-500">{artwork.movement}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pop-up Modal */}
        <AnimatePresence>
          {selectedId && selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-90 text-white flex items-center justify-center p-4 z-50"
            >
              {/* Close button outside the modal */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={closeArtwork}
                className="absolute top-6 right-6 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10 flex items-center justify-center group"
              >
                <X size={24} className="text-white group-hover:scale-110 transition-transform" />
              </motion.button>
              
              <motion.div
                layoutId={selectedId}
                initial={{ y: 50, x: 0 }}
                animate={{ y: 0, x: 0 }}
                exit={{ y: 50, x: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gray-900 text-white rounded-lg max-w-4xl w-full overflow-auto max-h-[90vh] relative p-6"
              >
                {/* Close button inside the modal */}
                <button
                  onClick={closeArtwork}
                  className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="relative">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-96 object-cover rounded-md"
                  />
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevArtwork}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextArtwork}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="p-6">
                  <h2 className="text-3xl font-bold mb-2">{selectedArtwork.title}</h2>
                  <p className="text-xl text-gray-400 mb-4">{selectedArtwork.artist}, {selectedArtwork.year}</p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-gray-300">{selectedArtwork.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Artist's Motivation</h3>
                    <p className="text-gray-300">{selectedArtwork.artistMotivation}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Historical Context</h3>
                    <p className="text-gray-300">{selectedArtwork.historicalContext}</p>
                  </div>

                  {/* About the Artist */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">About the Artist</h3>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {selectedArtwork.artistImageUrl && (
                        <div className="w-full md:w-1/3">
                          <img
                            src={selectedArtwork.artistImageUrl}
                            alt={selectedArtwork.artist}
                            className="w-full h-auto rounded-lg shadow-md object-cover"
                          />
                        </div>
                      )}
                      <div className="w-full md:w-2/3">
                        <p className="text-gray-300">{selectedArtwork.artistBio}</p>
                        <a
                          href={selectedArtwork.artistLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Share Options */}
                  <div className="mt-6 flex gap-4">
                    <button onClick={() => handleShare('whatsapp')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      📱WhatsApp
                    </button>
                    <button onClick={() => handleShare('twitter')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      🐦Twitter
                    </button>
                    <button onClick={() => handleShare('facebook')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      📘Facebook
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      🔗LinkedIn
                    </button>
                    <button onClick={() => handleShare('copy')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                      Copy Link
                    </button>
                  </div>

                  {/* Extra close button at bottom for convenience */}
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={closeArtwork}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <X size={18} />
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}