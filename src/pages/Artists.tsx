import { motion } from 'framer-motion';
import { useState } from 'react';
import { artists } from '../data/artists';

export default function Artists() {
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
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
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group cursor-pointer"
              onMouseEnter={() => setExpandedArtist(artist.id)}
              onMouseLeave={() => setExpandedArtist(null)}
            >
              {/* Image with Hover Effect */}
              <motion.img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Artist Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                <p className="text-gray-600 mb-4">{artist.period}</p>

                {/* Expandable Bio */}
                <motion.p
                  className="text-gray-700 mb-4 overflow-hidden transition-all duration-500"
                  initial={{ height: '3rem' }}
                  animate={{ height: expandedArtist === artist.id ? 'auto' : '3rem' }}
                >
                  {artist.bio}
                </motion.p>

                {/* Notable Works with Expand Animation */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: expandedArtist === artist.id ? 1 : 0, height: expandedArtist === artist.id ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-2">Notable Works:</h3>
                  <ul className="list-disc list-inside text-gray-600">
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
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
