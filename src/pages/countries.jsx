import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Col, Row, Spinner} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import useFetch from '../hooks/useFetch';

import { ThemeContext } from '../themes/theme-provider';

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
      ...themes[theme].select,
      border: 'none',
      outline: state.isFocused ? 'red' : 'blue',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (base) => ({
      ...base,
      ...themes[theme].select.menu
    }),
    option: (base, state) => ({
      ...base,
      ...themes[theme].select.options(state),
    }),
    singleValue: (base) => ({
      ...base,
      ...themes[theme].select.singleValue
    }),
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
    <Row className="countries pb-5">
      <Col md={12} className="countries-search-filter">
        <Row className="flex">
          <Col xs={12} sm={12} md={6}>
            <div className="countries__search-wrapper" style={themes[theme].search}>
              <FontAwesomeIcon icon={faSearch}/>
              <input type="text"  placeholder="Search for a country…" style={themes[theme].input} value={searchQuery} onChange={handleChange}/>
            </div>
          </Col>
          <Col xs={6} sm={12} md={6} className="countries-filter justify-content-sm-end" >
            <Select options={options} placeholder="Filter By Region" onChange={filterByRegion} styles={customSelectStyles}/>
          </Col>
        </Row>
      </Col>
      <Col md={12} className="countries__container">
        <Row className='g-5 align-items-stretch'>
          {loading && <Spinner animation="border" />}
          {error && <p className="error">OOps There was an error fetching countries..</p>}
          {countries && countries.length > 0 && countries.map(((country, idx)=> <Col className="" sm={6} md={5} lg={4} xl={3} key={idx}>
            <div className="country-card" style={themes[theme].card} onClick={() => navigate(`/country/${country.name.common}`)}>
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
