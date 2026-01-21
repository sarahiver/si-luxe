import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const curtainReveal = keyframes`
  0% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
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

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
  position: relative;
  overflow: hidden;
`;

const CurtainLeft = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, #0A0A0A, #1A1A1A);
  z-index: 100;
  transform-origin: left center;
  animation: ${curtainReveal} 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: 0.5s;
`;

const CurtainRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(-90deg, #0A0A0A, #1A1A1A);
  z-index: 100;
  transform-origin: right center;
  animation: ${curtainReveal} 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: 0.5s;
`;

const CurtainGoldLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #D4AF37, transparent);
  ${props => props.$side === 'left' ? 'right: 0;' : 'left: 0;'}
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  filter: grayscale(40%) brightness(0.4);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      rgba(10, 10, 10, 0.6) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 5%;
`;

const CornerFrame = styled.div`
  position: fixed;
  width: 80px;
  height: 80px;
  border: 1px solid #D4AF37;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 2s;
  pointer-events: none;
  
  ${props => props.$position === 'top-left' && `
    top: 40px;
    left: 40px;
    border-right: none;
    border-bottom: none;
  `}
  
  ${props => props.$position === 'top-right' && `
    top: 40px;
    right: 40px;
    border-left: none;
    border-bottom: none;
  `}
  
  ${props => props.$position === 'bottom-left' && `
    bottom: 40px;
    left: 40px;
    border-right: none;
    border-top: none;
  `}
  
  ${props => props.$position === 'bottom-right' && `
    bottom: 40px;
    right: 40px;
    border-left: none;
    border-top: none;
  `}
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    ${props => props.$position === 'top-left' && 'top: 20px; left: 20px;'}
    ${props => props.$position === 'top-right' && 'top: 20px; right: 20px;'}
    ${props => props.$position === 'bottom-left' && 'bottom: 20px; left: 20px;'}
    ${props => props.$position === 'bottom-right' && 'bottom: 20px; right: 20px;'}
  }
`;

const MainContent = styled.div`
  text-align: center;
  max-width: 800px;
  opacity: 0;
  animation: ${fadeIn} 1.2s ease-out forwards;
  animation-delay: 2.2s;
`;

const Overline = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 30px;
`;

const Names = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0;
  line-height: 1.1;
  
  span.ampersand {
    display: block;
    font-size: 0.4em;
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
    margin: 15px 0;
  }
`;

const GoldLine = styled.div`
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 40px auto;
  opacity: 0;
  animation: ${lineExpand} 1s ease-out forwards, ${fadeIn} 1s ease-out forwards;
  animation-delay: 2.5s;
`;

const DateDisplay = styled.div`
  margin: 40px 0;
`;

const DateText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #FAFAFA;
  margin: 0;
  letter-spacing: 3px;
`;

const Venue = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.7);
  margin: 20px 0 0;
`;

const CountdownWrapper = styled.div`
  margin: 60px 0;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 2.8s;
`;

const CountdownLabel = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 25px;
`;

const CountdownGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  
  @media (max-width: 500px) {
    gap: 15px;
  }
`;

const CountdownItem = styled.div`
  text-align: center;
`;

const CountdownNumber = styled.span`
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  background: linear-gradient(180deg, #D4AF37, #B8860B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const CountdownUnit = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.6);
  margin-top: 10px;
`;

const Message = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.8;
  font-style: italic;
  max-width: 500px;
  margin: 0 auto 50px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 3s;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: transparent;
  border: 1px solid #D4AF37;
  padding: 18px 60px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #D4AF37;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s ease;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 3.2s;
  
  &:hover {
    background: linear-gradient(135deg, #D4AF37, #B8860B);
    color: #0A0A0A;
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards, ${float} 2s ease-in-out infinite;
  animation-delay: 3.5s, 4.5s;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.5);
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, #D4AF37, transparent);
`;

const DetailsSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  padding: 120px 5%;
  position: relative;
`;

const DetailsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const DetailsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DetailsTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0 0 15px;
  
  span {
    color: #D4AF37;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const DetailCard = styled.div`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 50px 40px;
  text-align: center;
  position: relative;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.$delay}s;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    width: 25px;
    height: 25px;
    border-left: 1px solid #D4AF37;
    border-top: 1px solid #D4AF37;
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    border-right: 1px solid #D4AF37;
    border-bottom: 1px solid #D4AF37;
    opacity: 0.5;
  }
`;

const DetailIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), transparent);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 28px;
    height: 28px;
    color: #D4AF37;
  }
`;

const DetailTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #D4AF37;
  margin: 0 0 20px;
