import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const lineExpand = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  padding: 120px 5% 100px;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: 
    linear-gradient(90deg, #D4AF37 1px, transparent 1px),
    linear-gradient(#D4AF37 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Overline = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0 0 20px;
  
  span {
    background: linear-gradient(
      90deg,
      #D4AF37 0%,
      #F4E4BC 25%,
      #D4AF37 50%,
      #F4E4BC 75%,
      #D4AF37 100%
    );
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
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto 30px;
  transform-origin: center;
  animation: ${props => props.$visible ? css`${lineExpand} 1s ease-out forwards` : 'none'};
  transform: scaleX(${props => props.$visible ? 1 : 0});
`;

const Subtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: rgba(250, 250, 250, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  font-style: italic;
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const HotelCard = styled.article`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  overflow: hidden;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '50px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.$delay}s;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }
  
  /* Corner decorations */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 1px solid #D4AF37;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  &::before {
    top: 15px;
    left: 15px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: 15px;
    right: 15px;
    border-left: none;
    border-top: none;
  }
  
  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  color: #0A0A0A;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 16px;
  z-index: 2;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(10, 10, 10, 1), transparent);
    pointer-events: none;
  }
`;

const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${HotelCard}:hover & {
    transform: scale(1.05);
  }
`;

const HotelContent = styled.div`
  padding: 30px 35px 40px;
`;

const HotelCategory = styled.span`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 12px;
`;

const HotelName = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #FAFAFA;
  margin: 0 0 8px;
`;

const HotelStars = styled.div`
  color: #D4AF37;
  margin-bottom: 15px;
  letter-spacing: 4px;
`;

const HotelDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(250, 250, 250, 0.7);
  line-height: 1.7;
  margin: 0 0 25px;
`;

const HotelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(250, 250, 250, 0.8);
  
  svg {
    width: 16px;
    height: 16px;
    color: #D4AF37;
    flex-shrink: 0;
  }
`;

const PriceRange = styled.span`
  color: #D4AF37;
  font-weight: 500;
`;

const BookingLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #D4AF37;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #F4E4BC;
    
    &::after {
      transform: translateX(5px);
    }
  }
`;

const TipsSection = styled.div`
  background: linear-gradient(145deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 50px;
  position: relative;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Corner decorations */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid #D4AF37;
    opacity: 0.4;
  }
  
  &::before {
    top: 20px;
    left: 20px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: 20px;
    right: 20px;
    border-left: none;
    border-top: none;
  }
  
  @media (max-width: 768px) {
    padding: 35px 25px;
  }
`;

const TipsTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #D4AF37;
  margin: 0 0 25px;
  text-align: center;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.6;
  
  &::before {
    content: '◆';
    color: #D4AF37;
    font-size: 0.6rem;
    margin-top: 5px;
    flex-shrink: 0;
  }
