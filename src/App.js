import React, { useState, useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';

// Import all components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LoveStory from './components/LoveStory';
import Timeline from './components/Timeline';
import Locations from './components/Locations';
import Directions from './components/Directions';
import Accommodations from './components/Accommodations';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import MusicWishes from './components/MusicWishes';
import PhotoUpload from './components/PhotoUpload';
import Gifts from './components/Gifts';
import Dresscode from './components/Dresscode';
import ContactWitnesses from './components/ContactWitnesses';
import FAQ from './components/FAQ';
import WeddingABC from './components/WeddingABC';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Page components (for separate routes)
// import AdminDashboard from './components/AdminDashboard';
// import ArchivePage from './components/ArchivePage';
// import SaveTheDate from './components/SaveTheDate';

function App() {
  const [loading, setLoading] = useState(true);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Unsere Geschichte' },
    { id: 'timeline', label: 'Ablauf' },
    { id: 'location', label: 'Locations' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'contact', label: 'Kontakt' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return null; // Or a loading component
  }

  return (
    <>
      <GlobalStyles />
      
      <Navigation sections={navItems} />
      
      <main>
        <Hero />
        <Countdown />
        <LoveStory />
        <Timeline />
        <Locations />
        <Directions />
        <Accommodations />
        <Dresscode />
        <RSVP />
        <Gallery />
        <PhotoUpload />
        <Guestbook />
        <MusicWishes />
        <Gifts />
        <ContactWitnesses />
        <FAQ />
        <WeddingABC />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
