import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-cream);
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const Subtitle = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--luxe-text-light);
  margin-top: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 2rem;
  background: var(--luxe-white);
  text-align: center;
`;

const CardTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text-light);
  line-height: 1.8;
`;

const Note = styled.p`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--luxe-text-muted);
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
`;

function Dresscode() {
  return (
    <Section id="dresscode">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Dresscode</Eyebrow>
          <Title>Festlich Elegant</Title>
          <Subtitle>Bitte in gedeckten, eleganten Farben</Subtitle>
        </Header>
        
        <Grid>
          <Card>
            <CardTitle>Für Sie</CardTitle>
            <CardText>
              Elegantes Abendkleid oder schickes Cocktailkleid. 
              Farben: gedeckte Töne wie Blau, Grün, Rosé oder Bordeaux.
            </CardText>
          </Card>
          
          <Card>
            <CardTitle>Für Ihn</CardTitle>
            <CardText>
              Anzug mit Krawatte oder Fliege. 
              Farben: Dunkelblau, Grau oder klassisches Schwarz.
            </CardText>
          </Card>
        </Grid>
        
        <Note>Bitte verzichtet auf Weiß und Creme – diese Farben sind der Braut vorbehalten.</Note>
      </Container>
    </Section>
  );
}

export default Dresscode;
