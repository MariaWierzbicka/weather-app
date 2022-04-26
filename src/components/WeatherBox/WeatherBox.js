import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setLoading(true);
    setError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8cf55345a22c43b15b94ea0aee41ffb4&units=metric`)
    .then(res => {
      if(res.status === 200){
        return res.json()
        .then(data => {
          setWeatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          });
          setLoading(false);
        });
      } else {
        setLoading(false);
        setError(true);
      }
    });      
  }, []);
  

  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (weatherData && !loading && !error) && <WeatherSummary data={{...weatherData}}/>}
      { loading && <Loader />}
      { error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;