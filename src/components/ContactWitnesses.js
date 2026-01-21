import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Contact Witnesses (Kontakt Trauzeugen) Component
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

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const WitnessesSection = styled.section`
  position: relative;
  background: var(--luxe-black);
  padding: var(--section-padding) 2rem;
  overflow: hidden;
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
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const WitnessesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const WitnessCard = styled.div`
  background: var(--luxe-charcoal);
  padding: 3rem;
  text-align: center;
  position: relative;
  border: 1px solid rgba(212, 175, 55, 0.1);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) ${props.$delay || '0.2s'} forwards` : 'none'};
  transition: all 0.4s var(--ease-luxe);
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    transform: translateY(-10px);
    
    .avatar-frame {
      border-color: var(--luxe-gold);
    }
    
    .floating-icon {
      animation: ${float} 2s ease-in-out infinite;
    }
  }
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  border: 1px solid var(--luxe-gold);
  
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

const RoleLabel = styled.p`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1.5rem;
`;

const AvatarFrame = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border: 2px solid rgba(212, 175, 55, 0.3);
  padding: 5px;
  transition: all 0.4s var(--ease-luxe);
`;

const AvatarImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.$image ? `url(${props.$image})` : 'var(--luxe-dark)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 50px;
    height: 50px;
    stroke: var(--luxe-gold);
    opacity: 0.5;
  }
`;

const WitnessName = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 0.5rem;
`;

const WitnessRelation = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s var(--ease-luxe);
  
  svg {
    width: 18px;
    height: 18px;
    stroke: var(--luxe-gold);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--luxe-gold);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  top: -15px;
  right: 30px;
  width: 40px;
  height: 40px;
  background: var(--luxe-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: var(--luxe-black);
  }
`;

const NoteSection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.5s forwards` : 'none'};
`;

const NoteText = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactWitnesses = ({
  witnesses = [
    {
      name: "Marie Schmidt",
      role: "Trauzeugin der Braut",
      relation: "Beste Freundin seit der Schulzeit",
      phone: "+49 123 456789",
      email: "marie@example.com",
      image: null
    },
    {
      name: "Thomas Weber",
      role: "Trauzeuge des Bräutigams",
      relation: "Bruder des Bräutigams",
      phone: "+49 987 654321",
      email: "thomas@example.com",
      image: null
    }
  ],
  note = "Bei Fragen zur Hochzeit, Überraschungen oder organisatorischen Anliegen sind unsere Trauzeugen Ihre ersten Ansprechpartner."
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
    <WitnessesSection id="witnesses" ref={sectionRef}>
      <Container>
        <SectionHeader $visible={isVisible}>
          <Eyebrow>Ihre Ansprechpartner</Eyebrow>
          <Title><span>Trauzeugen</span></Title>
          <GoldLine />
          <Subtitle>
            Diese besonderen Menschen stehen Ihnen bei allen Fragen zur Seite
          </Subtitle>
        </SectionHeader>

        <WitnessesGrid>
          {witnesses.map((witness, index) => (
            <WitnessCard 
              key={index} 
              $visible={isVisible} 
              $delay={`${0.2 + index * 0.15}s`}
            >
              <CornerFrame $position="tl" />
              <CornerFrame $position="tr" />
              <CornerFrame $position="bl" />
              <CornerFrame $position="br" />
              
              <FloatingIcon className="floating-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </FloatingIcon>
              
              <RoleLabel>{witness.role}</RoleLabel>
              
              <AvatarFrame className="avatar-frame">
                <AvatarImage $image={witness.image}>
                  {!witness.image && (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </AvatarImage>
              </AvatarFrame>
              
              <WitnessName>{witness.name}</WitnessName>
              <WitnessRelation>{witness.relation}</WitnessRelation>
              
              <ContactInfo>
                {witness.phone && (
                  <ContactLink href={`tel:${witness.phone.replace(/\s/g, '')}`}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {witness.phone}
                  </ContactLink>
                )}
                
                {witness.email && (
                  <ContactLink href={`mailto:${witness.email}`}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {witness.email}
                  </ContactLink>
                )}
              </ContactInfo>
            </WitnessCard>
          ))}
        </WitnessesGrid>

        {note && (
          <NoteSection $visible={isVisible}>
            <NoteText>{note}</NoteText>
          </NoteSection>
        )}
      </Container>
    </WitnessesSection>
  );
};

export default ContactWitnesses;
