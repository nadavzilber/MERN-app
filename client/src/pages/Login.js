import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as actionTypes from '../store/actions'
import { connect } from 'react-redux';
import {login} from '../services/ApiService' 

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
  
    
class Login extends Component {
        constructor(props){
            super(props)
            this.state = {
                email: '',
                password: '',
                formReady: false
            }
        }

    updateField = async (field, value) => {
        await this.props.setLoginField({[field]: value})
    }

    async componentDidUpdate () {
        let {email,password} = this.props.login.userData;
        let {formReady} = this.props.login;
        if (email && password && !formReady) {
            await this.props.updateState({formReady: true})
        }
    }

    switchToRegistration = async() => {
      await this.props.updateState({activePage: 'registration'})
      //await this.props.newUser('registration')
  }

  loginSubmit = async(event) => {
    event.preventDefault();
    //console.log('this.props.login.userData:',this.props.login.userData)
    let response = await login(this.props.login.userData)
    //let response = await loginTest(this.props.login.userData)
    //if response is 200 then switch component to homepage
    if (response && response.status === 200){
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
          Login Page
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.props.login.userData.email}
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
                value={this.props.login.userData.password}
                onChange={(e) => this.updateField('password',e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.loginSubmit}
            disabled={!this.props.login.formReady}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={this.switchToRegistration} variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </>
      )
}
}

const mapStateToProps = state => {
  return {
    login: state.login,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: (data) => dispatch({ type: actionTypes.UPDATE_STATE, payload: data }),
    setLoginField: (data) => dispatch({ type: actionTypes.SET_LOGIN_DATA, payload: data })
  }
}

// LoginPage.propTypes = {
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
  
//   export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage))

export default connect(mapStateToProps, mapDispatchToProps)(Login);