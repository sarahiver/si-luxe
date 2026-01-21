import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-white);
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

const IntroText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--luxe-text-light);
  line-height: 1.9;
  text-align: center;
  max-width: 500px;
  margin: 0 auto 3rem;
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
  background: var(--luxe-cream);
  text-align: center;
`;

const CardTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text-light);
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const BankInfo = styled.div`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--luxe-text);
  line-height: 1.8;
  
  span {
    color: var(--luxe-text-muted);
    display: block;
  }
`;

function Gifts() {
  return (
    <Section id="gifts">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Geschenke</Eyebrow>
          <Title>Von Herzen</Title>
        </Header>
        
        <IntroText>
          Das größte Geschenk ist eure Anwesenheit. Wer uns dennoch etwas schenken möchte, 
          kann gerne zu unserer Hochzeitsreise beitragen.
        </IntroText>
        
        <Grid>
          <Card>
            <CardTitle>Hochzeitsreise</CardTitle>
            <CardText>
              Wir träumen von einer Reise nach Japan. Über einen Beitrag 
              zu diesem Abenteuer würden wir uns sehr freuen.
            </CardText>
          </Card>
          
          <Card>
            <CardTitle>Bankverbindung</CardTitle>
            <BankInfo>
              <span>Victoria & Alexander</span>
              DE89 3704 0044 0532 0130 00
              <span style={{marginTop: '0.5rem'}}>Verwendungszweck: Hochzeit</span>
            </BankInfo>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

export default Gifts;
