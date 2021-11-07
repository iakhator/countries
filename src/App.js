import React, {useState} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import './App.scss';
import {themes} from './themes/theme';
import ThemeContext from './themes/theme-context';
import NavBar from './components/navbar/navbar';
import Countries from './pages/countries/countries';
import Country from './pages/country/country';

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <div style={theme === 'light' ? themes.light : themes.dark}>
      <ThemeContext.Provider value={{theme, setTheme, themes}}>
          <NavBar />
          <Container>
            <Routes>
                <Route exact path="/"  element={<Countries />}/> 
                <Route exact path="/country/:id" element={<Country />} />
            </Routes>
          </Container>
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
