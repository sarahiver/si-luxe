import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE GALLERY - Masonry Grid with Elegant Lightbox
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Section = styled.section`
  position: relative;
  padding: var(--section-padding) 2rem;
  background: var(--luxe-charcoal);
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: var(--luxe-white);
  
  span {
    font-style: italic;
    color: var(--luxe-gold);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  /* Masonry effect with different sizes */
  &:nth-child(4n+1) { grid-row: span 2; }
  &:nth-child(6n+3) { grid-column: span 2; }
  
  @media (max-width: 968px) {
    &:nth-child(4n+1) { grid-row: span 1; }
    &:nth-child(6n+3) { grid-column: span 1; }
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.8) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover div {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
  transition: transform 0.6s var(--ease-luxe);
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
`;

const ImageTitle = styled.p`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--luxe-white);
  margin-bottom: 0.25rem;
`;

const ImageCaption = styled.p`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ZoomIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--luxe-gold);
  color: var(--luxe-gold);
  font-size: 1.5rem;
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 2;
  
  ${GridItem}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

/* Lightbox */
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease;
  padding: 2rem;
`;

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border: 1px solid rgba(212, 175, 55, 0.2);
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--luxe-white);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--luxe-gold);
    color: var(--luxe-gold);
  }
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 80px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--luxe-white);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$prev ? 'left: 2rem;' : 'right: 2rem;'}
  
  &:hover {
    border-color: var(--luxe-gold);
    color: var(--luxe-gold);
    background: rgba(212, 175, 55, 0.1);
  }
`;

const LightboxCaption = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const Counter = styled.span`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
`;

function Gallery({ photos }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const defaultPhotos = [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200', title: 'Engagement', caption: 'Der Beginn' },
    { src: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1200', title: 'Zusammen', caption: 'Gemeinsame Zeit' },
    { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200', title: 'Reisen', caption: 'Abenteuer' },
    { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200', title: 'Location', caption: 'Schloss Benrath' },
    { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200', title: 'Ballsaal', caption: 'Feier-Location' },
    { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200', title: 'Winter', caption: 'Antrag' },
    { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200', title: 'Zuhause', caption: 'Unser Nest' },
    { src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200', title: 'Planung', caption: 'Vorbereitungen' },
    { src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200', title: 'Details', caption: 'Die kleinen Dinge' },
  ];
  
  const galleryPhotos = photos || defaultPhotos;
  
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const navigate = (direction) => {
    setCurrentIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? galleryPhotos.length - 1 : prev - 1;
      }
      return prev === galleryPhotos.length - 1 ? 0 : prev + 1;
    });
  };
  
  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);
  
  return (
    <Section id="gallery">
      <Header>
        <Eyebrow>Galerie</Eyebrow>
        <Title>Momente <span>festgehalten</span></Title>
      </Header>
      
      <Grid>
        {galleryPhotos.map((photo, index) => (
          <GridItem key={index} onClick={() => openLightbox(index)}>
            <Image src={photo.src} alt={photo.title} loading="lazy" />
            <ZoomIcon>+</ZoomIcon>
            <ImageOverlay>
              <ImageTitle>{photo.title}</ImageTitle>
              <ImageCaption>{photo.caption}</ImageCaption>
            </ImageOverlay>
          </GridItem>
        ))}
      </Grid>
      
      {lightboxOpen && (
        <Lightbox onClick={closeLightbox}>
          <LightboxImage 
            src={galleryPhotos[currentIndex].src} 
            alt={galleryPhotos[currentIndex].title}
            onClick={(e) => e.stopPropagation()}
          />
          <LightboxClose onClick={closeLightbox}>×</LightboxClose>
          <LightboxNav $prev onClick={(e) => { e.stopPropagation(); navigate('prev'); }}>‹</LightboxNav>
          <LightboxNav onClick={(e) => { e.stopPropagation(); navigate('next'); }}>›</LightboxNav>
          <LightboxCaption>
            <Counter>{currentIndex + 1} / {galleryPhotos.length}</Counter>
          </LightboxCaption>
        </Lightbox>
      )}
    </Section>
  );
}

export default Gallery;
