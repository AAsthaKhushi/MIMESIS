import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getUserProfile,
  toggleFavorite,
  createCollection,
  removeArtworkFromCollection,
  removeArtistFromCollection,
  deleteCollection
} from '../services/userProfile'; // Import new functions
import { Heart, FolderPlus, X, Trash2 } from 'lucide-react'; // Import Trash2 icon
import { artists } from '../data/artists'; // Import artists data
import { UserProfile, UserCollection } from '../types/user'; // Import UserProfile and UserCollection types
import { Artwork } from '../types/artwork'; // Assuming you have an Artwork type
import { Artist } from '../types/artist'; // Assuming you have an Artist type
import { fetchArtworks } from '../firebase/fetchArtworks';

export default function UserCollections() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollectionForm, setShowNewCollectionForm] = useState(false);
  const [favoriteArtworks, setFavoriteArtworks] = useState<Artwork[]>([]);
  const [collectionArtworks, setCollectionArtworks] = useState<{ [collectionId: string]: Artwork[] }>({});
  const [collectionArtists, setCollectionArtists] = useState<{ [collectionId: string]: Artist[] }>({});
  const [loading, setLoading] = useState(true);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const fetchUserProfile = async () => {
     if (user) {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);

          // Fetch details for favorite artworks
          const favArtworks = artworks.filter(artwork => userProfile.favorites?.includes(artwork.id));
          setFavoriteArtworks(favArtworks);

          // Fetch details for collection items
          const artworksMap: { [collectionId: string]: Artwork[] } = {};
          const artistsMap: { [collectionId: string]: Artist[] } = {};

          userProfile.collections.forEach(collection => {
            artworksMap[collection.id] = artworks.filter(artwork => collection.artworkIds.includes(artwork.id));
            artistsMap[collection.id] = artists.filter(artist => collection.artistIds.includes(artist.id));
          });

          setCollectionArtworks(artworksMap);
          setCollectionArtists(artistsMap);
        }
      }
  };

  useEffect(() => {
    const loadProfileAndItems = async () => {
      setLoading(true);
      await fetchUserProfile();
      setLoading(false);
    };
    loadProfileAndItems();
  }, [user]);

  useEffect(() => {
    fetchArtworks().then(data => {
      setArtworks(data);
      setLoading(false);
    });
  }, []);

  const handleToggleFavorite = async (artworkId: string) => {
    if (!user || !profile) return;
    await toggleFavorite(user.uid, artworkId);
    // Refetch profile to update state
    await fetchUserProfile();
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newCollectionName.trim() || !profile) return;

    await createCollection(user.uid, newCollectionName.trim());
    setNewCollectionName('');
    setShowNewCollectionForm(false);
    
    // Refetch profile to update state
    await fetchUserProfile();
  };

  const handleRemoveArtwork = async (collectionId: string, artworkId: string) => {
    if (!user || !profile) return;
    // Optional: Add confirmation here
    if (window.confirm('Are you sure you want to remove this artwork from the collection?')) {
       await removeArtworkFromCollection(user.uid, collectionId, artworkId);
       // Refetch profile to update state
       await fetchUserProfile();
    }
  };

   const handleRemoveArtist = async (collectionId: string, artistId: string) => {
    if (!user || !profile) return;
    // Optional: Add confirmation here
    if (window.confirm('Are you sure you want to remove this artist from the collection?')) {
       await removeArtistFromCollection(user.uid, collectionId, artistId);
       // Refetch profile to update state
       await fetchUserProfile();
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
     if (!user || !profile) return;
     // Optional: Add confirmation here
     if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
       await deleteCollection(user.uid, collectionId);
       // Refetch profile to update state
       await fetchUserProfile();
     }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!user || !profile) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <p className="text-gray-600">Please log in to view your collections.</p>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Collections</h2>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Favorites</h3>
          <button
            onClick={() => setShowNewCollectionForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Collection
          </button>
        </div>

        {showNewCollectionForm && (
          <form onSubmit={handleCreateCollection} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowNewCollectionForm(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArtworks.length === 0 ? (
            <p className="text-gray-600 col-span-full">No favorite artworks yet.</p>
          ) : (
            favoriteArtworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleToggleFavorite(artwork.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800">{artwork.title}</h4>
                  <p className="text-sm text-gray-600">{artwork.artist}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">My Collections</h3>
        <div className="space-y-4">
          {profile.collections.length === 0 ? (
            <p className="text-gray-600">No collections created yet.</p>
          ) : (
            profile.collections.map((collection: UserCollection) => (
              <div key={collection.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-800">{collection.name}</h4>
                   <button
                     onClick={() => handleDeleteCollection(collection.id)}
                     className="p-1 text-gray-400 hover:text-red-600"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Display Artworks in Collection */}
                  {collectionArtworks[collection.id]?.map((artwork) => (
                    <div key={artwork.id} className="relative group">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveArtwork(collection.id, artwork.id)}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Artwork"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                   {/* Display Artists in Collection */}
                  {collectionArtists[collection.id]?.map((artist) => (
                    <div key={artist.id} className="relative bg-gray-200 rounded-md p-2 flex items-center space-x-2 group">
                       <img
                         src={artist.imageUrl}
                         alt={artist.name}
                         className="w-10 h-10 object-cover rounded-full"
                       />
                       <p className="text-sm font-medium text-gray-800">{artist.name}</p>
                       <button
                         onClick={() => handleRemoveArtist(collection.id, artist.id)}
                         className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                         title="Remove Artist"
                       >
                         <X size={16} className="text-red-500" />
                       </button>
                     </div>
                  ))}
                  {(collectionArtworks[collection.id]?.length === 0 && collectionArtists[collection.id]?.length === 0) && (
                    <p className="text-gray-600 text-sm col-span-full">This collection is empty.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 