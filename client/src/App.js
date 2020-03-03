import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'
import Navbar from '../src/components/Navbar'
import MainPage from './components/MainPage'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { SET_CURRENT_USER } from './actions/types'
import { logoutUser } from './actions/formActions'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import CreatePost from './components/CreatePost'
import PageLink from './components/PageLink'
import ForsaleSub from './components/ForsaleSub';
import QuestionLink from './components/QuestionLink'
import VerifyAccount from './components/VerifyAccount';
import EmailVerified from './components/EmailVerified';
import HelpPage from './components/HelpPage'
import AvoidScams from './components/AvoidScams'
import NotFound from './components/NotFound'





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
    // this.props.history.push('/login')
  }
}


class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <div className="App">



          <BrowserRouter>
            <Navbar />


            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/avoidscams' component={AvoidScams} />
              <Route exact path='/help' component={HelpPage} />
              {/* <Route exact path='/news' component={News} /> */}
              <Route exact path='/login' component={Login}>
                {/* {localStorage.jwtToken ? <Redirect to='/dashboard' /> : <Login />} */}
              </Route>
              <Route exact path='/question/:title/:questionid' component={QuestionLink} />
              <Route exact path='/verifyaccount' component={VerifyAccount} />
              <Route exact path='/verifyaccount/:code' component={EmailVerified} />
              <Route exact path='/register' component={Signup} />
              <Route exact path='/services/:subcategory/:title/:forsaleid' component={PageLink} />
              <Route exact path='/forsale/:subcategory/:title/:forsaleid' component={PageLink} />
              <Route exact path='/housing/:subcategory/:title/:forsaleid' component={PageLink} />
              <Route exact path='/jobs/:subcategory/:title/:forsaleid' component={PageLink} />
              <Route exact path='/garagesale/:title/:forsaleid' component={PageLink} />
              <Route exact path='/volunteers/:title/:forsaleid' component={PageLink} />
              <Route exact path='/events/:title/:forsaleid' component={PageLink} />
              <Route exact path='/classes/:title/:forsaleid' component={PageLink} />
              <Route exact path='/lostandfound/:title/:forsaleid' component={PageLink} />
              <Route exact path='/free/:title/:forsaleid' component={PageLink} />
              <Route exact path='/services/:subcategory' component={ForsaleSub} />
              <Route exact path='/forsale/:subcategory' component={ForsaleSub} />
              <Route exact path='/housing/:subcategory' component={ForsaleSub} />
              <Route exact path='/jobs/:subcategory' component={ForsaleSub} />
              <Route exact path='/garagesale' component={ForsaleSub} />
              <Route exact path='/free' component={ForsaleSub} />
              <Route exact path='/volunteers' component={ForsaleSub} />
              <Route exact path='/events' component={ForsaleSub} />
              <Route exact path='/classes' component={ForsaleSub} />
              <Route exact path='/lostandfound' component={ForsaleSub} />
              <PrivateRoute exact path='/createpost' component={CreatePost} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>



        </div>


      </Provider>
    );
  }
}

export default withRouter(App);
