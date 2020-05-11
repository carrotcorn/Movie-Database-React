import React from 'react';
import Select from 'react-select';

function Home(props) {
  const options = [
    { value: 'https://api.themoviedb.org/3/movie/now-playinh?api_key=6a97c9dac8bbcd1375f356915f8fb53b', label: 'Now Playing' },
    { value: 'https://api.themoviedb.org/3/movie/upcoming?api_key=6a97c9dac8bbcd1375f356915f8fb53b', label: 'upcoming' }

  ]


  const Home = () => (
    <Select options={options} />
  )
  console.log("pp")
  return (
    <div>
      <Home />
    </div>
  )
}

export default Home;