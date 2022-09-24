import React, { Component } from 'react';
import './ComingSoon.scss';
import Images from '../../containers/Images/Image';
import NavBar from '../Header/NavBar';
import Responsive from '../../Responsive/Responsive.css';
import Footer from '../Footer/Index';
import { Link,Route } from 'react-router-dom';



class ComingSoon extends Component {
	public state: any;

    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        return (
            <div>
                <NavBar />
                <div className='comin-soon-container'>
                  <img className='comin-img' src={Images.path.comingsoon} alt='coming-soon' />
                </div>
                <h1 className='comimg-txt'>dApp in Making</h1>
                <div className='dwnld-main'>
                <a href='https://play.google.com/store/apps/details?id=com.eraswaponeapp&hl=en' className ='coming-home'>Download 1DAAP</a>
                </div>
                <div className='footer-bgd'>
                    <div className='wrapper-container'>
                        <Footer />
                  </div>
                </div>
            </div>
        );
    }
}




export default ComingSoon;