`;

const DetailText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: #FAFAFA;
  line-height: 1.6;
  margin: 0;
`;

const DetailSubtext = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(250, 250, 250, 0.6);
  margin-top: 10px;
`;

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SaveTheDate = ({
  name1 = 'Anna',
  name2 = 'Michael',
  weddingDate = new Date('2024-09-15T14:00:00'),
  venue = 'Schloss Benrath, Düsseldorf',
  backgroundImage = '/images/save-the-date-bg.jpg',
  message = 'Wir freuen uns, Sie zu unserer Hochzeit einzuladen. Die offizielle Einladung folgt in Kürze.',
  ctaLink = '/einladung',
  ctaText = 'Zur Einladung'
}) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  const detailsRef = useRef(null);
  
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const diff = weddingDate - now;
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };
    
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [weddingDate]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setDetailsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (detailsRef.current) observer.observe(detailsRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
  };
  
  return (
    <Page>
      <CurtainLeft>
        <CurtainGoldLine $side="left" />
      </CurtainLeft>
      <CurtainRight>
        <CurtainGoldLine $side="right" />
      </CurtainRight>
      
      <BackgroundImage $image={backgroundImage} />
      
      <CornerFrame $position="top-left" />
      <CornerFrame $position="top-right" />
      <CornerFrame $position="bottom-left" />
      <CornerFrame $position="bottom-right" />
      
      <Content>
        <MainContent>
          <Overline>Save the Date</Overline>
          
          <Names>
            {name1}
            <span className="ampersand">&</span>
            {name2}
          </Names>
          
          <GoldLine />
          
          <DateDisplay>
            <DateText>{formatDate(weddingDate)}</DateText>
            <Venue>{venue}</Venue>
          </DateDisplay>
          
          <CountdownWrapper>
            <CountdownLabel>Noch</CountdownLabel>
            <CountdownGrid>
              <CountdownItem>
                <CountdownNumber>{countdown.days}</CountdownNumber>
                <CountdownUnit>Tage</CountdownUnit>
              </CountdownItem>
              <CountdownItem>
                <CountdownNumber>{countdown.hours}</CountdownNumber>
                <CountdownUnit>Stunden</CountdownUnit>
              </CountdownItem>
              <CountdownItem>
                <CountdownNumber>{countdown.minutes}</CountdownNumber>
                <CountdownUnit>Minuten</CountdownUnit>
              </CountdownItem>
              <CountdownItem>
                <CountdownNumber>{countdown.seconds}</CountdownNumber>
                <CountdownUnit>Sekunden</CountdownUnit>
              </CountdownItem>
            </CountdownGrid>
          </CountdownWrapper>
          
          <Message>{message}</Message>
          
          <CTAButton href={ctaLink}>{ctaText}</CTAButton>
        </MainContent>
      </Content>
      
      <ScrollIndicator onClick={scrollToDetails}>
        <ScrollText>Details</ScrollText>
        <ScrollLine />
      </ScrollIndicator>
      
      <DetailsSection ref={detailsRef}>
        <DetailsContainer>
          <DetailsHeader $visible={detailsVisible}>
            <DetailsTitle>
              Die <span>Details</span>
            </DetailsTitle>
          </DetailsHeader>
          
          <DetailsGrid>
            <DetailCard $visible={detailsVisible} $delay={0.1}>
              <DetailIcon>
                <CalendarIcon />
              </DetailIcon>
              <DetailTitle>Datum</DetailTitle>
              <DetailText>{formatDate(weddingDate)}</DetailText>
              <DetailSubtext>Samstag</DetailSubtext>
            </DetailCard>
            
            <DetailCard $visible={detailsVisible} $delay={0.2}>
              <DetailIcon>
                <ClockIcon />
              </DetailIcon>
              <DetailTitle>Uhrzeit</DetailTitle>
              <DetailText>{formatTime(weddingDate)}</DetailText>
              <DetailSubtext>Einlass ab {formatTime(new Date(weddingDate.getTime() - 30 * 60000))}</DetailSubtext>
            </DetailCard>
            
            <DetailCard $visible={detailsVisible} $delay={0.3}>
              <DetailIcon>
                <MapIcon />
              </DetailIcon>
              <DetailTitle>Location</DetailTitle>
              <DetailText>{venue.split(',')[0]}</DetailText>
              <DetailSubtext>{venue.split(',').slice(1).join(',').trim()}</DetailSubtext>
            </DetailCard>
          </DetailsGrid>
        </DetailsContainer>
      </DetailsSection>
    </Page>
  );
};

export default SaveTheDate;
