import * as actionTypes from '../actions'

const initialState = {
  pageReady: false,
  registered: false,
  activePage: 'registration',
  userVideos: ['one','two'],
  pendingVideo: ''
  //showLoader: true,
  //widgetstyle: {},
  //validToken: false,
  //sessionToken: '',
  //pageToken: '',
  //clientLocation: {},
  //openDialog: false,
  //dialogMsg: ''
}

let payload = {}

const AppReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {

    case actionTypes.UPDATE_STATE:
      payload = Object.entries(action.payload)
      console.log('UPDATE_STATE payload:',payload);
      payload.map((object) => {
        newState[object[0]] = object[1]
      })
      return newState

      case actionTypes.SET_LOGIN_DATA:
          newState.formReady = false;
          payload = Object.entries(action.payload)
          console.log('SET_LOGIN_DATA payload:',payload);
          payload.map((object) => {
          newState.userData = {
            ...newState.userData,
            [object[0]]: object[1]
          }
        })
        return newState

      case actionTypes.ADD_VIDEO:
      //payload = Object.entries(action.newVideo)
      console.log('ADD_VIDEO action:',action);
      newState.pendingVideo = '';
      return { 
        ...newState,
        userVideos: [...newState.userVideos, action.newVideo]
    }

    default: return state
  }
}

export default AppReducer