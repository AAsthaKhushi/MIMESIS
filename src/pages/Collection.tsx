import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCollections, addArtworkToCollection, createCollection } from '../services/userProfile';
import { UserCollection } from '../types/user';
import { fetchArtworks } from '../firebase/fetchArtworks';
import { Artwork } from '../types/artwork';
import { artworks as staticArtworks } from '../data/artworks';

export default function Collection() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [userCollections, setUserCollections] = useState<UserCollection[]>([]);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedArtwork = artworks.find((art) => art.id === selectedId);

  useEffect(() => {
    const fetchCollections = async () => {
      if (user) {
        try {
          const collections = await getCollections(user.uid);
          setUserCollections(collections);
        } catch (error) {
          console.error('Error fetching collections:', error);
          setFeedbackMessage('Failed to load your collections.');
        }
      }
    };
    fetchCollections();
  }, [user]);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchArtworks();
        if (data && data.length > 0) {
          setArtworks(data);
        } else {
          // Fallback to static data if no artworks in Firestore
          console.log('No artworks found in Firestore, using static data');
          setArtworks(staticArtworks);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
        // Fallback to static data on error
        setArtworks(staticArtworks);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  const openArtwork = (id: string) => {
    setSelectedId(id);
    setSlideIndex(artworks.findIndex((art) => art.id === id));
  };

  const closeArtwork = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
      setShowCollectionsModal(false);
      setFeedbackMessage('');
      setNewCollectionName('');
    }, 400);
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
      navigator.clipboard.writeText(url).then(() => setFeedbackMessage('Link copied to clipboard!')).catch(() => setFeedbackMessage('Failed to copy link.'));
    } else {
      window.open(shareLinks[platform], '_blank');
    }
  };

  const handleAddToCollection = async (collectionId: string) => {
    if (!user || !selectedArtwork) return;
    try {
      await addArtworkToCollection(user.uid, collectionId, selectedArtwork.id);
      setFeedbackMessage(`Added "${selectedArtwork.title}" to collection.`);
      const updatedCollections = await getCollections(user.uid);
      setUserCollections(updatedCollections);
      setShowCollectionsModal(false);
    } catch (error) {
      console.error('Error adding artwork to collection:', error);
      setFeedbackMessage('Failed to add artwork to collection.');
    }
  };

  const handleCreateCollectionAndAdd = async () => {
    if (!user || !selectedArtwork || newCollectionName.trim() === '') {
      setFeedbackMessage('Collection name cannot be empty.');
      return;
    }
    try {
      const newCollection = await createCollection(user.uid, newCollectionName.trim());
      if (newCollection) {
        await handleAddToCollection(newCollection.id);
        setNewCollectionName('');
      } else {
        setFeedbackMessage('Failed to create new collection.');
      }
    } catch (error) {
      console.error('Error creating collection and adding artwork:', error);
      setFeedbackMessage('Failed to create collection.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Art Collection</h1>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading artworks...</p>
          ) : (
            artworks.map((artwork) => (
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
            ))
          )}
        </div>

        {/* Pop-up Modal */}
        <AnimatePresence>
          {selectedId && selectedArtwork && !isClosing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-90 text-white flex items-center justify-center p-4 z-50"
            >
              <motion.button
                onClick={closeArtwork}
                className="absolute top-6 right-6 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10 flex items-center justify-center group"
              >
                <X size={24} className="text-white group-hover:scale-110 transition-transform" />
              </motion.button>
              
              <motion.div
                layoutId={selectedId}
                className="bg-gray-900 text-white rounded-lg max-w-4xl w-full overflow-auto max-h-[90vh] relative p-6"
              >
                <div className="relative">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-96 object-cover rounded-md"
                  />
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

                  {selectedArtwork.artistMotivation && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Artist's Motivation</h3>
                    <p className="text-gray-300">{selectedArtwork.artistMotivation}</p>
                  </div>
                  )}

                  {selectedArtwork.historicalContext && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Historical Context</h3>
                    <p className="text-gray-300">{selectedArtwork.historicalContext}</p>
                  </div>
                  )}

                  {/* About the Artist */}
                  {selectedArtwork.artistImageUrl && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">About the Artist</h3>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-full md:w-1/3">
                          <img
                            src={selectedArtwork.artistImageUrl}
                            alt={selectedArtwork.artist}
                            className="w-full h-auto rounded-lg shadow-md object-cover"
                          />
                        </div>
                      <div className="w-full md:w-2/3">
                        <p className="text-gray-300">{selectedArtwork.artistBio}</p>
                          {selectedArtwork.artistLink && (
                        <a
                          href={selectedArtwork.artistLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          Learn More →
                        </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Share Options */}
                  <div className="mt-6 flex gap-4">
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

                  {/* Add to Collection Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setShowCollectionsModal(true)}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add to Collection
                    </button>
                </div>

                {/* Collections Modal */}
                <AnimatePresence>
                  {showCollectionsModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-0 left-0 right-0 bg-gray-800 p-4 rounded-b-lg z-20"
                    >
                      <h4 className="text-lg font-semibold mb-2">Add to Collection</h4>
                      {feedbackMessage && (
                         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded relative text-sm mb-2" role="alert">
                           {feedbackMessage}
                         </div>
                       )}
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {userCollections.length === 0 ? (
                          <p className="text-gray-400 text-sm">No collections found. Create one below!</p>
                        ) : (
                          userCollections.map((collection) => (
                            <button
                              key={collection.id}
                              onClick={() => handleAddToCollection(collection.id)}
                              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors text-sm"
                            >
                              {collection.name} ({collection.artworkIds.length} artworks)
                            </button>
                          ))
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="New Collection Name"
                          value={newCollectionName}
                          onChange={(e) => setNewCollectionName(e.target.value)}
                          className="flex-grow px-3 py-2 rounded text-gray-900 text-sm"
                        />
                        <button
                          onClick={handleCreateCollectionAndAdd}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                        >
                          Create & Add
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                  {/* Close button */}
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