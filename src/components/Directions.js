import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Directions (Anfahrt) Component
// Aristocratic • Cinematic • Theatrical
// ═══════════════════════════════════════════════════════════════════════════

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const DirectionsSection = styled.section`
  position: relative;
  background: var(--luxe-charcoal);
  padding: var(--section-padding) 2rem;
  overflow: hidden;
`;

const DotPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(212, 175, 55, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) forwards` : 'none'};
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
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(90deg, var(--luxe-white) 0%, var(--luxe-gold) 50%, var(--luxe-white) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const GoldLine = styled.div`
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--luxe-gold), transparent);
  margin: 1.5rem auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  background: var(--luxe-black);
  border: 1px solid rgba(212, 175, 55, 0.2);
  overflow: hidden;
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.2s forwards` : 'none'};
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid var(--luxe-gold);
  z-index: 2;
  
  ${props => props.$position === 'tl' && css`
    top: 10px; left: 10px;
    border-right: none; border-bottom: none;
  `}
  ${props => props.$position === 'tr' && css`
    top: 10px; right: 10px;
    border-left: none; border-bottom: none;
  `}
  ${props => props.$position === 'bl' && css`
    bottom: 10px; left: 10px;
    border-right: none; border-top: none;
  `}
  ${props => props.$position === 'br' && css`
    bottom: 10px; right: 10px;
    border-left: none; border-top: none;
  `}
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  
  svg {
    width: 60px;
    height: 60px;
    stroke: var(--luxe-gold);
    opacity: 0.5;
    margin-bottom: 1rem;
  }
  
  p {
    font-family: var(--font-sans);
    font-size: 0.9rem;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(100%) contrast(1.1);
  opacity: 0.8;
  transition: all 0.4s ease;
  
  &:hover {
    filter: grayscale(50%) contrast(1);
    opacity: 1;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LocationCard = styled.div`
  background: var(--luxe-black);
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.1);
  position: relative;
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) ${props.$delay || '0.3s'} forwards` : 'none'};
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    transform: translateX(10px);
  }
`;

const LocationLabel = styled.p`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 0.75rem;
`;

const LocationName = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 0.75rem;
`;

const LocationAddress = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const DirectionsButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  transition: all 0.3s var(--ease-luxe);
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--luxe-gold-light);
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const TransportSection = styled.div`
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
`;

const TransportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TransportCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: var(--luxe-black);
  border: 1px solid rgba(212, 175, 55, 0.1);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) ${props.$delay || '0.4s'} forwards` : 'none'};
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    transform: translateY(-5px);
  }
`;

const TransportIcon = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: var(--luxe-gold);
  }
`;

const TransportTitle = styled.h4`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--luxe-white);
  margin-bottom: 0.75rem;
`;

const TransportText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

