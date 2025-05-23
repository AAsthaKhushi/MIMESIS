import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCollections } from '../services/userProfile';
import CollectionManager from '../components/CollectionManager';
import { UserCollection } from '../types/user';

export default function MyCollections() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<UserCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCollections = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userCollections = await getCollections(user.uid);
      setCollections(userCollections);
    } catch (error) {
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [user]);

  if (loading) return <div>Loading collections...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          My Collections
        </h1>
        <CollectionManager 
          collections={collections} 
          onCollectionUpdate={fetchCollections} 
        />
      </div>
    </div>
  );
} 