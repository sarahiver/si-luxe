import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-cream);
`;

const Container = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--luxe-border);
`;

const Question = styled.button`
  width: 100%;
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  text-align: left;
  
  span {
    font-size: 1.2rem;
    color: var(--luxe-text-muted);
    transform: rotate(${p => p.$isOpen ? '45deg' : '0'});
    transition: transform 0.3s ease;
  }
`;

const Answer = styled.div`
  max-height: ${p => p.$isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AnswerText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text-light);
  line-height: 1.8;
  padding-bottom: 1.25rem;
`;

function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const defaultFaqs = [
    { q: 'Kann ich eine Begleitung mitbringen?', a: 'Bitte prüft eure Einladung – dort ist vermerkt, ob eine Begleitung inkludiert ist.' },
    { q: 'Gibt es einen Parkplatz?', a: 'Ja, es stehen kostenlose Parkplätze direkt am Veranstaltungsort zur Verfügung.' },
    { q: 'Wann sollte ich meine Zu- oder Absage senden?', a: 'Bitte gebt uns bis zum 1. August Bescheid, damit wir alles planen können.' },
    { q: 'Dürfen Kinder mitgebracht werden?', a: 'Wir haben uns für eine Feier nur für Erwachsene entschieden.' },
  ];
  
  const faqData = faqs || defaultFaqs;
  
  return (
    <Section id="faq">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>FAQ</Eyebrow>
          <Title>Häufige Fragen</Title>
        </Header>
        
        <FAQList>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <Question 
                $isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.q}
                <span>+</span>
              </Question>
              <Answer $isOpen={openIndex === index}>
                <AnswerText>{faq.a}</AnswerText>
              </Answer>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
}

export default FAQ;
