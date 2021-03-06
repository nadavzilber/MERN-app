import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { numbers, letters, validateEmail, validateLength, validateSpacing, validateSpacePosition,isFormReady,addError, removeError } from '../utilities/ValidationHelpers';
//import Error from '../utilities/Error';
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux';
import {registerUser} from '../services/ApiService'

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
    
class Registration extends Component {
        constructor(props){
            super(props)
            this.state = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                formReady: false,
                // showError: {
                //     firstName: false,
                //     lastName: false,
                //     email: false,
                //     password: false
                //   },
                //   errorMsg: {
                //     firstName: '',
                //     lastName: '',
                //     email: '',
                //     password: ''
                //   },
            }
        }

    updateField = async (field, input) => {
      await this.props.setRegField({[field]: input}) //, formReady: false    
      //TODO: clean code
    }


    async componentDidUpdate () {
        let {firstName,lastName,email,password} = this.props.register.userData;
        let {formReady} = this.props.register
        if (firstName && lastName && email && password && !formReady) {
            await this.props.updateState({formReady: true})
        }
    }

    switchToLogin = async() => {
        await this.props.updateState({activePage: 'login'})
    }

    registrationSubmit = async(event) => {
      event.preventDefault();
      let response = await registerUser(this.props.register.userData)
      //if response is 200 then switch component to homepage
      if (response && response === 200){
        await this.props.updateState({activePage: 'homepage'})
      }
    }

 render () {
    const classes = {}//useStyles();
      return (
      <>
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          { <LockOutlinedIcon /> }
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Registration Page
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={this.props.register.userData.firstName}
                onChange={(e) => this.updateField('firstName',e.target.value)}
                autoFocus
              />
                {/* {this.state.showError.firstName &&
                    <Error errMsg={this.state.errorMsg.firstName}/>} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={this.props.register.userData.lastName}
                onChange={(e) => this.updateField('lastName',e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.props.register.userData.email}
                onChange={(e) => this.updateField('email',e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={this.props.register.userData.password}
                onChange={(e) => this.updateField('password',e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.registrationSubmit}
            disabled={!this.props.register.formReady}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={this.switchToLogin} variant="body2"> 
                *Already have an account? Sign in!
              </Link>
               {/* <span onClick={this.testFunc}>Switch!</span> */}
            </Grid>
          </Grid>
        </form>
      </div>
      </>
      )
}
}
// RegistrationPage.propTypes = {
//     classes: PropTypes.object.isRequired,
//     widgetstyle: PropTypes.object,
//     onUpdateDataFromChild: PropTypes.func,
//     onUpdateDataFromLastChild: PropTypes.func,
//     updateState: PropTypes.func,
//     updateCustomerData: PropTypes.func,
//     handleError: PropTypes.func,
//     app: PropTypes.object,
//     register: PropTypes.object
//   }
  
//   const mapStateToProps = state => {
//     return {
//       app: state.app,
//       register: state.register
//     }
//   }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       onUpdateDataFromChild: (data, step) => dispatch({ type: actionTypes.UPDATE_DATA_FROM_CHILD, data: data, step: step }),
//       onUpdateDataFromLastChild: (data, step) => dispatch({ type: actionTypes.UPDATE_DATA_FROM_LAST_CHILD, data: data, step: step }),
//       updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
//       updateCustomerData: (data) => dispatch({ type: actionTypes.UPDATE_CUSTOMER_DATA, payload: data }),
//       handleError: (data) => dispatch({ type: actionTypes.HANDLE_ERROR, payload: data })
//     }
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegistrationPage))
const mapStateToProps = state => {
  return {
    register: state.register,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    setRegField: (data) => dispatch({ type: actionTypes.SET_REGISTRATION_DATA, payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);