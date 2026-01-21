import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE GIFTS - Sophisticated Gift Registry
// ═══════════════════════════════════════════════════════════════════════════

const Section = styled.section`
  position: relative;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-charcoal);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const Intro = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.15);
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.4);
    background: rgba(10, 10, 10, 0.7);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212, 175, 55, 0.3);
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--luxe-white);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
`;

const BankDetails = styled.div`
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 1.5rem;
  text-align: left;
`;

const BankRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const BankLabel = styled.span`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

const BankValue = styled.span`
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--luxe-white);
`;

const CopyButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: var(--luxe-gold);
  }
`;

const Quote = styled.blockquote`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  
  p {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
    
    &::before { content: '"'; color: var(--luxe-gold); }
    &::after { content: '"'; color: var(--luxe-gold); }
  }
`;

function Gifts({ giftData }) {
  const [copied, setCopied] = useState(false);
  
  const data = giftData || {
    bankName: 'Deutsche Bank',
    accountHolder: 'Victoria & Alexander',
    iban: 'DE89 3704 0044 0532 0130 00',
    bic: 'COBADEFFXXX',
    reference: 'Hochzeit V&A',
  };
  
  const copyIBAN = () => {
    navigator.clipboard.writeText(data.iban.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Section id="gifts">
      <Container>
        <Header>
          <Eyebrow>Geschenke</Eyebrow>
          <Title>Ein <span>Wort</span> zu Geschenken</Title>
          <Intro>
            Ihre Anwesenheit an unserem besonderen Tag ist uns das größte Geschenk. 
            Sollten Sie uns dennoch etwas schenken wollen, würden wir uns über einen 
            Beitrag zu unserer Hochzeitsreise sehr freuen.
          </Intro>
        </Header>
        
        <ContentGrid>
          <Card>
            <CardIcon>✈️</CardIcon>
            <CardTitle>Hochzeitsreise</CardTitle>
            <CardText>
              Wir träumen von einer Reise an die Amalfiküste. Jeder Beitrag bringt uns 
              diesem Traum ein Stückchen näher.
            </CardText>
            <BankDetails>
              <BankRow>
                <BankLabel>Bank</BankLabel>
                <BankValue>{data.bankName}</BankValue>
              </BankRow>
              <BankRow>
                <BankLabel>Inhaber</BankLabel>
                <BankValue>{data.accountHolder}</BankValue>
              </BankRow>
              <BankRow>
                <BankLabel>IBAN</BankLabel>
                <BankValue>{data.iban}</BankValue>
              </BankRow>
              <BankRow>
                <BankLabel>BIC</BankLabel>
                <BankValue>{data.bic}</BankValue>
              </BankRow>
              <BankRow>
                <BankLabel>Verwendung</BankLabel>
                <BankValue>{data.reference}</BankValue>
              </BankRow>
            </BankDetails>
            <CopyButton onClick={copyIBAN}>
              {copied ? '✓ Kopiert!' : 'IBAN kopieren'}
            </CopyButton>
          </Card>
          
          <Card>
            <CardIcon>💝</CardIcon>
            <CardTitle>Ihre Anwesenheit</CardTitle>
            <CardText>
              Wir möchten betonen, dass uns Ihre Anwesenheit wichtiger ist als jedes 
              materielle Geschenk. Feiern Sie mit uns – das ist alles, was wir uns wünschen.
            </CardText>
            <CardText>
              Falls Sie sich dennoch für ein persönliches Geschenk entscheiden, sprechen 
              Sie gerne mit unseren Trauzeugen – sie können Ihnen mit Ideen behilflich sein.
            </CardText>
          </Card>
          
          <Quote>
            <p>
              Nicht was wir haben, sondern wen wir haben – das macht das Leben reich.
            </p>
          </Quote>
        </ContentGrid>
      </Container>
    </Section>
  );
}

export default Gifts;
