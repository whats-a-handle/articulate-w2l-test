import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import './App.css';
import './pages/styles/main.css';
import SignUpCard from './components/signUpCard/SignUpCard';
import PriceCard from './components/priceCard/PriceCard';
import Axios from 'axios';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      submitted : false,
      loading : true,
      pricing : {}    
    }

    this.setPricingStateTrue = this.setPricingStateTrue.bind(this);
  }
  
  setPricingStateTrue = () =>{
    this.setState({submitted:true});
  }
  showEnterprisePricing = (hasSubmitted) =>{
    if(hasSubmitted === true){
      return <PriceCard pricing={this.state.pricing.enterprise}/>;
    }
    
    return <SignUpCard 
              planName={'Enterprise'} 
              description={'Fill out this quick form to reveal pricing!'} 
              revealPricing={this.setPricingStateTrue}
            />;
  }

  getPricing = () =>{
    Axios.get('/pricing').then((response)=>{

      this.setState({pricing:response.data.pricing, loading:false});
      console.log('Pricing acquired.');
    }).catch((error)=>{
      console.log(`error: ${error}`);
    })
  }


  componentDidMount(){
    this.getPricing();
  }
  componentWillUnmount(){
  }

  
  render() {

    if(this.state.loading === true){
      return (
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={4}/>
              <Col xs={6} md={4}>
                <LoadingSpinner/>
              </Col>
              <Col xs={6} md={4}/>
            </Row>
          </Grid>
        </div>
      )
    }
    else{ 
      return (
        <div>
        <Grid>
          <Row>  
            <Col xs={6} md={4}>
              <PriceCard pricing={this.state.pricing.basic}/>
            </Col>          
            <Col xs={6} md={4}>
              <PriceCard pricing={this.state.pricing.standard}/>
            </Col>
            <Col xs={6} md={4}>
              {this.showEnterprisePricing(this.state.submitted)}
            </Col>
          </Row>
        </Grid>
        </div>

      );
    }
  }

}

export default App;
