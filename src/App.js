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

  // Wedding configuration - customize for each couple
  const weddingConfig = {
    // Couple information
    couple: {
      name1: 'Anna',
      name2: 'Michael',
      fullNames: {
        bride: 'Anna Schmidt',
        groom: 'Michael Weber'
      }
    },
    
    // Wedding date and time
    date: new Date('2024-09-15T14:00:00'),
    
    // Locations
    ceremony: {
      name: 'Standesamt Düsseldorf',
      address: 'Inselstraße 11, 40479 Düsseldorf',
      time: '14:00 Uhr',
      image: '/images/ceremony.jpg',
      description: 'Die standesamtliche Trauung findet im historischen Rathaus statt.'
    },
    reception: {
      name: 'Schloss Benrath',
      address: 'Benrather Schloßallee 100-106, 40597 Düsseldorf',
      time: '16:00 Uhr',
      image: '/images/reception.jpg',
      description: 'Anschließend laden wir Sie herzlich zur Feier ins Schloss Benrath ein.'
    },
    
    // Navigation items
    navItems: [
      { label: 'Home', href: '#home' },
      { label: 'Unsere Geschichte', href: '#geschichte' },
      { label: 'Ablauf', href: '#ablauf' },
      { label: 'Locations', href: '#locations' },
      { label: 'RSVP', href: '#rsvp' },
      { label: 'Galerie', href: '#galerie' },
      { label: 'Kontakt', href: '#kontakt' }
    ],
    
    // Love story chapters
    loveStory: [
      {
        title: 'Das erste Treffen',
        year: '2018',
        text: 'Es war ein regnerischer Novemberabend in Düsseldorf, als sich unsere Wege zum ersten Mal kreuzten. Was als zufällige Begegnung begann, sollte unser Leben für immer verändern.',
        image: '/images/story-1.jpg'
      },
      {
        title: 'Die erste Verabredung',
        year: '2018',
        text: 'Zwei Wochen später trafen wir uns in einem kleinen Café in der Altstadt. Die Stunden vergingen wie Minuten, und wir wussten beide: Das hier ist etwas Besonderes.',
        image: '/images/story-2.jpg'
      },
      {
        title: 'Der Antrag',
        year: '2023',
        text: 'Unter dem Sternenhimmel von Santorini kniete Michael nieder und stellte die wichtigste Frage seines Lebens. Natürlich sagte Anna ja!',
        image: '/images/story-3.jpg'
      }
    ],
    
    // Timeline / Schedule
    timeline: [
      {
        time: '14:00',
        title: 'Standesamtliche Trauung',
        description: 'Beginn der Zeremonie im Rathaus',
        icon: 'rings'
      },
      {
        time: '15:30',
        title: 'Sektempfang',
        description: 'Empfang im Schlossgarten',
        icon: 'champagne'
      },
      {
        time: '17:00',
        title: 'Dinner',
        description: 'Festliches Abendessen im Spiegelsaal',
        icon: 'dinner'
      },
      {
        time: '20:00',
        title: 'Eröffnungstanz',
        description: 'Der erste Tanz als Ehepaar',
        icon: 'dance'
      },
      {
        time: '21:00',
        title: 'Party',
        description: 'Feiern bis in die Nacht',
        icon: 'party'
      }
    ],
    
    // Hotels
    hotels: [
      {
        name: 'Schlosshotel Benrath',
        category: 'Luxushotel',
        stars: 5,
        description: 'Direkt neben der Feier-Location gelegen. Perfekt für alle, die keinen weiten Heimweg haben möchten.',
        distance: '200m zur Location',
        parking: 'Kostenlose Tiefgarage',
        priceRange: '180-280€',
        phone: '+49 211 123456',
        bookingUrl: 'https://example.com',
        image: '/images/hotel-1.jpg',
        featured: true
      },
      {
        name: 'Hotel Nikko Düsseldorf',
        category: '4-Sterne Hotel',
        stars: 4,
        description: 'Modernes Hotel in der Innenstadt mit hervorragender Anbindung.',
        distance: '8 km zur Location',
        parking: 'Parkhaus verfügbar',
        priceRange: '120-180€',
        phone: '+49 211 654321',
        bookingUrl: 'https://example.com',
        image: '/images/hotel-2.jpg',
        featured: false
      }
    ],
    
    // Contact information
    contact: {
      email: 'hochzeit@anna-michael.de',
      phone: '+49 123 456789',
      address: 'Musterstraße 123, 40479 Düsseldorf'
    },
    
    // Best man and maid of honor
    witnesses: [
      {
        name: 'Thomas Müller',
        role: 'Trauzeuge',
        relation: 'Bester Freund des Bräutigams',
        image: '/images/witness-1.jpg',
        phone: '+49 123 111222',
        email: 'thomas@example.com'
      },
      {
        name: 'Lisa Schmidt',
        role: 'Trauzeugin',
        relation: 'Schwester der Braut',
        image: '/images/witness-2.jpg',
        phone: '+49 123 333444',
        email: 'lisa@example.com'
      }
    ],
    
    // Dresscode
    dresscode: {
      title: 'Black Tie Optional',
      description: 'Wir freuen uns auf einen eleganten Abend mit Ihnen.',
      guidelines: {
        women: 'Langes Abendkleid oder elegantes Cocktailkleid',
        men: 'Dunkler Anzug oder Smoking'
      },
      colors: ['#0A0A0A', '#1A1A1A', '#D4AF37', '#FAFAFA'],
      note: 'Bitte verzichten Sie auf die Farben Weiß und Creme.'
    },
    
    // FAQ items
    faq: [
      {
        question: 'Gibt es Parkmöglichkeiten vor Ort?',
        answer: 'Ja, es stehen ausreichend Parkplätze am Schloss zur Verfügung. Folgen Sie einfach der Beschilderung.'
      },
      {
        question: 'Können wir unsere Kinder mitbringen?',
        answer: 'Wir haben uns für eine Feier nur für Erwachsene entschieden, um einen entspannten Abend zu gewährleisten. Wir hoffen auf Ihr Verständnis.'
      },
      {
        question: 'Bis wann sollen wir uns anmelden?',
        answer: 'Bitte geben Sie uns bis zum 1. August 2024 Bescheid, ob Sie dabei sein können.'
      },
      {
        question: 'Gibt es vegane/vegetarische Optionen?',
        answer: 'Selbstverständlich! Bitte geben Sie eventuelle Ernährungswünsche bei der RSVP-Anmeldung an.'
      }
    ],
    
    // Gift preferences
    gifts: {
      showBankDetails: true,
      bankAccount: {
        holder: 'Anna Schmidt & Michael Weber',
        iban: 'DE89 3704 0044 0532 0130 00',
        bic: 'COBADEFFXXX',
        bank: 'Commerzbank'
      },
      honeymoonFund: true,
      honeymoonDestination: 'Malediven',
      message: 'Ihre Anwesenheit ist das schönste Geschenk. Sollten Sie uns dennoch etwas schenken wollen, freuen wir uns über einen Beitrag zu unseren Flitterwochen.'
    }
  };

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
      
      <Navigation 
        navItems={weddingConfig.navItems}
        coupleName={`${weddingConfig.couple.name1} & ${weddingConfig.couple.name2}`}
      />
      
      <main>
        <Hero 
          name1={weddingConfig.couple.name1}
          name2={weddingConfig.couple.name2}
          weddingDate={weddingConfig.date}
          venue={weddingConfig.reception.name}
        />
        
        <Countdown 
          targetDate={weddingConfig.date}
        />
        
        <LoveStory 
          chapters={weddingConfig.loveStory}
        />
        
        <Timeline 
          events={weddingConfig.timeline}
          weddingDate={weddingConfig.date}
        />
        
        <Locations 
          ceremony={weddingConfig.ceremony}
          reception={weddingConfig.reception}
        />
        
        <Directions 
          locations={[weddingConfig.ceremony, weddingConfig.reception]}
        />
        
        <Accommodations 
          hotels={weddingConfig.hotels}
        />
        
        <Dresscode 
          dresscode={weddingConfig.dresscode}
        />
        
        <RSVP 
          deadline="1. August 2024"
        />
        
        <Gallery />
        
        <PhotoUpload />
        
        <Guestbook />
        
        <MusicWishes />
        
        <Gifts 
          bankAccount={weddingConfig.gifts.bankAccount}
          honeymoonDestination={weddingConfig.gifts.honeymoonDestination}
          message={weddingConfig.gifts.message}
        />
        
        <ContactWitnesses 
          witnesses={weddingConfig.witnesses}
        />
        
        <FAQ 
          items={weddingConfig.faq}
        />
        
        <WeddingABC />
        
        <Contact 
          contactInfo={weddingConfig.contact}
        />
      </main>
      
      <Footer 
        coupleName={`${weddingConfig.couple.name1} & ${weddingConfig.couple.name2}`}
        weddingDate={weddingConfig.date}
      />
    </>
  );
}

export default App;
