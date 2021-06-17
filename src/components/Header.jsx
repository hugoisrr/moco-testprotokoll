import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>MOCO Testprotokoll</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* <Nav.Link href='#home'>
                <i className='fas fa-cog'></i> Einstellungen
              </Nav.Link> */}
              <NavDropdown id='basic-nav-dropdown' title='Einstellungen'>
                <NavDropdown.Item href='#home'>
                  Datei speichern in ...
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
