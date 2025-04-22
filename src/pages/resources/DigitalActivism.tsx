import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, PlayCircle, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DigitalAgeActivism() {
  // State for controlling share options display
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  // Handle share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=Check out this video: Digital Age Activism ${url}`);
        break;
      case 'instagram':
        alert('Opening Instagram sharing...');
        // In a real app, this would integrate with Instagram's sharing API
        break;
      case 'threads':
        alert('Opening Threads sharing...');
        // In a real app, this would integrate with Threads' sharing API
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

  // Sample related resources
  const relatedResources = [
    {
      title: "Hashtag Movements: From #BlackLivesMatter to #MeToo",
      type: "Report",
      icon: <Download className="h-4 w-4" />,
      link: "/resources/hashtag-movements-report.pdf"
    },
    {
      title: "Digital Security for Activists",
      type: "Guide",
      icon: <ExternalLink className="h-4 w-4" />,
      link: "/resources/digital-security"
    },
    {
      title: "Impact Analysis: Online Campaigns vs. Physical Protests",
      type: "Research",
      icon: <ExternalLink className="h-4 w-4" />,
      link: "/resources/online-vs-physical-activism"
    }
  ];

  // Video runtime in minutes
  const videoRuntime = 24;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          to="/resources"
          className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>
        <motion.div 
          className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="relative">
            <img
              src="https://i.pinimg.com/474x/b8/2e/2b/b82e2b878ad832572454dfcf1b40e16f.jpg"
              alt="Digital Age Activism"
              className="w-full h-64 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/40">
              <PlayCircle className="h-16 w-16 text-white" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
              {Math.floor(videoRuntime/60)}:{(videoRuntime % 60).toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-pink-400 mb-4">
              Digital Age Activism
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Released: March 20, 2025</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>By: Tech Arts Collective</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-teal-500/30 text-teal-400 rounded-full text-sm">
                Digital Activism
              </span>
              <span className="px-3 py-1 bg-red-500/30 text-red-400 rounded-full text-sm">
                Protest Art
              </span>
              <span className="px-3 py-1 bg-blue-500/30 text-blue-400 rounded-full text-sm">
                Political Movements
              </span>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="lead text-xl text-gray-300 mb-6">
                This documentary explores how digital tools and platforms have transformed activism in the 21st century, creating new forms of protest, organization, and social change.
              </p>
              
              <h2 className="text-2xl font-semibold text-pink-300 mt-8 mb-4">Video Overview</h2>
              <p>
                "Digital Age Activism" examines how social media, mobile technology, and digital networks have revolutionized the way social movements organize and amplify their messages. Through interviews with activists, scholars, and tech experts, this documentary traces the evolution from early internet activism to today's sophisticated digital campaigns.
              </p>
              
              <h2 className="text-2xl font-semibold text-pink-300 mt-8 mb-4">Key Topics Covered</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The rise of hashtag movements and their real-world impact</li>
                <li>Digital tools for organizing protests and direct actions</li>
                <li>How activists navigate algorithmic bias and platform censorship</li>
                <li>The role of citizen journalism in documenting protests</li>
                <li>Digital security and privacy for activists facing surveillance</li>
                <li>Cross-border solidarity networks enabled by technology</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-pink-300 mt-8 mb-4">Featured Case Studies</h2>
              <p>
                The documentary highlights several landmark digital activism campaigns, including the Arab Spring, #BlackLivesMatter, #MeToo, climate justice digital campaigns, and global mutual aid networks during the COVID-19 pandemic. Through these examples, we see both the transformative potential and limitations of digital activism.
              </p>
              
              <h2 className="text-2xl font-semibold text-pink-300 mt-8 mb-4">Expert Perspectives</h2>
              <p>
                Featured interviews include prominent digital rights advocates, veteran organizers who transitioned from pre-internet activism, tech workers engaged in ethical technology movements, and researchers studying the intersection of technology and social movements. These diverse perspectives offer a nuanced view of how digital tools can both empower and complicate activist work.
              </p>
              
              <h2 className="text-2xl font-semibold text-pink-300 mt-8 mb-4">Future Directions</h2>
              <p>
                The documentary concludes by exploring emerging trends in digital activism, including the use of augmented reality in protests, blockchain for transparent movement governance, and how activists are responding to increasing platform monopolization and algorithmic control. It raises critical questions about digital autonomy and the need for activist-controlled technology infrastructure.
              </p>
            </div>
            
            {/* Related Resources Section */}
            <div className="mt-12 pt-8 border-t border-pink-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Related Resources</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedResources.map((resource, index) => (
                  <Link 
                    key={index}
                    to={resource.link}
                    className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-pink-400 text-sm font-medium">{resource.type}</span>
                      {resource.icon}
                    </div>
                    <h4 className="text-white font-medium">{resource.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-pink-500/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Share this video</h3>
                <div className="relative">
                  <button 
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    onClick={() => setShowShareOptions(!showShareOptions)}
                  >
                    <Share2 className="h-4 w-4 text-pink-400" />
                  </button>
                  {showShareOptions && (
                    <div className="absolute right-0 bottom-12 bg-gray-800 rounded-lg shadow-xl p-3 w-48 z-10 border border-pink-500/20">
                      <div className="flex flex-col space-y-2">
                        <button onClick={() => handleShare('whatsapp')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">📱 WhatsApp</button>
                        <button onClick={() => handleShare('instagram')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">📷 Instagram</button>
                        <button onClick={() => handleShare('threads')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">🔗 Threads</button>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button onClick={() => handleShare('copy')} className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm">🔗 Copy Link</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}