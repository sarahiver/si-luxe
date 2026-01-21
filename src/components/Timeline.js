import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-cream);
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const GoldLine = styled.div`
  width: 1px;
  height: 30px;
  background: var(--luxe-gold);
  margin: 0 auto 1.5rem;
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-style: italic;
  color: var(--luxe-text-heading);
`;

const TimelineWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--luxe-border);
    transform: translateX(-50%);
    
    @media (max-width: 600px) {
      left: 20px;
    }
  }
`;

const Event = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  
  &:nth-child(odd) {
    flex-direction: row-reverse;
    text-align: right;
    
    @media (max-width: 600px) {
      flex-direction: row;
      text-align: left;
    }
  }
  
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

const EventContent = styled.div`
  flex: 1;
  padding: 0 2rem;
  
  @media (max-width: 600px) {
    padding: 0 0 0 2rem;
  }
`;

const EventTime = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 0.5rem;
`;

const EventText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--luxe-text-light);
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--luxe-gold);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

const Spacer = styled.div`
  flex: 1;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

function Timeline({ events }) {
  const defaultEvents = [
    { time: '14:00', title: 'Empfang', text: 'Sektempfang im Schlossgarten' },
    { time: '15:00', title: 'Trauung', text: 'Standesamtliche Trauung in der Orangerie' },
    { time: '16:30', title: 'Kaffee & Kuchen', text: 'Auf der Terrasse' },
    { time: '18:00', title: 'Dinner', text: 'Festliches Abendessen im Spiegelsaal' },
    { time: '21:00', title: 'Party', text: 'Tanz und Feiern bis in die Nacht' },
  ];
  
  const eventData = events || defaultEvents;
  
  return (
    <Section id="timeline">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Der Tag</Eyebrow>
          <Title>Ablauf</Title>
        </Header>
        
        <TimelineWrapper>
          {eventData.map((event, index) => (
            <Event key={index}>
              <EventContent>
                <EventTime>{event.time}</EventTime>
                <EventTitle>{event.title}</EventTitle>
                <EventText>{event.text}</EventText>
              </EventContent>
              <Dot />
              <Spacer />
            </Event>
          ))}
        </TimelineWrapper>
      </Container>
    </Section>
  );
}

export default Timeline;
