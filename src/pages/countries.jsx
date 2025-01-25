import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Col, Row, Spinner} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import useFetch from '../hooks/useFetch';

import ThemeContext from '../themes/theme-context';

const options = [
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'America' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
]

const Countries = () => {
  const [endpoint, setEndpoint] = useState('/all');
  const [searchQuery, setSearchQuery] = useState('')
  const {theme, themes} = useContext(ThemeContext)
  const navigate = useNavigate()

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: theme === 'light' ? themes.lightSelect : themes.darkInput,
      color: theme === 'light' ? '#000000' : '#ffffff',
      width: theme === 'light' ? themes.selectWidth : ''
    })
  }

  const {data: countries, error, loading } = useFetch(endpoint)


  useEffect(() => {
    let debounce = null;
    debounce = setTimeout(() => {
      if(searchQuery.trim() !== '') {
        setEndpoint(`/name/${searchQuery}`)
      } else {
        setEndpoint('/all')
      }
    }, 2000)

    return () => clearTimeout(debounce)
  }, [searchQuery])
  

  const handleChange = ({target: {value}}) => {
    setSearchQuery(value)
  }

  const filterByRegion = ({value}) => {
    setEndpoint(`/region/${value}`);
  }

  return (
    <Row className="countries">
      <Col md={12} className="countries-search-filter">
        <Row className="flex">
          <Col sm={12} md={6}>
            <div className="countries__search-wrapper" style={theme === 'light' ? themes.lightSearch : themes.darkSearch}>
              <FontAwesomeIcon icon={faSearch}/>
              <input type="text"  placeholder="Search for a country…" style={theme === 'light' ? themes.lightInput : themes.darkInput} value={searchQuery} onChange={handleChange}/>
            </div>
          </Col>
          <Col sm={12} md={6} className="countries-filter justify-content-end" >
            {/* <Select options={options} placeholder="Filter By Region" onChange={filterByRegion} style={theme === 'light' ? theme.lightInput : theme.darkInput} className='darkMode'/> */}
            <Select options={options} placeholder="Filter By Region" onChange={filterByRegion} styles={customSelectStyles}/>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <Row className='flex'>
          {loading && <Spinner animation="border" />}
          {error && <p className="error">OOps There was an error fetching countries..</p>}
          {countries && countries.length > 0 && countries.map(((country, idx)=> <Col className="mb-4" sm={6} md={4} lg={3} key={idx}>
            <div className="country-card" style={theme === 'light' ? themes.lightCard: themes.darkCard} onClick={() => navigate(`/country/${country.name.common}`)}>
              <div className="country-card-img">
                <img src={country.flags.png} alt={country.name.common} />
              </div>
              <div className="country-card-details">
                <h6>{country.name.official}</h6>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region || 'N/A'}</p>
                <p><span>Capital:</span> {country.capital || 'N/A'}</p>
              </div>
            </div>
          </Col>))}
        </Row>
      </Col>
    </Row>
  )
}

export default Countries
