import React, { Component } from 'react';
import './CategoryDetail.scss';
import Images from '../../containers/Images/Image';
import NavBar from '../../components/Header/NavBar';
import SideBar from '../../components/SideBar/Index';
import Footer from '../../components/Footer/Index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Carousel from "react-multi-carousel";
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Container, Button } from 'react-bootstrap';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';


class CategoryDetail extends Component {
	public state: any;
	public setState: any;

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showReviewModal: false
        };

    }

    handleClose = () => {
        this.setState({
            showModal: false,
            startDate:'',
            endDate:''
        })
    }

    handleReviewClose = () => {
        this.setState({
            showReviewModal: false,
        })
    }

    onChangeStart = startDate => this.setState({ startDate })
    onChangeEnd = endDate => this.setState({ endDate })

    render() {

        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        };

        return (
            <div>
                <NavBar />
                <div className='row'>
                    <div className='r-col-d-3'>
                        <SideBar />
                    </div>
                    <div className='r-col-d-7 '>
                        <div className='catg-detail-container'>
                            <h4>Casa Do Rio -Beach and Mountains</h4>
                            <div className='catg-detail-rate'><img className='rate-imgs' src={Images.path.orangeStar} />4.8</div>
                            <div className='catg-detail-pics'>
                                <img className='catg-big-img' src={Images.path.rlOne} />
                                <div className='catg-slider-detail'>

                                    <img className='catg-detail-img1' src={Images.path.rlTwo} />
                                    <img className='catg-detail-img1' src={Images.path.rlFour} />
                                    <img className='catg-detail-img1' src={Images.path.rlThree} />

                                </div>
                            </div>
                            <div className='check-catg-detail'>
                                <div className='category-heading-style'>
                                    <h5 className='heading-txt'>Entire cottage hosted by rui & Rosali</h5>
                                    <p className='heading-txt'>4 beds. 5guests</p>
                                </div>
                                <div className='check-container'>
                                    <div className='catg-amount'>ES 300/day </div>
                                    <button onClick={() => this.setState({ showModal: true })} className='check-button-style'>Check Availability </button>
                                </div>
                            </div>
                            <div className='catg-owner'>
                                <div className='owner-profile'>
                                    <img className='owner-img-style' src={Images.path.imgprf2} />
                                    <div className='chat-owner-holder'>
                                        <h5>Owned By Jessica</h5>
                                        <Link to='/ComingSoon'>  <div className='chat-btn-owner' >
                                            Chat with owner</div></Link></div>
                                </div>
                            </div>
                            <h5 className='catg-desc-txt'>Description</h5>
                            <p className='catg-desc-para'>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                            </p>
                            <div className='catg-review-container'>
                                <div className='review-rate-style'>
                                    <img className='rate-imgs' src={Images.path.orangeStar} />4.8<h5 className='review-heading-style'>50(reviews)</h5></div>
                                <div className='r-col-d-6'>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </div>
                                <div className='r-col-d-6'>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </div>

                                <div className='r-col-d-6'>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </div>

                                <div className='r-col-d-6'>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </div>
                                <h5 className='review-btn-toggle' onClick={() => this.setState({ showReviewModal: true })}>Show All Reviews</h5>
                            </div>
                        </div>
                    </div>
                    <div className='r-col-d-2'>
                    </div>
                </div>
                <div className='footer-bgd'>
                    <div className='wrapper-container'>
                        <Footer />
                    </div>
                </div>
                {/* Bootstrap Modal */}
                <Modal size="lg" show={this.state.showModal} onHide={this.handleClose} className="date-modal-container" >
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body >
                        <Row className="show-grid date-content">
                            <Calendar
                                onChange={this.onChangeStart}
                                value={this.state.startDate}
                            />
                            {console.log(this.state.startDate)}
                            <Calendar
                                onChange={this.onChangeEnd}
                                value={this.state.endDate}
                            />
                            <div className='show-dates'>
                                <p className='date-catg-head'> Casa DE Rio</p>
                                <div className="date-input-container">
                                    <input type="text" class="form-control start-input" id="inputKey" placeholder="Start Date" value={this.state.startDate} />
                                    <input type="text" class="form-control" id="inputValue" placeholder="End Date" value={this.state.endDate} />
                                </div>
                                <p className='green-date'> Available on the selected date</p>
                                <p className='red-date'> Not Available on the selected date</p>
                                <button className="date-proceed">Proceed</button>
                            </div>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                {/* Bootstrap Modal two */}
                <Modal size="lg" show={this.state.showReviewModal} onHide={this.handleReviewClose}>
                    <Modal.Header closeButton>
                        <img className='rate-imgs' src={Images.path.orangeStar} />4.8<h5 className='review-heading-style'>50(reviews)</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="show-grid">
                                <Col sm={6}>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className='user-review'>
                                        <div className='user-detail-container'>
                                            <img className='user-img-style' src={Images.path.imgprf2} />
                                            <div>
                                                <h5>Jessica Does</h5>
                                                <p className='review-date-txt'>March 2020</p>
                                            </div>
                                        </div>
                                        <p>Thank you ,We loved our stay,stunning place </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}




export default CategoryDetail;