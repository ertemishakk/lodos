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
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { SET_CURRENT_USER } from './actions/types'
import { logoutUser } from './actions/formActions'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import Housing from './components/Housing'
import ForSale from './components/ForSale'
import CreatePost from './components/CreatePost'
import PageLink from './components/PageLink'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}


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
              <Route exact path='/login' component={Login}>
                {/* {localStorage.jwtToken ? <Redirect to='/dashboard' /> : <Login />} */}
              </Route>

              <PrivateRoute exact path='/createpost' component={CreatePost} />
              <Route exact path='/register' component={Signup} />
              <Route exact path='/housing' component={Housing} />
              <Route exact path='/housing/:title' component={PageLink} />
              <Route exact path='/forsale/:title' component={PageLink} />
              <Route exact path='/forsale' component={ForSale} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </BrowserRouter>



          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
