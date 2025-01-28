import React, {useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import ThemeContext from '../../themes/theme-context';
// import './navbar.scss';

const NavBar = () => {
  const {theme, setTheme, themes} = useContext(ThemeContext);

  const handleChangeMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Navbar expand="lg" style={themes[theme].header}>
      <Container>
        <Navbar.Brand style={themes[theme].brand}>Where in the world?</Navbar.Brand>
          <Nav className="ml-auto justify-content-end">
          <Nav.Link style={themes[theme].brand} onClick={handleChangeMode}>{theme === 'light' ? <><FontAwesomeIcon icon={faMoon}/> Dark Mode</> : <><FontAwesomeIcon icon={faSun}/> Light Mode</>}</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar;
