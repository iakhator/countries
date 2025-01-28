import React, {useState} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {themes} from './themes/theme';
import ThemeContext from './themes/theme-context';
import NavBar from './components/navbar/navbar';
import Countries from './pages/countries';
import Country from './pages/country';

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{theme, setTheme, themes}}>
      <div style={themes[theme]}>
            <NavBar />
            <Container>
              <Routes>
                  <Route exact path="/"  element={<Countries />}/> 
                  <Route exact path="/country/:id" element={<Country />} />
              </Routes>
            </Container>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
