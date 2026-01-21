import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Dresscode Component
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

const DresscodeSection = styled.section`
  position: relative;
  background: var(--luxe-charcoal);
  padding: var(--section-padding) 2rem;
  overflow: hidden;
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1000px;
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

const Subtitle = styled.p`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
`;

const MainCard = styled.div`
  background: var(--luxe-black);
  padding: 4rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.2s forwards` : 'none'};
  
  @media (max-width: 568px) {
    padding: 2.5rem;
  }
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid var(--luxe-gold);
  
  ${props => props.$position === 'tl' && css`
    top: 15px; left: 15px;
    border-right: none; border-bottom: none;
  `}
  ${props => props.$position === 'tr' && css`
    top: 15px; right: 15px;
    border-left: none; border-bottom: none;
  `}
  ${props => props.$position === 'bl' && css`
    bottom: 15px; left: 15px;
    border-right: none; border-top: none;
  `}
  ${props => props.$position === 'br' && css`
    bottom: 15px; right: 15px;
    border-left: none; border-top: none;
  `}
`;

const DresscodeLabel = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1rem;
`;

const DresscodeName = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
`;

const DresscodeDescription = styled.p`
  font-family: var(--font-sans);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
`;

const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GenderCard = styled.div`
  background: var(--luxe-black);
  padding: 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.1);
  position: relative;
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) ${props.$delay || '0.3s'} forwards` : 'none'};
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    transform: translateY(-5px);
  }
`;

const GenderIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212, 175, 55, 0.3);
  
  svg {
    width: 30px;
    height: 30px;
    stroke: var(--luxe-gold);
  }
`;

const GenderTitle = styled.h4`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--luxe-white);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SuggestionList = styled.ul`
  list-style: none;
`;

const SuggestionItem = styled.li`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--luxe-gold);
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const ColorSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(212, 175, 55, 0.05);
  border-left: 3px solid var(--luxe-gold);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.5s forwards` : 'none'};
`;

const ColorTitle = styled.h4`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--luxe-gold);
  margin-bottom: 1rem;
`;

const ColorText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ColorSwatches = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ColorSwatch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SwatchCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SwatchName = styled.span`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const AvoidSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.6s forwards` : 'none'};
`;

const AvoidTitle = styled.h4`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ef4444;
  margin-bottom: 0.75rem;
`;

const AvoidText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const Dresscode = ({
  code = "Black Tie Optional",
  description = "Wir laden Sie ein, diesen besonderen Tag mit uns in eleganter Abendgarderobe zu feiern. Lassen Sie sich inspirieren von zeitloser Eleganz und klassischem Stil.",
  gentlemen = [
    "Dunkler Anzug (Schwarz, Dunkelblau, Anthrazit)",
    "Weißes oder hellblaues Hemd",
    "Krawatte oder Fliege",
    "Elegante Lederschuhe",
    "Optional: Smoking für besondere Eleganz"
  ],
  ladies = [
    "Langes Abendkleid oder elegantes Cocktailkleid",
    "Dezenter Schmuck",
    "Elegante Absatzschuhe oder schicke Ballerinas",
    "Leichte Stola für den Abend",
    "Passende Abendtasche"
  ],
  colorPalette = [
    { name: "Champagner", color: "#F5F0E6" },
    { name: "Bordeaux", color: "#722F37" },
    { name: "Navy", color: "#1B2838" },
    { name: "Smaragd", color: "#50C878" },
    { name: "Gold", color: "#D4AF37" }
  ],
  avoidColors = "Bitte vermeiden Sie Weiß, Elfenbein und Creme – diese Farben sind der Braut vorbehalten."
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

  return (
    <DresscodeSection id="dresscode" ref={sectionRef}>
      <GridPattern />
      
      <Container>
        <SectionHeader $visible={isVisible}>
          <Eyebrow>Kleidungsempfehlung</Eyebrow>
          <Title><span>Dresscode</span></Title>
          <GoldLine />
        </SectionHeader>

        <MainCard $visible={isVisible}>
          <CornerFrame $position="tl" />
          <CornerFrame $position="tr" />
          <CornerFrame $position="bl" />
          <CornerFrame $position="br" />
          
          <DresscodeLabel>Der Dresscode</DresscodeLabel>
          <DresscodeName>{code}</DresscodeName>
          <DresscodeDescription>{description}</DresscodeDescription>
        </MainCard>

        <GenderGrid>
          <GenderCard $visible={isVisible} $delay="0.3s">
            <GenderIcon>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                <path d="M12 14c-6.627 0-8 4-8 4v2h16v-2s-1.373-4-8-4z" />
              </svg>
            </GenderIcon>
            <GenderTitle>Für die Herren</GenderTitle>
            <SuggestionList>
              {gentlemen.map((item, index) => (
                <SuggestionItem key={index}>{item}</SuggestionItem>
              ))}
            </SuggestionList>
          </GenderCard>

          <GenderCard $visible={isVisible} $delay="0.4s">
            <GenderIcon>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                <path d="M5 22l3-10h8l3 10M10 12v10M14 12v10" />
              </svg>
            </GenderIcon>
            <GenderTitle>Für die Damen</GenderTitle>
            <SuggestionList>
              {ladies.map((item, index) => (
                <SuggestionItem key={index}>{item}</SuggestionItem>
              ))}
            </SuggestionList>
          </GenderCard>
        </GenderGrid>

        <ColorSection $visible={isVisible}>
          <ColorTitle>Farbempfehlung</ColorTitle>
          <ColorText>
            Wir empfehlen dezente, elegante Farbtöne, die zur festlichen Atmosphäre passen:
          </ColorText>
          <ColorSwatches>
            {colorPalette.map((swatch, index) => (
              <ColorSwatch key={index}>
                <SwatchCircle $color={swatch.color} />
                <SwatchName>{swatch.name}</SwatchName>
              </ColorSwatch>
            ))}
          </ColorSwatches>
        </ColorSection>

        {avoidColors && (
          <AvoidSection $visible={isVisible}>
            <AvoidTitle>Bitte beachten Sie</AvoidTitle>
            <AvoidText>{avoidColors}</AvoidText>
          </AvoidSection>
        )}
      </Container>
    </DresscodeSection>
  );
};

export default Dresscode;
