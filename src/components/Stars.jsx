import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

class Stars extends Component {
  constructor(props) {
    super(props)
  }

  createStarsArray() {
    let number = this.props.number
    let array = []
    for (let n = 0; n < number; n++) {
      array.push(<FontAwesomeIcon icon={faStarSolid} color="cornflowerblue" />)
    }
    for (let n = this.props.number; n < 5; n++) {
      array.push(<FontAwesomeIcon icon={emptyStar} color="cornflowerblue" />)
    }
    return array;
  }

  handleClick(index) {
    this.props.rating(index + 1)
  }

  render() {

    return (
      <div>
        {this.createStarsArray().map((stars, index) => <button onClick={(e) => {
          this.handleClick(index)
        }}>{stars}</button>)}
      </div>
    )
  }

}
export default Stars;