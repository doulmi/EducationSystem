import React, { PropTypes } from 'react'
import brandIcon from '../resources/images/icon.png'

const LoadProgress = (props) => (
  <center>
    <div className="cs-loader">
      <div className="cs-loader-inner" >
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
        <label>	●</label>
      </div>
    </div>
  </center>
)

export default LoadProgress;