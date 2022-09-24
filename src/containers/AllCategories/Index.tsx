import React, { Component } from 'react';
import './AllCategories.scss';
import Images from '../../containers/Images/Image';
import NavBar from '../../components/Header/NavBar';
import SideBar from '../../components/SideBar/Index';
import ListPage from '../ListPage/Index';
import Footer from '../../components/Footer/Index';
import { Link,Route } from 'react-router-dom';



class AllCategories extends Component {
	public state: any;
	public props: any;

    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        return (
            <div>
                <NavBar />
                <div className='row'>
                    <div className='r-col-d-3'>
                        <SideBar parentProps={this.props} />
                    </div>
                    <div className='r-col-d-7 category-cards'>
                       <Link to='/categoryDetail'><ListPage/> </Link>
                    </div>
                    <div className='r-col-d-2'>
                    </div>
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




export default AllCategories;