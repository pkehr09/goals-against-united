import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import { Container } from 'reactstrap';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div text-align='center'>
          <AppNavBar />
          <Container>
            <VideoModal />
            <VideoList />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App;
