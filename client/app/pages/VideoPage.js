import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import { loadVideo } from '../actions/videoActions'
import LoadProgress from '../components/LoadProgress'
import CommentList from '../components/CommentList'
import VideoController from '../components/VideoController'
import VideoSubs from '../components/VideoSubs'

class VideoPage extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired
  }

  state = {
    isLoading: true,
    player: {},
    isPlaying: true,
    zh: true,
    fr: true,
    currentSubIdx: 0,
    subs: [],
    subs_zh: [],
    loop: false
  }

  componentWillMount = () => {
    let videoSlug = this.props.params.slugOrId;
    this.props.loadVideo(videoSlug).then(
      res => {
        let video = this.props.video;
        this.setState({
          isLoading: false,
          subs: video.parsed_content && video.parsed_content.split('||'),
          subs_zh: video.parsed_content_zh && video.parsed_content_zh.split('||'),
          points: video.points.split(',')
        })
      }
    )
  }

  componentWillUnmount = () => {
    clearInterval(this.updateInterval);
  }

  /**
   * Update every second: 
   * 1. Find the current idx
   * 2. If is in the loop mode, repeat it 
   */
  timeupdate = () => {
    if (this.state.isPlaying) {
      let currentTime = this.currentTime();
      let {points, currentSubIdx} = this.state;

      let isLastSub = currentSubIdx == points.length - 1;

      if (this.state.loop) {
        if (currentTime >= points[currentSubIdx + 1]) {
          this.seekTo(points[currentSubIdx]);
        }
      } else {
        for (let i = 0; i < points.length - 1; i++) {
          //find current point 
          if (points[i + 1] >= currentTime) {
            this.setState({
              currentSubIdx: i
            })
            break;
          }
        }
      }
    }
  }

  /**
   * When player is ready
   */
  onReady = (event) => {
    this.setState({
      player: event.target
    }, () => {
      this.updateInterval = setInterval(this.timeupdate, 500);
    })
  }

  /**
   * play video
   */
  play = () => {
    this.state.player.playVideo();
  }

  /**
   * get current Player time
   */
  currentTime = () => {
    return this.state.player.getCurrentTime();
  }

  /**
   * pause video
   */
  pause = () => {
    this.state.player.pauseVideo();
  }

  /**
   * when player is playing, pause it
   * when player is pausing, play it
   */
  togglePlay = () => {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Player will advance seconds
   */
  advance = (second) => {
    this.state.seekTo(second + this.currentTime());
  }

  /**
   * Player will back seconds
   */
  back = (second) => {
    this.state.seekTo(second - this.currentTime());
  }

  /**
   * Player will seek to time
   */
  seekTo = (time) => {
    this.state.player.seekTo(time);
  }

  /**
   * Seek to a sub with idx given
   */
  seekCallback = (idx) => {
    this.seekTo(this.state.points[idx]);
    if (!this.state.isPlaying) {
      this.play();
    }
  }

  /**
   * Play next sub
   */
  preCallback = () => {
    let idx = this.state.currentSubIdx;
    idx = idx > 1 ? idx - 1 : 0;

    this.seekCallback(idx);
  }

  /**
   * Play previous sub
   */
  nextCallback = () => {
    let idx = this.state.currentSubIdx;
    let max = this.state.points.length - 1;
    idx = idx < max ? idx + 1 : max

    this.seekCallback(idx);
  }

  /**
   * Play one sub in loop way
   */
  loopCallback = () => {
    this.setState({ loop: !this.state.loop })
  }

  onPause = () => {
    this.setState({ isPlaying: false })
  }

  onPlay = () => {
    this.setState({ isPlaying: true })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadProgress />
    } else {
      let {currentSubIdx, subs, subs_zh, points, loop, parsed_content} = this.state;
      let {video} = this.props;
      return (
        <div>
          <div className="row" style={{ marginLeft: 15, marginRight: 15 }} >
            <div className="col-md-6 video-container">
              <YouTube
                videoId={video.originSrc}
                onReady={this.onReady}
                opts={{ playerVars: { color: 'white', showinfo: 0, rel: 0, autoplay: 1 } }}
                onPlay={this.onPlay}
                onPause={this.onPause}
                onEnd={() => console.log('onEnd')}
                onError={() => console.log('onError')}
                onStateChange={(state) => console.log(state)}
                onPlaybackRateChange={() => console.log('changeRate')}
                onPlaybackQualityChange={() => console.log('Quality')}
                />

              <div style={{ marginTop: -8 }}>
                <VideoController
                  sub={subs[currentSubIdx]}
                  sub_zh={subs_zh[currentSubIdx]}
                  currentSubIdx={currentSubIdx}
                  nextCallback={this.nextCallback}
                  preCallback={this.preCallback}
                  loopCallback={this.loopCallback}
                  loop={loop}
                  />
              </div>
            </div>

            <div className="col-md-6" style={{ height: 490, overflow: 'auto' }}>
              <VideoSubs
                subs={subs}
                currentSubIdx={currentSubIdx}
                seekCallback={this.seekCallback}
                points={points}
                />
            </div>
          </div>

          <div>
          </div>

          <div
            className="markdown-content"
            style={{ padding: "0 40px" }}
            dangerouslySetInnerHTML={{ __html: video.parsed_desc }}
            />

          <CommentList videoId={video.id} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.videos.video
  }
}

export default connect(mapStateToProps, { loadVideo })(VideoPage)