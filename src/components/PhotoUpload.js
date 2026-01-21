import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { supabase } from '../lib/supabase';
import { uploadToCloudinary, CLOUDINARY_CONFIG } from '../lib/cloudinary';

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
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
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
  opacity: 0.03;
  background-image: 
    linear-gradient(90deg, #D4AF37 1px, transparent 1px),
    linear-gradient(#D4AF37 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1000px;
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

const UploadCard = styled.div`
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

const DropZone = styled.div`
  border: 2px dashed ${props => props.$isDragging ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'};
  background: ${props => props.$isDragging ? 'rgba(212, 175, 55, 0.05)' : 'transparent'};
  padding: 60px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  
  &:hover {
    border-color: #D4AF37;
    background: rgba(212, 175, 55, 0.03);
  }
`;

const UploadIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), transparent);
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 40px;
    height: 40px;
    color: #D4AF37;
  }
`;

const DropZoneText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: #FAFAFA;
  margin: 0 0 10px;
`;

const DropZoneHint = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(250, 250, 250, 0.5);
  margin: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
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

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #D4AF37;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
    color: #0A0A0A;
  }
`;

const UploadProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(10, 10, 10, 0.8);
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #D4AF37, #F4E4BC);
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
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
  width: 100%;
  
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
  margin-top: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  border: 1px solid ${props => props.$error ? 'rgba(220, 53, 69, 0.5)' : 'rgba(212, 175, 55, 0.5)'};
  background: ${props => props.$error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(212, 175, 55, 0.1)'};
  color: ${props => props.$error ? '#ff6b6b' : '#D4AF37'};
`;

const RecentUploads = styled.div`
  margin-top: 80px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.4s;
`;

const RecentTitle = styled.h3`
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

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: scale(1.02);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PhotoCard}:hover & {
    opacity: 1;
  }
`;

const PhotoMeta = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  color: rgba(250, 250, 250, 0.8);
`;

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const PhotoUpload = ({
  sectionTitle = 'Ihre Fotos',
  sectionSubtitle = 'Teilen Sie Ihre schönsten Momente mit uns – wir freuen uns über jedes Foto!',
  showRecent = true,
  maxFiles = 10
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [recentVisible, setRecentVisible] = useState(false);
  
  const [guestName, setGuestName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const recentRef = useRef(null);
  const fileInputRef = useRef(null);
  
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
          } else if (entry.target === cardRef.current) {
            setCardVisible(true);
          } else if (entry.target === recentRef.current) {
            setRecentVisible(true);
          }
        }
      });
    }, observerOptions);
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    if (recentRef.current) observer.observe(recentRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (showRecent) {
      fetchRecentPhotos();
    }
  }, [showRecent]);
  
  const fetchRecentPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('guest_photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) throw error;
      setRecentPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  
  const handleFileSelect = useCallback((files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isUnderLimit = file.size <= 10 * 1024 * 1024; // 10MB
      return isValid && isUnderLimit;
    });
    
    if (validFiles.length + selectedFiles.length > maxFiles) {
      setMessage({ text: `Maximal ${maxFiles} Fotos können gleichzeitig hochgeladen werden.`, error: true });
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    // Generate previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, { file, url: e.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  }, [selectedFiles, maxFiles]);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    if (!guestName.trim()) {
      setMessage({ text: 'Bitte geben Sie Ihren Namen ein.', error: true });
      return;
    }
    
    if (selectedFiles.length === 0) {
      setMessage({ text: 'Bitte wählen Sie mindestens ein Foto aus.', error: true });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', error: false });
    
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploadProgress(prev => ({ ...prev, [i]: 0 }));
        
        // Simulate progress (Cloudinary doesn't provide real progress)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [i]: Math.min((prev[i] || 0) + 10, 90)
          }));
        }, 200);
        
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);
        
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [i]: 100 }));
        
        // Save to Supabase
        await supabase
          .from('guest_photos')
          .insert([{
            guest_name: guestName,
            image_url: cloudinaryUrl
          }]);
      }
      
      setMessage({ text: 'Vielen Dank! Ihre Fotos wurden erfolgreich hochgeladen.', error: false });
      setSelectedFiles([]);
      setPreviews([]);
      setUploadProgress({});
      
      if (showRecent) {
        fetchRecentPhotos();
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.', error: true });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Section id="fotos">
      <BackgroundPattern />
      <Container>
        <Header ref={sectionRef} $visible={headerVisible}>
          <Overline>Fotogalerie</Overline>
          <Title><span>{sectionTitle}</span></Title>
          <GoldLine $visible={headerVisible} />
          <Subtitle>{sectionSubtitle}</Subtitle>
        </Header>
        
        <UploadCard ref={cardRef} $visible={cardVisible}>
          <DropZone
            $isDragging={isDragging}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon>
              <CameraIcon />
            </UploadIcon>
            <DropZoneText>Klicken oder Fotos hierher ziehen</DropZoneText>
            <DropZoneHint>JPG, PNG bis 10 MB • Maximal {maxFiles} Fotos gleichzeitig</DropZoneHint>
          </DropZone>
          
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          
          {previews.length > 0 && (
            <PreviewGrid>
              {previews.map((preview, index) => (
                <PreviewItem key={index}>
                  <PreviewImage src={preview.url} alt={`Preview ${index + 1}`} />
                  <RemoveButton onClick={() => removeFile(index)}>
                    ✕
                  </RemoveButton>
                  {uploadProgress[index] !== undefined && uploadProgress[index] < 100 && (
                    <UploadProgress>
                      <ProgressBar $progress={uploadProgress[index]} />
                    </UploadProgress>
                  )}
                </PreviewItem>
              ))}
            </PreviewGrid>
          )}
          
          <InputGroup>
            <Label htmlFor="guestName">Ihr Name</Label>
            <Input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Damit wir wissen, von wem die Fotos sind"
            />
          </InputGroup>
          
          <SubmitButton 
            onClick={handleSubmit} 
            disabled={loading || selectedFiles.length === 0}
          >
            {loading ? 'Wird hochgeladen...' : `${selectedFiles.length} Foto${selectedFiles.length !== 1 ? 's' : ''} hochladen`}
          </SubmitButton>
          
          {message.text && (
            <Message $error={message.error}>{message.text}</Message>
          )}
        </UploadCard>
        
        {showRecent && recentPhotos.length > 0 && (
          <RecentUploads ref={recentRef} $visible={recentVisible}>
            <RecentTitle>
              Zuletzt <span>hochgeladen</span>
            </RecentTitle>
            <PhotoGrid>
              {recentPhotos.map((photo) => (
                <PhotoCard key={photo.id}>
                  <PhotoImage src={photo.image_url} alt={`Foto von ${photo.guest_name}`} />
                  <PhotoOverlay>
                    <PhotoMeta>von {photo.guest_name}</PhotoMeta>
                  </PhotoOverlay>
                </PhotoCard>
              ))}
            </PhotoGrid>
          </RecentUploads>
        )}
      </Container>
    </Section>
  );
};

export default PhotoUpload;
