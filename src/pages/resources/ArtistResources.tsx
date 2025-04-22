import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Download, Search, Filter, Globe, Book, Camera, Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

// Trending artworks for horizontal gallery
const trendingArtworks = [
  {
    id: 1,
    title: "The Fire of Revolution",
    artist: "Ivan Petrov",
    year: 2023,
    image: "https://i.pinimg.com/736x/9e/1b/c6/9e1bc603835e2a6ad2c5d10e042da67d.jpg",
    description: "A powerful depiction of the flames of rebellion engulfing a city."
  },
  {
    id: 2,
    title: "The Last Stand",
    artist: "Sophia Moreau",
    year: 2024,
    image: "https://img1.wsimg.com/isteam/ip/2aa61928-a09e-4034-9c46-1f1e7d7a4288/Enlight1212b.jpg",
    description: "A dramatic portrayal of soldiers holding their ground in battle."
  },
  {
    id: 3,
    title: "Echoes of War",
    artist: "Marco D’Angelo",
    year: 2025,
    image: "https://i.pinimg.com/474x/ce/73/d0/ce73d0c439f71ef9a3a5ffff7f90ca25.jpg",
    description: "A haunting representation of war’s lingering effects on the human soul."
  },
  {
    id: 4,
    title: "Revolutionary Spirit",
    artist: "Elena Kuznetsova",
    year: 2024,
    image: "https://images.saatchiart.com/saatchi/773187/art/2615216/1685109-HSC00001-7.jpg",
    description: "A symbolic depiction of hope and resistance rising from oppression."
  },
  {
    id: 5,
    title: "The Battlefield’s Lament",
    artist: "Haruto Takeda",
    year: 2023,
    image: "https://i.pinimg.com/474x/55/a9/ef/55a9ef252f317c1c350cd11a902e9295.jpg",
    description: "A melancholic view of the aftermath of war, filled with sorrow and loss."
  },
  {
    id: 6,
    title: "Freedom’s Cry",
    artist: "Isabel Fernandez",
    year: 2025,
    image: "https://pixel.nymag.com/imgs/fashion/daily/2017/07/28/silent-parade/28-silent-parade.w330.h330.jpg",
    description: "A striking image of a revolutionary leader rallying people for freedom."
  },
  {
    id: 7,
    title: "The Silent March",
    artist: "William Carter",
    year: 2024,
    image: "https://a.1stdibscdn.com/sax-berlin-paintings-cry-for-freedom-the-promise-of-america-neo-expressionist-oil-painting-for-sale/a_189/a_130928921695048502321/Cry_For_Freedom_The_Promise_of_America_master.jpeg",
    description: "A compelling piece capturing a protest march for justice and change."
  },
  {
    id: 8,
    title: "Torn Flags, Unbroken Spirits",
    artist: "Chen Wei",
    year: 2023,
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-maidens-lament-horace-vernet.jpg",
    description: "A symbolic representation of perseverance amid destruction."
  },
  {
    id: 9,
    title: "Capital Reimagined",
    artist: "Marcus Johnson",
    year: 2023,
    image: "https://www.vice.com/wp-content/uploads/sites/2/2017/03/1488818132379-In-Context_1000.jpeg",
    description: "Critical examination of economic systems"
  }
];



// Art gallery showcase items for the carousel
const featuredGalleries = [
  {
    id: 1,
    name: "Tate Modern",
    location: "London, UK",
    image: "/api/placeholder/800/400",
    description: "World-renowned for its collection of political art and revolutionary movements",
    link: "https://www.tate.org.uk/visit/tate-modern"
  },
  {
    id: 2,
    name: "MoMA",
    location: "New York, USA",
    image: "/api/placeholder/800/400",
    description: "Featuring groundbreaking political art that shaped 20th century movements",
    link: "https://www.moma.org/"
  },
  {
    id: 3,
    name: "Centre Pompidou",
    location: "Paris, France",
    image: "/api/placeholder/800/400",
    description: "Houses extensive collections documenting revolutionary art practices",
    link: "https://www.centrepompidou.fr/en"
  }
];

// Expanded resource categories
const resources = [
  {
    title: "Museum Digital Archives",
    type: "Database",
    description: "Access digital archives from major museums worldwide featuring political art collections.",
    link: "https://artsandculture.google.com/",
    tags: ["Archives", "Museums", "Digital Collections"],
    icon: <Archive />
  },
  {
    title: "Revolutionary Artist Manifestos",
    type: "Documents",
    description: "Historical manifestos from political art movements and revolutionary artists.",
    link: "https://www.writing.upenn.edu/library/manifestos.html",
    tags: ["History", "Theory", "Movements"],
    icon: <Book />
  },
  {
    title: "Academic Research Papers",
    type: "Academic",
    description: "Scholarly articles analyzing the intersection of art and political movements.",
    link: "https://www.jstor.org/",
    tags: ["Academic", "Research", "Analysis"],
    icon: <Book />
  },
  {
    title: "Contemporary Political Art News",
    type: "News",
    description: "Latest news and developments in the world of political and activist art.",
    link: "https://hyperallergic.com/",
    tags: ["News", "Contemporary", "Critique"],
    icon: <ExternalLink />
  },
  {
    title: "Activist Art Collectives",
    type: "Directory",
    description: "Directory of global art collectives focused on political activism and social change.",
    link: "#",
    tags: ["Activism", "Collectives", "Directory"],
    icon: <Globe />
  },
  {
    title: "Revolution Photography Archives",
    type: "Visual Archive",
    description: "Historical photographs documenting political revolutions and social movements.",
    link: "#",
    tags: ["Photography", "History", "Documentation"],
    icon: <Camera />
  }
];