`;

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 17h14v-5H5v5zm2-3h2v2H7v-2zm8 0h2v2h-2v-2z"/>
    <path d="M19 12l-2-6H7L5 12"/>
  </svg>
);

const EuroIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M7 12h8M7 9h8M10 6c-2 1-3 3-3 6s1 5 3 6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Accommodations = ({ 
  hotels = [
    {
      name: 'Grand Hotel Excelsior',
      category: 'Luxushotel',
      stars: 5,
      description: 'Elegantes 5-Sterne-Hotel mit erstklassigem Service, nur wenige Gehminuten von der Hochzeitslocation entfernt.',
      distance: '0,5 km zur Location',
      parking: 'Kostenlose Tiefgarage',
      priceRange: '180-320€',
      phone: '+49 123 456789',
      bookingUrl: 'https://example.com',
      image: '/images/hotel-1.jpg',
      featured: true
    },
    {
      name: 'Boutique Hotel Zum Goldenen Löwen',
      category: 'Boutique Hotel',
      stars: 4,
      description: 'Charmantes Boutique-Hotel mit historischem Flair und modernem Komfort in der Altstadt.',
      distance: '1,2 km zur Location',
      parking: 'Parkplätze verfügbar',
      priceRange: '120-180€',
      phone: '+49 123 456790',
      bookingUrl: 'https://example.com',
      image: '/images/hotel-2.jpg',
      featured: false
    },
    {
      name: 'Pension Rosengarten',
      category: 'Pension',
      stars: 3,
      description: 'Gemütliche Pension mit familiärer Atmosphäre und reichhaltigem Frühstück.',
      distance: '2,5 km zur Location',
      parking: 'Straßenparkplätze',
      priceRange: '70-100€',
      phone: '+49 123 456791',
      bookingUrl: 'https://example.com',
      image: '/images/hotel-3.jpg',
      featured: false
    }
  ],
  tips = [
    'Buchen Sie frühzeitig – besonders die nahegelegenen Hotels sind schnell ausgebucht.',
    'Bei Buchung den Hinweis "Hochzeit [Name]" angeben für eventuelle Sonderkonditionen.',
    'Shuttle-Service vom Hotel zur Location kann bei Bedarf organisiert werden.',
    'Checkout am Sonntag kann bei den meisten Hotels auf 12 Uhr verlegt werden.'
  ],
  sectionTitle = 'Unterkünfte',
  sectionSubtitle = 'Für Ihren komfortablen Aufenthalt haben wir einige Empfehlungen zusammengestellt'
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const tipsRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setHeaderVisible(true);
          } else if (entry.target === cardsRef.current) {
            setCardsVisible(true);
          } else if (entry.target === tipsRef.current) {
            setTipsVisible(true);
          }
        }
      });
    }, observerOptions);
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    if (tipsRef.current) observer.observe(tipsRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const renderStars = (count) => {
    return '★'.repeat(count);
  };
  
  return (
    <Section id="unterkunft">
      <BackgroundPattern />
      <Container>
        <Header ref={sectionRef} $visible={headerVisible}>
          <Overline>Übernachtung</Overline>
          <Title><span>{sectionTitle}</span></Title>
          <GoldLine $visible={headerVisible} />
          <Subtitle>{sectionSubtitle}</Subtitle>
        </Header>
        
        <HotelsGrid ref={cardsRef}>
          {hotels.map((hotel, index) => (
            <HotelCard 
              key={index} 
              $visible={cardsVisible}
              $delay={index * 0.15}
            >
              {hotel.featured && <FeaturedBadge>Empfehlung</FeaturedBadge>}
              
              <ImageWrapper>
                <HotelImage 
                  src={hotel.image} 
                  alt={hotel.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect fill="%231A1A1A" width="400" height="250"/><text fill="%23D4AF37" font-family="serif" font-size="24" x="50%" y="50%" text-anchor="middle" dy=".3em">Hotel</text></svg>';
                  }}
                />
              </ImageWrapper>
              
              <HotelContent>
                <HotelCategory>{hotel.category}</HotelCategory>
                <HotelName>{hotel.name}</HotelName>
                <HotelStars>{renderStars(hotel.stars)}</HotelStars>
                <HotelDescription>{hotel.description}</HotelDescription>
                
                <HotelDetails>
                  <DetailRow>
                    <MapIcon />
                    {hotel.distance}
                  </DetailRow>
                  <DetailRow>
                    <CarIcon />
                    {hotel.parking}
                  </DetailRow>
                  <DetailRow>
                    <EuroIcon />
                    <PriceRange>{hotel.priceRange}</PriceRange> pro Nacht
                  </DetailRow>
                  <DetailRow>
                    <PhoneIcon />
                    {hotel.phone}
                  </DetailRow>
                </HotelDetails>
                
                <BookingLink 
                  href={hotel.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Zur Buchung
                </BookingLink>
              </HotelContent>
            </HotelCard>
          ))}
        </HotelsGrid>
        
        <TipsSection ref={tipsRef} $visible={tipsVisible}>
          <TipsTitle>Hinweise zur Buchung</TipsTitle>
          <TipsList>
            {tips.map((tip, index) => (
              <TipItem key={index}>{tip}</TipItem>
            ))}
          </TipsList>
        </TipsSection>
      </Container>
    </Section>
  );
};

export default Accommodations;
