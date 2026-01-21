import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--luxe-white);
  padding: 2rem;
`;

const Card = styled.div`
  max-width: 450px;
  width: 100%;
  padding: 3rem 2.5rem;
  background: var(--luxe-cream);
  text-align: center;
  animation: ${fadeIn} 1s ease forwards;
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
  margin-bottom: 1.5rem;
`;

const Names = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1.5rem;
`;

const Date = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--luxe-text);
  margin-bottom: 0.25rem;
`;

const Location = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  margin-bottom: 2.5rem;
`;

const CountdownGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const CountdownItem = styled.div``;

const CountdownNumber = styled.span`
  display: block;
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const CountdownLabel = styled.span`
  font-family: var(--font-sans);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
`;

const Message = styled.p`
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--luxe-text-light);
  margin-bottom: 2rem;
`;

const CalendarButton = styled.button`
  padding: 0.9rem 1.8rem;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text);
  background: transparent;
  border: 1px solid var(--luxe-border);
  cursor: pointer;
  
  &:hover {
    border-color: var(--luxe-gold);
    color: var(--luxe-gold);
  }
`;

function SaveTheDate({ weddingData }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const data = weddingData || {
    name1: 'Victoria',
    name2: 'Alexander',
    date: '14. September 2025',
    location: 'Schloss Benrath, Düsseldorf',
    message: 'Einladung folgt',
    weddingDateISO: '2025-09-14T14:00:00',
  };
  
  useEffect(() => {
    const targetDate = new Date(data.weddingDateISO);
    
    const calculate = () => {
      const now = new Date();
      const diff = targetDate - now;
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [data.weddingDateISO]);
  
  const downloadCalendar = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${data.weddingDateISO.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Hochzeit ${data.name1} & ${data.name2}
LOCATION:${data.location}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'save-the-date.ics';
    link.click();
  };
  
  const pad = n => String(n).padStart(2, '0');
  
  return (
    <Page>
      <Card>
        <GoldLine />
        <Eyebrow>Save the Date</Eyebrow>
        <Names>{data.name1} & {data.name2}</Names>
        <Date>{data.date}</Date>
        <Location>{data.location}</Location>
        
        <CountdownGrid>
          <CountdownItem>
            <CountdownNumber>{pad(timeLeft.days)}</CountdownNumber>
            <CountdownLabel>Tage</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownNumber>{pad(timeLeft.hours)}</CountdownNumber>
            <CountdownLabel>Stunden</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownNumber>{pad(timeLeft.minutes)}</CountdownNumber>
            <CountdownLabel>Minuten</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownNumber>{pad(timeLeft.seconds)}</CountdownNumber>
            <CountdownLabel>Sekunden</CountdownLabel>
          </CountdownItem>
        </CountdownGrid>
        
        <Message>{data.message}</Message>
        <CalendarButton onClick={downloadCalendar}>Im Kalender speichern</CalendarButton>
      </Card>
    </Page>
  );
}

export default SaveTheDate;
