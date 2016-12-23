import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import ActionTranslate from 'material-ui/svg-icons/action/translate';
import EditorBubbleChart from 'material-ui/svg-icons/editor/bubble-chart';
import LazyLoad from 'react-lazyload';
import N18 from '../constants/strings'

const getStyles = (theme) => {
  return {
    level: {
      position: 'absolute',
      top: 10,
      fontSize: 12,
      right: 6,
      padding: "2px 8px",
      borderRadius: 3,
      background: '#080A0A',
    },

    image: {
      width: '100%',
      border: '1px solid black'
    },

    title: {
      height: 60
    },

    icon: {
      width: 18,
      heigth: 18
    }
  }
}

class Video extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired
  }

  static contextProps = {
    muiTheme: PropTypes.object.isRequired
  }

  render() {
    let styles = getStyles(this.context.muiTheme);
    let video = this.props.video;
    return (
      <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{ padding: 6 }}>
        <Link to={'/videos/' + video.slug}><img style={styles.image} src={video.avatar} alt="" /></Link>
        <div style={styles.level}>{'# ' + N18.getLevel(video.level)}</div>
        <div style={styles.title}>{video.title}</div>

        {video.state >= 5 && <a href="#" title={N18.zh} style={styles.zh} alt={N18.zh}><ActionTranslate style={styles.icon} /></a>}
        {video.state == 6 && <a href="#" title={N18.notation} style={styles.notation} alt={N18.notation}><EditorBubbleChart style={styles.icon} /></a>}
        <div style={styles.duration} className="pull-right">{video.duration}</div>
      </div>
    )
  }
}

export default Video