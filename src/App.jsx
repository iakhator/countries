import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NavBar from './components/navbar/navbar';
import Countries from './pages/countries';
import Country from './pages/country';
import { ThemeProvider }  from './themes/theme-provider';

function App() {
  
  return (
    <ThemeProvider>
      <NavBar />
      <Container>
        <Routes>
            <Route exact path="/"  element={<Countries />}/> 
            <Route exact path="/country/:id" element={<Country />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