// Global museums famous for political art
const politicalArtMuseums = [
  {
    name: "Museo Reina Sofía",
    location: "Madrid, Spain",
    image: "https://i.pinimg.com/736x/13/69/a7/1369a73181380fea512d8dbe67bd1646.jpg",
    description: "Home to Picasso's Guernica and extensive collections on Spanish Civil War art",
    link: "https://www.museoreinasofia.es/en"
  },
  {
    name: "Mexican Museum of Art",
    location: "Mexico City, Mexico",
    image: "https://funlifecrisis.com/wp-content/uploads/2016/08/National-Museum-of-Art-Museo-Nacional-de-Arte-Mexico-City.jpg",
    description: "Features revolutionary muralists including Rivera, Orozco, and Siqueiros",
    link: "#"
  },
  {
    name: "Museum of Political History",
    location: "St. Petersburg, Russia",
    image: "https://tse2.mm.bing.net/th?id=OIP.5pzUKNoxXnZDzlZWDsImUgHaE5&w=313&h=313&c=7",
    description: "Documents Russian revolutionary art and Soviet propaganda",
    link: "#"
  },
  {
    name: "DDR Museum",
    location: "Berlin, Germany",
    image: "https://i.pinimg.com/474x/bd/f7/c7/bdf7c75ba4c7fc4b3485784d19232550.jpg",
    description: "Showcases Cold War political art and state propaganda",
    link: "https://www.ddr-museum.de/en"
  },
  {
    name: "National Museum of China",
    location: "Beijing, China",
    image: "https://www.gpsmycity.com/img/gd_sight/16303.jpg",
    description: "Houses extensive collections of revolutionary art and Cultural Revolution pieces",
    link: "#"
  },
  {
    name: "Museo de Bellas Artes",
    location: "Havana, Cuba",
    image: "https://tse2.mm.bing.net/th?id=OIP.sD2fR5OEvC8JkTB01xXwjAHaHa&w=474&h=474&c=7",
    description: "Features revolutionary Cuban art and political expressions",
    link: "#"
  }
];

export default function ArtistResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGallery, setActiveGallery] = useState(0);
  const [resourceType, setResourceType] = useState('All');
  const horizontalScrollRef = useRef(null);

  // Horizontal scroll handlers
  const scrollLeft = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Filter resources based on search query and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = resourceType === 'All' || resource.type === resourceType;
    
    return matchesSearch && matchesType;
  });

  // Get unique resource types for filter
  const resourceTypes = ['All', ...new Set(resources.map(r => r.type))];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link 
          to="/resources"
          className="inline-flex items-center text-pink-500 hover:text-pink-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>

        {/* Trending Artworks Horizontal Gallery */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Trending Political Art</h1>
            <div className="flex space-x-2">
              <button 
                onClick={scrollLeft}
                className="p-2 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={scrollRight}
                className="p-2 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div 
            ref={horizontalScrollRef}
            className="flex overflow-x-auto pb-6 space-x-6 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingArtworks.map((artwork) => (
              <div 
                key={artwork.id} 
                className="flex-none w-64 bg-white rounded-lg overflow-hidden shadow-md border border-pink-100"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{artwork.title}</h3>
                  <p className="text-pink-500 text-sm">by {artwork.artist}, {artwork.year}</p>
                  <p className="text-gray-600 text-sm mt-2">{artwork.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom CSS to hide scrollbar */}
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Featured Galleries Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Featured Political Art Galleries</h1>
          
          <div className="relative overflow-hidden rounded-xl shadow-lg mb-6">
            {featuredGalleries.map((gallery, index) => (
              <motion.div 
                key={gallery.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeGallery ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-96">
                  <img 
                    src={gallery.image} 
                    alt={gallery.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h2 className="text-3xl font-bold text-white">{gallery.name}</h2>
                    <p className="text-lg text-white/80 mb-2">{gallery.location}</p>
                    <p className="text-white/90 mb-4 max-w-2xl">{gallery.description}</p>
                    <a 
                      href={gallery.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md w-max transition-colors"
                    >
                      Visit Gallery
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Navigation dots */}
            <div className="absolute bottom-6 right-6 flex space-x-2">
              {featuredGalleries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveGallery(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeGallery ? 'bg-pink-500' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View gallery ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-pink-50 rounded-xl overflow-hidden border border-pink-200 shadow-md mb-16">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Political Art Resources</h1>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-800 border border-pink-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                />
              </div>
              
              <div className="relative min-w-[180px]">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-800 border border-pink-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 appearance-none focus:outline-none cursor-pointer"
                >
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Resource Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="mr-3 text-pink-500">
                          {resource.icon}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
                      </div>
                      <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-pink-500 hover:text-pink-600"
                      >
                        Access Resource
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                      <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                        <Download className="h-4 w-4 mr-2" />
                        Save
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  No resources found matching your search criteria
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Museums Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Museums of Political & Revolutionary Art</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Explore these museums around the world that house significant collections related to wars, revolutions, and political movements.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {politicalArtMuseums.map((museum, index) => (
              <motion.div
                key={museum.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-pink-100"
              >
                <div className="relative h-48">
                  <img 
                    src={museum.image} 
                    alt={museum.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{museum.name}</h3>
                  <p className="text-pink-500 text-sm mb-3">{museum.location}</p>
                  <p className="text-gray-600 mb-4">{museum.description}</p>
                  <a
                    href={museum.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-500 hover:text-pink-600"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated on Political Art Events</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest exhibitions, new acquisitions, and political art movements around the world.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg border-y border-l border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}