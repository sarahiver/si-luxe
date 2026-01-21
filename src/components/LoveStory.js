import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE LOVE STORY - Fullscreen Chapters with Cinematic Reveals
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const clipReveal = keyframes`
  from { clip-path: inset(100% 0 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;

const Section = styled.section`
  position: relative;
  background: var(--luxe-black);
`;

const IntroSection = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--section-padding) 2rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
  }
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 6vw, 4rem);
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
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
`;

const Chapter = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  ${p => p.$reverse && css`
    flex-direction: row-reverse;
  `}
  
  @media (max-width: 968px) {
    flex-direction: column;
    min-height: auto;
    padding: 4rem 0;
  }
`;

const ChapterImage = styled.div`
  position: relative;
  width: 50%;
  height: 100vh;
  overflow: hidden;
  
  @media (max-width: 968px) {
    width: 100%;
    height: 50vh;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      ${p => p.$reverse ? '90deg' : '-90deg'},
      rgba(10, 10, 10, 0.8) 0%,
      transparent 50%
    );
    z-index: 1;
    
    @media (max-width: 968px) {
      background: linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.9) 100%);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${p => p.$visible ? 1 : 0};
    transform: scale(${p => p.$visible ? 1 : 1.1});
    transition: all 1.2s var(--ease-luxe);
  }
`;

const ChapterContent = styled.div`
  width: 50%;
  padding: 4rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 968px) {
    width: 100%;
    padding: 3rem 2rem;
  }
`;

const ChapterNumber = styled.span`
  font-family: var(--font-serif);
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 300;
  color: rgba(212, 175, 55, 0.15);
  line-height: 1;
  margin-bottom: -2rem;
  position: relative;
  z-index: 0;
`;

const ChapterYear = styled.span`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1rem;
  display: block;
  position: relative;
  z-index: 1;
`;

const ChapterTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  color: var(--luxe-white);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const ChapterText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 2;
  color: rgba(255, 255, 255, 0.7);
  max-width: 450px;
  position: relative;
  z-index: 1;
`;

const ChapterQuote = styled.blockquote`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(212, 175, 55, 0.8);
  margin-top: 2rem;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(212, 175, 55, 0.3);
  position: relative;
  z-index: 1;
`;

const EndSection = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--section-padding) 2rem;
  background: linear-gradient(180deg, var(--luxe-black) 0%, var(--luxe-charcoal) 100%);
`;

const EndQuote = styled.blockquote`
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--luxe-white);
  max-width: 700px;
  line-height: 1.6;
  
  &::before {
    content: '"';
    display: block;
    font-size: 4rem;
    color: var(--luxe-gold);
    line-height: 0.5;
    margin-bottom: 1rem;
  }
`;

const EndAuthor = styled.cite`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-style: normal;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2rem;
`;

function LoveStory({ storyData }) {
  const [visibleChapters, setVisibleChapters] = useState({});
  const chapterRefs = useRef([]);
  
  const defaultStory = [
    {
      year: '2018',
      title: 'Der erste Blick',
      text: 'Es war ein ganz gewöhnlicher Abend auf einer Vernissage in der Düsseldorfer Altstadt. Unsere Blicke trafen sich über den Raum hinweg – und in diesem Moment wussten wir beide, dass etwas Besonderes begonnen hatte.',
      quote: 'Manchmal findet man die Liebe genau dort, wo man sie am wenigsten erwartet.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    },
    {
      year: '2019',
      title: 'Gemeinsame Abenteuer',
      text: 'Von Wochenendtrips nach Paris bis zu gemütlichen Abenden auf dem Sofa – wir entdeckten, dass wahre Liebe in den kleinen Momenten liegt. Jeder Tag wurde zu einem neuen Kapitel unserer Geschichte.',
      quote: 'Das Beste am Reisen ist, einen Partner zu haben, mit dem man die Welt entdeckt.',
      image: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=1200',
    },
    {
      year: '2022',
      title: 'Das erste gemeinsame Zuhause',
      text: 'Der Umzug in unsere gemeinsame Wohnung war mehr als nur ein neues Kapitel – es war der Beginn unseres gemeinsamen Lebens. Hier haben wir gelernt, was es bedeutet, füreinander da zu sein.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
    },
    {
      year: '2024',
      title: 'Die große Frage',
      text: 'An einem magischen Winterabend, umgeben von tausend Lichtern auf dem Weihnachtsmarkt, stellte ich die wichtigste Frage meines Lebens. Die Antwort war ein Ja – und machte mich zum glücklichsten Menschen der Welt.',
      quote: 'Willst du den Rest deines Lebens mit mir verbringen?',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200',
    },
  ];
  
  const story = storyData || defaultStory;
  
  useEffect(() => {
    const observers = chapterRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleChapters(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });
    
    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [story]);
  
  const toRoman = (num) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romanNumerals[num] || num + 1;
  };
  
  return (
    <Section id="story">
      <IntroSection>
        <Eyebrow>Unsere Geschichte</Eyebrow>
        <Title>Wie alles <span>begann</span></Title>
        <Subtitle>Eine Reise durch die schönsten Momente unserer Liebe</Subtitle>
      </IntroSection>
      
      {story.map((chapter, index) => (
        <Chapter
          key={index}
          ref={el => chapterRefs.current[index] = el}
          $reverse={index % 2 !== 0}
        >
          <ChapterImage $visible={visibleChapters[index]} $reverse={index % 2 !== 0}>
            <img src={chapter.image} alt={chapter.title} loading="lazy" />
          </ChapterImage>
          
          <ChapterContent>
            <ChapterNumber>{toRoman(index)}</ChapterNumber>
            <ChapterYear>{chapter.year}</ChapterYear>
            <ChapterTitle>{chapter.title}</ChapterTitle>
            <ChapterText>{chapter.text}</ChapterText>
            {chapter.quote && (
              <ChapterQuote>{chapter.quote}</ChapterQuote>
            )}
          </ChapterContent>
        </Chapter>
      ))}
      
      <EndSection>
        <EndQuote>
          Die besten Liebesgeschichten sind die, die niemals enden – sie verwandeln sich nur in neue Kapitel.
        </EndQuote>
        <EndAuthor>— Victoria & Alexander</EndAuthor>
      </EndSection>
    </Section>
  );
}

export default LoveStory;
