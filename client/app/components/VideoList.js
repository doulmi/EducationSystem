import React, { Component, PropTypes } from 'react'
import Video from './Video'

import N18 from '../constants/strings'

class VideoList extends Component {
    static propTypes = {
        videos: PropTypes.array.isRequired,
        pagination: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired, 
        loadNextPage : PropTypes.func.isRequired,
    }

    handleScroll = (event) => {
        let height = event.srcElement.body.scrollHeight;
        let scrollTop = event.srcElement.body.scrollTop;
        if(scrollTop / height > 2 / 3 && ! this.props.isLoading) {
            this.props.loadNextPage();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        if (this.props.videos.length == 0) {
            return <div>{N18.noVideos}</div>
        } else {
            return (
                <div className="row" style={{ marginLeft: 15, marginRight: 15 }} >
                    {this.props.videos.map(video =>
                        <Video key={video.id} video={video} />
                    )}
                </div>
            )
        }
    }
}

export default VideoList