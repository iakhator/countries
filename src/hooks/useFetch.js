import {useState, useEffect , useRef} from 'react';

// const BASE_URL = 'https://restcountries.com/v2';
const BASE_URL = 'https://restcountries.com/v3.1';

const useFetch = (endpoint, options = {})  => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const optionsRef = useRef(options);

  useEffect(() => {
    // To avoid setting state on unmounted components
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if(endpoint) fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmounting
    };
  }, [endpoint, optionsRef]);

  return { data, error, loading };
}

export default useFetch;
