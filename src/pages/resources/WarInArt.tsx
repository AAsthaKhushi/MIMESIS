import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, User, Share2, BookOpen, Download, ExternalLink,
  Eye, Clock, ChevronDown, ChevronRight, MessageSquare, Star, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WarInArt() {
  // State management
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: "Maria K.", content: "This article beautifully connects historical context with artistic expression.", time: "2 hours ago" },
    { id: 2, user: "David L.", content: "I never realized how prominently art was used as propaganda during WWII. The examples provided here are eye-opening.", time: "5 hours ago" }
  ]);
  const [commentInput, setCommentInput] = useState("");
  const [showFullComments, setShowFullComments] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Handle scroll for reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!isReading) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReading]);

  // Handle sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this fascinating article about War in Art";
      
    switch(platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)} ${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'instagram':
        alert('Opening Instagram sharing...');
        break;
      case 'threads':
        alert('Opening Threads sharing...');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  };

  // Add a comment
  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    
    const newComment = {
      id: comments.length + 1,
      user: "You",
      content: commentInput,
      time: "Just now"
    };
    
    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  // Article sections data
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: "Throughout history, art has captured the horrors, heroism, and heartbreak of war. From ancient relief sculptures to modern digital expressions, artistic representations of war provide unique historical and emotional insights."
    },
    {
      id: "classical",
      title: "Classical War Art",
      content: "Ancient civilizations, such as the Greeks and Romans, used sculptures and murals to depict legendary battles and victories, reinforcing national pride and historical narratives. These works served dual purposes: documenting military achievements and glorifying rulers.\n\nThe Alexander Mosaic from Pompeii, dating to the 1st century BC, depicts Alexander the Great's victory over King Darius III of Persia. This detailed battle scene not only commemorates the historic conflict but uses artistic techniques to emphasize Alexander's leadership and the chaos of the Persian forces.\n\nSimilarly, Trajan's Column in Rome chronicles the emperor's military campaigns in an elaborate spiral relief, providing a visual narrative of conquest that citizens could understand regardless of literacy."
    },
    {
      id: "propaganda",
      title: "Propaganda and Political Art",
      content: "Governments have historically used art as a propaganda tool to influence public sentiment. Posters from World War I and II, Soviet-era murals, and Cold War illustrations all serve as examples of art shaping national ideologies.\n\nDuring World War II, both Allied and Axis powers produced striking visual propaganda. The United States' iconic 'Uncle Sam' recruiting posters and Rosie the Riveter imagery mobilized citizens. Meanwhile, Nazi Germany employed art to spread antisemitic messages and cultivate support for the regime.\n\nSoviet Socialist Realism glorified workers and military personnel while promoting party ideology. These highly controlled artistic expressions demonstrate how regimes can harness creative mediums to shape public consciousness."
    },
    {
      id: "memorialization",
      title: "The Role of Art in Memorialization",
      content: "War memorials and post-war art often focus on remembrance and healing. Works such as Picasso's *Guernica* or Vietnam War photography remind us of the deep scars left by conflict.\n\nPicasso's Guernica stands as perhaps the most powerful anti-war painting in history. Created in response to the bombing of Guernica, Spain, during the Spanish Civil War, the monumental work uses fractured forms and agonized figures to convey the brutality of modern warfare on civilian populations.\n\nContemporary war memorials like Maya Lin's Vietnam Veterans Memorial in Washington D.C. take a different approach. The minimalist black granite wall listing the names of fallen soldiers creates a space for personal reflection and collective mourning.\n\nPhotojournalism from conflict zones, like Nick Ut's Pulitzer Prize-winning 'Napalm Girl' photograph from the Vietnam War, provides raw documentation that shaped public opinion. These images continue to serve as powerful reminders of war's human cost."
    },
    {
      id: "modern",
      title: "Modern War Art and Digital Expression",
      content: "Contemporary artists engage with themes of war using new media and perspectives. From installations addressing drone warfare to virtual reality experiences simulating conflict zones, artists continue to challenge how we perceive and process modern warfare.\n\nArtists like Trevor Paglen examine the invisible infrastructure of modern warfare, photographing classified military installations and drone paths. His work questions the distancing effect of technology in contemporary conflicts.\n\nDigital artists create immersive experiences that place viewers in the midst of refugee experiences or combat scenarios, fostering empathy through virtual engagement with others' suffering. These technological approaches to war art represent the evolution of a tradition stretching back to humanity's earliest conflicts."
    }
  ];

  // Related resources
  const relatedResources = [
    {
      title: "The Art of War Propaganda",
      type: "PDF",
      icon: <Download className="h-4 w-4" />, 
      link: "/resources/art-war-propaganda.pdf",
      desc: "A comprehensive analysis of 20th century propaganda posters"
    },
    {
      title: "How Artists Depicted War Through History",
      type: "Article",
      icon: <ExternalLink className="h-4 w-4" />,
      link: "/resources/war-art-history",
      desc: "Chronological exploration from ancient to modern war representations"
    },
    {
      title: "The Role of Art in War Memorials",
      type: "Interactive",
      icon: <ExternalLink className="h-4 w-4" />,
      link: "/resources/war-memorials",
      desc: "Virtual tour of significant war memorials and their artistic elements"
    },
    {
      title: "Women Artists and War",
      type: "Video Series",
      icon: <ExternalLink className="h-4 w-4" />,
      link: "/resources/women-war-artists",
      desc: "Exploring often overlooked contributions of female war artists"
    }
  ];

  // Start reading mode
  const beginReading = () => {
    setIsReading(true);
    setActiveSection("introduction");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Reading progress bar */}
        {isReading && (
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/resources" className="inline-flex items-center text-red-400 hover:text-red-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          
          {isReading ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTableOfContents(!showTableOfContents)} 
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
              >
                <span>Contents</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <button 
                onClick={() => setIsReading(false)} 
                className="px-3 py-1 rounded bg-gray-800 text-sm text-white hover:bg-gray-700"
              >
                Exit Reading Mode
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => handleShare('copy')}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Share2 className="h-4 w-4 text-red-400" />
              </button>
              <button
                onClick={beginReading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Read Article
              </button>
            </div>
          )}
        </div>
        
        {/* Table of Contents Dropdown */}
        <AnimatePresence>
          {showTableOfContents && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800 rounded-lg p-4 mb-6 border border-red-500/20 absolute z-40 right-4 w-64"
            >
              <h3 className="text-white font-medium mb-2">Table of Contents</h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      className={`block w-full text-left px-2 py-1 rounded ${activeSection === section.id ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      onClick={() => {
                        setActiveSection(section.id);
                        setShowTableOfContents(false);
                        document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <motion.div 
          className="bg-gray-900 rounded-xl overflow-hidden border border-red-500/20" 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
        >
          {/* Cover image */}
          {!isReading && (
            <div className="relative">
              <img 
                src="https://i.pinimg.com/474x/dc/62/2d/dc622d4d1a5a65065e883215efcbf4da.jpg" 
                alt="War in Art" 
                className="w-full h-64 md:h-80 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center space-x-2 text-red-400 mb-2">
                  <span className="uppercase text-sm font-medium tracking-wider">Featured Article</span>
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  <span className="text-sm">8 min read</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">War in Art</h1>
                <p className="text-gray-300 max-w-xl">
                  Exploring how artists through history have captured conflict, from ancient battle scenes to modern digital expressions
                </p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Article header - show only in reading mode */}
            {isReading && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-red-400 mb-3">War in Art</h1>
                <div className="flex flex-wrap items-center text-gray-400 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: March 14, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>By: Dr. Alex Carter</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>1,234 views</span>
                  </div>
                </div>
              </div>
            )}

            {/* Preview mode */}
            {!isReading ? (
              <>
                <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: March 14, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>By: Dr. Alex Carter</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>1,234 views</span>
                  </div>
                </div>

                {/* Article preview */}
                <div className="prose prose-invert mb-6">
                  <p className="text-gray-300 mb-4">
                    Throughout history, art has captured the horrors, heroism, and heartbreak of war. From ancient relief sculptures to modern digital expressions, artistic representations of war provide unique historical and emotional insights.
                  </p>
                  <p className="text-gray-400">
                    This article explores how artists across different eras have depicted conflict, examining the evolution of war art from classical representations to contemporary digital media...
                  </p>
                </div>

                {/* Article sections preview */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-white font-semibold">In this article:</h3>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id} className="flex items-center text-gray-300 hover:text-red-400">
                        <ChevronRight className="h-4 w-4 mr-2 text-red-400" />
                        <span>{section.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action */}
                <div className="mt-8">
                  <button
                    onClick={beginReading}
                    className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Read Full Article
                  </button>
                </div>
              </>
            ) : (
              /* Reading mode */
              <div className="prose prose-invert max-w-none">
                {sections.map((section) => (
                  <motion.section 
                    key={section.id}
                    id={section.id}
                    initial="hidden"
                    animate="visible"
                    variants={slideUp}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-red-400 mb-4">
                      {section.title}
                    </h2>
                    <div className="text-gray-300 whitespace-pre-line">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>
            )}
          </div>

          {/* Share options */}
          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-20 right-4 bg-gray-800 rounded-lg p-4 z-40 border border-red-500/20"
              >
                <h3 className="text-white font-medium mb-2">Share article</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['twitter', 'facebook', 'whatsapp', 'instagram', 'threads', 'copy'].map(platform => (
                    <button
                      key={platform}
                      onClick={() => handleShare(platform)}
                      className="flex flex-col items-center p-2 rounded hover:bg-gray-700"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mb-1">
                        <span className="text-white uppercase text-xs">
                          {platform === 'twitter' ? 'X' : platform.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-300 text-xs capitalize">
                        {platform === 'copy' ? 'Copy Link' : platform}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related resources */}
        <motion.section 
          className="mt-12" 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
        >
          <h2 className="text-xl font-bold text-white mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{resource.desc}</p>
                    <div className="flex items-center">
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2">
                        {resource.type}
                      </span>
                      <Link to={resource.link} className="text-red-400 text-sm hover:text-red-300">
                        Access Resource
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comments section */}
        <motion.section 
          className="mt-12 bg-gray-900 rounded-xl p-6 border border-red-500/20" 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Discussion ({comments.length})</h2>
            <div className="flex space-x-2">
              <button className="flex items-center text-gray-400 hover:text-white">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm">Popular</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-white">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Recent</span>
              </button>
            </div>
          </div>

          {/* Comment input */}
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-gray-800 text-white rounded-lg p-3 min-h-[100px] border border-gray-700 focus:border-red-500/50 focus:outline-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    disabled={commentInput.trim() === ""}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-6">
            {(showFullComments ? comments : comments.slice(0, 2)).map((comment) => (
              <motion.div 
                key={comment.id}
                variants={slideUp}
                className="flex items-start space-x-3"
              >
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-white mr-2">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="text-sm text-gray-400 hover:text-red-400 flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </button>
                    <button className="text-sm text-gray-400 hover:text-red-400 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {comments.length > 2 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowFullComments(!showFullComments)}
                className="text-red-400 hover:text-red-300"
              >
                {showFullComments ? 'Show less comments' : `View all ${comments.length} comments`}
              </button>
            </div>
          )}
        </motion.section>

        {/* Floating action buttons - only in reading mode */}
        {isReading && (
          <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg"
            >
              <Share2 className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 text-white rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}