import * as actionTypes from '../actions'

  const initialState = {
    formReady: false,
    userData: {
  email: '',
  password: ''
    },
  }

let payload = {}

const LoginReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.UPDATE_STATE:
      payload = Object.entries(action.payload)
      payload.map((object) => {
        newState[object[0]] = object[1]
      })
      return newState

      case actionTypes.SET_LOGIN_DATA:
              newState.formReady = false;
              payload = Object.entries(action.payload)
              payload.map((object) => {
              newState.userData = {
                ...newState.userData,
                [object[0]]: object[1]
              }
            })
            return newState

    default: return state
  }
}

export default LoginReducer