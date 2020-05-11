import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

class FavoriteButton extends Component {
  constructor(props) {
    super(props)
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    this.state = { heart: (favorites.indexOf(this.props.id) !== -1) }
  }

  handleClick() {
    if (this.state.heart) {
      this.setState((state) => {
        return { heart: false }
      })
      this.props.getFavorites(-this.props.id)
    } else {
      this.setState((state) => {
        return { heart: true }
      })
      this.props.getFavorites(this.props.id)
    }
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        {(
          this.state.heart ? <FontAwesomeIcon icon={faHeartSolid} color="cornflowerblue" />
            :
            <FontAwesomeIcon icon={emptyHeart} color="cornflowerblue" />
        )}
      </button>
    )
  }
}


export default FavoriteButton;