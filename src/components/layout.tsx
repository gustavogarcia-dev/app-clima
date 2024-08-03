import React, { useEffect, useState } from 'react';
import Input from './input';
import SearchIcon from './searchicon';

interface Datos {
  current: {
    condition: {
      icon: string;
      text: string;
    };
    temp_c: number;
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    localtime: string;
    long: number;
  };
}

const Layout: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState('new york');
  const [result, setResult] = useState<Datos | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCity(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    const apiKey = '9d8b5dcbb98a40fbbe9173748242406';

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
      .then((data) => data.json())
      .then((response) => {
        if (response.error) {
          setError(`La ciudad "${city}" no fue encontrada.`);
          setResult(null);
        } else {
          setResult(response);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('Error de petición:', error);
        setError('Hubo un problema al obtener los datos del clima.');
        setResult(null);
      });
  }, [city]);

  return (
    <div>
    <body className="flex flex-col">
      <header className="bg-sky-500 text-white flex p-2 flex-col md:flex-row shadow-md items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold ">Weather App</h1>
        <form onSubmit={handleSubmit} className="flex items-center w-full md:w-auto">
          <Input value={inputValue} onChange={handleChange}  />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-md ml-2 my-2 p-2 flex items-center justify-center "
          >
            <SearchIcon />
          </button>
        </form>
      </header>

      <main className="bg-slate-200 p-4 flex flex-col items-center ">
        {error && (
          <div className="bg-white rounded-lg shadow-lg p-4 w-full mb-4">
            <p className="text-slate-600 text-lg text-center">{error}</p>
          </div>
        )}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-4 ">
            <div className="flex flex-col items-center">
              <img src={result.current.condition.icon} alt={result.current.condition.text} className="w-24 h-24 mb-2" />
              <h2 className="text-5xl font-bold mb-1">{result.current.temp_c}°</h2>
              <p className="text-gray-600 text-xl mb-4">{result.current.condition.text}</p>
              <p className="text-center text-gray-500 text-lg mb-2">
                Feels like {result.current.feelslike_c}° . Humidity {result.current.humidity}% Wind{' '}
                {result.current.wind_kph} km/h.
              </p>
              <div className="text-center">
                <h3 className="font-bold text-xl">{result.location.country}</h3>
                <h4 className="font-semibold text-lg">{result.location.region}</h4>
              </div>
            </div>
          </div>
        )}
      </main>      
    </body>
      <footer className="p-2 bg-sky-500 text-white text-center">
        <p className="text-sm">&copy; 2024 Weather App. All rights reserved Gustavo Garcia Dev.</p>
      </footer>
    </div>
  );
};

export default Layout;
