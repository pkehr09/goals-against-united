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
                    <span className='navbar-text mr-3'>
                        <strong> { user ? ` Welcome ${user.name}!` : ''}</strong>
                    </span>
                </NavItem>
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
                <Navbar dark expand='sm' className='mb-5 bg-danger text-white'>
                    <Container>
                        <NavbarBrand
                            href='/'
                            className='font-weight-bold'
                        >Goals Against United</NavbarBrand>
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