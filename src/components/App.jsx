import React, { Component } from 'react';
import Home from './Home';
import TitleBar from './TitleBar.jsx';
import MovieRow from './MovieRow.jsx';
import Discover from './Discover.jsx';
import Rating from './Rating.jsx';
import Navigation from './Navigation.jsx';
import Favorites from './Favorites.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import $ from 'jquery';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { favorites: JSON.parse(localStorage.getItem('favorites')) || [] }
    this.loadPage()
  }
  getRating(stars) {
    localStorage.setItem("stars", stars)
  }
  getFavorites(id) {
    console.log(this.state.favorites)
    if (id > 0) {
      this.setState((state) => {
        return { favorites: [...this.state.favorites, id] }
      },
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
      )
    } else if (id < 0) {
      this.setState((state) => {
        return { favorites: this.state.favorites.filter((value) => { return value !== -id }) }
      },
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
      )
    }
  }


  loadPage(searchTerm) {
    let urlString

    if (!searchTerm) {
      urlString = "https://api.themoviedb.org/3/movie/popular?api_key=6a97c9dac8bbcd1375f356915f8fb53b"
    } else {
      console.log("Perform search using movieDB")
      urlString = "https://api.themoviedb.org/3/search/movie?api_key=6a97c9dac8bbcd1375f356915f8fb53b&query=" + searchTerm;
    }


    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        const results = searchResults.results


        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieRow = <MovieRow getRating={this.getRating.bind(this)} getFavorites={this.getFavorites.bind(this)} key={movie.id} movie={movie} />
          movieRows.push(movieRow);

        })
        movieRows = movieRows.slice(0, 12)
        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.error("failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.loadPage(searchTerm)
  }

  render() {
    return (
      <Router>
        <TitleBar />
        <Navigation />
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Favorites">
            <Favorites getFavorites={this.getFavorites()} />
          </Route>
          <Route path="/Discover">
            <Discover />
          </Route>
          <Route path="/Rating">
            <Rating />
          </Route>
          <Route default>

            <input style={{
              fontSize: 24,
              display: 'block',
              width: "99%",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16
            }} onChange={this.searchChangeHandler.bind(this)} placeholder="search" />
            {this.state.rows}
          </Route>

        </Switch>
      </Router>
    );
  }
}
export default App;
