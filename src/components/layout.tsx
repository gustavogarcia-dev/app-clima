import React, { useEffect, useState } from 'react';
import Input from './input';
import Button from './button';
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
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    setCity(inputValue);
  };

  useEffect(() => {
    const apiKey = '9d8b5dcbb98a40fbbe9173748242406';

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
      .then((data) => data.json())
      .then((response) => {
        // Verificar si la respuesta contiene un error o no
        if (response.error) {
          setError(`La ciudad "${city}" no fue encontrada.`);
          setResult(null); // Limpiar resultado
        } else {
          setResult(response);
          setError(null); // Limpiar error si hay un resultado válido
        }
      })
      .catch((error) => {
        console.error('Error de petición:', error);
        setError('Hubo un problema al obtener los datos del clima.');
        setResult(null); // Limpiar resultado en caso de error
      });
  }, [city]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-200 to-sky-400">

      <header className="bg-sky-500 text-white p-4 shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-2xl lg:text-1xl font-bold">Weather App</h1>
          <div className="flex items-center gap-4">
            <Input value={inputValue} onChange={handleChange} />
            <Button icon={<SearchIcon className="w-6 h-6" />} onSubmit={handleSubmit} />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 flex justify-center items-center">
        {error && <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"><p className="text-slate-600 text-3xl text-center mb-4">{error}</p></div> }
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="grid justify-center items-center gap-4">
              <div className="flex">
                <img src={result.current.condition.icon} alt="" className="w-17 h-17" />
                <div className="mx-1">
                  <h2 className="text-4xl font-bold">{result.current.temp_c}°</h2>
                  <p className="text-gray-500">{result.current.condition.text}</p>
                </div>
              </div>

              <div className="flex-col text-center">
                <h3 className="font-bold">{result.location.country},</h3>
                <h4 className="font-semibold">{result.location.region}</h4>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-4">
              Feels like {result.current.feelslike_c}° . Humidity {result.current.humidity}% Wind{' '}
              {result.current.wind_kph} km/h.
            </p>
          </div>
        )}
      </main>

      <footer className="w-full bg-sky-500 text-white p-4 text-center">
        <p>&copy; 2024 Weather App. All rights reserved Gustavo Garcia Dev.</p>
      </footer>
    </div>
  );
};

export default Layout;
