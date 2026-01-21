import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE THEME - Footer Component
// Aristocratic • Cinematic • Theatrical
// ═══════════════════════════════════════════════════════════════════════════

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const FooterSection = styled.footer`
  position: relative;
  background: var(--luxe-black);
  padding: 6rem 2rem 2rem;
  overflow: hidden;
`;

const GoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--luxe-gold), transparent);
  transform-origin: center;
  animation: ${lineGrow} 1.5s var(--ease-luxe) forwards;
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 568px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const BrandColumn = styled.div`
  animation: ${fadeUp} 0.8s var(--ease-luxe) forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const Names = styled.h3`
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(90deg, var(--luxe-white) 0%, var(--luxe-gold) 50%, var(--luxe-white) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const DateText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const Tagline = styled.p`
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`;

const LinkColumn = styled.div`
  animation: ${fadeUp} 0.8s var(--ease-luxe) forwards;
  animation-delay: ${props => props.$delay || '0.3s'};
  opacity: 0;
`;

const ColumnTitle = styled.h4`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 1.5rem;
`;

const LinkList = styled.ul`
  list-style: none;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s var(--ease-luxe);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--luxe-gold);
    transition: width 0.3s var(--ease-luxe);
  }
  
  &:hover {
    color: var(--luxe-gold);
    
    &::after {
      width: 100%;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  
  @media (max-width: 568px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Copyright = styled.p`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  
  a {
    color: var(--luxe-gold);
    
    &:hover {
      color: var(--luxe-gold-light);
    }
  }
`;

const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AdminButton = styled.button`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  
  &:hover {
    color: var(--luxe-gold);
    border-color: var(--luxe-gold);
  }
`;

// Login Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
  transition: opacity 0.4s var(--ease-luxe);
`;

const ModalContent = styled.div`
  background: var(--luxe-charcoal);
  padding: 3rem;
  max-width: 400px;
  width: 90%;
  position: relative;
  border: 1px solid rgba(212, 175, 55, 0.3);
  transform: ${props => props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: all 0.4s var(--ease-luxe);
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid var(--luxe-gold);
  
  ${props => props.$position === 'tl' && css`
    top: -1px;
    left: -1px;
    border-right: none;
    border-bottom: none;
  `}
  
  ${props => props.$position === 'tr' && css`
    top: -1px;
    right: -1px;
    border-left: none;
    border-bottom: none;
  `}
  
  ${props => props.$position === 'bl' && css`
    bottom: -1px;
    left: -1px;
    border-right: none;
    border-top: none;
  `}
  
  ${props => props.$position === 'br' && css`
    bottom: -1px;
    right: -1px;
    border-left: none;
    border-top: none;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    transition: background 0.3s ease;
  }
  
  &::before { transform: translate(-50%, -50%) rotate(45deg); }
  &::after { transform: translate(-50%, -50%) rotate(-45deg); }
  
  &:hover::before, &:hover::after {
    background: var(--luxe-gold);
  }
`;

const ModalTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--luxe-white);
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--luxe-white);
  font-size: 1rem;
  transition: all 0.3s var(--ease-luxe);
  
  &:focus {
    border-color: var(--luxe-gold);
    background: rgba(212, 175, 55, 0.05);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-black);
  background: linear-gradient(135deg, var(--luxe-gold), var(--luxe-gold-light));
  border: none;
  cursor: pointer;
  transition: all 0.3s var(--ease-luxe);
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--luxe-charcoal);
  border: 1px solid rgba(212, 175, 55, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  transform: ${props => props.$visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s var(--ease-luxe);
  z-index: 100;
  
  &:hover {
    background: var(--luxe-gold);
    border-color: var(--luxe-gold);
    
    svg {
      stroke: var(--luxe-black);
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
    stroke: var(--luxe-gold);
    transition: stroke 0.3s ease;
  }
`;

const Footer = ({ 
  name1 = "Victoria",
  name2 = "Alexander",
  weddingDate = "15. Juni 2025",
  onAdminLogin
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onAdminLogin) {
      onAdminLogin(loginData);
    }
    setShowLogin(false);
  };

  const navigationLinks = [
    { label: 'Unsere Geschichte', href: '#lovestory' },
    { label: 'Tagesablauf', href: '#timeline' },
    { label: 'Location', href: '#locations' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const informationLinks = [
    { label: 'Anfahrt', href: '#directions' },
    { label: 'Unterkünfte', href: '#accommodations' },
    { label: 'Dresscode', href: '#dresscode' },
    { label: 'FAQ', href: '#faq' },
  ];

  const interactiveLinks = [
    { label: 'Gästebuch', href: '#guestbook' },
    { label: 'Musikwünsche', href: '#music' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Geschenke', href: '#gifts' },
  ];

  return (
    <>
      <FooterSection>
        <GoldLine />
        
        <Container>
          <MainContent>
            <BrandColumn>
              <Names>
                <span>{name1} & {name2}</span>
              </Names>
              <DateText>{weddingDate}</DateText>
              <Tagline>
                "Zwei Seelen, ein gemeinsamer Weg –<br />
                wir freuen uns, dass Sie uns begleiten."
              </Tagline>
            </BrandColumn>
            
            <LinkColumn $delay="0.3s">
              <ColumnTitle>Navigation</ColumnTitle>
              <LinkList>
                {navigationLinks.map((link, index) => (
                  <LinkItem key={index}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </LinkItem>
                ))}
              </LinkList>
            </LinkColumn>
            
            <LinkColumn $delay="0.4s">
              <ColumnTitle>Informationen</ColumnTitle>
              <LinkList>
                {informationLinks.map((link, index) => (
                  <LinkItem key={index}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </LinkItem>
                ))}
              </LinkList>
            </LinkColumn>
            
            <LinkColumn $delay="0.5s">
              <ColumnTitle>Interaktiv</ColumnTitle>
              <LinkList>
                {interactiveLinks.map((link, index) => (
                  <LinkItem key={index}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </LinkItem>
                ))}
              </LinkList>
            </LinkColumn>
          </MainContent>
          
          <BottomBar>
            <Copyright>
              © {new Date().getFullYear()} {name1} & {name2} · 
              Mit Liebe gestaltet von{' '}
              <a href="https://sarahiver.de" target="_blank" rel="noopener noreferrer">
                S&I Wedding Websites
              </a>
            </Copyright>
            
            <AdminSection>
              <AdminButton onClick={() => setShowLogin(true)}>
                Admin Login
              </AdminButton>
            </AdminSection>
          </BottomBar>
        </Container>
      </FooterSection>

      {/* Login Modal */}
      <ModalOverlay $isOpen={showLogin} onClick={() => setShowLogin(false)}>
        <ModalContent $isOpen={showLogin} onClick={e => e.stopPropagation()}>
          <CornerFrame $position="tl" />
          <CornerFrame $position="tr" />
          <CornerFrame $position="bl" />
          <CornerFrame $position="br" />
          
          <CloseButton onClick={() => setShowLogin(false)} />
          
          <ModalTitle>Admin Zugang</ModalTitle>
          
          <form onSubmit={handleLogin}>
            <InputGroup>
              <Label>E-Mail Adresse</Label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Passwort</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </InputGroup>
            
            <LoginButton type="submit">
              Anmelden
            </LoginButton>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* Scroll to Top Button */}
      <ScrollToTop $visible={showScrollTop} onClick={scrollToTop}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </ScrollToTop>
    </>
  );
};

export default Footer;
