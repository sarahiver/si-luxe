import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE LOCATIONS - Fullscreen Split with Curtain Image Reveal
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const curtainReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;

const Section = styled.section`
  position: relative;
  background: var(--luxe-charcoal);
`;

const Header = styled.div`
  text-align: center;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-black);
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: var(--luxe-white);
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const LocationSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  
  ${p => p.$reverse && css`
    flex-direction: row-reverse;
  `}
  
  @media (max-width: 968px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 55%;
  min-height: 100vh;
  overflow: hidden;
  
  @media (max-width: 968px) {
    width: 100%;
    min-height: 50vh;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      ${p => p.$reverse ? '-90deg' : '90deg'},
      rgba(26, 26, 26, 0.9) 0%,
      transparent 40%
    );
    pointer-events: none;
    
    @media (max-width: 968px) {
      background: linear-gradient(180deg, transparent 50%, rgba(26, 26, 26, 0.95) 100%);
    }
  }
`;

const Image = styled.div`
  position: absolute;
  inset: 0;
  background: url(${p => p.$src}) center/cover no-repeat;
  clip-path: ${p => p.$visible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'};
  transition: clip-path 1.5s var(--ease-dramatic);
`;

const ContentContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 5rem;
  background: var(--luxe-charcoal);
  
  @media (max-width: 968px) {
    width: 100%;
    padding: 3rem 2rem;
  }
`;

const LocationEyebrow = styled.span`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  display: block;
  margin-bottom: 1rem;
`;

const LocationTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const LocationDescription = styled.p`
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 2;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const DetailIcon = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: var(--luxe-gold);
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const DetailContent = styled.div``;

const DetailLabel = styled.span`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.span`
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--luxe-white);
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--luxe-gold);
    padding-left: 1rem;
  }
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(5px);
  }
`;

const Ornament = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  pointer-events: none;
  opacity: 0.3;
  
  ${p => p.$position === 'tl' && css`
    top: 2rem; left: 2rem;
    border-top: 1px solid var(--luxe-gold);
    border-left: 1px solid var(--luxe-gold);
  `}
  ${p => p.$position === 'br' && css`
    bottom: 2rem; right: 2rem;
    border-bottom: 1px solid var(--luxe-gold);
    border-right: 1px solid var(--luxe-gold);
  `}
`;

function Locations({ locations }) {
  const [visibleLocations, setVisibleLocations] = useState({});
  const locationRefs = useRef([]);
  
  const defaultLocations = [
    {
      type: 'Trauung',
      name: 'Schloss Benrath',
      subtitle: 'Der Spiegelsaal',
      description: 'In dem prachtvollen Spiegelsaal des Schlosses Benrath geben wir uns das Ja-Wort. Der barocke Saal bietet den perfekten Rahmen für unsere Zeremonie – umgeben von venezianischen Spiegeln und goldenem Stuck.',
      address: 'Benrather Schloßallee 100-108',
      city: '40597 Düsseldorf',
      time: '14:00 Uhr',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400',
      mapUrl: 'https://maps.google.com/?q=Schloss+Benrath',
    },
    {
      type: 'Feier',
      name: 'Schloss Benrath',
      subtitle: 'Der große Ballsaal',
      description: 'Nach der Zeremonie feiern wir im angrenzenden Ballsaal. Hier erwartet euch ein festliches Dinner, Live-Musik und eine unvergessliche Nacht unter den historischen Kronleuchtern.',
      address: 'Benrather Schloßallee 100-108',
      city: '40597 Düsseldorf',
      time: 'Ab 18:00 Uhr',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400',
      mapUrl: 'https://maps.google.com/?q=Schloss+Benrath',
    },
  ];
  
  const locationData = locations || defaultLocations;
  
  useEffect(() => {
    const observers = locationRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleLocations(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });
    
    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [locationData]);
  
  return (
    <Section id="location">
      <Header>
        <Eyebrow>Locations</Eyebrow>
        <Title>Wo wir <span>feiern</span></Title>
      </Header>
      
      {locationData.map((location, index) => (
        <LocationSection
          key={index}
          ref={el => locationRefs.current[index] = el}
          $reverse={index % 2 !== 0}
        >
          <ImageContainer $reverse={index % 2 !== 0}>
            <Image $src={location.image} $visible={visibleLocations[index]} />
            <Ornament $position="tl" />
            <Ornament $position="br" />
          </ImageContainer>
          
          <ContentContainer>
            <LocationEyebrow>{location.type}</LocationEyebrow>
            <LocationTitle>
              {location.name}
              {location.subtitle && <><br/><span style={{ fontSize: '0.6em', fontStyle: 'italic', color: 'var(--luxe-gold)' }}>{location.subtitle}</span></>}
            </LocationTitle>
            <LocationDescription>{location.description}</LocationDescription>
            
            <DetailsList>
              <DetailItem>
                <DetailIcon>◇</DetailIcon>
                <DetailContent>
                  <DetailLabel>Adresse</DetailLabel>
                  <DetailValue>{location.address}<br/>{location.city}</DetailValue>
                </DetailContent>
              </DetailItem>
              <DetailItem>
                <DetailIcon>◇</DetailIcon>
                <DetailContent>
                  <DetailLabel>Uhrzeit</DetailLabel>
                  <DetailValue>{location.time}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailsList>
            
            <MapButton href={location.mapUrl} target="_blank" rel="noopener noreferrer">
              Route planen
            </MapButton>
          </ContentContainer>
        </LocationSection>
      ))}
    </Section>
  );
}

export default Locations;
