import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { supabase } from '../lib/supabase';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Admin Dashboard Component
// Aristocratic • Cinematic • Theatrical
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const DashboardSection = styled.section`
  min-height: 100vh;
  background: var(--luxe-black);
  padding: var(--section-padding) 2rem;
  animation: ${fadeIn} 0.6s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  
  span {
    background: linear-gradient(90deg, var(--luxe-white) 0%, var(--luxe-gold) 50%, var(--luxe-white) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const LogoutButton = styled.button`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    color: var(--luxe-gold);
    border-color: var(--luxe-gold);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--luxe-charcoal);
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(212, 175, 55, 0.1);
  animation: ${slideUp} 0.6s var(--ease-luxe) forwards;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.3);
    transform: translateY(-5px);
  }
`;

const StatLabel = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 300;
  color: var(--luxe-gold);
  line-height: 1;
`;

const StatSubtext = styled.p`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.5rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
`;

const Tab = styled.button`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.$active ? 'var(--luxe-gold)' : 'rgba(255, 255, 255, 0.5)'};
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? 'var(--luxe-gold)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    color: var(--luxe-gold);
  }
`;

const TableContainer = styled.div`
  background: var(--luxe-charcoal);
  border: 1px solid rgba(212, 175, 55, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  padding: 1rem 1.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TableHeaderCell = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-gold);
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.05);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem;
  }
`;

const TableCell = styled.div`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    &::before {
      content: attr(data-label);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--luxe-gold);
      margin-right: 1rem;
      min-width: 100px;
    }
  }
`;

const StatusBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 0;
  
  ${props => props.$status === 'confirmed' && css`
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  `}
  
  ${props => props.$status === 'declined' && css`
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  `}
  
  ${props => props.$status === 'pending' && css`
    background: rgba(212, 175, 55, 0.2);
    color: var(--luxe-gold);
    border: 1px solid rgba(212, 175, 55, 0.3);
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
  
  p {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    font-style: italic;
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--luxe-gold);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  margin-bottom: 1.5rem;
  
  &:hover {
    background: var(--luxe-gold);
    color: var(--luxe-black);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--luxe-white);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s var(--ease-luxe);
  
  &:focus {
    border-color: var(--luxe-gold);
    background: rgba(212, 175, 55, 0.05);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const ToolsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('rsvp');
  const [rsvpData, setRsvpData] = useState([]);
  const [guestbookData, setGuestbookData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch RSVP data
      const { data: rsvp } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch Guestbook data
      const { data: guestbook } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch Music wishes
      const { data: music } = await supabase
        .from('music_wishes')
        .select('*')
        .order('created_at', { ascending: false });
      
      setRsvpData(rsvp || []);
      setGuestbookData(guestbook || []);
      setMusicData(music || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
    setLoading(false);
  };

  const stats = {
    totalGuests: rsvpData.reduce((sum, r) => sum + (r.attending ? (r.guests || 1) : 0), 0),
    confirmed: rsvpData.filter(r => r.attending === true).length,
    declined: rsvpData.filter(r => r.attending === false).length,
    pending: rsvpData.filter(r => r.attending === null).length,
    guestbookEntries: guestbookData.length,
    musicWishes: musicData.length,
  };

  const exportToCSV = () => {
    const headers = ['Name', 'E-Mail', 'Gäste', 'Status', 'Allergien', 'Nachricht', 'Datum'];
    const rows = rsvpData.map(r => [
      r.name,
      r.email,
      r.guests || 1,
      r.attending ? 'Zugesagt' : r.attending === false ? 'Abgesagt' : 'Ausstehend',
      r.allergies || '-',
      r.message || '-',
      new Date(r.created_at).toLocaleDateString('de-DE')
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rsvp_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredRsvp = rsvpData.filter(r => 
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardSection>
      <Container>
        <Header>
          <Title>
            <span>Admin Dashboard</span>
          </Title>
          <LogoutButton onClick={onLogout}>Abmelden</LogoutButton>
        </Header>

        <StatsGrid>
          <StatCard $delay="0.1s">
            <StatLabel>Gesamte Gäste</StatLabel>
            <StatValue>{stats.totalGuests}</StatValue>
            <StatSubtext>Personen erwartet</StatSubtext>
          </StatCard>
          
          <StatCard $delay="0.2s">
            <StatLabel>Zugesagt</StatLabel>
            <StatValue>{stats.confirmed}</StatValue>
            <StatSubtext>Antworten erhalten</StatSubtext>
          </StatCard>
          
          <StatCard $delay="0.3s">
            <StatLabel>Abgesagt</StatLabel>
            <StatValue>{stats.declined}</StatValue>
            <StatSubtext>Können nicht kommen</StatSubtext>
          </StatCard>
          
          <StatCard $delay="0.4s">
            <StatLabel>Ausstehend</StatLabel>
            <StatValue>{stats.pending}</StatValue>
            <StatSubtext>Warten auf Antwort</StatSubtext>
          </StatCard>
        </StatsGrid>

        <TabsContainer>
          <Tab 
            $active={activeTab === 'rsvp'} 
            onClick={() => setActiveTab('rsvp')}
          >
            RSVP ({rsvpData.length})
          </Tab>
          <Tab 
            $active={activeTab === 'guestbook'} 
            onClick={() => setActiveTab('guestbook')}
          >
            Gästebuch ({guestbookData.length})
          </Tab>
          <Tab 
            $active={activeTab === 'music'} 
            onClick={() => setActiveTab('music')}
          >
            Musikwünsche ({musicData.length})
          </Tab>
        </TabsContainer>

        {activeTab === 'rsvp' && (
          <>
            <ToolsRow>
              <SearchInput
                type="text"
                placeholder="Suchen nach Name oder E-Mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ExportButton onClick={exportToCSV}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                CSV Export
              </ExportButton>
            </ToolsRow>

            <TableContainer>
              <TableHeader>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Gäste</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Datum</TableHeaderCell>
                <TableHeaderCell>Anmerkungen</TableHeaderCell>
              </TableHeader>
              
              {filteredRsvp.length > 0 ? (
                filteredRsvp.map((rsvp, index) => (
                  <TableRow key={index}>
                    <TableCell data-label="Name">
                      <div>
                        <strong>{rsvp.name}</strong>
                        <br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{rsvp.email}</span>
                      </div>
                    </TableCell>
                    <TableCell data-label="Gäste">{rsvp.guests || 1}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge 
                        $status={rsvp.attending ? 'confirmed' : rsvp.attending === false ? 'declined' : 'pending'}
                      >
                        {rsvp.attending ? 'Zugesagt' : rsvp.attending === false ? 'Abgesagt' : 'Ausstehend'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell data-label="Datum">
                      {new Date(rsvp.created_at).toLocaleDateString('de-DE')}
                    </TableCell>
                    <TableCell data-label="Anmerkungen">
                      {rsvp.allergies && <span>Allergien: {rsvp.allergies}</span>}
                      {rsvp.message && <span style={{ opacity: 0.7, fontStyle: 'italic' }}>{rsvp.message}</span>}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <EmptyState>
                  <p>Noch keine RSVP-Antworten eingegangen</p>
                </EmptyState>
              )}
            </TableContainer>
          </>
        )}

        {activeTab === 'guestbook' && (
          <TableContainer>
            <TableHeader style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Nachricht</TableHeaderCell>
              <TableHeaderCell>Datum</TableHeaderCell>
            </TableHeader>
            
            {guestbookData.length > 0 ? (
              guestbookData.map((entry, index) => (
                <TableRow key={index} style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                  <TableCell data-label="Name">{entry.name}</TableCell>
                  <TableCell data-label="Nachricht" style={{ fontStyle: 'italic', opacity: 0.8 }}>
                    "{entry.message}"
                  </TableCell>
                  <TableCell data-label="Datum">
                    {new Date(entry.created_at).toLocaleDateString('de-DE')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyState>
                <p>Noch keine Gästebucheinträge vorhanden</p>
              </EmptyState>
            )}
          </TableContainer>
        )}

        {activeTab === 'music' && (
          <TableContainer>
            <TableHeader style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
              <TableHeaderCell>Gast</TableHeaderCell>
              <TableHeaderCell>Song / Künstler</TableHeaderCell>
              <TableHeaderCell>Datum</TableHeaderCell>
            </TableHeader>
            
            {musicData.length > 0 ? (
              musicData.map((wish, index) => (
                <TableRow key={index} style={{ gridTemplateColumns: '1fr 2fr 1fr' }}>
                  <TableCell data-label="Gast">{wish.guest_name}</TableCell>
                  <TableCell data-label="Song">
                    <strong>{wish.song_title}</strong>
                    {wish.artist && <span style={{ opacity: 0.6 }}> – {wish.artist}</span>}
                  </TableCell>
                  <TableCell data-label="Datum">
                    {new Date(wish.created_at).toLocaleDateString('de-DE')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyState>
                <p>Noch keine Musikwünsche eingegangen</p>
              </EmptyState>
            )}
          </TableContainer>
        )}
      </Container>
    </DashboardSection>
  );
};

export default AdminDashboard;
