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

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--luxe-white);
  margin: 0 auto 1.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WitnessName = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 0.25rem;
`;

const Role = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 0.75rem;
`;

const Relation = styled.p`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--luxe-text-muted);
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--luxe-text-light);
  margin-bottom: 0.25rem;
  
  &:hover { color: var(--luxe-gold); }
`;

function ContactWitnesses({ witnesses }) {
  const defaultWitnesses = [
    {
      name: 'Thomas Mueller',
      role: 'Trauzeuge',
      relation: 'Bester Freund des Braeutigams',
      phone: '+49 123 456789',
      email: 'thomas@example.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    {
      name: 'Lisa Schmidt',
      role: 'Trauzeugin',
      relation: 'Schwester der Braut',
      phone: '+49 123 987654',
      email: 'lisa@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
  ];
  
  const witnessData = witnesses || defaultWitnesses;
  
  return (
    <Section id="witnesses">
      <Container>
        <Header>
          <GoldLine />
          <Eyebrow>Kontakt</Eyebrow>
          <Title>Unsere Trauzeugen</Title>
        </Header>
        
        <Grid>
          {witnessData.map((witness, index) => (
            <Card key={index}>
              <Avatar>
                {witness.image && <img src={witness.image} alt={witness.name} />}
              </Avatar>
              <WitnessName>{witness.name}</WitnessName>
              <Role>{witness.role}</Role>
              <Relation>{witness.relation}</Relation>
              <ContactLink href={`tel:${witness.phone}`}>{witness.phone}</ContactLink>
              <ContactLink href={`mailto:${witness.email}`}>{witness.email}</ContactLink>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default ContactWitnesses;
