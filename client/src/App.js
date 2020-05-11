import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import User from './pages/User';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions'
import {test} from './services/ApiService'

class App extends Component { //should this be a functional component? not sure
  constructor(props){
    super(props)
    this.state = {
      registered: false,
    }
  }

  /*
  TODO: 
  add a homepage component 
  it should be displayed when the user is logged in 
  (user will be logged after registration automatically)

  in the homepage component we should have: 
  logout button
  textfield input and a save button
  <TextField plaholder='Enter URL'> 
  <Button onClick={}>Add URL
  
  below that we should have a grid with all the videos that were pulled from the saved URLs
  */

  // toggleForm = async (switchTo) => {
  //  if (switchTo === 'login'){
  //    await this.setState({registered: true});
  //  } else if (switchTo === 'registration'){
  //   await this.setState({registered: false});
  //  }
  //  await this.props.updateState({nadav:true})
  // }

  render (){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Main App Container</h1>
        {this.props.app.activePage === 'homepage' && 
        <User {...this.props}/>}
        {/* {!this.state.registered && */}
        {this.props.app.activePage === 'registration' && 
        <Registration {...this.props}/>}
         {/* {this.state.registered && */}
         {this.props.app.activePage === 'login' && 
        <Login {...this.props}/>}
      </header>
    </div>
  );
}
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    addVideo: (data) => dispatch({ type: actionTypes.ADD_VIDEO, newVideo: data })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
//export default App;
