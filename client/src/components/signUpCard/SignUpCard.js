import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  cardContent : {
    justifyContent : 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 3,
  },
  secondary :{
    fontSize : 11,
  }
});

class SignUpCard extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        firstName :'',
        lastName : '',
        email: '',
        company : '',
        firstNameValidated :'error',
        lastNameValidated : 'error',
        emailValidated : 'error',
        companyValidated : 'error',        
        
      };
      
    }
    
    validateName(){
      //console.log('val before: ' + this.state.firstName.length + this.state.firstName);
      if(this.state.firstName.length > 0 ){
        this.setState({firstNameValidated: 'success'})
        //console.log(this.state.firstNameValidated);
      }
      else{
          this.setState({firstNameValidated:'error'})
        //  console.log(this.state.firstNameValidated);
      }
      
      if(this.state.lastName.length > 0){
        this.setState({lastNameValidated:'success'});
      }
      else{
        this.setState({lastNameValidated:'error'});
      }
    }
    validateCompany(){
      if(this.state.company.length > 0){
        this.setState({companyValidated:'success'});
      }
      else{
        this.setState({companyValidated:'error'});
      }
    }

    validateEmailAddress(){
      const emailAddressLength = this.state.email.length;
      if(emailAddressLength >= 1){
        this.setState({emailValidated:'success'})

      }
      else{
        this.setState({emailValidated:'error'})
      }
    }

    allowSubmit(){
     if(this.state.emailValidated === 'success' &&
      this.state.companyValidated ==='success' && 
      this.state.firstNameValidated ==='success' && 
      this.state.lastNameValidated==='success'){
       return true;
     } 
     return false;
    }

    postToSalesforce = (allowSubmit) =>{

      if(allowSubmit){

        const data = {
          first_name: this.state.firstName,
          last_name : this.state.lastName,
          webToLeadURL : this.state.webToLeadURL,
          company : this.state.company,
          email : this.state.email,
        }
        axios({
          method: 'post',
          url: '/submit',
          data: data,
          })
          .then( (response) => {
              //handle success
              console.log('SUCCESS');
              console.log(response);
              this.props.revealPricing();
          })
          .catch( (error) => {
              //handle error
              console.log(error);
          });

      }
      else{
        console.log('not all validations met');
      }
      
    }

  
    handleChange(e) {
      this.setState({ [e.target.name] : e.target.value });
      this.validateName();
      this.validateCompany();
      this.validateEmailAddress();
    }
    
   
   
    handleClick(e){
      e.preventDefault();
      this.postToSalesforce(this.allowSubmit());
      
    }

    checkState(e){
      e.preventDefault();
      console.log(this.state);
    }
    
    componentDidMount(){
      
    }

    render() {
      const { classes } = this.props;
      return (
        <form className={classes.container} noValidate autoComplete="off">
         <Card className={this.props.classes.card}>
          <CardContent >  
          <Typography variant="h5" component="h2">
              {this.props.planName}
          </Typography>
          <Typography className={this.props.classes.secondary}  color="textSecondary">
          {this.props.description}
          </Typography>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange}
              margin="normal"

            />

            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange}
              margin="normal"
            />

            <TextField
              id="company"
              label="Company"
              name="company"
              className={classes.textField}
              value={this.state.company}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="contained" onClick={this.postToSalesforce}>Submit</Button>
          </CardActions>

        </Card>
      </form>
      );
    }
  }
  SignUpCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(SignUpCard);
  
 
