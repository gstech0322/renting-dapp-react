import React, { Component } from 'react';
import './SearchedProducts.scss';
import NavBar from '../../components/Header/NavBar';
import Footer from '../../components/Footer/Index';
import Images from '../../containers/Images/Image';
//import Responsive from '../../Responsive/Responsive.css';
import { Col, Container, Row, Card } from 'react-bootstrap';
import ethers from 'ethers';
import {Link} from 'react-router-dom';


class SearchedProducts extends Component {
	public state: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            allProduct: [],
        };

    }

    getProduct = async () => {
        const categoryId = new URLSearchParams(this.props.location.search).get("id");
        const filter = window.rentingDappInstance.filters.ProductDetails(null,null,null,null,null,null,null,null,ethers.utils.formatBytes32String(categoryId), null);
        const logs = await window.rentingDappInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => window.rentingDappInstance.interface.parseLog(log));
        const productAll = parseLogs.map(ele => ele.args);
        console.log("All :",productAll)
        this.setState({...this.state , allProduct : productAll})
        return productAll;
    }

    async componentDidMount() {
        this.getProduct();
    }

    render() {
        return (
            <div>
                <NavBar />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className='myListing-wrapper-container'>
                    <div className="row">
                    {
                        this.state.allProduct.map((ele: React.ReactNode[]) => {
                        return <div className='r-col-d-4 position-relative'>
                            <div className='card-category-container'>

                                <div className='overflow'>
                                    <img className='catg-imgs' src={Images.path.itemOne} />
                                </div>

                                <div>
                                    <p><Link className='catg-body-txt stretched-link' to={'/Product/'+ele[1]}>{ele[2]}</Link></p>
                                    {/*<div className='catg-rating'><img className='rate-imgs' src={Images.path.orangeStar} />4.5</div>*/}
                                </div>

                                <p className='location-catg'>Description: {ele[3]}</p>
                                
                                <div className='catg-body-txt'>
                                    <p>Address: {ele[4]}</p>
                                </div>
                                
                                <div className='catg-body-txt'>
                                    <p>Rent: {ethers.utils.formatEther(ele[5])} ES</p>
                                </div>
                                <p className='location-catg'>Security Fee: {ethers.utils.formatEther(ele[6])} ES</p>
                                <p className='location-catg'>Cancellation Fee: {ethers.utils.formatEther(ele[7])} ES</p>

                            </div>
                        </div>
                        })
                    }    
                    </div>                
                </div>
                <br/>
            <br/>
            <br/>
            <div className='footer-bgd'>
                <div className='wrapper-container'>
                    <Footer />
                </div>
            </div>
            </div>

        );
    }
}

export default SearchedProducts;