import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { submitRSVP } from '../lib/supabase';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE RSVP - Sophisticated Form with Gold Accents
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-black);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  margin-bottom: 1rem;
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
`;

const Form = styled.form`
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.15);
  padding: 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.75rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--luxe-white);
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-style: italic;
  }
  
  &:focus {
    border-color: var(--luxe-gold);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--luxe-white);
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--luxe-gold);
    outline: none;
  }
  
  option {
    background: var(--luxe-charcoal);
    color: var(--luxe-white);
  }
`;

const AttendanceToggle = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 1.25rem 2rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.$active ? 'var(--luxe-black)' : 'rgba(255, 255, 255, 0.6)'};
  background: ${p => p.$active ? 'var(--luxe-gold)' : 'transparent'};
  border: 1px solid ${p => p.$active ? 'var(--luxe-gold)' : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--luxe-gold);
    color: ${p => p.$active ? 'var(--luxe-black)' : 'var(--luxe-gold)'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--luxe-white);
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  resize: vertical;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-style: italic;
  }
  
  &:focus {
    border-color: var(--luxe-gold);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem 2rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-black);
  background: linear-gradient(90deg, var(--luxe-gold-dark), var(--luxe-gold), var(--luxe-gold-light), var(--luxe-gold));
  background-size: 200% auto;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    animation: ${shimmer} 2s linear infinite;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Deadline = styled.p`
  text-align: center;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2rem;
  
  span {
    color: var(--luxe-gold);
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease;
  
  h3 {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 300;
    color: var(--luxe-white);
    margin-bottom: 1rem;
  }
  
  p {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
  }
`;

function RSVP({ deadline }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: null,
    guests: '1',
    menu: 'Klassisch',
    allergies: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitRSVP({
        ...formData,
        status: formData.attendance ? 'yes' : 'no',
      });
      setSubmitted(true);
    } catch (error) {
      console.error('RSVP submission error:', error);
      alert('Es gab einen Fehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <Section id="rsvp">
        <Container>
          <Form>
            <SuccessMessage>
              <h3>Vielen Dank!</h3>
              <p>
                {formData.attendance 
                  ? 'Wir freuen uns sehr, Sie auf unserer Hochzeit begrüßen zu dürfen.'
                  : 'Schade, dass Sie nicht dabei sein können. Sie werden uns fehlen.'}
              </p>
            </SuccessMessage>
          </Form>
        </Container>
      </Section>
    );
  }
  
  return (
    <Section id="rsvp">
      <Container>
        <Header>
          <Eyebrow>Antworten Sie uns</Eyebrow>
          <Title>Werden Sie <span>dabei sein</span>?</Title>
          <Subtitle>Wir freuen uns auf Ihre Rückmeldung</Subtitle>
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Vollständiger Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Ihr Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>E-Mail Adresse</Label>
            <Input
              type="email"
              name="email"
              placeholder="ihre.email@beispiel.de"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Werden Sie teilnehmen?</Label>
            <AttendanceToggle>
              <ToggleButton
                type="button"
                $active={formData.attendance === true}
                onClick={() => setFormData(prev => ({ ...prev, attendance: true }))}
              >
                Mit Freuden
              </ToggleButton>
              <ToggleButton
                type="button"
                $active={formData.attendance === false}
                onClick={() => setFormData(prev => ({ ...prev, attendance: false }))}
              >
                Leider nicht
              </ToggleButton>
            </AttendanceToggle>
          </FormGroup>
          
          {formData.attendance === true && (
            <>
              <FormGroup>
                <Label>Anzahl der Gäste (inkl. Ihnen)</Label>
                <Select name="guests" value={formData.guests} onChange={handleChange}>
                  <option value="1">1 Person</option>
                  <option value="2">2 Personen</option>
                  <option value="3">3 Personen</option>
                  <option value="4">4 Personen</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Menüauswahl</Label>
                <Select name="menu" value={formData.menu} onChange={handleChange}>
                  <option value="Klassisch">Klassisch (Fleisch)</option>
                  <option value="Fisch">Fisch</option>
                  <option value="Vegetarisch">Vegetarisch</option>
                  <option value="Vegan">Vegan</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Allergien oder Unverträglichkeiten</Label>
                <Input
                  type="text"
                  name="allergies"
                  placeholder="z.B. Nüsse, Gluten, Laktose..."
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </FormGroup>
            </>
          )}
          
          <FormGroup>
            <Label>Persönliche Nachricht (optional)</Label>
            <Textarea
              name="message"
              placeholder="Ihre Glückwünsche oder Anmerkungen..."
              value={formData.message}
              onChange={handleChange}
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={loading || formData.attendance === null}>
            {loading ? 'Wird gesendet...' : 'Antwort senden'}
          </SubmitButton>
        </Form>
        
        <Deadline>
          Bitte antworten Sie bis zum <span>{deadline || '15. August 2025'}</span>
        </Deadline>
      </Container>
    </Section>
  );
}

export default RSVP;
