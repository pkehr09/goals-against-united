import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
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

    copyToClipboard = (video, user) => {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        let prependYouTube = `Check out this goal against United posted by user ${user} (via Goals Against United) https://www.youtube.com/watch?v=`
        dummy.value = prependYouTube + video;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    
    render() {
        const opts = {
            height: '450',
            width: '800',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        }

        //const videos = this.props.video.videos OR 
        const { videos } = this.props.video;

        return (
            <div className="video-list">
            <Container>
                <TransitionGroup className='video-list'>
                    {videos.map(({ _id, videoId, user, date }) => (
                        <CSSTransition key={_id} timeout={500} classNames='fade'>
                            <div className='youtube'>
                            <YouTube
                                videoId={videoId}
                                opts={opts}
                                className='video'
                                onReady={this._onReady} />   
                            <Row className='desc-row'>
                            <Col sm='3' xs='2'>
                                <Button
                                outline color='secondary'
                                className='copy-btn'
                                onClick={this.copyToClipboard.bind(this, videoId, user)}
                                >Copy To Clipboard</Button>
                            </Col>
                            <Col sm='6' xs='8'>
                                <div  className='goal-desc'>
                                    Added by {user} on {moment(date).format('MMMM Do YYYY, h:mm a')}
                                </div>
                            </Col>
                            <Col sm='3' xs='2'>
                            { this.props.isAuthenticated ? (
                                <div>
                                    <Button
                                        outline color='danger'
                                        size='md'
                                        className='delete-btn'
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >Delete</Button>
                                </div>
                            ) : null }
                            </Col>
                            </Row>
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </Container>
        </div>
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