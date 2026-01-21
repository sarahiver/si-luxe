import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE COUNTDOWN - Dramatic Fullscreen Grid
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--luxe-charcoal);
  padding: var(--section-padding) 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 1200px;
  width: 100%;
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
  font-style: italic;
  color: var(--luxe-white);
  margin-bottom: 4rem;
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const TimeUnit = styled.div`
  position: relative;
  padding: 3rem 2rem;
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.2);
  animation: ${fadeIn} 1s var(--ease-luxe) forwards;
  animation-delay: ${p => p.$index * 0.15}s;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--luxe-gold), transparent);
  }
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.4);
    background: rgba(10, 10, 10, 0.8);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Number = styled.span`
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 300;
  background: linear-gradient(180deg, var(--luxe-white) 0%, var(--luxe-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

const Line = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
`;

const Diamond = styled.div`
  width: 8px;
  height: 8px;
  background: var(--luxe-gold);
  transform: rotate(45deg);
`;

const DateText = styled.p`
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2rem;
  letter-spacing: 0.1em;
`;

function Countdown({ weddingDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const targetDate = weddingDate ? new Date(weddingDate) : new Date('2025-10-12T14:00:00');
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const formatNumber = (num) => String(num).padStart(2, '0');
  
  const units = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ];
  
  return (
    <Section id="countdown">
      <Content>
        <Eyebrow>Countdown</Eyebrow>
        <Title>Bis zu unserem großen Tag</Title>
        
        <CountdownGrid>
          {units.map((unit, index) => (
            <TimeUnit key={unit.label} $index={index}>
              <Number>{formatNumber(unit.value)}</Number>
              <Label>{unit.label}</Label>
            </TimeUnit>
          ))}
        </CountdownGrid>
        
        <Divider>
          <Line />
          <Diamond />
          <Line />
        </Divider>
        
        <DateText>
          Sonntag, 12. Oktober 2025 um 14:00 Uhr
        </DateText>
      </Content>
    </Section>
  );
}

export default Countdown;
