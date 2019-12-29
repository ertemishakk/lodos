import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'
import Navbar from '../src/components/Navbar'
import MainPage from './components/MainPage'
import News from './components/News'
import Signup from './components/Signup'
import Footer from './components/Footer'
import Login from './components/Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />



          <BrowserRouter>

            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/news' component={News} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Signup} />
            </Switch>
          </BrowserRouter>



          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
