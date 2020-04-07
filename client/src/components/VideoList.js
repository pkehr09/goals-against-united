import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import YouTube from 'react-youtube';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import { connect } from 'react-redux';
import { getVideos, deleteVideo } from '../actions/videoActions';
import PropTypes from 'prop-types';

class VideoList extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getVideos();
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    onDeleteClick = (id) => {
        this.props.deleteVideo(id);
    }

    copyToClipboard = (video) => {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        let prependYouTube = 'Check out this goal against United (via Goals Against United) https://www.youtube.com/watch?v='
        dummy.value = prependYouTube + video;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    
    render() {
        const opts = {
            height: '335',
            width: '550',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        }

        //const videos = this.props.video.videos OR 
        const { videos } = this.props.video;

        return (
            <Container className='w-100'>
                <TransitionGroup className='video-list'>
                    {videos.map(({ _id, videoId, user, date }) => (
                        <CSSTransition key={_id} timeout={500} classNames='fade'>
                            <div className='mt-5'>
                            <YouTube
                                className='mb-2 mt-3'
                                videoId={videoId}
                                opts={opts}
                                onReady={this._onReady} />
                        <div className='h6'>
                        Added by {user} on {moment(date).format('MMMM Do YYYY, h:mm a')}
                        </div>
                            <Button
                                className='mb-3 mt-2'
                                color='secondary'
                                onClick={this.copyToClipboard.bind(this, videoId)}
                                >Copy To Clipboard</Button>
                            
                            
                            { this.props.isAuthenticated ? (
                                <div className=''>
                                    <Button
                                        color='danger'
                                        size='md'
                                        className='remove-btn'
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >Delete</Button>
                                </div>
                            ) : null }   
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </Container>
        );
        
    }
}

VideoList.propTypes = {
    getVideos: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    video: state.video,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getVideos, deleteVideo })(VideoList)