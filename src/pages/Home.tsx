import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { artworks } from '../data/artworks';
import { artists } from '../data/artists';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  type: 'artwork' | 'artist';
}

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Create featured showcase items combining artworks and artists with unique IDs
  const showcaseItems: ShowcaseItem[] = [
    ...artworks.slice(0, 3).map(artwork => ({
      id: `artwork-${artwork.id}`,
      title: artwork.title,
      subtitle: `${artwork.artist}, ${artwork.year}`,
      description: artwork.description,
      image: artwork.imageUrl,
      link: `/collection`,
      type: 'artwork' as const
    })),
    ...artists.slice(0, 2).map(artist => ({
      id: `artist-${artist.id}`,
      title: artist.name,
      subtitle: artist.period,
      description: artist.bio,
      image: artist.imageUrl,
      link: `/artists`,
      type: 'artist' as const
    }))
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, showcaseItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    setIsAutoPlaying(false);
  };

  // Filter artworks by category for preview galleries
  const warArtworks = artworks.filter(art => 
    art.title.toLowerCase().includes('war') || 
    art.description.toLowerCase().includes('war') ||
    art.movement.toLowerCase().includes('war')
  ).slice(0, 3);

  const politicalArtworks = artworks.filter(art => 
    art.title.toLowerCase().includes('political') || 
    art.description.toLowerCase().includes('political') ||
    art.movement.toLowerCase().includes('political')
  ).slice(0, 3);

  const revolutionArtworks = artworks.filter(art => 
    art.title.toLowerCase().includes('revolution') || 
    art.description.toLowerCase().includes('revolution') ||
    art.movement.toLowerCase().includes('revolution')
  ).slice(0, 3);

  // Resources for preview
  const resourceTags = [
    { name: 'Revolutionary Art', color: 'bg-pink-500' },
    { name: 'Feminism', color: 'bg-purple-500' },
    { name: 'Protest Art', color: 'bg-red-500' },
    { name: 'War & Conflict', color: 'bg-amber-500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[90vh]">
        {showcaseItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`absolute inset-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => navigate(item.link)}
            style={{ cursor: 'pointer' }}
          >
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-7xl mx-auto px-4 h-full flex items-center"
            >
              <div className="text-white max-w-3xl">
                <span className="text-indigo-400 text-lg mb-2 block">
                  Featured {item.type}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-2xl mb-3 text-gray-200">
                  {item.subtitle}
                </p>
                <p className="text-xl mb-8 text-gray-300">
                  {item.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.link);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {showcaseItems.map((item, index) => (
            <button
              key={`indicator-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Exploring the Intersection of Art and Politics
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Our digital gallery showcases how artists throughout history have responded to political events, 
            social movements, and cultural revolutions. Through these powerful works, we examine how art serves 
            as both a mirror to society and a catalyst for change.
          </motion.p>
        </div>
      </section>

      {/* Featured Sections with Previews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Curated Collections Section */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6 md:col-span-1"
              >
                <h3 className="text-2xl font-semibold mb-4">Curated Collections</h3>
                <p className="text-gray-600 mb-6">
                  Explore our carefully curated collections of political artworks from different eras and
                  movements. Each collection tells a story of how artists have engaged with the political climate of their time.
                </p>
                <Link
                  to="/collection"
                  className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  View All Collections <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {warArtworks.map((artwork) => (
                    <div 
                      key={artwork.id}
                      className="relative group overflow-hidden rounded-lg shadow-md"
                    >
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h4 className="text-white font-semibold">{artwork.title}</h4>
                        <p className="text-gray-200 text-sm">{artwork.artist}, {artwork.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Interactive Timeline Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2 order-2 md:order-1"
              >
                <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-500 transform -translate-x-1/2"></div>
                  
                  {politicalArtworks.map((artwork, index) => (
                    <div 
                      key={artwork.id}
                      className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-2 border-gray-900`}></div>
                      <div className={`w-5/12 bg-gray-800 p-4 rounded-lg shadow ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                        <p className="text-pink-400 font-bold">{artwork.year}</p>
                        <h4 className="text-white font-semibold">{artwork.title}</h4>
                        <p className="text-gray-300 text-sm">{artwork.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6 md:col-span-1 order-1 md:order-2"
              >
                <h3 className="text-2xl font-semibold mb-4">Interactive Timeline</h3>
                <p className="text-gray-600 mb-6">
                  Journey through history with our interactive timeline of political art and social
                  movements. Discover how artists have responded to pivotal moments in history and shaped cultural narratives.
                </p>
                <Link
                  to="/timeline"
                  className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  Explore Full Timeline <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Educational Resources Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6 md:col-span-1"
              >
                <h3 className="text-2xl font-semibold mb-4">Educational Resources</h3>
                <p className="text-gray-600 mb-6">
                  Access comprehensive educational materials about political art and its impact on society.
                  Perfect for students, educators, and anyone interested in the relationship between art and politics.
                </p>
                <Link
                  to="/resources"
                  className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  Browse All Resources <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-5 shadow-sm flex">
                    <div className="p-3 bg-pink-400/20 rounded-lg mr-4">
                      <Info className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Revolutionary Art Guide</h4>
                      <p className="text-gray-600 text-sm mb-3">Comprehensive analysis of revolutionary art movements</p>
                      <div className="flex flex-wrap gap-2">
                        {resourceTags.slice(0, 2).map(tag => (
                          <span
                            key={tag.name}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}/30 text-${tag.color.replace('bg-', '')}`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-5 shadow-sm flex">
                    <div className="p-3 bg-purple-400/20 rounded-lg mr-4">
                      <Info className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">War & Conflict in Art</h4>
                      <p className="text-gray-600 text-sm mb-3">Exploring artistic responses to global conflicts</p>
                      <div className="flex flex-wrap gap-2">
                        {resourceTags.slice(2, 4).map(tag => (
                          <span
                            key={tag.name}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}/30 text-${tag.color.replace('bg-', '')}`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-5 shadow-sm md:col-span-2">
                    <h4 className="font-semibold mb-2">Popular Resources</h4>
                    <div className="overflow-hidden rounded-lg mt-3">
                      <div className="grid grid-cols-3 gap-2">
                        {revolutionArtworks.map((artwork) => (
                          <div key={artwork.id} className="relative h-24 overflow-hidden rounded">
                            <img 
                              src={artwork.imageUrl} 
                              alt={artwork.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <p className="text-white text-xs text-center font-medium px-2">{artwork.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Upcoming Virtual Events
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-indigo-200 flex items-center justify-center">
                <p className="text-indigo-800 font-bold text-xl">APR 15</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Virtual Gallery Tour</h3>
                <p className="text-gray-600 mb-4">Join our curator for a virtual tour of our Revolutionary Art collection.</p>
                <button className="text-indigo-600 font-medium">Register Now</button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-pink-200 flex items-center justify-center">
                <p className="text-pink-800 font-bold text-xl">MAY 3</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Artist Spotlight: Political Art Today</h3>
                <p className="text-gray-600 mb-4">A panel discussion with contemporary political artists on their practice.</p>
                <button className="text-indigo-600 font-medium">Register Now</button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-amber-200 flex items-center justify-center">
                <p className="text-amber-800 font-bold text-xl">MAY 22</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Workshop: Art as Protest</h3>
                <p className="text-gray-600 mb-4">Learn techniques and approaches for creating effective protest art.</p>
                <button className="text-indigo-600 font-medium">Register Now</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      
      {/* Newsletter Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6"
          >
            Stay Updated on Political Art
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            Subscribe to our newsletter for the latest updates on new collections, resources, and virtual events.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 flex-1 rounded-lg text-gray-900"
            />
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-medium">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
}