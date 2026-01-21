import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE NAVIGATION - Theatrical Elegance
// ═══════════════════════════════════════════════════════════════════════════

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s var(--ease-luxe);
  
  ${p => p.$scrolled && css`
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    padding: 1rem 3rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  `}
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.a`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--luxe-white);
  text-decoration: none;
  letter-spacing: 0.2em;
  opacity: 0;
  animation: ${fadeIn} 1s var(--ease-luxe) forwards 0.3s;
  
  span {
    color: var(--luxe-gold);
    font-style: italic;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 0.5rem 0;
  opacity: 0;
  animation: ${fadeIn} 1s var(--ease-luxe) forwards;
  animation-delay: ${p => 0.4 + p.$index * 0.1}s;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--luxe-gold);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s var(--ease-luxe);
  }
  
  &:hover {
    color: var(--luxe-gold);
    
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 968px) {
    display: flex;
  }
`;

const MenuLine = styled.span`
  display: block;
  width: 24px;
  height: 1px;
  background: ${p => p.$open ? 'var(--luxe-gold)' : 'var(--luxe-white)'};
  transition: all 0.3s var(--ease-luxe);
  
  &:nth-child(1) {
    transform: ${p => p.$open ? 'rotate(45deg) translate(4px, 4px)' : 'none'};
  }
  
  &:nth-child(2) {
    margin: 6px 0;
    opacity: ${p => p.$open ? 0 : 1};
  }
  
  &:nth-child(3) {
    transform: ${p => p.$open ? 'rotate(-45deg) translate(4px, -4px)' : 'none'};
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--luxe-black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: all 0.5s var(--ease-luxe);
  z-index: 999;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: ${p => p.$open ? '60%' : '0'};
    background: linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.3), transparent);
    transition: height 0.8s var(--ease-luxe);
  }
`;

const MobileNavLink = styled.a`
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 300;
  color: var(--luxe-white);
  text-decoration: none;
  letter-spacing: 0.1em;
  opacity: ${p => p.$open ? 1 : 0};
  transform: translateY(${p => p.$open ? 0 : '20px'});
  transition: all 0.5s var(--ease-luxe);
  transition-delay: ${p => p.$index * 0.1}s;
  
  &:hover {
    color: var(--luxe-gold);
  }
`;

const CornerDecoration = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  pointer-events: none;
  
  ${p => p.$position === 'tl' && css`
    top: 2rem; left: 2rem;
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    border-left: 1px solid rgba(212, 175, 55, 0.3);
  `}
  ${p => p.$position === 'tr' && css`
    top: 2rem; right: 2rem;
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    border-right: 1px solid rgba(212, 175, 55, 0.3);
  `}
  ${p => p.$position === 'bl' && css`
    bottom: 2rem; left: 2rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    border-left: 1px solid rgba(212, 175, 55, 0.3);
  `}
  ${p => p.$position === 'br' && css`
    bottom: 2rem; right: 2rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    border-right: 1px solid rgba(212, 175, 55, 0.3);
  `}
  
  opacity: ${p => p.$open ? 1 : 0};
  transform: scale(${p => p.$open ? 1 : 0.8});
  transition: all 0.6s var(--ease-luxe);
  transition-delay: 0.3s;
`;

function Navigation({ sections }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  
  const navItems = sections || [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Unsere Geschichte' },
    { id: 'details', label: 'Details' },
    { id: 'location', label: 'Location' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'gallery', label: 'Galerie' },
  ];
  
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <Nav $scrolled={scrolled}>
        <Logo href="#home">
          V <span>&</span> A
        </Logo>
        
        <NavLinks>
          {navItems.map((item, index) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              $index={index}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuLine $open={menuOpen} />
          <MenuLine $open={menuOpen} />
          <MenuLine $open={menuOpen} />
        </MenuButton>
      </Nav>
      
      <MobileMenu $open={menuOpen}>
        <CornerDecoration $position="tl" $open={menuOpen} />
        <CornerDecoration $position="tr" $open={menuOpen} />
        <CornerDecoration $position="bl" $open={menuOpen} />
        <CornerDecoration $position="br" $open={menuOpen} />
        
        {navItems.map((item, index) => (
          <MobileNavLink
            key={item.id}
            href={`#${item.id}`}
            $index={index}
            $open={menuOpen}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            {item.label}
          </MobileNavLink>
        ))}
      </MobileMenu>
    </>
  );
}

export default Navigation;
