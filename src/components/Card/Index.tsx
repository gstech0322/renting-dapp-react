import React, { Component } from 'react';
import './Card.scss';
import Images from '../../containers/Images/Image';
import { Card, Button, Container, Row } from 'react-bootstrap';
import Responsive from '../../Responsive/Responsive.css';



class Cards extends Component {
	public state: any;

    constructor(props) {
        super(props);
        this.state = {
           productArr: [1,2,3]
        };
    }

    render() {
        return (
        <div> 
       {this.state.productArr.map((element) => {  
                                return    
                               
                    
                             
               })}

        </div>
        );
    }
}




export default Cards;