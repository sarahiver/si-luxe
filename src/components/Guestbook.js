import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { supabase } from '../lib/supabase';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Guestbook (Gästebuch) Component
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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const GuestbookSection = styled.section`
  position: relative;
  background: var(--luxe-black);
  padding: var(--section-padding) 2rem;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: var(--container-max);
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

const Subtitle = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  margin: 0 auto;
`;

const GoldLine = styled.div`
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--luxe-gold), transparent);
  margin: 1.5rem auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.2s forwards` : 'none'};
`;

const FormCard = styled.form`
  background: var(--luxe-charcoal);
  padding: 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid var(--luxe-gold);
  
  ${props => props.$position === 'tl' && css`
    top: -1px; left: -1px;
    border-right: none; border-bottom: none;
  `}
  ${props => props.$position === 'tr' && css`
    top: -1px; right: -1px;
    border-left: none; border-bottom: none;
  `}
  ${props => props.$position === 'bl' && css`
    bottom: -1px; left: -1px;
    border-right: none; border-top: none;
  `}
  ${props => props.$position === 'br' && css`
    bottom: -1px; right: -1px;
    border-left: none; border-top: none;
  `}
`;

const FormTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--luxe-white);
  font-family: var(--font-sans);
  font-size: 1rem;
  transition: all 0.3s var(--ease-luxe);
  
  &:focus {
    border-color: var(--luxe-gold);
    background: rgba(212, 175, 55, 0.05);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  min-height: 150px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--luxe-white);
  font-family: var(--font-sans);
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s var(--ease-luxe);
  
  &:focus {
    border-color: var(--luxe-gold);
    background: rgba(212, 175, 55, 0.05);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-black);
  background: linear-gradient(135deg, var(--luxe-gold), var(--luxe-gold-light));
  border: none;
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  margin-top: 1rem;
  
  p {
    font-family: var(--font-sans);
    color: #22c55e;
    font-size: 0.9rem;
  }
`;

const MessagesSection = styled.div`
  opacity: 0;
  animation: ${props => props.$visible ? css`${fadeUp} 0.8s var(--ease-luxe) 0.4s forwards` : 'none'};
`;

const MessagesTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span {
    font-size: 0.8rem;
    font-family: var(--font-sans);
    color: var(--luxe-gold);
    opacity: 0.7;
  }
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 1rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--luxe-gold);
    border-radius: 2px;
  }
`;

const MessageCard = styled.div`
  background: var(--luxe-charcoal);
  padding: 1.5rem;
  border-left: 2px solid var(--luxe-gold);
  position: relative;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    transform: translateX(5px);
    background: rgba(26, 26, 26, 0.8);
  }
`;

const MessageText = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: 1rem;
  
  &::before {
    content: '"';
    color: var(--luxe-gold);
    font-size: 1.5rem;
    margin-right: 0.25rem;
  }
  
  &::after {
    content: '"';
    color: var(--luxe-gold);
    font-size: 1.5rem;
    margin-left: 0.25rem;
  }
`;

const MessageMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageAuthor = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--luxe-gold);
`;

const MessageDate = styled.p`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.4);
  
  svg {
    width: 50px;
    height: 50px;
    stroke: var(--luxe-gold);
    opacity: 0.5;
    margin-bottom: 1rem;
  }
  
  p {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-style: italic;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--luxe-gold);
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  p {
    font-family: var(--font-sans);
    font-size: 0.9rem;
  }
`;

const Guestbook = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
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

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching guestbook:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([{
          name: formData.name,
          message: formData.message,
          approved: true // Set to false if moderation needed
        }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', message: '' });
      fetchMessages();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <GuestbookSection id="guestbook" ref={sectionRef}>
      <Container>
        <SectionHeader $visible={isVisible}>
          <Eyebrow>Ihre Glückwünsche</Eyebrow>
          <Title><span>Gästebuch</span></Title>
          <GoldLine />
          <Subtitle>
            Hinterlassen Sie uns einen persönlichen Gruß,
            der uns auch noch nach der Hochzeit begleiten wird.
          </Subtitle>
        </SectionHeader>

        <ContentWrapper>
          <FormSection $visible={isVisible}>
            <FormCard onSubmit={handleSubmit}>
              <CornerFrame $position="tl" />
              <CornerFrame $position="tr" />
              <CornerFrame $position="bl" />
              <CornerFrame $position="br" />
              
              <FormTitle>Schreiben Sie uns</FormTitle>
              
              <InputGroup>
                <Label htmlFor="guestbook-name">Ihr Name</Label>
                <Input
                  id="guestbook-name"
                  type="text"
                  placeholder="Max Mustermann"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="guestbook-message">Ihre Nachricht</Label>
                <Textarea
                  id="guestbook-message"
                  placeholder="Ihre herzlichen Worte für uns..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </InputGroup>
              
              <SubmitButton type="submit" disabled={submitting}>
                {submitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </SubmitButton>
              
              {success && (
                <SuccessMessage>
                  <p>Vielen Dank für Ihre lieben Worte!</p>
                </SuccessMessage>
              )}
            </FormCard>
          </FormSection>

          <MessagesSection $visible={isVisible}>
            <MessagesTitle>
              Einträge
              <span>{messages.length} {messages.length === 1 ? 'Nachricht' : 'Nachrichten'}</span>
            </MessagesTitle>
            
            {loading ? (
              <LoadingState>
                <p>Lädt Einträge...</p>
              </LoadingState>
            ) : messages.length > 0 ? (
              <MessagesList>
                {messages.map((message, index) => (
                  <MessageCard key={message.id || index}>
                    <MessageText>{message.message}</MessageText>
                    <MessageMeta>
                      <MessageAuthor>{message.name}</MessageAuthor>
                      <MessageDate>{formatDate(message.created_at)}</MessageDate>
                    </MessageMeta>
                  </MessageCard>
                ))}
              </MessagesList>
            ) : (
              <EmptyState>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>Seien Sie der Erste, der uns einen Gruß hinterlässt</p>
              </EmptyState>
            )}
          </MessagesSection>
        </ContentWrapper>
      </Container>
    </GuestbookSection>
  );
};

export default Guestbook;
