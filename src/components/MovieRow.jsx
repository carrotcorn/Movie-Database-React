import React from 'react'
import FavoritesButton from './FavoritesButton.jsx';
import RatingStar from './RatingStar.jsx';

class MovieRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  getFavorites(favorites) {
    // console.log(favorites)
    this.props.getFavorites(favorites)
  }
  getRating(stars) {
    this.props.getRating(stars)
  }

  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.location.href = url
  }

  render() {
    return <table key={this.props.movie.id}>
      <tbody>
        <tr>
          <td>
            <img alt="poster" width="120" src={this.props.movie.poster_src} />
          </td>
          <td>
            <h3>{this.props.movie.title}</h3>
            <p>{this.props.movie.overview}</p>
            <FavoritesButton getFavorites={this.getFavorites.bind(this)} id={this.props.movie.id} />
            <input type="button" onClick={this.viewMovie.bind(this)} value="View" />
            <RatingStar getRating={this.getRating.bind(this)} id={this.props.movie.id} />

          </td>
        </tr>
      </tbody>
    </table>
  }
}

export default MovieRow