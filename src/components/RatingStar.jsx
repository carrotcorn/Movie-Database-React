import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import Stars from './Stars.jsx';


class RatingStar extends Component {
  constructor(props) {
    super(props)
    let stars = (localStorage.getItem('stars')) || {}
    this.state = {
      idInStars: ('id' in stars), stars: stars, number: 0
    }
  }
  rate() {
    let tempStars = this.state.stars
    tempStars[this.props.id] = this.state.number
    this.setState((state) => {
      return { stars: tempStars }
    })
    this.setState((state) => {
      return { IdInStars: true }
    })
    console.log(this.state)
  }

  rating(index) {
    let tempStars = this.state.stars
    tempStars[this.props.id] = index
    this.setState((state) => {
      return { stars: tempStars }
    })
    this.setState((state) => {
      return { number: index }
    })
  }
  unRate() {
    this.props.getRating(this.state.stars, -this.props.id)
    delete this.state.stars[this.props.id];
  }

  render() {
    return (
      <div>
        {(
          this.state.IdInStars ? <Stars number={this.state.number} rating={this.rating.bind(this)} /> : <button onClick={this.rate.bind(this)}> Rate</button>
        )}
      </div>
    )
  }
}


export default RatingStar;