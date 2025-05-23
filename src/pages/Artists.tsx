import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { artists } from '../data/artists';
import { useAuth } from '../context/AuthContext';
import { getCollections, addArtistToCollection, createCollection } from '../services/userProfile';
import { UserCollection } from '../types/user';

export default function Artists() {
  const { user } = useAuth();
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [userCollections, setUserCollections] = useState<UserCollection[]>([]);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedArtistToAdd, setSelectedArtistToAdd] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      if (user) {
        try {
          const collections = await getCollections(user.uid);
          setUserCollections(collections);
        } catch (error) {
          console.error('Error fetching collections:', error);
          // Optionally set a feedback message for the user
        }
      }
    };
    fetchCollections();
  }, [user]);

  const openCollectionsModal = (artistId: string) => {
    setSelectedArtistToAdd(artistId);
    setShowCollectionsModal(true);
    setFeedbackMessage(''); // Clear previous feedback
    setNewCollectionName(''); // Clear input
  };

  const closeCollectionsModal = () => {
    setShowCollectionsModal(false);
    setSelectedArtistToAdd(null);
    setFeedbackMessage('');
    setNewCollectionName('');
  };

  const handleAddArtistToCollection = async (collectionId: string) => {
    if (!user || !selectedArtistToAdd) return;
    try {
      await addArtistToCollection(user.uid, collectionId, selectedArtistToAdd);
      setFeedbackMessage(`Added artist to collection.`);
      // Optional: Refresh collections list if needed to show updated counts
      const updatedCollections = await getCollections(user.uid);
      setUserCollections(updatedCollections);
      // Close modal after a short delay or on user action
      setTimeout(closeCollectionsModal, 1500);
    } catch (error) {
      console.error('Error adding artist to collection:', error);
      setFeedbackMessage('Failed to add artist to collection.');
    }
  };

  const handleCreateCollectionAndAdd = async () => {
    if (!user || !selectedArtistToAdd || newCollectionName.trim() === '') {
      setFeedbackMessage('Collection name cannot be empty.');
      return;
    }
    try {
      const newCollection = await createCollection(user.uid, newCollectionName.trim());
      if (newCollection) {
        await handleAddArtistToCollection(newCollection.id);
        setNewCollectionName('');
      } else {
        setFeedbackMessage('Failed to create new collection.');
      }
    } catch (error) {
      console.error('Error creating collection and adding artist:', error);
      setFeedbackMessage('Failed to create collection.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Featured Artists
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
            >
              {/* Image */}
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-64 object-cover"
              />

              {/* Artist Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                <p className="text-gray-600 mb-4">{artist.period}</p>

                {/* Expandable Bio */}
                <motion.div
                  onClick={() => setExpandedArtist(expandedArtist === artist.id ? null : artist.id)}
                  className="cursor-pointer"
                >
                  <motion.p
                    className="text-gray-700 mb-4 overflow-hidden"
                    initial={{ height: '3rem' }}
                    animate={{ height: expandedArtist === artist.id ? 'auto' : '3rem' }}
                    transition={{ duration: 0.3 }}
                  >
                    {artist.bio}
                  </motion.p>
                </motion.div>

                {/* Notable Works and Add to Collection */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: expandedArtist === artist.id ? 1 : 0,
                    height: expandedArtist === artist.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <h3 className="text-lg font-semibold mb-2">Notable Works:</h3>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {artist.notableWorks.map((work) => (
                      <li key={work}>{work}</li>
                    ))}
                  </ul>
                  <a
                    href={artist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-blue-500 hover:underline"
                  >
                    Learn More →
                  </a>

                   {/* Add to Collection Button */}
                   <button
                     onClick={() => openCollectionsModal(artist.id)}
                     className="mt-4 w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                   >
                     <Plus size={16} className="mr-2" />
                     Add to Collection
                   </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collections Modal for Artists */}
      <AnimatePresence>
        {showCollectionsModal && selectedArtistToAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={closeCollectionsModal} // Close when clicking outside
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gray-900 text-white rounded-lg max-w-sm w-full p-6 relative"
              onClick={e => e.stopPropagation()} // Prevent modal close on content click
            >
              <button
                onClick={closeCollectionsModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold mb-4">Add Artist to Collection</h3>

              {feedbackMessage && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded relative text-sm mb-4" role="alert">
                  {feedbackMessage}
                </div>
              )}

              <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                 {userCollections.length === 0 ? (
                   <p className="text-gray-400 text-sm">No collections found. Create one below!</p>
                 ) : (
                   userCollections.map((collection) => (
                     <button
                       key={collection.id}
                       onClick={() => handleAddArtistToCollection(collection.id)}
                       className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors text-sm"
                     >
                       {collection.name} ({collection.artistIds.length} artists)
                     </button>
                   ))
                 )}
               </div>

              <div className="flex items-center gap-2 mt-4">
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
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
