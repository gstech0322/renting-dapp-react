import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Images from '../../containers/Images/Image';
import './HomeCategory.scss';


class HomeCategory extends Component {
    public state: any;

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div >
                <Row className="">
                    <Col lg={12}>
                        <div className='rent-desc-container'>
                            <div className='desc-text'>
                                <h4 className='better-txt-style'>Top Categories</h4>
                                <h5 className='sub-better-txt'>
                                     Renting Dapp is a smart contract which allows
                                    peers to exchange Using Era Swap Blockchain Network, to meet their renting or leasing
                                    requirements.   
                                </h5>
                            </div>
                        </div>

                    </Col>
                </Row>

                <Row className="mt40">
                    <Col lg={8}>
                        <div className='category-one-box mb20'>
                            <div className='hover-category'> Real Estate</div>
                            <img className='box-Img-one' src={Images.path.realEstate} />
                            <Link to='/allCategory'>  <div className='rentCategory-text'>
                                Real Estate
                                    </div> </Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='category-two-box mb20'>
                            <div className='hover-category'> Vehicles</div>
                            <img className='box-Img-two' src={Images.path.Vehicle} />
                            <div className='rentCategory-text'>
                                Vehicles
                                    </div>
                        </div>

                    </Col>
                    <Col lg={4}>
                        <div className='category-three-box mb20'>
                            <div className='hover-category'> Furnitures</div>
                            <img className='box-Img-three' src={Images.path.furniture} />
                            <div className='rentCategory-text'>
                                Furnitures
                                    </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='category-three-box mb20'>
                            <div className='hover-category'> Mobiles & Electronics</div>
                            <img className='box-Img-three' src={Images.path.mobile} />
                            <div className='rentCategory-text'>
                                Mobiles & Electronics
                                    </div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className='category-three-box mb20'>
                            <div className='hover-category'>Bikes</div>
                            <img className='box-Img-three' src={Images.path.bike} />
                            <div className='rentCategory-text'>
                                Bikes
                                    </div>
                        </div>
                    </Col>
                </Row>

                {/* <Container className='category-container'>
                        <div className='top-category-headin'>
                            <h5 className='top-categ-head'>Top Categories</h5>
                            <p>We provide full service at every step, and get better results for lower fees</p>
                        </div>
                        <div className='section-one-category'>
                            <div className='row'>
                                <Col sm={8}>
                                    <div className='category-one-box'>
                                        <div className='hover-category'> Real Estate</div>
                                        <img className='box-Img-one' src={Images.path.realEstate} />
                                        <Link to='/allCategory'>  <div className='rentCategory-text'>
                                            Real Estate
                                        </div> </Link>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div className='category-two-box'>
                                        <div className='hover-category'> Vehicles</div>
                                        <img className='box-Img-two' src={Images.path.Vehicle} />
                                        <div className='rentCategory-text'>
                                            Vehicles
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>
                        <div className='section-two-category'>
                            <div className='row'>
                                <Col>
                                    <div className='category-three-box'>
                                        <div className='hover-category'> Furnitures</div>
                                        <img className='box-Img-three' src={Images.path.furniture} />
                                        <div className='rentCategory-text'>
                                            Furnitures
                                        </div>
                                    </div></Col>
                                <Col><div className='category-three-box'>
                                    <div className='hover-category'> Mobiles</div>
                                    <img className='box-Img-three' src={Images.path.mobile} />
                                    <div className='rentCategory-text'>
                                        Mobiles
                                        </div>
                                </div></Col>
                                <Col><div className='category-three-box'>
                                    <div className='hover-category'>Bikes</div>
                                    <img className='box-Img-three' src={Images.path.bike} />
                                    <div className='rentCategory-text'>
                                        Bikes
                                        </div>
                                </div></Col>
                            </div>
                        </div>
                    </Container> */}
            </div>
        );
    }
}


export default HomeCategory;