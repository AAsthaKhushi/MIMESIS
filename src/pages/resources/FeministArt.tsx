import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, BookOpen, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PropagandaAnalysis() {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=Check out this article: Propaganda Analysis ${url}`);
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

  const relatedResources = [
    {
      title: "The Psychology of Propaganda: How It Influences Perception",
      type: "PDF",
      icon: <Download className="h-4 w-4" />, 
      link: "/resources/psychology-of-propaganda.pdf"
    },
    {
      title: "Historical Case Studies: Propaganda in War Times",
      type: "Article",
      icon: <ExternalLink className="h-4 w-4" />, 
      link: "/resources/propaganda-war-history"
    },
    {
      title: "Modern Media and Political Narratives",
      type: "Interactive",
      icon: <ExternalLink className="h-4 w-4" />, 
      link: "/resources/media-political-narratives"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/resources" className="inline-flex items-center text-red-400 hover:text-red-300 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Link>
        <motion.div 
          className="bg-gray-900 rounded-xl overflow-hidden border border-red-500/20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="relative">
            <img
              src="https://i.pinimg.com/564x/d4/25/bb/d425bb1a45c01c4a91cfb29a9cb3208e.jpg"
              alt="Propaganda Analysis"
              className="w-full h-64 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/40">
              <BookOpen className="h-16 w-16 text-white" />
            </button>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Propaganda Analysis</h1>
            <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Published: March 15, 2025</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>By: Dr. Thomas Reed</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-yellow-500/30 text-yellow-400 rounded-full text-sm">Media</span>
              <span className="px-3 py-1 bg-blue-500/30 text-blue-400 rounded-full text-sm">Politics</span>
              <span className="px-3 py-1 bg-red-500/30 text-red-400 rounded-full text-sm">Psychology</span>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="lead text-xl text-gray-300 mb-6">
                Propaganda is a powerful tool used to influence public opinion, often by manipulating emotions, facts, or narratives to serve a particular agenda.
              </p>
              <h2 className="text-2xl font-semibold text-red-300 mt-8 mb-4">Understanding Propaganda Techniques</h2>
              <p>
                From loaded language to fear-mongering, propaganda employs various techniques to shape perceptions. Recognizing these strategies is crucial to developing media literacy.
              </p>
              <h2 className="text-2xl font-semibold text-red-300 mt-8 mb-4">Historical Use of Propaganda</h2>
              <p>
                Governments and organizations have long used propaganda, particularly in wartime, to sway public opinion. Case studies from World War II and the Cold War illustrate its impact.
              </p>
              <h2 className="text-2xl font-semibold text-red-300 mt-8 mb-4">Modern-Day Media Manipulation</h2>
              <p>
                With the rise of social media, propaganda techniques have adapted to digital platforms, influencing elections, social movements, and public discourse.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">Related Resources</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedResources.map((resource, index) => (
                  <Link key={index} to={resource.link} className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-400 text-sm font-medium">{resource.type}</span>
                      {resource.icon}
                    </div>
                    <h4 className="text-white font-medium">{resource.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
