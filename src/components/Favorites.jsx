import React, { Component } from 'react'
import MovieRow from './MovieRow.jsx'
import './App.css'
import $ from 'jquery';

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = { rows: [], favorites: (JSON.parse(localStorage.getItem('favorites')) || []) }
  }
  componentDidMount() {
    this.createMoviesArray()
  }
  createMoviesArray() {
    this.state.favorites.forEach(id => {
      this.getMovie(id)
    });
  }
  getMovie(id) {

    console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=6a97c9dac8bbcd1375f356915f8fb53b&language=en-US`)
    const urlString = `https://api.themoviedb.org/3/movie/${id}?api_key=6a97c9dac8bbcd1375f356915f8fb53b&language=en-US`
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        const results = searchResults

        var movieRows = []
        console.log(results)


        searchResults.poster_src = "https://image.tmdb.org/t/p/w185" + searchResults.poster_path
        const movieRow = <MovieRow getFavorites={this.props.getFavorites} key={searchResults.id} movie={searchResults} />
        movieRows.push(movieRow);

        this.setState({ rows: [...this.state.rows, movieRows] })
      }
    }
    )
  }
  render() {
    return (
      <div className="favorites">
        {this.state.rows}
      </div>
    )
  }
}

export default Favorites;
