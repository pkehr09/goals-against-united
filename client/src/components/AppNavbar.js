import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import LogoutModal from './auth/Logout';
import LoginModal from './auth/Login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavBar extends Component {
    state = {
        isOpen: false,
        auth: {}
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <LogoutModal />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );
            

        return (
            <div>
                <Navbar className='mb-5' color="white" light expand="md">
                    <Container>
                        <NavbarBrand
                            href='/'
                        >
                        <img
                        alt=""
                        src="http://www.petekehr.com/GAU_LOGO.png"
                        className="logo"
                      />{''}</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                              { isAuthenticated ? authLinks : guestLinks }  
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);