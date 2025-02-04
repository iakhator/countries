import React, {useEffect, useState, useContext} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {Spinner} from 'react-bootstrap'
import ThemeContext from '../themes/theme-context';

import useFetch from '../hooks/useFetch';

const Country = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [borderCountryCode, setBorderCountryCode] = useState(null); 
  const {theme, themes} = useContext(ThemeContext);


  const {data: countryData, error, loading } = useFetch(`/name/${id}?fullText=true`)

  const { data: borderCountry, error: borderError, loading: borderLoading } =
    useFetch(borderCountryCode ? `/alpha/${borderCountryCode}` : null)

  const country = countryData && countryData.length > 0 ? countryData[0] : null;

  useEffect(() => {
      if (borderCountry && borderCountry[0].name) { 
        navigate(`/country/${borderCountry[0].name.common}`);
      }
  
  }, [borderCountryCode, borderCountry])
  

  const navigateBack = () => {
    navigate('/')
  }

  const handleBorderClick = async (borderCode) => {
   setBorderCountryCode(borderCode);
  };

  return (
    <div className="country">
      {(loading) && <Spinner animation="border" />}
      <button onClick={navigateBack} style={themes[theme].button}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      {(error || borderError) && <p className="error">OOps There was an error fetching countries..</p>}
      {country && <div className="country-details">
          <div className="country-image">
            <img src={country.flags.png} alt={country.name.common} />
          </div>
          <div className="country-desc">
            <h2>{country.name.official}</h2>
            <div className="country-side-panes">
              <div className="country-desc-left">
                <p><span>Native Name:</span> {country.name.common}</p>
                <p><span>Population:</span> {country.population}</p>
                <p><span>Region:</span> {country.region}</p>
                 <p><span>Sub Region:</span> {country.subregion}</p>
                 <p><span>Capital:</span> {country.capital}</p>
                 <p>{JSON.stringify(Object.keys(country.currencies).map(key => country.currencies[key].name).join(','))}</p>
              </div>
              <div className="country-desc-right">
                 <p><span>Top Level Domain:</span> {country.tld ? country.tld.map(domain => (domain)) : 'N/A'}</p>
                 <p><span>Currencies:</span>  {Object.keys(country.currencies).map(key => country.currencies[key].name).join(',')}</p>
                 <p><span>Languages:</span> {Object.keys(country.languages).map(key => country.languages[key]).join(',')}</p>
              </div>
            </div>
            <div className="country-border">
              <p className="pborder">Border Countries:</p>
              <p className="pborder-countries">{country.borders ? country.borders.map((border, idx) => (<button onClick={() => handleBorderClick(border)} key={idx} style={themes[theme].borderButton}>{border}</button>)) : 'N/A'}</p>
            </div>
          </div>
      </div>}
    </div>
  )
}

export default Country
