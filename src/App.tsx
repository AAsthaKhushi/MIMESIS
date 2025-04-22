import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Timeline from './pages/Timeline';
import Artists from './pages/Artists';
import Resources from './pages/Resources';
import ArticlePoliticalArt from './pages/resources/ArticlePoliticalArt';
import BookRevolution from './pages/resources/BookRevolution';
import ModernPoliticalArt from './pages/resources/ModernPoliticalArt';
import ArtistResources from './pages/resources/ArtistResources';
import FeministArt from './pages/resources/FeministArt';
import DigitalActivism from './pages/resources/DigitalActivism';
import WarInArt from './pages/resources/WarInArt';
import PropagandaAnalysis from './pages/resources/PropagandaAnalysis';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/articles/political-art-understanding" element={<ArticlePoliticalArt />} />
            <Route path="/books/art-and-revolution" element={<BookRevolution />} />
            <Route path="/videos/modern-political-art" element={<ModernPoliticalArt />} />
            <Route path="/resources/artist-archives" element={<ArtistResources />} />
            <Route path="/articles/feminist-art-history" element={<FeministArt />} />
            <Route path="/videos/digital-activism" element={<DigitalActivism />} />
            <Route path="/books/war-in-art" element={<WarInArt />} />
            <Route path="/articles/propaganda-analysis" element={<PropagandaAnalysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;