import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRSVPs, getGuestbookEntries, getPhotoUploads, getGalleryImages } from '../lib/supabase';

const Page = styled.div`
  min-height: 100vh;
  background: var(--luxe-cream);
`;

const Header = styled.header`
  background: var(--luxe-white);
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--luxe-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--luxe-text-heading);
`;

const LogoutButton = styled.button`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--luxe-text-light);
  padding: 0.5rem 1rem;
  border: 1px solid var(--luxe-border);
  
  &:hover {
    border-color: var(--luxe-gold);
    color: var(--luxe-gold);
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--luxe-white);
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--luxe-border);
  padding-bottom: 1rem;
`;

const Tab = styled.button`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$active ? 'var(--luxe-gold)' : 'var(--luxe-text-light)'};
  padding: 0.5rem 1rem;
  border-bottom: 2px solid ${p => p.$active ? 'var(--luxe-gold)' : 'transparent'};
  margin-bottom: -1rem;
  padding-bottom: calc(1rem + 2px);
  
  &:hover {
    color: var(--luxe-gold);
  }
`;

const Section = styled.section`
  background: var(--luxe-white);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--luxe-border);
`;

const Td = styled.td`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--luxe-border-light);
`;

const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${p => p.$attending ? 'var(--luxe-gold-muted)' : 'var(--luxe-cream)'};
  color: ${p => p.$attending ? 'var(--luxe-gold)' : 'var(--luxe-text-muted)'};
`;

const EntryCard = styled.div`
  padding: 1.5rem;
  background: var(--luxe-cream);
  margin-bottom: 1rem;
`;

const EntryName = styled.p`
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 0.5rem;
`;

const EntryText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--luxe-text-light);
  line-height: 1.7;
`;

const EmptyState = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--luxe-text-muted);
  text-align: center;
  padding: 3rem;
`;

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('rsvp');
  const [rsvps, setRsvps] = useState([]);
  const [guestbook, setGuestbook] = useState([]);
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const rsvpData = await getRSVPs();
    const guestbookData = await getGuestbookEntries();
    const photoData = await getPhotoUploads();
    
    setRsvps(rsvpData || []);
    setGuestbook(guestbookData || []);
    setPhotos(photoData || []);
  };
  
  const attendingCount = rsvps.filter(r => r.attendance === 'yes').length;
  const totalGuests = rsvps.reduce((sum, r) => r.attendance === 'yes' ? sum + parseInt(r.guests || 1) : sum, 0);
  
  return (
    <Page>
      <Header>
        <Logo>Admin Dashboard</Logo>
        <LogoutButton onClick={onLogout}>Abmelden</LogoutButton>
      </Header>
      
      <Container>
        <StatsGrid>
          <StatCard>
            <StatNumber>{rsvps.length}</StatNumber>
            <StatLabel>Antworten</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{attendingCount}</StatNumber>
            <StatLabel>Zusagen</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{totalGuests}</StatNumber>
            <StatLabel>Gäste</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{guestbook.length}</StatNumber>
            <StatLabel>Gästebuch</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <Tabs>
          <Tab $active={activeTab === 'rsvp'} onClick={() => setActiveTab('rsvp')}>
            RSVPs
          </Tab>
          <Tab $active={activeTab === 'guestbook'} onClick={() => setActiveTab('guestbook')}>
            Gästebuch
          </Tab>
          <Tab $active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>
            Fotos
          </Tab>
        </Tabs>
        
        <Section>
          {activeTab === 'rsvp' && (
            <>
              <SectionTitle>Anmeldungen</SectionTitle>
              {rsvps.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <Th>Name</Th>
                      <Th>E-Mail</Th>
                      <Th>Status</Th>
                      <Th>Gäste</Th>
                      <Th>Ernährung</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp, index) => (
                      <tr key={index}>
                        <Td>{rsvp.name}</Td>
                        <Td>{rsvp.email}</Td>
                        <Td>
                          <Status $attending={rsvp.attendance === 'yes'}>
                            {rsvp.attendance === 'yes' ? 'Zusage' : 'Absage'}
                          </Status>
                        </Td>
                        <Td>{rsvp.guests || 1}</Td>
                        <Td>{rsvp.dietary || '—'}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <EmptyState>Noch keine Anmeldungen vorhanden.</EmptyState>
              )}
            </>
          )}
          
          {activeTab === 'guestbook' && (
            <>
              <SectionTitle>Gästebucheinträge</SectionTitle>
              {guestbook.length > 0 ? (
                guestbook.map((entry, index) => (
                  <EntryCard key={index}>
                    <EntryName>{entry.name}</EntryName>
                    <EntryText>{entry.message}</EntryText>
                  </EntryCard>
                ))
              ) : (
                <EmptyState>Noch keine Einträge vorhanden.</EmptyState>
              )}
            </>
          )}
          
          {activeTab === 'photos' && (
            <>
              <SectionTitle>Hochgeladene Fotos</SectionTitle>
              {photos.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <Th>Dateiname</Th>
                      <Th>Größe</Th>
                      <Th>Datum</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.map((photo, index) => (
                      <tr key={index}>
                        <Td>{photo.filename}</Td>
                        <Td>{Math.round(photo.size / 1024)} KB</Td>
                        <Td>{new Date(photo.created_at).toLocaleDateString('de-DE')}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <EmptyState>Noch keine Fotos hochgeladen.</EmptyState>
              )}
            </>
          )}
        </Section>
      </Container>
    </Page>
  );
}

export default AdminDashboard;
