import ethers from 'ethers';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
//import Responsive from '../../Responsive/Responsive.css';
import NavBar from '../../components/Header/NavBar';
import Images from '../Images/Image';
import './MyListing.scss';

class MyListing extends Component {
	public state: any;
	//public setState: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            showModal: false,
            allProduct: []
        };
    }

    getProduct = async () => {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const filter = window.rentingDappInstance.filters.ProductDetails(window.wallet.address,null,null,null,null,null,null,null,null,null);
        const logs = await window.rentingDappInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => window.rentingDappInstance.interface.parseLog(log));
        var productAll = parseLogs.map(ele => ele.args);

        var displayProducts = [];


        for(var i=0; i<productAll.length; i++)
        {
            var status = await window.rentingDappInstance.isAvailable(productAll[i][1]);
            if(status === true)
            {
                displayProducts.push(productAll[i]);
            }
        }


        this.setState({ ...this.state, allProduct: displayProducts });
        console.log(displayProducts)

        return displayProducts;
    }

    async componentDidMount() {
        this.getProduct();
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
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
                    {
                        this.state.allProduct.map((ele: React.ReactNode[]) => {
                            const strArray = ele[10]
                            const imgArray = strArray?.replace(/\[|\]/g, "").split(',')
                            
                            const imageOne = imgArray[0].replace(/['"]+/g, '')
                            const imageTwo = imgArray[1].replace(/['"]+/g, '')
                            const imageThree = imgArray[2].replace(/['"]+/g, '')
                            const imageFour = imgArray[3].replace(/['"]+/g, '')

                           return  <div className='row listing-border position-relative'>
                               <div className='r-col-d-4'>

                                    <div className='section1-listing'>
                                        <img className='listing-main-img' src={imageOne} />
                                        <img className='listing-small-img' src={imageTwo} />
                                        <img className='listing-small-img' src={imageThree} />
                                        <img className='listing-small-img' src={imageFour} />
                                    </div>
                                </div>
                                <div className='r-col-d-8'>
                                    <div className='section2-listing'>
                                        <h5><Link className='stretched-link listing-head' to={'/MyProduct/'+ele[1]}>{ele[2]}</Link></h5>
                                        {/* @ts-ignore */}
                                        <div className='desc-para'>Rent: {ethers.utils.formatEther(ele[5])} ES</div>
                                        {/* @ts-ignore */}
                                        <div className='desc-para'>Security Fee: {ethers.utils.formatEther(ele[6])} ES</div>
                                        {/* @ts-ignore */}
                                        <div className='desc-para'>Cancellation Fee: {ethers.utils.formatEther(ele[7])} ES</div><br/>
                                        {/* @ts-ignore */}
                                        <div className='desc-para'>Promotional Incentive Offered : loading...</div><br/>
                                        {/* @ts-ignore */}
                                        <div className='desc-para'>Available Discounts : loading...</div><br/>


                                        <h5 className='desc-head'>Description</h5>
                                        <p className='desc-para'>{ele[3]}</p>
                                        <h5 className='desc-head'>Address</h5>
                                        <p className='desc-para'>{ele[4]}</p>
                                        <p className='desc-para'>Listed on: {((new Date(Number(ele[9]))).toString()).split("GMT+0530 (India Standard Time)")}</p>
                                        {/*<div className='two-btn-container'>
                                            <button className='listing-edit'>Edit</button>
                                            <button onClick={() => this.setState({showModal: true})} className='listing-delete'>Delete</button>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
               
                <div className='footer-bgd'>
                    <div className='wrapper-container'>
                        <Footer />
                    </div>
                </div>
                
                 {/* Bootstrap Modal */}
                 <Modal 
                 show={this.state.showModal}
                 onHide={this.handleClose}
                 aria-labelledby="contained-modal-title-vcenter"
                 centered
                 >
                <Modal.Header closeButton>
                <Modal.Title> <div className='rentDaap-header-logo'> 
                 <img className='rentDaap-Img-modal'  src={Images.path.logocolor} />
                 </div></Modal.Title>
                </Modal.Header>
                <Modal.Body> <div className='listing-txt-modal'>Do You want to Delete this listing</div></Modal.Body>
                <Modal.Footer className='delete-footer'>
                <Button variant="secondary" className='delete-btn' onClick={() => this.setState({showModal: false})}>
                  Yes
                </Button>
                <Button variant="primary" className='delete-btn' onClick={() => this.setState({showModal: false})}>
                  No
                </Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}




export default MyListing;