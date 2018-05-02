const NYT_BACKEND_URL = "http://localhost:3000/api/v1/articles"
const BBC_BACKEND_URL = "http://localhost:3000/api/v1/broadcastings"
const FOX_BACKEND_URL = "http://localhost:3000/api/v1/foxes"
const CNN_BACKEND_URL = "http://localhost:3000/api/v1/cables"
const ABC_BACKEND_URL = "http://localhost:3000/api/v1/americans"

export function fetchArticles() {
  return dispatch => {
    dispatch({ type: "LOADING_NYT_ARTICLES"});
      return fetch(NYT_BACKEND_URL)
        .then(res => res.json())
        .then(json => dispatch({
          type: "ADD_NYT_ARTICLES", payload: json
        }))
    }
  }

export function fetchBBCArticles() {
    return dispatch => {
      dispatch({ type: "LOADING_BBC_ARTICLES"});
        return fetch(BBC_BACKEND_URL)
          .then(res => res.json())
          .then(json => dispatch({
            type: "ADD_BBC_ARTICLES", payload: json
          }))
      }
    }

  export function fetchFoxArticles() {
      return dispatch => {
        dispatch({ type: "LOADING_FOX_ARTICLES"});
          return fetch(FOX_BACKEND_URL)
            .then(res => res.json())
            .then(json => dispatch({
              type: "ADD_FOX_ARTICLES", payload: json
            }))
        }
      }

  export function fetchCNNArticles() {
      return dispatch => {
        dispatch({ type: "LOADING_CNN_ARTICLES"});
          return fetch(CNN_BACKEND_URL)
            .then(res => res.json())
            .then(json => dispatch({
              type: "ADD_CNN_ARTICLES", payload: json
            }))
        }
      }

  export function fetchABCArticles() {
      return dispatch => {
        dispatch({ type: "LOADING_ABC_ARTICLES"});
          return fetch(ABC_BACKEND_URL)
            .then(res => res.json())
            .then(json => dispatch({
              type: "ADD_ABC_ARTICLES", payload: json
            }))
        }
      }
