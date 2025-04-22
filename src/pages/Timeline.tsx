import { useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';

export default function Timeline() {
  const [selectedCategory, setSelectedCategory] = useState<'wars' | 'politics' | 'revolution'>('wars');

  // Categorize artworks based on theme
  const categories = {
    wars: [
      'Guernica', 
      'The Third of May 1808', 
      'The Execution of Emperor Maximilian', 
      'The Triumph of Death',
      'The Disasters of War',
      'The Surrender of Breda',
      'Massacre in Korea',
      'Raising a Flag over the Reichstag',
      'Napalm Girl',
      'Washington Crossing the Delaware',
      'The Raft of the Medusa'
    ],
    politics: [
      'Liberty Leading the People', 
      'Beat the Whites with the Red Wedge', 
      'Workers of the World Unite',
      'The Night Watch',
      'The Family of Charles IV',
      'The Oath of the Horatii',
      'Uncle Sam Wants You',
      'We Can Do It!',
      'October 18, 1977'
    ],
    revolution: [
      'The Fourth Estate', 
      'Death and Disaster Series', 
      'Christ of Saint John of the Cross',
      'The Death of Marat',
      'The Tennis Court Oath'
    ]
  };

  const filteredArtworks = artworks.filter((art) => categories[selectedCategory].includes(art.title));
  const sortedArtworks = [...filteredArtworks].sort((a, b) => a.year - b.year);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-pink-400 text-center mb-8">Explore Political Art Through Time</h1>

        {/* Timeline Category Selector */}
        <div className="flex justify-center space-x-6 mb-12">
          {['wars', 'politics', 'revolution'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category as 'wars' | 'politics' | 'revolution')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 
                ${selectedCategory === category ? 'bg-pink-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300'}
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-10">
          <p className="text-gray-300 max-w-3xl mx-auto">
            {selectedCategory === 'wars' && 
              "Artworks that depict the harsh realities of warfare, its impact on societies, and the human cost of conflict throughout history."}
            {selectedCategory === 'politics' && 
              "Works that engage with political systems, power structures, and governance, often reflecting the social conditions of their time."}
            {selectedCategory === 'revolution' && 
              "Art that captures moments of social and political upheaval, resistance, and the struggle for change and liberation."}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-500 shadow-lg" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {sortedArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Artwork Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 border border-pink-600">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2">{artwork.title}</h3>
                    <p className="text-gray-400 mb-2">{artwork.artist}</p>
                    <p className="text-pink-400 font-semibold mb-3">{artwork.year}</p>
                    <p className="text-gray-300">{artwork.description}</p>
                    <div className="mt-2 mb-4">
                      <span className="inline-block bg-gray-800 text-pink-400 px-3 py-1 rounded-full text-sm">
                        {artwork.movement}
                      </span>
                    </div>
                    <button
                      className="mt-2 inline-block bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Read More →
                    </button>
                  </div>
                </div>

                {/* Year marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-10 text-sm font-bold text-pink-300">
                  {artwork.year}
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full shadow-lg border-4 border-gray-900" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="mt-16 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 border border-pink-600">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Art Collection Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">Total in "{selectedCategory}" category:</p>
              <p className="text-3xl font-bold text-pink-400">{filteredArtworks.length}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">Earliest work:</p>
              <p className="text-3xl font-bold text-pink-400">
                {sortedArtworks.length > 0 ? sortedArtworks[0].year : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">Latest work:</p>
              <p className="text-3xl font-bold text-pink-400">
                {sortedArtworks.length > 0 ? sortedArtworks[sortedArtworks.length - 1].year : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}