const ParkingNote = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(212, 175, 55, 0.05);
  border-left: 3px solid var(--luxe-gold);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.6s forwards` : 'none'};
  
  h4 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--luxe-gold);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const Directions = ({
  ceremonyLocation = {
    name: "Schloss Benrath",
    address: "Benrather Schloßallee 100-108\n40597 Düsseldorf",
    mapUrl: "https://maps.google.com/?q=Schloss+Benrath+Düsseldorf"
  },
  receptionLocation = {
    name: "Orangerie im Schlosspark",
    address: "Benrather Schloßallee 100-108\n40597 Düsseldorf",
    mapUrl: "https://maps.google.com/?q=Orangerie+Schloss+Benrath"
  },
  googleMapsEmbed = null,
  parkingInfo = "Kostenfreie Parkplätze stehen im Schlosspark zur Verfügung. Bitte folgen Sie der Beschilderung zum Hochzeitsparkplatz.",
  transportOptions = [
    {
      type: 'car',
      title: 'Mit dem Auto',
      description: 'Über A46 Ausfahrt Düsseldorf-Benrath. Folgen Sie der Beschilderung zum Schloss.'
    },
    {
      type: 'train',
      title: 'Mit der Bahn',
      description: 'S-Bahn S6 bis Benrath. Von dort ca. 10 Minuten Fußweg durch den Park.'
    },
    {
      type: 'taxi',
      title: 'Taxi Service',
      description: 'Shuttle-Service vom Bahnhof ab 14:00 Uhr. Anmeldung bei den Trauzeugen.'
    }
  ]
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransportIcon = (type) => {
    switch (type) {
      case 'car':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17h14M6 9l1.5-4.5h9L18 9M4 17V9.5A2.5 2.5 0 016.5 7h11A2.5 2.5 0 0120 9.5V17" />
            <circle cx="7.5" cy="14" r="1.5" />
            <circle cx="16.5" cy="14" r="1.5" />
          </svg>
        );
      case 'train':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="3" width="16" height="16" rx="2" />
            <path d="M4 11h16M9 19l-2 3M15 19l2 3M8 11v-4M16 11v-4" />
            <circle cx="8" cy="15" r="1" />
            <circle cx="16" cy="15" r="1" />
          </svg>
        );
      case 'taxi':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17h14M6 9l1.5-4.5h9L18 9M4 17V9.5A2.5 2.5 0 016.5 7h11A2.5 2.5 0 0120 9.5V17" />
            <rect x="9" y="3" width="6" height="2" />
            <circle cx="7.5" cy="14" r="1.5" />
            <circle cx="16.5" cy="14" r="1.5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        );
    }
  };

  return (
    <DirectionsSection id="directions" ref={sectionRef}>
      <DotPattern />
      
      <Container>
        <SectionHeader $visible={isVisible}>
          <Eyebrow>So finden Sie uns</Eyebrow>
          <Title><span>Anfahrt</span></Title>
          <GoldLine />
        </SectionHeader>

        <ContentGrid>
          <MapContainer $visible={isVisible}>
            <CornerFrame $position="tl" />
            <CornerFrame $position="tr" />
            <CornerFrame $position="bl" />
            <CornerFrame $position="br" />
            
            {googleMapsEmbed ? (
              <MapIframe
                src={googleMapsEmbed}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <MapPlaceholder>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p>Google Maps Karte</p>
              </MapPlaceholder>
            )}
          </MapContainer>

          <InfoColumn>
            <LocationCard $visible={isVisible} $delay="0.3s">
              <LocationLabel>Trauung</LocationLabel>
              <LocationName>{ceremonyLocation.name}</LocationName>
              <LocationAddress>
                {ceremonyLocation.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < ceremonyLocation.address.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </LocationAddress>
              <DirectionsButton 
                href={ceremonyLocation.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Route planen
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </DirectionsButton>
            </LocationCard>

            <LocationCard $visible={isVisible} $delay="0.4s">
              <LocationLabel>Feier</LocationLabel>
              <LocationName>{receptionLocation.name}</LocationName>
              <LocationAddress>
                {receptionLocation.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < receptionLocation.address.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </LocationAddress>
              <DirectionsButton 
                href={receptionLocation.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Route planen
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </DirectionsButton>
            </LocationCard>
          </InfoColumn>
        </ContentGrid>

        <TransportSection>
          <TransportGrid>
            {transportOptions.map((option, index) => (
              <TransportCard 
                key={index} 
                $visible={isVisible} 
                $delay={`${0.4 + index * 0.1}s`}
              >
                <TransportIcon>
                  {getTransportIcon(option.type)}
                </TransportIcon>
                <TransportTitle>{option.title}</TransportTitle>
                <TransportText>{option.description}</TransportText>
              </TransportCard>
            ))}
          </TransportGrid>

          {parkingInfo && (
            <ParkingNote $visible={isVisible}>
              <h4>Parkmöglichkeiten</h4>
              <p>{parkingInfo}</p>
            </ParkingNote>
          )}
        </TransportSection>
      </Container>
    </DirectionsSection>
  );
};

export default Directions;
