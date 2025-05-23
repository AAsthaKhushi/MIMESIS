import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { UserCollection } from '../types/user';
import { deleteCollection, removeArtworkFromCollection, removeArtistFromCollection } from '../services/userProfile';
import { useAuth } from '../context/AuthContext';

interface CollectionManagerProps {
  collections: UserCollection[];
  onCollectionUpdate: () => void;
}

export default function CollectionManager({ collections, onCollectionUpdate }: CollectionManagerProps) {
  const { user } = useAuth();
  const [selectedCollection, setSelectedCollection] = useState<UserCollection | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleDeleteCollection = async (collectionId: string) => {
    if (!user) return;
    try {
      const success = await deleteCollection(user.uid, collectionId);
      if (success) {
        setFeedbackMessage('Collection deleted successfully');
        onCollectionUpdate();
      } else {
        setFeedbackMessage('Failed to delete collection');
      }
    } catch (error) {
      setFeedbackMessage('Error deleting collection');
    }
  };

  const handleRemoveItem = async (collectionId: string, itemId: string, type: 'artwork' | 'artist') => {
    if (!user) return;
    try {
      const success = type === 'artwork' 
        ? await removeArtworkFromCollection(user.uid, collectionId, itemId)
        : await removeArtistFromCollection(user.uid, collectionId, itemId);
      
      if (success) {
        setFeedbackMessage(`${type === 'artwork' ? 'Artwork' : 'Artist'} removed successfully`);
        onCollectionUpdate();
      } else {
        setFeedbackMessage(`Failed to remove ${type}`);
      }
    } catch (error) {
      setFeedbackMessage(`Error removing ${type}`);
    }
  };

  return (
    <div className="space-y-4">
      {feedbackMessage && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded relative text-sm">
          {feedbackMessage}
        </div>
      )}

      {collections.map((collection) => (
        <motion.div
          key={collection.id}
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{collection.name}</h3>
            <button
              onClick={() => handleDeleteCollection(collection.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {collection.artworkIds.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Artworks:</h4>
                <div className="space-y-1">
                  {collection.artworkIds.map((artworkId) => (
                    <div key={artworkId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{artworkId}</span>
                      <button
                        onClick={() => handleRemoveItem(collection.id, artworkId, 'artwork')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {collection.artistIds.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Artists:</h4>
                <div className="space-y-1">
                  {collection.artistIds.map((artistId) => (
                    <div key={artistId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{artistId}</span>
                      <button
                        onClick={() => handleRemoveItem(collection.id, artistId, 'artist')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 