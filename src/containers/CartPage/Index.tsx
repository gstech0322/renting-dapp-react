import React, { Component } from 'react';
import './CartPage.scss';
import '../CategoryDetail/CategoryDetail.scss';
import Images from '../../containers/Images/Image';
import NavBar from '../../components/Header/NavBar';
import SideBar from '../../components/SideBar/Index';
import Footer from '../../components/Footer/Index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Modal from 'react-bootstrap/Modal';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class CartPage extends Component {
	public state: any;
	public setState: any;

    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

    }

    handleClose = () => {
        this.setState({
            showModal: false,
            showDeleteModal:false,
            startDate:'',
            endDate:''
        })
    }


    //@ts-ignore
    onChangeStart = startDate => this.setState({ startDate })
      //@ts-ignore
    onChangeEnd = endDate => this.setState({ endDate })


    render() {
        return (
            <div>
                <NavBar />
               <div className='cart-wrapper-container'>
                   <div  className='row'>
                <div className='r-col-d-1'></div>
                   <div className='r-col-d-6'>
                   <h4>My Saved Products</h4>
                       <div className='product-container'>
                       <img className='prod-img-style' src={Images.path.rlFour} />
                       <div className='prod-detail-container'>
                       <h5 className='prod-title-style'>Casa da rio Beach Mountains</h5>
                       <p className='amount-prod-style'>ES 300/per-day</p>
                       <div className='prod-dates'>
                           <div className='prod-booked-from'>Booked From <p className='date-styling'>20/3/2020</p></div>
                           <div className='prod-booked-to'>To <p className='date-styling'>20/3/2020</p></div>
                           <div className='change-style' onClick={() => this.setState({ showModal: true })}>Change Date  
                           </div> <FontAwesomeIcon icon={faTrashAlt} color='#A7A7A7' onClick={() => this.setState({showDeleteModal: true})} />
                         </div>
                        </div>
                       </div>

                       <div className='product-container'>
                       <img className='prod-img-style' src={Images.path.rlFour} />
                       <div className='prod-detail-container'>
                       <h5 className='prod-title-style'>Casa da rio Beach Mountains</h5>
                       <p className='amount-prod-style'>ES 300/per-day</p>
                       <div className='prod-dates'>
                           <div className='prod-booked-from'>Booked From <p className='date-styling'>20/3/2020</p></div>
                           <div className='prod-booked-to'>To <p className='date-styling'>20/3/2020</p></div>
                           <div className='change-style' onClick={() => this.setState({ showModal: true })}>Change Date   
                         </div>
                         <FontAwesomeIcon icon={faTrashAlt} color='#A7A7A7' onClick={() => this.setState({showDeleteModal: true})} />
                         </div>
                        </div>
                       </div>
                       
                   </div>
                   <div className='r-col-d-4'><h4 className='cart-order-summary'>OrderSummary</h4>
                   <div className='order-summary-detail'>
                   <div className='order-container'>
                       <p className='order-txt-style'>Casa da rio Beach Mountains</p>
                       <p className='order-txt-style'>ES 300/per-day</p>
                       <p className='order-date-style'>20/03/2020 to 25/03/2020</p>
                       </div>
                       <div className='order-container'>
                       <p className='order-txt-style'>Air Cooler 35L</p>
                       <p className='order-txt-style'>ES 300/per-day</p>
                       <p className='order-date-style'>20/03/2020 to 25/03/2020</p>
                       </div>
                       <div className='total-order'>
                           <h5>Total</h5>
                           <h5>60 ES</h5>
                       </div>
                      <div className='btn-container-order'> <button className='proceed-btn-style'>Proceed</button></div>
                      </div>
                   </div>
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

                  {/* Bootstrap Modal */}
                  <Modal 
                 show={this.state.showDeleteModal}
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
                <Button variant="secondary" className='delete-btn' onClick={() => this.setState({showDeleteModal: false})}>
                  Yes
                </Button>
                <Button variant="primary" className='delete-btn' onClick={() => this.setState({showDeleteModal: false})}>
                  No
                </Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}




export default CartPage;