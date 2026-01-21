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

const Page = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
`;

const HeroSection = styled.section`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.7) 0%,
    rgba(10, 10, 10, 0.9) 100%
  );
  z-index: 1;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  filter: grayscale(30%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 5%;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Overline = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 25px;
`;

const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0 0 20px;
  
  span {
    display: block;
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

const WeddingDate = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: rgba(250, 250, 250, 0.7);
  font-style: italic;
  margin: 0;
`;

const GoldLine = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 30px auto 0;
  transform-origin: center;
  animation: ${props => props.$visible ? css`${lineExpand} 1.2s ease-out forwards` : 'none'};
  transform: scaleX(${props => props.$visible ? 1 : 0});
`;

const GallerySection = styled.section`
  padding: 100px 5%;
  background: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  position: relative;
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
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: #FAFAFA;
  margin: 0 0 15px;
`;

const SectionSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  color: rgba(250, 250, 250, 0.6);
  font-style: italic;
  margin: 0;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg, #D4AF37, #B8860B)' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'};
  padding: 12px 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.$active ? '#0A0A0A' : '#D4AF37'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #D4AF37;
    background: ${props => props.$active ? 'linear-gradient(135deg, #D4AF37, #B8860B)' : 'rgba(212, 175, 55, 0.1)'};
  }
`;

const MasonryGrid = styled.div`
  column-count: 4;
  column-gap: 20px;
  
  @media (max-width: 1200px) {
    column-count: 3;
  }
  
  @media (max-width: 768px) {
    column-count: 2;
  }
  
  @media (max-width: 480px) {
    column-count: 1;
  }
`;

const PhotoItem = styled.div`
  break-inside: avoid;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.15);
  cursor: pointer;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '30px'});
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.$delay}s;
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.95), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PhotoItem}:hover & {
    opacity: 1;
  }
`;

const PhotoCaption = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(250, 250, 250, 0.9);
  margin: 0;
`;

const PhotoMeta = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: #D4AF37;
  margin-top: 5px;
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  opacity: ${props => props.$open ? 1 : 0};
  visibility: ${props => props.$open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 85vh;
  object-fit: contain;
  border: 1px solid rgba(212, 175, 55, 0.3);
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.5);
  width: 50px;
  height: 50px;
  color: #D4AF37;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
    color: #0A0A0A;
  }
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.5);
  width: 50px;
  height: 50px;
  color: #D4AF37;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
    color: #0A0A0A;
  }
`;

const LightboxCaption = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const MemoriesSection = styled.section`
  padding: 100px 5%;
  background: #0A0A0A;
  text-align: center;
`;

const Quote = styled.blockquote`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: 6rem;
    color: #D4AF37;
    opacity: 0.2;
    line-height: 1;
  }
`;

const QuoteText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: rgba(250, 250, 250, 0.9);
  line-height: 1.8;
  font-style: italic;
  margin: 0 0 30px;
`;

const QuoteAuthor = styled.cite`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-style: normal;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #D4AF37;
`;

const LoadMoreButton = styled.button`
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.5);
  padding: 16px 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #D4AF37;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 50px;
  
  &:hover {
    background: linear-gradient(135deg, #D4AF37, #B8860B);
    color: #0A0A0A;
    border-color: #D4AF37;
  }
`;

const ArchivePage = ({
  coupleName = 'Anna & Michael',
  weddingDate = '15. September 2024',
  heroImage = '/images/wedding-hero.jpg',
  quote = 'Die schönsten Momente im Leben sind die, die wir mit den Menschen teilen, die wir lieben.',
  categories = [
    { id: 'all', label: 'Alle Fotos' },
    { id: 'ceremony', label: 'Zeremonie' },
    { id: 'reception', label: 'Empfang' },
    { id: 'party', label: 'Feier' },
    { id: 'guests', label: 'Gäste' }
  ]
}) => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);
  
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  
  useEffect(() => {
    // Trigger hero animation on mount
    setTimeout(() => setHeroVisible(true), 100);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target === galleryRef.current) {
            setPhotosVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (galleryRef.current) observer.observe(galleryRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    fetchPhotos();
  }, []);
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(p => p.category === activeCategory));
    }
    setVisibleCount(20);
  }, [activeCategory, photos]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentPhotoIndex, filteredPhotos.length]);
  
  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('archive_photos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPhotos(data || []);
      setFilteredPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Use placeholder data for demo
      const placeholderPhotos = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        image_url: `https://picsum.photos/seed/${i + 1}/${400 + (i % 3) * 100}/${500 + (i % 4) * 100}`,
        caption: `Erinnerung ${i + 1}`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
        guest_name: ['Familie', 'Freunde', 'Kollegen'][Math.floor(Math.random() * 3)]
      }));
      setPhotos(placeholderPhotos);
      setFilteredPhotos(placeholderPhotos);
    }
  };
  
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const navigateLightbox = (direction) => {
    if (direction === 'prev') {
      setCurrentPhotoIndex(prev => 
        prev === 0 ? filteredPhotos.length - 1 : prev - 1
      );
    } else {
      setCurrentPhotoIndex(prev => 
        prev === filteredPhotos.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };
  
  const currentPhoto = filteredPhotos[currentPhotoIndex];
  
  return (
    <Page>
      <HeroSection ref={heroRef}>
        <HeroImage $image={heroImage} />
        <HeroBackground />
        <HeroContent $visible={heroVisible}>
          <Overline>Unsere Hochzeit</Overline>
          <Title>
            {coupleName.split(' & ')[0]} <span>&</span> {coupleName.split(' & ')[1]}
          </Title>
          <WeddingDate>{weddingDate}</WeddingDate>
          <GoldLine $visible={heroVisible} />
        </HeroContent>
      </HeroSection>
      
      <GallerySection>
        <BackgroundPattern />
        <Container>
          <SectionHeader>
            <SectionTitle>Unsere Erinnerungen</SectionTitle>
            <SectionSubtitle>
              Die schönsten Momente unseres besonderen Tages
            </SectionSubtitle>
          </SectionHeader>
          
          <FilterBar>
            {categories.map(category => (
              <FilterButton
                key={category.id}
                $active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </FilterButton>
            ))}
          </FilterBar>
          
          <MasonryGrid ref={galleryRef}>
            {filteredPhotos.slice(0, visibleCount).map((photo, index) => (
              <PhotoItem
                key={photo.id}
                $visible={photosVisible}
                $delay={Math.min(index * 0.05, 0.5)}
                onClick={() => openLightbox(index)}
              >
                <PhotoImage 
                  src={photo.image_url} 
                  alt={photo.caption || `Foto ${index + 1}`}
                  loading="lazy"
                />
                <PhotoOverlay>
                  {photo.caption && <PhotoCaption>{photo.caption}</PhotoCaption>}
                  {photo.guest_name && <PhotoMeta>von {photo.guest_name}</PhotoMeta>}
                </PhotoOverlay>
              </PhotoItem>
            ))}
          </MasonryGrid>
          
          {visibleCount < filteredPhotos.length && (
            <div style={{ textAlign: 'center' }}>
              <LoadMoreButton onClick={loadMore}>
                Mehr laden ({filteredPhotos.length - visibleCount} weitere)
              </LoadMoreButton>
            </div>
          )}
        </Container>
      </GallerySection>
      
      <MemoriesSection>
        <Quote>
          <QuoteText>{quote}</QuoteText>
          <QuoteAuthor>— {coupleName}</QuoteAuthor>
        </Quote>
      </MemoriesSection>
      
      <Lightbox $open={lightboxOpen} onClick={closeLightbox}>
        {currentPhoto && (
          <>
            <LightboxImage 
              src={currentPhoto.image_url} 
              alt={currentPhoto.caption}
              onClick={(e) => e.stopPropagation()}
            />
            <LightboxClose onClick={closeLightbox}>✕</LightboxClose>
            <LightboxNav 
              $direction="prev" 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            >
              ‹
            </LightboxNav>
            <LightboxNav 
              $direction="next" 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            >
              ›
            </LightboxNav>
            <LightboxCaption onClick={(e) => e.stopPropagation()}>
              {currentPhoto.caption && (
                <PhotoCaption style={{ color: '#FAFAFA' }}>{currentPhoto.caption}</PhotoCaption>
              )}
              <PhotoMeta>
                {currentPhotoIndex + 1} / {filteredPhotos.length}
              </PhotoMeta>
            </LightboxCaption>
          </>
        )}
      </Lightbox>
    </Page>
  );
};

export default ArchivePage;
