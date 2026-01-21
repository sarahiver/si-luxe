import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { supabase } from '../lib/supabase';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const lineExpand = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  padding: 120px 5% 100px;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.02;
  background-image: radial-gradient(#D4AF37 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Overline = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0 0 20px;
  
  span {
    background: linear-gradient(
      90deg,
      #D4AF37 0%,
      #F4E4BC 25%,
      #D4AF37 50%,
      #F4E4BC 75%,
      #D4AF37 100%
    );
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
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto 30px;
  transform-origin: center;
  animation: ${props => props.$visible ? css`${lineExpand} 1s ease-out forwards` : 'none'};
  transform: scaleX(${props => props.$visible ? 1 : 0});
`;

const Subtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: rgba(250, 250, 250, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  font-style: italic;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const InfoSection = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateX(${props => props.$visible ? '0' : '-40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
`;

const InfoCard = styled.div`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.6), rgba(10, 10, 10, 0.7));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 40px;
  margin-bottom: 30px;
  position: relative;
  
  /* Corner decoration */
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    width: 25px;
    height: 25px;
    border-left: 1px solid #D4AF37;
    border-top: 1px solid #D4AF37;
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const InfoTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #D4AF37;
  margin: 0 0 25px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), transparent);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 18px;
    height: 18px;
    color: #D4AF37;
  }
`;

const ContactDetails = styled.div`
  padding-top: 5px;
`;

const ContactLabel = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.5);
  margin-bottom: 5px;
`;

const ContactValue = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #FAFAFA;
  
  a {
    color: #FAFAFA;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #D4AF37;
    }
  }
`;

const QuoteCard = styled.div`
  background: linear-gradient(145deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.02));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 35px;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 15px;
    left: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    color: #D4AF37;
    opacity: 0.3;
    line-height: 1;
  }
`;

const QuoteText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.8;
  font-style: italic;
  margin: 0;
  padding-left: 30px;
`;

const FormSection = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateX(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.3s;
`;

const FormCard = styled.div`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 50px;
  position: relative;
  
  /* Corner decorations */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid #D4AF37;
    opacity: 0.4;
  }
  
  &::before {
    top: 20px;
    left: 20px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: 20px;
    right: 20px;
    border-left: none;
    border-top: none;
  }
  
  @media (max-width: 768px) {
    padding: 35px 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #D4AF37;
`;

const Input = styled.input`
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 16px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #FAFAFA;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(250, 250, 250, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
    background: rgba(10, 10, 10, 0.8);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  }
`;

const Select = styled.select`
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 16px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #FAFAFA;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px center;
  
  option {
    background: #1A1A1A;
    color: #FAFAFA;
  }
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
    background-color: rgba(10, 10, 10, 0.8);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  }
`;

const TextArea = styled.textarea`
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 16px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #FAFAFA;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(250, 250, 250, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: #D4AF37;
    background: rgba(10, 10, 10, 0.8);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #D4AF37, #B8860B);
  border: none;
  padding: 18px 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #0A0A0A;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  align-self: flex-start;
  margin-top: 10px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  border: 1px solid ${props => props.$error ? 'rgba(220, 53, 69, 0.5)' : 'rgba(212, 175, 55, 0.5)'};
  background: ${props => props.$error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(212, 175, 55, 0.1)'};
  color: ${props => props.$error ? '#ff6b6b' : '#D4AF37'};
`;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Contact = ({
  sectionTitle = 'Kontakt',
  sectionSubtitle = 'Haben Sie Fragen? Wir freuen uns auf Ihre Nachricht.',
  contactInfo = {
    email: 'hochzeit@beispiel.de',
    phone: '+49 123 456789',
    address: 'Musterstraße 123, 12345 Musterstadt'
  },
  quote = 'Wir freuen uns darauf, diesen besonderen Tag mit Ihnen zu feiern und stehen für alle Fragen gerne zur Verfügung.',
  subjects = [
    { value: '', label: 'Bitte wählen...' },
    { value: 'general', label: 'Allgemeine Frage' },
    { value: 'rsvp', label: 'Frage zur Anmeldung' },
    { value: 'accommodation', label: 'Unterkunft' },
    { value: 'directions', label: 'Anfahrt' },
    { value: 'other', label: 'Sonstiges' }
  ]
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setHeaderVisible(true);
          } else if (entry.target === contentRef.current) {
            setContentVisible(true);
          }
        }
      });
    }, observerOptions);
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({ text: 'Bitte füllen Sie alle Pflichtfelder aus.', error: true });
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);
      
      if (error) throw error;
      
      setMessage({ text: 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.', error: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      setMessage({ text: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', error: true });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Section id="kontakt">
      <BackgroundPattern />
      <Container>
        <Header ref={sectionRef} $visible={headerVisible}>
          <Overline>Schreiben Sie uns</Overline>
          <Title><span>{sectionTitle}</span></Title>
          <GoldLine $visible={headerVisible} />
          <Subtitle>{sectionSubtitle}</Subtitle>
        </Header>
        
        <ContentGrid ref={contentRef}>
          <InfoSection $visible={contentVisible}>
            <InfoCard>
              <InfoTitle>Kontaktdaten</InfoTitle>
              
              <ContactItem>
                <ContactIcon>
                  <MailIcon />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>E-Mail</ContactLabel>
                  <ContactValue>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </ContactValue>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <PhoneIcon />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Telefon</ContactLabel>
                  <ContactValue>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
                  </ContactValue>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <LocationIcon />
                </ContactIcon>
                <ContactDetails>
                  <ContactLabel>Adresse</ContactLabel>
                  <ContactValue>{contactInfo.address}</ContactValue>
                </ContactDetails>
              </ContactItem>
            </InfoCard>
            
            <QuoteCard>
              <QuoteText>{quote}</QuoteText>
            </QuoteCard>
          </InfoSection>
          
          <FormSection $visible={contentVisible}>
            <FormCard>
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <InputGroup>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      required
                    />
                  </InputGroup>
                  
                  <InputGroup>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      required
                    />
                  </InputGroup>
                </FormRow>
                
                <InputGroup>
                  <Label htmlFor="subject">Betreff *</Label>
                  <Select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    {subjects.map((subj, index) => (
                      <option key={index} value={subj.value}>
                        {subj.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                
                <InputGroup>
                  <Label htmlFor="message">Nachricht *</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ihre Nachricht an uns..."
                    required
                  />
                </InputGroup>
                
                {message.text && (
                  <Message $error={message.error}>{message.text}</Message>
                )}
                
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Wird gesendet...' : 'Nachricht senden'}
                </SubmitButton>
              </Form>
            </FormCard>
          </FormSection>
        </ContentGrid>
      </Container>
    </Section>
  );
};

export default Contact;
