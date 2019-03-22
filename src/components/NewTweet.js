import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleAddTweet} from '../actions/tweets'
import {Redirect} from 'react-router-dom'

class NewTweet extends Component {

    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { text } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddTweet(text,id))

        this.setState(() => ({
            text: '',
            toHome: id ? false : true
        }))
    }

    render() {

        const { text, toHome } = this.state

        if(toHome === true){
            return (
                <Redirect to='/'/>
            )
        }

        const textLeft = 280 - text.length

        return (
            <div>
                <h3 className="center">Compose New Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea value={text}
                               onChange={this.handleChange} 
                               placeholder="What`s happening?" 
                               maxLength="280"
                               className="textarea" />
                    {textLeft <= 100 &&
                        <div className="tweet-length">
                            {textLeft}
                        </div>
                    }
                    <button type="submit" 
                            className="btn" 
                            disabled={text === ''}>
                        Submit
                    </button>    
                </form>
            </div>
        );
    }
}

export default connect()(NewTweet);