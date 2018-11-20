import React, { Component } from 'react';
import Spinner from '../../assets/spinner.gif';

class LoadingSpinner extends Component{
    render(){
        return(<div>

            <img  alt="yo" src={Spinner} />


        </div>
        
        );
    }
}

export default LoadingSpinner;