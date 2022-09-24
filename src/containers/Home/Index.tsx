import React, { Component } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselPage from '../../components/Carousel/Index';
import Footer from '../../components/Footer/Index';
import Header from '../../components/Header/Index';
// import Navbar from '../../components/Header/NavBar';
// import Responsive from '../../Responsive/Responsive.css';
import HomeCategory from '../../components/HomeCategory/Index';
import Images from '../../containers/Images/Image';
import './Home.scss';
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
const queryString = require("query-string");

class Home extends Component {
    public state: any;
	public handleInputChange: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            country: '',
            region: '',
            showCountry: true,
            currentCategory: 0,
            currentSubCategory: 0,
            categoryArr: [
                {
                  id: 1,
                  cat: "Real Estate",
                  sub: [
                    "For Sale Houses & Appartments",
                    "For Rent Houses & Appartments",
                    "Lands & Plots",
                    "Shops & Offices",
                    "PG 7 Guests",
                    "For Sale Houses & Appartments",
                  ],
                },
                {
                  id: 2,
                  cat: "Vehicle",
                  sub: ["Cars", "Commercial Vehicles", "Spare Parts", "Other Vehicles"],
                },
                {
                  id: 3,
                  cat: "Electronics & Appliances",
                  sub: [
                    "TV-Video-Audio",
                    "Kitchen & Other Appliances",
                    "Computers & Laptops",
                    "Cameras & Lenses",
                    "Games & Entertainment",
                    "Fridges",
                    "Computer Accessories",
                    "Hard Disks,Printers & Monitors",
                    "Acs",
                  ],
                },
                {
                  id: 4,
                  cat: "Mobiles & Electronics",
                  sub: [
                    "Smart Phones: Android",
                    "Smart Phones: iPhone",
                    "Camera Phones",
                    "Music Phones",
                    "Feature Phones",
                  ],
                },
                {
                  id: 5,
                  cat: "Furniture",
                  sub: [
                    "Sofa",
                    "Tables",
                    "Chairs/ Stools/ Benches",
                    "Beds",
                    "Bean Bags",
                    "Cupboard/ Cabinet/ Wardrobe",
                    "TV Unit",
                    "Shoe Rack",
                    "Others",
                  ],
                },
                {
                  id: 6,
                  cat: "Bikes",
                  sub: [
                    "Standard",
                    "Sport Bike",
                    "Touring Bike",
                    "Scooters, underbones and mopeds",
                    "Offroad Bike",
                    "Others",
                  ],
                },
              ],
        };
    }
    
    selectCountry (val: any) {
        this.setState({ country: val ,showCountry:false});
      }
     
    selectRegion (val: any) {
        this.setState({ region: val });
    }


    render() {
        const category = this.state.currentCategory
        const realStateImg = '/img/real-state.jpg'
        const bike = '/img/bike.jpg'
        const vehicle = '/img/vehicle.jpg'
        const electronic = '/img/electronic.jpg'
        const mobile = '/img/mobile.jpg'
        const furniture = '/img/furniture.jpg'

        return (
            <div>
                <div className='rental-hero-bgd' style={{backgroundImage:`url(${category == 0 && realStateImg || category == 1 && vehicle || category == 2 && electronic || category == 3 && mobile || category == 4 && furniture || category == 5 && bike })`}} >
                    <div className='wrapper-container'>
                        <Header />
                        <div className='buy-main-container'>
                            <h4 className='hero-txt-style'>Rent &amp; Lease anything Peer to Peer </h4>
                            <br/>
                            <div className='main-rent-search'>
                                <Form>
                                    <Form.Row className="align-items-center">
                                        {/* @ts-ignore */}
                                        <Col xs="{auto}" className="my-1">
                                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                                Preference
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="mr-sm-2 search-field"
                                                id="inlineFormCustomSelect"
                                                onChange={(e) => {this.setState({currentCategory: e.target.value})}}
                                                custom
                                            >
                                                <option value={0}>Real Estate</option>
                                                <option value={1}>Vehicle</option>
                                                <option value={2}>Electronics & Appliances</option>
                                                <option value={3}>Mobiles </option>
                                                <option value={4}>Furniture</option>
                                                <option value={5}>Bikes</option>
                                            </Form.Control>
                                        </Col>

                                        {/* @ts-ignore */}
                                        <Col xs="{auto}" className="my-1">
                                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" onChange={this.handleInputChange}  srOnly>
                                                Preference
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="mr-sm-2 search-field"
                                                id="inlineFormCustomSelect"
                                                onChange={(e) => {this.setState({currentSubCategory: e.target.value})}}
                                                custom
                                            >
                                                {
                                                    this.state.categoryArr[this.state.currentCategory].sub.map((item: React.ReactNode, i: string | number | readonly string[] | undefined) => (
                                                        <option value={i}> {item} </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>  

                                        <Col xs="auto" className="my-1">
                                            <button className="search-rent-btn position-relative">
                                                <Link 
                                                    to={`/search?${queryString.stringify({
                                                    category: this.state.categoryArr[this.state.currentCategory].cat,
                                                    subCatergory: this.state.categoryArr[this.state.currentCategory].sub[this.state.currentSubCategory],                                               
                                                    id: '' + this.state.categoryArr[this.state.currentCategory].id + '_' + this.state.currentSubCategory
                                                    })}`}
                                                    className="search-rent-btn stretched-link"
                                                >
                                                    Search Now <i className="fa fa-search ml-2" aria-hidden="true"></i>
                                                </Link>
                                            </button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                {/*<div className='search-btn-container'>
                                    <a href=''>
                                        <button  className='search-rent-btn'>
                                            Search Now 
                                        </button> 
                                    </a>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <section className='homeCateg-bgd pt-5'>
                    <Container>
                        <h3 className='better-txt-style text-center'>Recommendations For You.</h3>
                        <p className='homeCateg-subtitle text-center' >Scroll towards right to view latest listing</p>
                        
                        <Row>
                            <Col lg={12}> <CarouselPage /></Col>
                        </Row>
                    </Container>
                </section>
               
                
                <section className='desc-bgd-color mt60 mb60'>
                        <Container>
                            <Row>
                                <Col lg={12}>
                                <div className='rent-desc-container'>
                                    <div className='desc-text'>
                                        <h4 className='better-txt-style'>Rent & Lease Hassle-free</h4>
                                        <h5 className='sub-better-txt'>We provide you full service at every step,and get better results for Lower fees</h5>
                                    </div>
                                </div>
                                </Col>
                        </Row>
                        
                        <Row className="mt40 rent">
                        <Col lg={4}>
                                    <div className='better-container mb20'>
                                        <div className='Img-container'>
                                            <img className='box-Img2-style' src={Images.path.centralWhite} />
                                        </div>
                                        <div className='box-utility'>
                                            <h5 className='utility-title'>No central Authority</h5>
                                            <p className='util-content'>With the implementation of Era Swap Network
                                                Blockchain, RentingDapp Smart Contract insures middlemen free Peer to Peer Exchange
                                                &amp; Stores No personal data.
                                             </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} >
                                   <div className='better-container mb20'>
                                        <div className='Img-container'>
                                            <img className='box-Img2-style' src={Images.path.transWhite} />
                                        </div>
                                        <div className='box-utility'>
                                            <h5 className='utility-title'>PEER-TO-PEER</h5>
                                            <p className='util-content'>
                                               Exchange your Product &amp; Services in peer-to-peer mode using Smart Contracts and Era Swap
                                               Blockchain, without any multi-layer middlemen charges. Right Place for you to rent and
                                               lease in a P2P Environment
                                            </p>
                                        </div>
                                    </div>  
                                </Col>

                                <Col lg={4}>
                                    <div className='better-container mb20'>
                                        <div className='Img-container'>
                                            <img className='box-Img3-style' src={Images.path.rentWhite} />
                                        </div>
                                        <div className='box-utility'>
                                            <h5 className='utility-title'>  Rent & Book Anything</h5>
                                            <p className='util-content'>you can rent and book anything using EraSwap
                                                    (ES) Utility Token. ES is a decentralized utility Token used on multiple Dapp&#39;s in EraSwap
                                                  Eco System (eraswap.life)</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
              </section>
                
                <section className='homeCateg-bgd'>
                    <Container className='pdt40 pdb40'>
                       <HomeCategory />
                    </Container>
                </section>

                <section id="video" className="main-section center-align pt-5">
                    <div className="container mt60 mb60 m-auto">
                        <h3 className="reflection-text reflection-text-white ">Watch Video</h3>
                        <p className="p-t-1 "> Watch this video to know more about <b>RentingDapp</b> </p>

                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AUYopnXW6xM?start=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    </div>
                </section>
              
                <div className='footer-bgd'>
                    <div className='wrapper-container'>
                        <Footer />
                    </div>
                </div>
            </div>

        );

    }
}


export default Home;