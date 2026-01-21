import React, { useState } from 'react';
import styled from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE WEDDING ABC - Elegant Alphabetical Guide
// ═══════════════════════════════════════════════════════════════════════════

const Section = styled.section`
  position: relative;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-black);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--luxe-white);
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const AlphabetNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const AlphabetLetter = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: ${p => p.$active ? 'var(--luxe-black)' : p.$hasEntry ? 'var(--luxe-white)' : 'rgba(255,255,255,0.2)'};
  background: ${p => p.$active ? 'var(--luxe-gold)' : 'transparent'};
  border: 1px solid ${p => p.$active ? 'var(--luxe-gold)' : p.$hasEntry ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'};
  cursor: ${p => p.$hasEntry ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  &:hover {
    ${p => p.$hasEntry && !p.$active && `
      border-color: var(--luxe-gold);
      color: var(--luxe-gold);
    `}
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EntryCard = styled.div`
  background: rgba(26, 26, 26, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.1);
  padding: 2rem;
  display: ${p => p.$visible ? 'block' : 'none'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    background: rgba(26, 26, 26, 0.7);
  }
`;

const EntryLetter = styled.span`
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 300;
  color: rgba(212, 175, 55, 0.3);
  line-height: 1;
  float: left;
  margin-right: 1rem;
  margin-top: 0.25rem;
`;

const EntryTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--luxe-white);
  margin-bottom: 0.75rem;
`;

const EntryText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  clear: both;
`;

function WeddingABC({ entries }) {
  const [activeFilter, setActiveFilter] = useState(null);
  
  const defaultEntries = [
    { letter: 'A', title: 'Anreise', text: 'Für die Anreise empfehlen wir PKW oder Taxi. Parkplätze sind am Schloss vorhanden.' },
    { letter: 'A', title: 'Alkohol', text: 'Genießen Sie unser ausgewähltes Getränkeangebot. Wir sorgen für sichere Heimwege.' },
    { letter: 'B', title: 'Blumenkinder', text: 'Unsere Nichten werden die Blumen streuen – ein magischer Moment!' },
    { letter: 'D', title: 'Dresscode', text: 'Festliche Eleganz. Herren: dunkler Anzug. Damen: elegantes Kleid. Bitte kein Weiß.' },
    { letter: 'F', title: 'Fotos', text: 'Während der Trauung bitten wir um Foto-Pause. Bei der Feier: Schießen Sie los!' },
    { letter: 'G', title: 'Geschenke', text: 'Ihre Anwesenheit ist Geschenk genug. Wer möchte: Hochzeitsreise-Beitrag.' },
    { letter: 'H', title: 'Hochzeitstorte', text: 'Gegen Mitternacht wird unsere dreistöckige Torte angeschnitten.' },
    { letter: 'K', title: 'Kinder', text: 'Unsere Feier ist für Erwachsene geplant. Danke für Ihr Verständnis.' },
    { letter: 'M', title: 'Musik', text: 'Live-Band und DJ sorgen für Stimmung. Musikwünsche sind willkommen!' },
    { letter: 'P', title: 'Parken', text: 'Kostenlose Parkplätze direkt am Schloss. Folgen Sie der Beschilderung.' },
    { letter: 'R', title: 'Rauchen', text: 'Bitte nur im gekennzeichneten Außenbereich.' },
    { letter: 'S', title: 'Sitzordnung', text: 'Die Tischkarten verraten Ihnen Ihren Platz. Bei Fragen: Trauzeugen fragen.' },
    { letter: 'T', title: 'Taxi', text: 'Wir organisieren Sammeltaxis für die sichere Heimfahrt.' },
    { letter: 'U', title: 'Unterkunft', text: 'Hotelempfehlungen finden Sie unter "Unterkünfte".' },
    { letter: 'W', title: 'Wetter', text: 'Bei gutem Wetter: Sektempfang im Garten. Bei Regen: Plan B im Foyer.' },
  ];
  
  const abcEntries = entries || defaultEntries;
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lettersWithEntries = [...new Set(abcEntries.map(e => e.letter.toUpperCase()))];
  
  const filteredEntries = activeFilter 
    ? abcEntries.filter(e => e.letter.toUpperCase() === activeFilter)
    : abcEntries;
  
  return (
    <Section id="abc">
      <Container>
        <Header>
          <Eyebrow>Hochzeits-ABC</Eyebrow>
          <Title>Alles von <span>A bis Z</span></Title>
        </Header>
        
        <AlphabetNav>
          <AlphabetLetter
            $active={activeFilter === null}
            $hasEntry={true}
            onClick={() => setActiveFilter(null)}
          >
            ∀
          </AlphabetLetter>
          {alphabet.map(letter => (
            <AlphabetLetter
              key={letter}
              $active={activeFilter === letter}
              $hasEntry={lettersWithEntries.includes(letter)}
              onClick={() => lettersWithEntries.includes(letter) && setActiveFilter(letter)}
            >
              {letter}
            </AlphabetLetter>
          ))}
        </AlphabetNav>
        
        <Grid>
          {filteredEntries.map((entry, index) => (
            <EntryCard key={index} $visible={true}>
              <EntryLetter>{entry.letter}</EntryLetter>
              <EntryTitle>{entry.title}</EntryTitle>
              <EntryText>{entry.text}</EntryText>
            </EntryCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default WeddingABC;
