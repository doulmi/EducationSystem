import React, { Component, PropTypes } from 'react'
import Fox from '../../components/Fox'
import N18 from '../../constants/strings'
import '../../styles/Page404.scss'

const getStyles = (theme) => {
  return {
    top: {
      marginTop: 300
    },

    text: {
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      marginTop: 150,
      fontSize: 20,
      color: theme.palette.secondaryTextColor,
    }
  }
}

class Page404 extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render() {
    let styles = getStyles(this.context.muiTheme)

    return (
      <div style={styles.top}>
        <Fox /><br />
        <span style={styles.text}>{N18.page404}</span>
      </div>
    )
  }
}

export default Page404