import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-white);
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  
  &:hover img {
    transform: scale(1.03);
  }
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
  transition: all 0.3s ease;
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

function Gallery({ images }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const defaultImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
    'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
  ];
  
  const imageData = images || defaultImages;
  
  return (
    <Section id="gallery">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Galerie</Eyebrow>
          <Title>Momente</Title>
        </Header>
        
        <Grid>
          {imageData.map((img, index) => (
            <ImageWrapper key={index} onClick={() => setLightboxImage(img)}>
              <img src={img} alt={`Galerie ${index + 1}`} loading="lazy" />
            </ImageWrapper>
          ))}
        </Grid>
      </Container>
      
      <Lightbox $isOpen={!!lightboxImage} onClick={() => setLightboxImage(null)}>
        <CloseButton onClick={() => setLightboxImage(null)}>×</CloseButton>
        {lightboxImage && <img src={lightboxImage} alt="Vollbild" onClick={e => e.stopPropagation()} />}
      </Lightbox>
    </Section>
  );
}

export default Gallery;
