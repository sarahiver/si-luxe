import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE TIMELINE - Vertical Elegance with Gold Line
// ═══════════════════════════════════════════════════════════════════════════

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const drawLine = keyframes`
  from { height: 0; }
  to { height: 100%; }
`;

const Section = styled.section`
  position: relative;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-black);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const TimelineContainer = styled.div`
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--luxe-gold), transparent);
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  justify-content: ${p => p.$align === 'left' ? 'flex-start' : 'flex-end'};
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  padding: 2rem;
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.15);
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : (p.$align === 'left' ? '-30px' : '30px')});
  transition: all 0.8s var(--ease-luxe);
  
  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    width: 40px;
    height: 1px;
    background: var(--luxe-gold);
    
    ${p => p.$align === 'left' ? css`
      right: -40px;
    ` : css`
      left: -40px;
    `}
    
    @media (max-width: 768px) {
      left: -30px;
      width: 20px;
    }
  }
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.4);
    background: rgba(26, 26, 26, 0.8);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 3rem;
  width: 12px;
  height: 12px;
  background: var(--luxe-black);
  border: 2px solid var(--luxe-gold);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--luxe-gold);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  
  ${TimelineItem}:hover & {
    &::after {
      transform: scale(1);
    }
  }
  
  @media (max-width: 768px) {
    left: 20px;
  }
`;

const Time = styled.span`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  display: block;
  margin-bottom: 0.75rem;
`;

const EventTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--luxe-white);
  margin-bottom: 0.75rem;
`;

const EventDescription = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const EventLocation = styled.span`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '◇';
    color: var(--luxe-gold);
    font-size: 0.6rem;
  }
`;

const DresscodeTag = styled.span`
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  background: rgba(212, 175, 55, 0.1);
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin-top: 1rem;
`;

function Timeline({ events }) {
  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);
  
  const defaultEvents = [
    {
      time: '13:30 Uhr',
      title: 'Empfang der Gäste',
      description: 'Wir heißen euch herzlich willkommen mit einem Glas Champagner im Schlossfoyer.',
      location: 'Schlossfoyer',
      dresscode: 'Festliche Eleganz',
    },
    {
      time: '14:00 Uhr',
      title: 'Trauung',
      description: 'Die standesamtliche Trauung findet im historischen Spiegelsaal statt.',
      location: 'Spiegelsaal',
    },
    {
      time: '15:00 Uhr',
      title: 'Sektempfang & Gratulationen',
      description: 'Stoßt mit uns an! Im Schlossgarten erwarten euch erlesene Häppchen und Champagner.',
      location: 'Schlossgarten',
    },
    {
      time: '16:30 Uhr',
      title: 'Gruppenfoto',
      description: 'Wir möchten diesen besonderen Moment mit euch allen festhalten.',
      location: 'Schlossbalkon',
    },
    {
      time: '18:00 Uhr',
      title: 'Festliches Dinner',
      description: 'Ein 5-Gänge-Menü erwartet euch im festlich geschmückten Ballsaal.',
      location: 'Großer Ballsaal',
    },
    {
      time: '21:00 Uhr',
      title: 'Eröffnungstanz & Party',
      description: 'Lasst uns gemeinsam die Nacht durchtanzen! DJ und Live-Band sorgen für beste Stimmung.',
      location: 'Großer Ballsaal',
    },
  ];
  
  const timelineEvents = events || defaultEvents;
  
  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });
    
    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [timelineEvents]);
  
  return (
    <Section id="timeline">
      <Container>
        <Header>
          <Eyebrow>Tagesablauf</Eyebrow>
          <Title>Der <span>Ablauf</span> unseres Tages</Title>
        </Header>
        
        <TimelineContainer>
          {timelineEvents.map((event, index) => {
            const align = index % 2 === 0 ? 'left' : 'right';
            return (
              <TimelineItem
                key={index}
                ref={el => itemRefs.current[index] = el}
                $align={align}
              >
                <TimelineDot />
                <TimelineContent $visible={visibleItems[index]} $align={align}>
                  <Time>{event.time}</Time>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                  <EventLocation>{event.location}</EventLocation>
                  {event.dresscode && (
                    <DresscodeTag>{event.dresscode}</DresscodeTag>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Container>
    </Section>
  );
}

export default Timeline;
