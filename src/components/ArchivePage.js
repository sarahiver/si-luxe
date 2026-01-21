import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { savePhotoUpload } from '../lib/supabase';

const Page = styled.div`
  min-height: 100vh;
  background: var(--luxe-white);
`;

const Header = styled.header`
  text-align: center;
  padding: 5rem 2rem 4rem;
  background: var(--luxe-cream);
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

const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--luxe-text-light);
  max-width: 500px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-style: italic;
  color: var(--luxe-text-heading);
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img { transform: scale(1.03); }
`;

const UploadSection = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: var(--luxe-cream);
  margin: 3rem 0;
`;

const DropZone = styled.div`
  max-width: 400px;
  margin: 1.5rem auto 0;
  padding: 2rem;
  background: var(--luxe-white);
  border: 1px dashed ${p => p.$isDragging ? 'var(--luxe-gold)' : 'var(--luxe-border)'};
  cursor: pointer;
  
  &:hover { border-color: var(--luxe-gold); }
`;

const DropText = styled.p`
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--luxe-text-light);
`;

const ThankYouSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const Quote = styled.blockquote`
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-style: italic;
  color: var(--luxe-text);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${p => p.$isOpen ? 1 : 0};
  visibility: ${p => p.$isOpen ? 'visible' : 'hidden'};
  padding: 2rem;
  
  img {
    max-width: 90%;
    max-height: 85vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  color: var(--luxe-text-light);
  
  &:hover { color: var(--luxe-text); }
`;

function ArchivePage({ weddingData }) {
  const [images] = useState([
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
  ]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const data = weddingData || {
    name1: 'Victoria',
    name2: 'Alexander',
    date: '14. September 2025',
    thankYouMessage: 'Danke, dass ihr diesen besonderen Tag mit uns gefeiert habt.',
  };
  
  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    for (const file of files) {
      await savePhotoUpload({ filename: file.name, size: file.size });
    }
  }, []);
  
  return (
    <Page>
      <Header>
        <GoldLine />
        <Eyebrow>Hochzeitsarchiv</Eyebrow>
        <Title>{data.name1} & {data.name2}</Title>
        <Subtitle>Erinnerungen an unseren {data.date}</Subtitle>
      </Header>
      
      <Section>
        <SectionTitle>Galerie</SectionTitle>
        <Grid>
          {images.map((img, index) => (
            <ImageWrapper key={index} onClick={() => setLightboxImage(img)}>
              <img src={img} alt={`Foto ${index + 1}`} loading="lazy" />
            </ImageWrapper>
          ))}
        </Grid>
      </Section>
      
      <UploadSection>
        <SectionTitle>Teilt eure Fotos</SectionTitle>
        <DropZone
          $isDragging={isDragging}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <DropText>Fotos hier ablegen</DropText>
        </DropZone>
      </UploadSection>
      
      <ThankYouSection>
        <Quote>"{data.thankYouMessage}"</Quote>
      </ThankYouSection>
      
      <Lightbox $isOpen={!!lightboxImage} onClick={() => setLightboxImage(null)}>
        <CloseButton onClick={() => setLightboxImage(null)}>×</CloseButton>
        {lightboxImage && <img src={lightboxImage} alt="Vollbild" onClick={e => e.stopPropagation()} />}
      </Lightbox>
    </Page>
  );
}

export default ArchivePage;
