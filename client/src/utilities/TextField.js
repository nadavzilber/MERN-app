import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
  export default function UncontrolledTextField(props) {
    const [value, setValue] = React.useState('')
  
    const classes = useStyles();

    const onValueChange = async(newValue) => {
        setValue(newValue)
    }

    const submitValue = async(event) => {
      event.preventDefault();
        props.addValue(value)
        setValue('')
    }

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div>

          <TextField
            id="standard-search"
            label={props.label}
            type="search"
            className={classes.textField}
            margin="normal"
            //placeholder={props.placeholder}
            onChange={(e)=>onValueChange(e.target.value)}
            value={value}
          />
          <Button onClick={submitValue}>
                        Add URL
          </Button>
          
        </div>
      </form>
    );
  }