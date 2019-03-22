import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleGetInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading-bar'
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetInitialData())
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading ? null :
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div>
            }
          </div>
        </Fragment>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser, loadingBar }) {
  return { loading: authedUser === null }
}

export default connect(mapStateToProps)(App)