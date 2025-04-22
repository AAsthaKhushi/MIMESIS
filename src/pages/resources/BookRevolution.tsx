import { ArrowLeft, BookOpen, Star, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ArtAndRevolution() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const chapters = [
    { number: 1, title: "Origins of Revolutionary Art" },
    { number: 2, title: "The French Revolution and Its Artistic Aftermath" },
    { number: 3, title: "Revolutionary Movements of the 19th Century" },
    { number: 4, title: "The Russian Revolution and Soviet Art" },
    { number: 5, title: "Revolutionary Art in Latin America" },
    { number: 6, title: "Asian Revolutionary Art Movements" },
    { number: 7, title: "The Civil Rights Movement and Visual Protest" },
    { number: 8, title: "Digital Revolution and Contemporary Activism" }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this book: ${url}`)}`, '_blank');
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

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link to="/resources" className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover and Info */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20 shadow-lg">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src="https://i.pinimg.com/474x/7d/26/9f/7d269f1455ccd28fca2d20462f9dbec6.jpg" 
                    alt="Art & Revolution Book Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-pink-400 mb-2">Art & Revolution</h1>
                  <p className="text-gray-300 mb-4">By Dr. Marcus Chen & Dr. Amara Johnson</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-400">4.9/5 (128 reviews)</span>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg flex items-center justify-center transition-colors">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Sample
                    </button>
                    <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center transition-colors">
                      <Download className="mr-2 h-5 w-5" />
                      Download Preview
                    </button>
                  </div>
                  
                  {/* Share Section */}
                  <div className="mt-6 pt-6 border-t border-pink-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Share</h3>
                      <div className="relative share-container">
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
              </div>
            </div>
          </div>
          
          {/* Book Content */}
          <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-pink-500/20 p-8 mb-8">
              <h2 className="text-3xl font-bold text-pink-400 mb-6">Book Overview</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  <strong>Art & Revolution</strong> explores the relationship between art and political revolutions across different cultures and time periods. 
                  This comprehensive volume examines how artists have responded to, participated in, and shaped revolutionary movements throughout history.
                </p>
              </div>
            </div>

           {/* Table of Contents */}
            <div className="bg-gray-900 rounded-xl border border-pink-500/20 p-8 mb-8">
              <h2 className="text-3xl font-bold text-pink-400 mb-6">Table of Contents</h2>
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.number}
                    onClick={() => setSelectedChapter(chapter.number)}
                    className={`w-full text-left p-4 rounded-lg transition-colors flex items-center
                      ${selectedChapter === chapter.number
                        ? 'bg-pink-500/20 border border-pink-500/30'
                        : 'bg-gray-800 hover:bg-gray-700 border border-transparent'
                      }`}
                  >
                    <span className={`mr-4 flex items-center justify-center w-8 h-8 rounded-full
                      ${selectedChapter === chapter.number
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                      }`}>
                      {chapter.number}
                    </span>
                    <span className={`font-medium ${selectedChapter === chapter.number ? 'text-pink-400' : 'text-white'}`}>
                      {chapter.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chapter Preview */}
            <div className="bg-gray-900 rounded-xl border border-pink-500/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-pink-400">
                  Chapter {selectedChapter} Preview
                </h2>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-lg text-sm">
                  Sample
                </span>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <h3>{chapters.find(ch => ch.number === selectedChapter)?.title}</h3>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in magna sed purus feugiat placerat. 
                  Nullam vestibulum, ipsum vel efficitur feugiat, nisi justo volutpat nisi, at aliquet ipsum felis 
                  vel dui. Morbi vestibulum est sit amet eros fringilla, vel lacinia justo condimentum.
                </p>
                
                <p>
                  Duis velit massa, efficitur et libero vel, posuere interdum odio. Donec in enim lacus. 
                  Nulla facilisi. Nullam pretium, dui id faucibus scelerisque, mauris ipsum interdum ipsum, 
                  vel dapibus dui arcu nec ipsum. Aliquam eget justo eleifend, placerat nibh quis, tincidunt urna.
                </p>
                
                <div className="my-6 relative h-64 md:h-80 overflow-hidden rounded-lg">
                  <img 
                    src="/api/placeholder/800/500" 
                    alt="Chapter illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p>
                  Integer maximus, erat in faucibus condimentum, augue orci pulvinar ante, a convallis nisl risus non leo. 
                  Nullam facilisis justo at sagittis volutpat. Phasellus quis dui quis magna cursus lobortis ut sed nisi. 
                  Praesent a gravida orci, nec aliquam metus.
                </p>
                
                <div className="flex justify-center mt-8">
                  <span className="text-pink-400 text-sm">
                    Continue reading with full access...
                  </span>
                </div>
              </div>
            </div>
            
            {/* Related Books */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-pink-400 mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-pink-500/20 flex">
                  <div className="w-1/3">
                    <img 
                      src="https://i.pinimg.com/474x/63/ee/6f/63ee6fea26197a4ce4fc7536e429a554.jpg" 
                      alt="War in Art"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">War in Art</h4>
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                      A historical perspective on how artists have depicted war and conflict.
                    </p>
                    <Link href="/books/war-in-art" className="text-pink-400 hover:text-pink-300 text-sm inline-flex items-center">
                      View Book
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
