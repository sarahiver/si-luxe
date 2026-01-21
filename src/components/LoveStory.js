import React from 'react';
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
  margin-bottom: 5rem;
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

const Story = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;
  
  &:nth-child(even) {
    direction: rtl;
    > * { direction: ltr; }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    
    &:nth-child(even) {
      direction: ltr;
    }
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 4/5;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div``;

const StoryDate = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1rem;
`;

const StoryTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1.5rem;
`;

const StoryText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text-light);
  line-height: 1.9;
`;

function LoveStory({ stories }) {
  const defaultStories = [
    {
      date: 'März 2018',
      title: 'Das erste Treffen',
      text: 'Wir trafen uns zufällig bei einem gemeinsamen Freund. Ein kurzes Gespräch, ein Lächeln – und wir wussten beide, dass dies der Anfang von etwas Besonderem war.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
    },
    {
      date: 'Dezember 2023',
      title: 'Der Antrag',
      text: 'Bei einem romantischen Abendessen stellte Alexander die Frage aller Fragen. Mit Tränen in den Augen sagte Victoria ja.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800',
    },
  ];
  
  const storyData = stories || defaultStories;
  
  return (
    <Section id="story">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Unsere Geschichte</Eyebrow>
          <Title>Wie alles begann</Title>
        </Header>
        
        {storyData.map((story, index) => (
          <Story key={index}>
            <ImageWrapper>
              <img src={story.image} alt={story.title} loading="lazy" />
            </ImageWrapper>
            <Content>
              <StoryDate>{story.date}</StoryDate>
              <StoryTitle>{story.title}</StoryTitle>
              <StoryText>{story.text}</StoryText>
            </Content>
          </Story>
        ))}
      </Container>
    </Section>
  );
}

export default LoveStory;
