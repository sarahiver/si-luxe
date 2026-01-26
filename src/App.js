import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

// Components
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

// Standalone Pages
import AdminDashboard from './components/AdminDashboard';
import ArchivePage from './components/ArchivePage';
import SaveTheDate from './components/SaveTheDate';

// Wedding Configuration
const config = {
  coupleName: "Dave & Kalle",
  name1: "Dave",
  name2: "Kalle",
  weddingDate: "2026-10-20",
  weddingDateDisplay: "October 20, 2026",
  weddingDateISO: "2026-10-20T14:00:00",
  rsvpDeadline: "2026-09-01",
  location: "Château de Lumière",
  ceremonyLocation: "The Grand Chapel",
  ceremonyAddress: "42 Avenue des Roses, Provence, France",
  ceremonyTime: "14:00",
  receptionLocation: "The Crystal Ballroom",
  receptionAddress: "42 Avenue des Roses, Provence, France",
  receptionTime: "17:00",
  email: "hello@daveandkalle.com",
  phone: "+33 4 90 12 34 56",
  instagram: "@daveandkalle",
  hashtag: "#DaveAndKalle2026",
  navItems: [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'timeline', label: 'Schedule' },
    { id: 'location', label: 'Locations' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ],
};

// Main Wedding Page
const WeddingPage = ({ config }) => {
  return (
    <>
      <Navigation sections={config.navItems} config={config} />
      <main>
        <Hero data={config} />
        <Countdown config={config} />
        <LoveStory config={config} />
        <Timeline config={config} />
        <Locations config={config} />
        <Directions config={config} />
        <Accommodations config={config} />
        <Dresscode config={config} />
        <RSVP config={config} />
        <Gallery config={config} />
        <PhotoUpload config={config} />
        <Guestbook config={config} />
        <MusicWishes config={config} />
        <Gifts config={config} />
        <ContactWitnesses config={config} />
        <FAQ config={config} />
        <WeddingABC config={config} />
        <Contact config={config} />
      </main>
      <Footer config={config} />
    </>
  );
};

function App() {
  const [isArchived, setIsArchived] = useState(false);
  
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={isArchived ? <Navigate to="/archive" replace /> : <WeddingPage config={config} />} />
        <Route path="/save-the-date" element={<SaveTheDate config={config} />} />
        <Route path="/archive" element={<ArchivePage config={config} />} />
        <Route path="/admin" element={<AdminDashboard config={config} onArchiveToggle={setIsArchived} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
