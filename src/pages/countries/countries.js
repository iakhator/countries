import {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Col, Row, Spinner} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

import './countries.scss'
import ThemeContext from '../../themes/theme-context';

const options = [
  { value: 'Africa', label: 'Africa' },
  { value: 'America', label: 'America' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    padding: 20,
    border: "1px solid red",
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    border: "1px solid black",
    width: 200
  })
  // // singleValue: (provided, state) => {
  // //   const opacity = state.isDisabled ? 0.5 : 1;
  // //   const transition = 'opacity 300ms';

  // //   return { ...provided, opacity, transition };
  // // }
}

const Countries = (props) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const {theme, themes} = useContext(ThemeContext)
  const navigate = useNavigate()

  
  useEffect(() => {
    setLoading(true)
    fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
      setCountries(data)
      setLoading(false)
    }).catch(err => {
      setError(true);
      setLoading(false)
    })
  }, [])

  const getBySearchCountry = (value) => {
    if(value && value.length >= 2) {
      setTimeout(() => {
        setLoading(true)
        fetch(`https://restcountries.com/v2/name/${value}`)
          .then(response => response.json())
          .then(data => {
            setCountries(data)
            setLoading(false)
          }).catch(err => {
          setError(true);
          setLoading(false)
        })
      }, 2000);
    }
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    getBySearchCountry(e.target.value)
  }

  const getCountry = (name) => {
    navigate(`/country/${name}`)
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
          <Col sm={12} md={6} className="countries-filter justify-content-end">
            <Select options={options} placeholder="Filter By Region" styles={customStyles} control={{backgroundColor: 'red'}}/>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <Row>
          {loading && <Spinner animation="border" />}
          {!loading && error && <p className="error">OOps There was an error fetching countries..</p>}
          {!loading && countries.length > 0 && countries.map(((country, idx)=> <Col lg={3} md={3} className="mb-4" key={idx}>
            <div className="country-card" style={theme === 'light' ? themes.lightCard: themes.darkCard} onClick={() => getCountry(country.name)}>
              <div className="country-card-img">
                <img src={country.flags.png} alt={country.name} />
              </div>
              <div className="country-card-details">
                <h6>{country.name}</h6>
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
