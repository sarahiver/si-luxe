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

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const noteFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  padding: 120px 5% 100px;
  position: relative;
  overflow: hidden;
`;

const FloatingNotes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const MusicNote = styled.span`
  position: absolute;
  font-size: ${props => props.$size || '2rem'};
  color: #D4AF37;
  opacity: 0.1;
  animation: ${noteFloat} ${props => props.$duration || '4s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top};
  left: ${props => props.$left};
`;

const Container = styled.div`
  max-width: 900px;
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

const FormCard = styled.div`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 50px;
  position: relative;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
  
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
  gap: 30px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
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

const TextArea = styled.textarea`
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 16px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #FAFAFA;
  min-height: 120px;
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
  align-self: center;
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
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  border: 1px solid ${props => props.$error ? 'rgba(220, 53, 69, 0.5)' : 'rgba(212, 175, 55, 0.5)'};
  background: ${props => props.$error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(212, 175, 55, 0.1)'};
  color: ${props => props.$error ? '#ff6b6b' : '#D4AF37'};
`;

const WishesDisplay = styled.div`
  margin-top: 80px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.4s;
`;

const WishesTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #FAFAFA;
  text-align: center;
  margin-bottom: 40px;
  
  span {
    color: #D4AF37;
  }
`;

const WishesList = styled.div`
  display: grid;
  gap: 20px;
`;

const WishCard = styled.div`
  background: linear-gradient(145deg, rgba(26, 26, 26, 0.6), rgba(10, 10, 10, 0.7));
  border: 1px solid rgba(212, 175, 55, 0.15);
  padding: 25px 30px;
  display: flex;
  align-items: center;
  gap: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    background: linear-gradient(145deg, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.9));
  }
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const WishIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05));
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  span {
    font-size: 1.5rem;
    color: #D4AF37;
  }
`;

const WishContent = styled.div`
  flex: 1;
`;

const WishSong = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #FAFAFA;
  margin: 0 0 5px;
`;

const WishArtist = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #D4AF37;
  margin: 0;
`;

const WishNote = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(250, 250, 250, 0.6);
  margin: 8px 0 0;
  font-style: italic;
`;

const WishMeta = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(250, 250, 250, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EmptyState = styled.p`
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: rgba(250, 250, 250, 0.5);
  font-style: italic;
  padding: 40px;
`;

const MusicWishes = ({
  sectionTitle = 'Musikwünsche',
  sectionSubtitle = 'Welche Songs bringen Sie auf die Tanzfläche? Teilen Sie uns Ihre Lieblingssongs mit.',
  showWishes = true
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [wishesVisible, setWishesVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    guestName: '',
    songTitle: '',
    artist: '',
    note: ''
  });
  
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const wishesRef = useRef(null);
  
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
          } else if (entry.target === formRef.current) {
            setFormVisible(true);
          } else if (entry.target === wishesRef.current) {
            setWishesVisible(true);
          }
        }
      });
    }, observerOptions);
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (wishesRef.current) observer.observe(wishesRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (showWishes) {
      fetchWishes();
    }
  }, [showWishes]);
  
  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('music_wishes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });
    
    if (!formData.guestName || !formData.songTitle) {
      setMessage({ text: 'Bitte füllen Sie alle Pflichtfelder aus.', error: true });
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('music_wishes')
        .insert([{
          guest_name: formData.guestName,
          song_title: formData.songTitle,
          artist: formData.artist,
          note: formData.note
        }]);
      
      if (error) throw error;
      
      setMessage({ text: 'Vielen Dank für Ihren Musikwunsch!', error: false });
      setFormData({ guestName: '', songTitle: '', artist: '', note: '' });
      
      if (showWishes) {
        fetchWishes();
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      setMessage({ text: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.', error: true });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Section id="musik">
      <FloatingNotes>
        <MusicNote $top="15%" $left="10%" $size="3rem" $duration="5s" $delay="0s">♪</MusicNote>
        <MusicNote $top="25%" $left="85%" $size="2rem" $duration="4s" $delay="1s">♫</MusicNote>
        <MusicNote $top="60%" $left="5%" $size="2.5rem" $duration="6s" $delay="2s">♩</MusicNote>
        <MusicNote $top="70%" $left="90%" $size="2rem" $duration="4.5s" $delay="0.5s">♬</MusicNote>
        <MusicNote $top="85%" $left="20%" $size="1.5rem" $duration="5.5s" $delay="1.5s">♪</MusicNote>
      </FloatingNotes>
      
      <Container>
        <Header ref={sectionRef} $visible={headerVisible}>
          <Overline>Playlist</Overline>
          <Title><span>{sectionTitle}</span></Title>
          <GoldLine $visible={headerVisible} />
          <Subtitle>{sectionSubtitle}</Subtitle>
        </Header>
        
        <FormCard ref={formRef} $visible={formVisible}>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputGroup>
                <Label htmlFor="guestName">Ihr Name *</Label>
                <Input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  placeholder="Ihr Name"
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="songTitle">Songtitel *</Label>
                <Input
                  type="text"
                  id="songTitle"
                  name="songTitle"
                  value={formData.songTitle}
                  onChange={handleChange}
                  placeholder="Welchen Song wünschen Sie?"
                  required
                />
              </InputGroup>
            </FormRow>
            
            <InputGroup>
              <Label htmlFor="artist">Künstler / Band</Label>
              <Input
                type="text"
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                placeholder="Von wem ist der Song?"
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="note">Anmerkung</Label>
              <TextArea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Gibt es etwas, das wir wissen sollten? Ein besonderer Moment für diesen Song?"
              />
            </InputGroup>
            
            {message.text && (
              <Message $error={message.error}>{message.text}</Message>
            )}
            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Wird gesendet...' : 'Wunsch absenden'}
            </SubmitButton>
          </Form>
        </FormCard>
        
        {showWishes && (
          <WishesDisplay ref={wishesRef} $visible={wishesVisible}>
            <WishesTitle>
              Bisherige <span>Wünsche</span>
            </WishesTitle>
            
            {wishes.length > 0 ? (
              <WishesList>
                {wishes.map((wish) => (
                  <WishCard key={wish.id}>
                    <WishIcon>
                      <span>♪</span>
                    </WishIcon>
                    <WishContent>
                      <WishSong>{wish.song_title}</WishSong>
                      {wish.artist && <WishArtist>{wish.artist}</WishArtist>}
                      {wish.note && <WishNote>"{wish.note}"</WishNote>}
                    </WishContent>
                    <WishMeta>von {wish.guest_name}</WishMeta>
                  </WishCard>
                ))}
              </WishesList>
            ) : (
              <EmptyState>
                Noch keine Musikwünsche vorhanden. Seien Sie der Erste!
              </EmptyState>
            )}
          </WishesDisplay>
        )}
      </Container>
    </Section>
  );
};

export default MusicWishes;
