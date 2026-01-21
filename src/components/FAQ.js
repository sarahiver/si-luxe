import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE FAQ - Sophisticated Accordion
// ═══════════════════════════════════════════════════════════════════════════

const Section = styled.section`
  position: relative;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-black);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    padding-left: 1rem;
  }
`;

const QuestionText = styled.span`
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--luxe-white);
  padding-right: 2rem;
  transition: color 0.3s ease;
  
  ${FAQItem}:hover & {
    color: var(--luxe-gold);
  }
`;

const Icon = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: var(--luxe-gold);
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  ${p => p.$open && css`
    background: var(--luxe-gold);
    color: var(--luxe-black);
    transform: rotate(45deg);
  `}
`;

const Answer = styled.div`
  max-height: ${p => p.$open ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s var(--ease-luxe);
`;

const AnswerInner = styled.div`
  padding: 0 0 2rem 0;
`;

const AnswerText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 1rem;
  border-left: 2px solid rgba(212, 175, 55, 0.3);
`;

function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const defaultFAQs = [
    {
      question: 'Gibt es eine Kleiderordnung?',
      answer: 'Wir bitten um festliche Eleganz. Für Herren empfehlen wir einen dunklen Anzug, für Damen ein elegantes Abendkleid oder Cocktailkleid. Bitte vermeiden Sie Weiß und Creme – diese Farben sind der Braut vorbehalten.',
    },
    {
      question: 'Sind Kinder willkommen?',
      answer: 'Wir haben uns entschieden, unsere Hochzeit als eine Feier für Erwachsene zu gestalten. Wir bitten um Ihr Verständnis und hoffen, dass Sie den Abend ohne die Kleinen genießen können.',
    },
    {
      question: 'Kann ich eine Begleitung mitbringen?',
      answer: 'Die Einladung gilt für die auf der Karte genannten Personen. Sollten Sie unsicher sein, sprechen Sie uns bitte direkt an.',
    },
    {
      question: 'Gibt es Parkmöglichkeiten?',
      answer: 'Ja, direkt am Schloss stehen kostenfreie Parkplätze zur Verfügung. Alternativ empfehlen wir die Anreise mit dem Taxi – nach der Feier können wir gerne Taxis für Sie organisieren.',
    },
    {
      question: 'Darf ich Fotos machen?',
      answer: 'Während der Trauung bitten wir Sie, Ihre Kameras und Handys in der Tasche zu lassen – unser Fotograf wird den Moment festhalten. Bei der Feier freuen wir uns über Ihre Schnappschüsse!',
    },
    {
      question: 'Gibt es vegetarische oder vegane Optionen?',
      answer: 'Selbstverständlich! Bitte geben Sie Ihre Präferenzen bei der RSVP-Antwort an. Bei speziellen Allergien oder Unverträglichkeiten kontaktieren Sie uns bitte direkt.',
    },
    {
      question: 'Bis wann muss ich zusagen?',
      answer: 'Wir bitten um Ihre Rückmeldung bis zum 15. August 2025, damit wir entsprechend planen können.',
    },
    {
      question: 'Was soll ich schenken?',
      answer: 'Ihre Anwesenheit ist das größte Geschenk! Wenn Sie uns dennoch etwas schenken möchten, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.',
    },
  ];
  
  const faqList = faqs || defaultFAQs;
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <Section id="faq">
      <Container>
        <Header>
          <Eyebrow>Häufige Fragen</Eyebrow>
          <Title>Alles was Sie <span>wissen</span> müssen</Title>
        </Header>
        
        <FAQList>
          {faqList.map((faq, index) => (
            <FAQItem key={index}>
              <Question onClick={() => toggleFAQ(index)}>
                <QuestionText>{faq.question}</QuestionText>
                <Icon $open={openIndex === index}>+</Icon>
              </Question>
              <Answer $open={openIndex === index}>
                <AnswerInner>
                  <AnswerText>{faq.answer}</AnswerText>
                </AnswerInner>
              </Answer>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
}

export default FAQ;
