import { saveLikeToggle, saveTweet } from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading-bar'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets(tweets)  {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function toggleTweet({id, authedUser, hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        return saveLikeToggle(info).
                then(() => dispatch(toggleTweet(info))).catch((e) => {
                    console.warn('Error in handleToggleTweet: ', e);
                    alert('Ocorreu um erro ao curtir o tweet. Tente novamente. ')
                })
    }
}

export function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {
        dispatch(showLoading())
        const author = getState().authedUser
        return saveTweet({text, author, replyingTo})
            .then((tweet)=> {
                dispatch(addTweet(tweet))
                dispatch(hideLoading())
            })        
    }
}