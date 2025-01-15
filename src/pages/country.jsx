import React, {useEffect, useState, useContext} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {Spinner} from 'react-bootstrap'
import ThemeContext from '../themes/theme-context';

// import './country.scss'
const Country = () => {
  const [country, setCountry] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const {id} = useParams()
  const {theme, themes} = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true)
    fetch(`https://restcountries.com/v2/name/${id}?fullText=true`)
      .then(response => response.json())
      .then(data => {
        console.log(data[0])
        setCountry(data[0])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true);
        setLoading(false)
      })
  }, [id])

  const navigateBack = () => {
    navigate('/')
  }

  const getCountry = (code) => {
    setLoading(true)
    fetch(`https://restcountries.com/v2/alpha/${code}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCountry(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true);
        setLoading(false)
      })
  }

  return (
    <div className="country">
      {loading && <Spinner animation="border" />}
      {!loading && error && <p className="error">OOps There was an error fetching countries..</p>}
      <button onClick={navigateBack} style={theme === 'light' ? themes.lightButton : themes.darkButton}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      {!loading && Object.keys(country).length > 0 && <div className="country-details">
          <div className="country-image">
            <img src={country.flags.png} alt={country.name} />
          </div>
          <div className="country-desc">
            <h2>{country.name}</h2>
            <div className="country-side-panes">
              <div className="country-desc-left">
                <p><span>Native Name:</span> {country.name}</p>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region}</p>
                 <p><span>Sub Region:</span> {country.subregion}</p>
                 <p><span>Capital:</span> {country.capital}</p>
              </div>
              <div className="country-desc-right">
                 <p><span>Top Level Domain:</span> {country.topLevelDomain.map(domain => (domain))}</p>
                 <p><span>Currencies:</span>  {country.currencies.map(currency => (currency.name))}</p>
                 <p><span>Languages:</span> {country.languages.map(language => (language.name))}</p>
              </div>
            </div>
            <div className="country-border">
              <p className="pborder">Border Countries:</p>
              <p className="pborder-countries">{country.borders ? country.borders.map((border, idx) => (<button key={idx} style={theme === 'light' ? themes.lightButtonBorder : themes.darkButtonBorder} onClick={() => getCountry(border)}>{border}</button>)) : 'N/A'}</p>
            </div>
          </div>
      </div>}
    </div>
  )
}

export default Country
