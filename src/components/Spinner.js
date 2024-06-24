import React, { Component } from 'react'
import loader from "../assets/loader.gif"
export default class Spinner extends Component {
  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <img src={loader} alt='loading'/>
      </div>
    )
  }
}
