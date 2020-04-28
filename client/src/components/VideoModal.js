
import React, { Component } from 'react'
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addVideo } from '../actions/videoActions';
import PropTypes from 'prop-types';

class VideoModal extends Component {
    state = {
        modal: false,
        url: '',
        auth: {},
        msg: null
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const urlFromForm = this.state.url;
        const { isAuthenticated, user } = this.props.auth;
        //const youtubeFormat = 
        
        if (urlFromForm && isAuthenticated) {
            const slicer = urlFromForm.slice(0,17);
            const shortformat = 'https://youtu.be/';
            const standardformat = 'https://www.youtu';

            if (slicer === shortformat) {
                let vidId = /[^/]*$/.exec(urlFromForm)[0];
                
                const newVideo = {
                    videoId: vidId,
                    user: user.name
                }
                // Add video via addItem action
                this.props.addVideo(newVideo);
    
                // Close modal
                this.toggle(); 
            } else if (slicer === standardformat) {
                let vidId = /[^=]*$/.exec(urlFromForm)[0];
                
                const newVideo = {
                    videoId: vidId,
                    user: user.name
                }
                // Add video via addItem action
                this.props.addVideo(newVideo);
    
                // Close modal
                this.toggle(); 
            } else {
                alert(`Invalid URL. Please make sure your goal begins with 'https' and is a valid YouTube or YouTube-shortened link.`);
            }    
        }    
    }

    render() {

        const { user } = this.props.auth
        
        return (
            <div className="text-center">
                {this.props.isAuthenticated ? ( 
                    <div className='splash-msg'>
                    { user ? (<div className='welcome'>Welcome {user.name}!</div>) : ''}
                    <Button
                        className='add-btn'
                        outline color='warning'
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                        >Add A Goal Against United
                    </Button> </div>) : (
                    <div className='please-login'>Please log in to add a goal</div>)}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle} className='modal-header'>Add A Goal Against United</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='video'>Video URL</Label>
                                <Input
                                    type='text'
                                    name='url'
                                    id='video'
                                    placeholder='Add link to video'
                                    onChange={this.onChange} 
                                />
                                <Button
                                    outline color='danger'
                                    style={{marginTop: '2rem'}}
                                    block
                                    >Add Goal</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    video: state.video,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addVideo })(VideoModal);

