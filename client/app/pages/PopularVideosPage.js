import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadVideos } from '../actions/videoActions'
import VideoList from '../components/VideoList'
import LoadProgress from '../components/LoadProgress'

const styles = {
  title: {
    fontSize: 30,
    marginLeft: 15,
  }  
}

class PopularVideosPage extends Component {
  static propTypes = {
    videos: PropTypes.object.isRequired
  }

  state = {
    isLoading: true,
    page : 1
  }

  componentDidMount() {
    this.props.loadVideos().then(
      res => {
        this.setState({
          isLoading: false,
          page: 2
        });
      }
    )
  }

  loadNextPage = () => {
    this.setState({isLoading: true});
    this.props.loadVideos(this.state.page).then(
      res => {
        this.setState({
          isLoading: false,
          page: this.state.page + 1,
        });
      }
    )
  }

  render() {
    return (
      <div>
        <div style={styles.title}>PopularVideosPage</div>
        {this.state.isLoading && this.state.page == 1 ? <LoadProgress /> :
          <VideoList 
            videos={this.props.videos.videos} 
            pagination={this.props.videos.pagination} 
            loadNextPage={this.loadNextPage}
            isLoading={this.state.isLoading} />
        }
        {this.state.isLoading && this.state.page > 1 ? <LoadProgress /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos,
  }
}

export default connect(mapStateToProps, { loadVideos })(PopularVideosPage)