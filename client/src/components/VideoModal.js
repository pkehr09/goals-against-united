
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
        auth: {}
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
        
        if (urlFromForm && isAuthenticated) {
            let vidId = /[^=]*$/.exec(urlFromForm)[0] 
            const newVideo = {
                videoId: vidId,
                user: user.name
            }
            // Add video via addItem action
            this.props.addVideo(newVideo);

            // Close modal
            this.toggle();    
        }    
    }

    render() {

        //const datdude = 'http://petekehr.com/datdude.png';
        
        return (
            <div>
                {this.props.isAuthenticated ? ( 
                    <Button
                        color='warning'
                        style={{marginBottom: '2rem'}}
                        size='mdd'
                        onClick={this.toggle}
                        >Add A Goal Against United
                    </Button> ) : (
                    <h4 className='mb-3 ml-4'>Please log in to add a goal</h4>)}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add A Goal Against United</ModalHeader>
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
                                    color='danger'
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

