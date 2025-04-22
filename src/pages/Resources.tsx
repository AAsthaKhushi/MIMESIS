import { motion } from 'framer-motion';
import { Book, Video, FileText, Link as LinkIcon, Search, ExternalLink, BookOpen, Film } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

// Define resource tags with colors
const resourceTags = [
  { name: 'Revolutionary Art', color: 'bg-pink-500' },
  { name: 'Feminism', color: 'bg-purple-500' },
  { name: 'Protest Art', color: 'bg-red-500' },
  { name: 'War & Conflict', color: 'bg-amber-500' },
  { name: 'Social Justice', color: 'bg-blue-500' },
  { name: 'Political Movements', color: 'bg-green-500' },
  { name: 'Propaganda', color: 'bg-orange-500' },
  { name: 'Digital Activism', color: 'bg-teal-500' }
];

// Define resources with tags and images
const resourcesList = [
  {
    title: 'Understanding Political Art',
    type: 'article',
    description: 'A comprehensive guide to interpreting and analyzing political artwork throughout history.',
    icon: FileText,
    image: 'https://i.pinimg.com/474x/3f/3b/19/3f3b19fdc8dc84238e4028b28c64495b.jpg',
    link: '/articles/political-art-understanding',
    tags: ['Revolutionary Art', 'Political Movements', 'Social Justice']
  },
  {
    title: 'Art & Revolution',
    type: 'book',
    description: 'Explore the relationship between art and political revolutions across different cultures and time periods.',
    icon: Book,
    image: 'https://i.pinimg.com/474x/7d/26/9f/7d269f1455ccd28fca2d20462f9dbec6.jpg',
    link: '/books/art-and-revolution',
    tags: ['Revolutionary Art', 'Protest Art', 'Political Movements']
  },
  {
    title: 'Modern Political Art',
    type: 'video',
    description: 'A video series examining contemporary political art and its impact on society.',
    icon: Video,
    image: 'https://i.pinimg.com/474x/69/30/91/6930914500fd7a609aaf7e7cf2e293ad.jpg',
    link: '/videos/modern-political-art',
    tags: ['Digital Activism', 'Social Justice', 'Protest Art']
  },
  {
    title: 'Artist Resources',
    type: 'links',
    description: 'Curated links to archives, museums, and research materials about political art.',
    icon: LinkIcon,
    image: 'https://i.pinimg.com/474x/03/de/4a/03de4a39058c4fca3a9c28d15504c09c.jpg',
    link: '/resources/artist-archives',
    tags: ['Revolutionary Art', 'Feminism', 'War & Conflict']
  },
  {
    title: 'Feminist Art Through History',
    type: 'article',
    description: 'An exploration of feminist art movements and their impact on political discourse.',
    icon: FileText,
    image: 'https://i.pinimg.com/474x/87/a5/33/87a533aa50cf7f73fd216d9fae0a468b.jpg',
    link: '/articles/feminist-art-history',
    tags: ['Feminism', 'Social Justice', 'Political Movements']
  },
  {
    title: 'Digital Age Activism',
    type: 'video',
    description: 'How modern artists use digital platforms for political expression and activism.',
    icon: Video,
    image: 'https://i.pinimg.com/474x/b8/2e/2b/b82e2b878ad832572454dfcf1b40e16f.jpg',
    link: '/videos/digital-activism',
    tags: ['Digital Activism', 'Protest Art', 'Political Movements']
  },
  {
    title: 'War in Art',
    type: 'book',
    description: 'A historical perspective on how artists have depicted war and conflict.',
    icon: Book,
    image: 'https://i.pinimg.com/474x/63/ee/6f/63ee6fea26197a4ce4fc7536e429a554.jpg',
    link: '/books/war-in-art',
    tags: ['War & Conflict', 'Protest Art', 'Political Movements']
  },
  {
    title: 'Propaganda Analysis',
    type: 'article',
    description: 'Understanding the role of art in political propaganda throughout history.',
    icon: FileText,
    image: 'https://i.pinimg.com/474x/eb/45/60/eb4560af9423fec0478ee9f258f89530.jpg',
    link: '/articles/propaganda-analysis',
    tags: ['Propaganda', 'Political Movements', 'Social Justice']
  }
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Type icons mapping
const typeIcons = {
  'article': <FileText className="h-6 w-6 text-pink-500" />,
  'book': <BookOpen className="h-6 w-6 text-pink-500" />,
  'video': <Film className="h-6 w-6 text-pink-500" />,
  'links': <ExternalLink className="h-6 w-6 text-pink-500" />
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter resources based on search query and selected tags
  const filteredResources = resourcesList.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => resource.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Get tag color
  const getTagColor = (tagName: string) => {
    const tag = resourceTags.find(t => t.name === tagName);
    return tag?.color || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-pink-400 mb-2 text-center">
          Educational Resources
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Explore our curated collection of resources on political art, movements, and their historical impact
        </motion.p>
        
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 p-6 bg-gray-900 rounded-xl shadow-lg backdrop-blur-sm border border-pink-500/30"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800 text-white border border-pink-500/30 focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {resourceTags.map(tag => (
              <motion.button
                key={tag.name}
                onClick={() => toggleTag(tag.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedTags.includes(tag.name)
                    ? `${tag.color} text-white shadow-lg shadow-${tag.color}/40`
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
              >
                {tag.name}
              </motion.button>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-pink-500/20 text-gray-400 text-sm">
            Showing {filteredResources.length} of {resourcesList.length} resources
            {selectedTags.length > 0 && (
              <span> • Filtered by {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </motion.div>
        
        {/* No results message */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            <p className="text-xl">No resources found matching your criteria</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedTags([])}}
              className="mt-4 text-pink-400 hover:text-pink-300"
            >
              Clear filters
            </button>
          </motion.div>
        )}
        
        {/* Resources Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setActiveResourceId(resource.title)}
              onHoverEnd={() => setActiveResourceId(null)}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-pink-500/20 transition-all duration-300 hover:shadow-pink-500/20 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: activeResourceId === resource.title ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div className="absolute top-3 right-3 z-20">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'article' ? 'bg-blue-900/70 text-blue-200' :
                    resource.type === 'video' ? 'bg-red-900/70 text-red-200' :
                    resource.type === 'book' ? 'bg-green-900/70 text-green-200' :
                    'bg-purple-900/70 text-purple-200'
                  }`}>
                    {typeIcons[resource.type as keyof typeof typeIcons]}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{resource.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}/30 text-${getTagColor(tag).replace('bg-', '')}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a href={resource.link} className="group inline-flex items-center text-pink-400 hover:text-pink-300 font-medium">
                  <span>Learn More</span>
                  <ExternalLink className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Resources Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-8">Research Materials</h2>
          <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-pink-500/20">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-8">
                Our collection of research materials is designed to help students, educators, and art enthusiasts
                better understand the relationship between art and politics throughout history.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-xl border border-pink-500/10 shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-pink-400/20 rounded-lg">
                      <Book className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold ml-3 text-white">For Students</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Study guides and analysis frameworks
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Historical context documents
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Artist biographies and timelines
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Movement-specific resources
                    </li>
                  </ul>
                  <button className="mt-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg inline-flex items-center transition-colors">
                    Access Student Materials
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-xl border border-pink-500/10 shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-pink-400/20 rounded-lg">
                      <Video className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold ml-3 text-white">For Educators</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Lesson plans and activities
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Discussion guides
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Assessment materials
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      Curriculum integration guides
                    </li>
                  </ul>
                  <button className="mt-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg inline-flex items-center transition-colors">
                    Access Educator Materials
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl p-8 border border-pink-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive monthly updates on new resources, 
            upcoming events, and featured political art from around the world.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white border border-pink-500/30 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}