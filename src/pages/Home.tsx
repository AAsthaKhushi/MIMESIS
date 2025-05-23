import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Info, Calendar, Users, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { artists } from '../data/artists';
import { fetchArtworks } from '../firebase/fetchArtworks';
import { Artwork } from '../types/artwork';
import { artworks as staticArtworks } from '../data/artworks';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  type: 'artwork' | 'artist';
}

type SectionKey = 'mission' | 'collections' | 'timeline' | 'resources' | 'events';

type VisibilityState = Record<SectionKey, boolean>;

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    mission: false,
    collections: false,
    timeline: false,
    resources: false,
    events: false,
  });
  
  const observerRefs: { [key in SectionKey]: React.RefObject<HTMLDivElement> } = {
    mission: useRef<HTMLDivElement>(null),
    collections: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    resources: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
  };

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Intersection Observer setup
  useEffect(() => {
    const observers: { [key in SectionKey]?: IntersectionObserver } = {};
    
    const observerCallback = (entries: IntersectionObserverEntry[], key: SectionKey) => {
      if (entries[0].isIntersecting) {
        setIsVisible(prev => ({ ...prev, [key]: true }));
      }
    };

    Object.entries(observerRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => observerCallback(entries, key as SectionKey),
          { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px' // Triggers slightly before element is fully visible
          }
        );
        
        observers[key as SectionKey] = observer;
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(observers).forEach(observer => {
        if (observer) {
          observer.disconnect();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !hasInteracted) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, hasInteracted, showcaseItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
    setIsAutoPlaying(false);
    setHasInteracted(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    setIsAutoPlaying(false);
    setHasInteracted(true);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setHasInteracted(true);
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

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };


  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleUp: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[90vh] overflow-hidden">
        <AnimatePresence mode="wait">
          {showcaseItems.map((item, index) => (
            index === currentSlide && (
              <motion.div
                key={`slide-${item.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                </motion.div>
                
                <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                  <motion.div
                    className="text-white max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                  >
                    <motion.span 
                      variants={fadeInUp}
                      className="inline-block py-1 px-3 bg-indigo-600/80 text-white text-sm font-medium rounded-full mb-4"
                    >
                      Featured {item.type}
                    </motion.span>
                    
                    <motion.h1 
                      variants={fadeInUp}
                      className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
                    >
                      {item.title}
                    </motion.h1>
                    
                    <motion.p 
                      variants={fadeInUp}
                      className="text-2xl mb-3 text-gray-200"
                    >
                      {item.subtitle}
                    </motion.p>
                    
                    <motion.p 
                      variants={fadeInUp}
                      className="text-xl mb-8 text-gray-300 max-w-2xl"
                    >
                      {item.description}
                    </motion.p>
                    
                    <motion.button
                      variants={fadeInUp}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(item.link);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/30"
                    >
                      View Details
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: 5 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 0.6 
                        }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-4 rounded-full text-white transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-4 rounded-full text-white transition-all backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {showcaseItems.map((item, index) => (
            <motion.button
              key={`indicator-${item.id}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission Statement Section */}
      <section 
        ref={observerRefs.mission}
        className="py-24 bg-gradient-to-br from-indigo-900 to-indigo-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate={isVisible.mission ? "visible" : "hidden"}
            variants={staggerChildren}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-8 relative inline-block"
            >
              Exploring the Intersection of Art and Politics
              <motion.span 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-pink-500"
                initial={{ width: 0 }}
                animate={{ width: '4rem' }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Our digital gallery showcases how artists throughout history have responded to political events, 
              social movements, and cultural revolutions. Through these powerful works, we examine how art serves 
              as both a mirror to society and a catalyst for change.
            </motion.p>
            
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition-all shadow-lg"
            >
              Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Sections with Previews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Curated Collections Section */}
          <div className="mb-32">
            <div 
              ref={observerRefs.collections}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              <motion.div
                initial="hidden"
                animate={isVisible.collections ? "visible" : "hidden"}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 md:col-span-1 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Curated Collections</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Explore our carefully curated collections of political artworks from different eras and
                  movements. Each collection tells a story of how artists have engaged with the political climate of their time.
                </p>
                <Link
                  to="/collection"
                  className="group text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  <span>View All Collections</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isVisible.collections ? "visible" : "hidden"}
                variants={staggerChildren}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {warArtworks.map((artwork, idx) => (
                    <motion.div 
                      key={artwork.id}
                      variants={fadeInUp}
                      custom={idx}
                      className="relative group overflow-hidden rounded-xl shadow-md"
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"/>
                      
                      <motion.img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-full h-60 object-cover" 
                        whileHover={{ scale: 1.1, transition: { duration: 0.6 } }}
                      />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                        <h4 className="text-white font-bold text-lg transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{artwork.title}</h4>
                        <p className="text-gray-200 text-sm transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">{artwork.artist}, {artwork.year}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Interactive Timeline Section */}
            <div 
              ref={observerRefs.timeline}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
            >
              <motion.div
                initial="hidden"
                animate={isVisible.timeline ? "visible" : "hidden"}
                variants={staggerChildren}
                className="md:col-span-2 order-2 md:order-1"
              >
                <motion.div 
                  variants={scaleUp}
                  className="bg-gradient-to-r from-gray-900 to-indigo-900 p-8 rounded-xl relative overflow-hidden shadow-xl"
                >
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-500 transform -translate-x-1/2"></div>
                  
                  {politicalArtworks.map((artwork, index) => (
                    <motion.div 
                      key={artwork.id}
                      variants={fadeInUp}
                      custom={index}
                      className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-pink-500 rounded-full border-4 border-gray-900 z-10`}
                      ></motion.div>
                      
                      <motion.div 
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                        className={`w-5/12 bg-gray-800 p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                      >
                        <p className="text-pink-400 font-bold text-lg">{artwork.year}</p>
                        <h4 className="text-white font-bold text-xl mb-2">{artwork.title}</h4>
                        <p className="text-gray-300">{artwork.artist}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isVisible.timeline ? "visible" : "hidden"}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 md:col-span-1 order-1 md:order-2 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Interactive Timeline</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Journey through history with our interactive timeline of political art and social
                  movements. Discover how artists have responded to pivotal moments in history and shaped cultural narratives.
                </p>
                <Link
                  to="/timeline"
                  className="group text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  <span>Explore Full Timeline</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Educational Resources Section */}
            <div 
              ref={observerRefs.resources}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                initial="hidden"
                animate={isVisible.resources ? "visible" : "hidden"}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 md:col-span-1 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Educational Resources</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Access comprehensive educational materials about political art and its impact on society.
                  Perfect for students, educators, and anyone interested in the relationship between art and politics.
                </p>
                <Link
                  to="/resources"
                  className="group text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                >
                  <span>Browse All Resources</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isVisible.resources ? "visible" : "hidden"}
                variants={staggerChildren}
                className="md:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex"
                  >
                    <div className="p-4 bg-pink-400/20 rounded-xl mr-5 h-fit">
                      <BookOpen className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Revolutionary Art Guide</h4>
                      <p className="text-gray-600 mb-4">Comprehensive analysis of revolutionary art movements</p>
                      <div className="flex flex-wrap gap-2">
                        {resourceTags.slice(0, 2).map(tag => (
                          <span
                            key={tag.name}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${tag.color} text-white`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex"
                  >
                    <div className="p-4 bg-purple-400/20 rounded-xl mr-5 h-fit">
                      <Info className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">War & Conflict in Art</h4>
                      <p className="text-gray-600 mb-4">Exploring artistic responses to global conflicts</p>
                      <div className="flex flex-wrap gap-2">
                        {resourceTags.slice(2, 4).map(tag => (
                          <span
                            key={tag.name}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${tag.color} text-white`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 md:col-span-2"
                  >
                    <h4 className="font-bold text-lg mb-4">Popular Resources</h4>
                    <div className="overflow-hidden rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        {revolutionArtworks.map((artwork) => (
                          <motion.div 
                            key={artwork.id} 
                            whileHover={{ y: -5, scale: 1.03 }}
                            className="relative h-32 overflow-hidden rounded-lg shadow-md"
                          >
                            <img 
                              src={artwork.imageUrl} 
                              alt={artwork.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-3">
                              <p className="text-white text-sm font-medium">{artwork.title}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section 
        ref={observerRefs.events}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isVisible.events ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Upcoming Virtual Events
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join us for exclusive online events featuring artists, curators, and scholars discussing the powerful intersection of art and politics.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isVisible.events ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-white font-medium">APRIL</p>
                  <p className="text-white font-bold text-5xl">15</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                  <p className="text-gray-500 text-sm">6:00 PM EST</p>
                </div>
                <h3 className="font-bold text-xl mb-3">Virtual Gallery Tour</h3>
                <p className="text-gray-600 mb-6">Join our curator for a virtual tour of our Revolutionary Art collection. Learn about the historical context and artistic techniques.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-white font-medium">MAY</p>
                  <p className="text-white font-bold text-5xl">03</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-pink-500 mr-2" />
                  <p className="text-gray-500 text-sm">7:30 PM EST</p>
                </div>
                <h3 className="font-bold text-xl mb-3">Artist Spotlight: Political Art Today</h3>
                <p className="text-gray-600 mb-6">A panel discussion with contemporary political artists on their practice and how they address current social issues through their work.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-white font-medium">MAY</p>
                  <p className="text-white font-bold text-5xl">22</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-gray-500 text-sm">5:00 PM EST</p>
                </div>
                <h3 className="font-bold text-xl mb-3">Workshop: Art as Protest</h3>
                <p className="text-gray-600 mb-6">Learn techniques and approaches for creating effective protest art in this hands-on virtual workshop led by renowned activist artists.</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section with Parallax Effect */}
      <section className="py-24 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Stay Updated on Political Art
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 text-lg leading-relaxed"
          >
            Subscribe to our newsletter for the latest updates on new collections, 
            resources, and virtual events. Be the first to know about exclusive content and opportunities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-5 py-4 flex-1 rounded-xl text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500 border-none"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-pink-500/25 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore art through various political and social themes that have shaped our history
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "War & Conflict", color: "bg-red-600", icon: "🔥", desc: "Artistic responses to warfare and its consequences" },
              { title: "Revolutionary Art", color: "bg-amber-600", icon: "✊", desc: "Art that fueled and documented revolutionary movements" },
              { title: "Propaganda", color: "bg-indigo-600", icon: "📢", desc: "How art has been used to sway public opinion" },
              { title: "Identity Politics", color: "bg-pink-600", icon: "🎭", desc: "Explorations of identity, representation and equality" }
            ].map((category, idx) => (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                custom={idx}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className={`${category.color} text-white p-6 text-center`}>
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.desc}</p>
                  <Link
                    to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-indigo-600 font-medium"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Quote/Testimonial Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-10 md:p-16 text-center relative"
          >
            <div className="text-6xl text-indigo-200 font-serif absolute top-6 left-6">"</div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 italic max-w-3xl mx-auto"
            >
              Art is not a mirror to reflect reality, but a hammer with which to shape it.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="font-semibold text-lg text-indigo-600"
            >
              — Bertolt Brecht
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}