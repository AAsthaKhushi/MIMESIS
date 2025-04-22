import { ArrowLeft, Calendar, User, Share2, PlayCircle, Clock, ChevronRight, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface Episode {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

export default function ModernPoliticalArtVideo() {
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const episodes: Episode[] = [
    {
      id: 1,
      title: "The Rise of Digital Activism",
      duration: "28:45",
      description: "How artists utilize digital tools to create and distribute political art in the modern era.",
      thumbnail: "https://i.pinimg.com/736x/cc/04/f9/cc04f90066665bcfc834e28a5bb8b336.jpg",
      youtubeId: "JhOJ3YH4JW4"
    },
    {
      id: 2,
      title: "Street Art as Political Commentary",
      duration: "32:17",
      description: "Exploring how street artists use public spaces to challenge political narratives.",
      thumbnail: "https://i.pinimg.com/474x/7d/26/4e/7d264ec90a2e2f4856c72a35e3c20ac1.jpg",
      youtubeId: "4GNoUYZhrT0"
    },
    {
      id: 3,
      title: "Memes and Political Discourse",
      duration: "25:33",
      description: "Analyzing how internet memes function as a form of accessible political art.",
      thumbnail: "https://i.pinimg.com/474x/17/a1/1d/17a11d5f128dff368e679c8521a3a904.jpg",
      youtubeId: "K4d9uJkW_1Y"
    },
    {
      id: 4,
      title: "Data Visualization as Activism",
      duration: "30:05",
      description: "The power of data-driven art in highlighting social and political issues.",
      thumbnail: "https://i.pinimg.com/474x/a3/53/cd/a353cd2e94a24b54772bdb713fe9ccec.jpg",
      youtubeId: "5Zg-C8AAIGg"
    }
  ];
  
  const currentVideo = episodes.find(ep => ep.id === currentEpisode) || episodes[0];

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Reset playback state when changing episodes
    setIsPlaying(false);
  }, [currentEpisode]);

  const playVideo = () => {
    // Instead of embedding the video, redirect to YouTube
    window.open(`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`, '_blank');
  };

  const handleDownload = () => {
    window.open(`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`, '_blank');
  };
  
  const handleShare = (platform: string) => {
    const url = `https://www.youtube.com/watch?v=${currentVideo.youtubeId}`;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out "${currentVideo.title}" from the Modern Political Art series`)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this video: ${url}`)}`, '_blank');
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'threads':
        window.open(`https://www.threads.net/share?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Failed to copy link: ', err));
        break;
    }
    
    setShowShareOptions(false);
  };

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareOptions && !(event.target as Element).closest('.share-container')) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareOptions]);
  
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link to="/resources" className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
        
        <div className="lg:flex gap-8">
          {/* Main Video Section */}
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            {/* Video Player */}
            <div 
              ref={playerRef}
              className="relative rounded-xl overflow-hidden aspect-video bg-gray-900 mb-6"
            >
              {!isPlaying && (
                <>
                  <img 
                    src={currentVideo.thumbnail} 
                    alt={currentVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={playVideo}
                      className="p-4 rounded-full bg-pink-500/80 hover:bg-pink-500 transition-colors transform hover:scale-105"
                    >
                      <PlayCircle className="h-12 w-12 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-white mr-2" />
                        <span className="text-white text-sm">{currentVideo.duration}</span>
                      </div>
                      <button 
                        onClick={handleDownload}
                        className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded text-xs text-white flex items-center"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Watch on YouTube
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Video Info */}
            <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-4">
              Modern Political Art: Episode {currentEpisode}
            </h1>
            <h2 className="text-2xl text-white mb-4">{currentVideo.title}</h2>
            
            <div className="flex flex-wrap items-center text-gray-400 gap-6 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Presenter: Alex Roberts</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Released: March 13, 2025</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500 text-white">
                Digital Activism
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                Protest Art
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                Social Justice
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500 text-white">
                Episode {currentEpisode}
              </span>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none mt-8">
              <p className="text-lg">{currentVideo.description}</p>
              <p>
                This video series examines contemporary political art and its impact on society. Each episode focuses on a different medium or approach, providing historical context, artist interviews, and analysis of significant works.
              </p>
              <p>
                The series explores how modern artists navigate complex political landscapes using both traditional and emerging technologies. From viral videos to interactive installations, we analyze how these art forms influence public opinion and contribute to political discourse.
              </p>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-pink-500/20 my-8">
                <h3 className="text-pink-400 text-xl font-bold mb-4">Additional Resources</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Download className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Companion reading guide with detailed references</span>
                  </li>
                  <li className="flex items-start">
                    <Download className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Extended interviews with featured artists</span>
                  </li>
                  <li className="flex items-start">
                    <Download className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Discussion questions for classroom or group settings</span>
                  </li>
                  <li className="flex items-start">
                    <Download className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Curated list of related artworks and installations</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-pink-500/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Share this video</h3>
                <div className="relative share-container">
                  <button 
                    className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    onClick={() => setShowShareOptions(!showShareOptions)}
                  >
                    <Share2 className="h-5 w-5 text-pink-400" />
                  </button>
                  
                  {showShareOptions && (
                    <div className="absolute right-0 bottom-12 bg-gray-800 rounded-lg shadow-xl p-3 w-48 z-10 border border-pink-500/20">
                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          <span className="mr-2">𝕏</span> Twitter
                        </button>
                        <button 
                          onClick={() => handleShare('facebook')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          <span className="mr-2">f</span> Facebook
                        </button>
                        <button 
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          <span className="mr-2">in</span> LinkedIn
                        </button>
                        <button 
                          onClick={() => handleShare('whatsapp')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          📱 WhatsApp
                        </button>
                        <button 
                          onClick={() => handleShare('instagram')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          📷 Instagram
                        </button>
                        <button 
                          onClick={() => handleShare('threads')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          🔗 Threads
                        </button>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button 
                          onClick={() => handleShare('copy')}
                          className="flex items-center p-2 hover:bg-gray-700 rounded text-white text-sm"
                        >
                          <span className="mr-2">🔗</span> Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Episodes List */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20 sticky top-6">
              <div className="p-4 bg-gray-800 border-b border-pink-500/20">
                <h3 className="text-xl font-bold text-white">All Episodes</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {episodes.map(episode => (
                    <button 
                      key={episode.id}
                      onClick={() => setCurrentEpisode(episode.id)}
                      className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${
                        currentEpisode === episode.id 
                          ? 'bg-pink-500/20 border border-pink-500/30' 
                          : 'hover:bg-gray-800'
                      }`}
                    >
                      <div className="relative flex-shrink-0 w-24 h-16 rounded overflow-hidden">
                        <img 
                          src={episode.thumbnail} 
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center ${
                          currentEpisode === episode.id ? 'bg-black/40' : 'bg-black/60 opacity-0 hover:opacity-100'
                        }`}>
                          <PlayCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className={`font-medium ${
                          currentEpisode === episode.id ? 'text-pink-400' : 'text-white'
                        }`}>
                          Episode {episode.id}: {episode.title}
                        </h4>
                        <div className="flex items-center mt-1 text-sm text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{episode.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 flex-shrink-0 self-center ${
                        currentEpisode === episode.id ? 'text-pink-400' : 'text-gray-600'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Instructor Info */}
            <div className="mt-6 bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20">
              <div className="p-4 bg-gray-800 border-b border-pink-500/20">
                <h3 className="text-xl font-bold text-white">About the Presenter</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-pink-500">
                    <img 
                      src="/api/placeholder/200/200" 
                      alt="Alex Roberts"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Alex Roberts</h4>
                    <p className="text-gray-400">Digital Art Curator</p>
                    <div className="flex space-x-2 mt-1">
                      <button className="text-xs text-pink-400 hover:text-pink-300">Follow</button>
                      <span className="text-gray-600">•</span>
                      <button className="text-xs text-pink-400 hover:text-pink-300">More videos</button>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Alex Roberts is a curator specializing in digital and political art forms. They have organized exhibitions at major museums worldwide and contributed to several publications on contemporary art practices.
                </p>
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-pink-500/10">
                  <p className="text-white text-sm italic">
                    "Art has always been political. What's changed is our ability to share these messages instantly across global platforms."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Next Episode Teaser */}
            {currentEpisode < episodes.length && (
              <div className="mt-6 bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20">
                <div className="p-4 bg-gray-800 border-b border-pink-500/20">
                  <h3 className="text-xl font-bold text-white">Up Next</h3>
                </div>
                <div className="p-4">
                  <div className="relative rounded overflow-hidden mb-3">
                    <img 
                      src={episodes[currentEpisode].thumbnail} 
                      alt={episodes[currentEpisode].title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                      <h4 className="text-white font-medium">
                        Episode {currentEpisode + 1}: {episodes[currentEpisode].title}
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentEpisode(currentEpisode + 1)}
                    className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium flex items-center justify-center"
                  >
                    Watch Next Episode
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}