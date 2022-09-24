import { ethers } from 'ethers';
import React, { Component } from 'react';
//import Responsive from '../../Responsive/Responsive.css';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
import NavBar from '../../components/Header/NavBar';
import Images from '../../containers/Images/Image';
import './MyAccount.scss';


class MyAccount extends Component {
    public state: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            allProduct: [],
            allOrders: [],
            balance: null,
        };

    }

    getProduct = async () => {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const filter = window.rentingDappInstance.filters.ProductDetails(window.wallet.address, null, null, null, null, null, null, null, null, null);
        const logs = await window.rentingDappInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => window.rentingDappInstance.interface.parseLog(log));
        const productAll = parseLogs.map(ele => ele.args);
        console.log("All :", productAll)
        this.setState({ ...this.state, allProduct: productAll })
        return productAll;
    }

    fetchData = async () => {
        var orders = [];
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const userId = ''+window.wallet.address+'store';
        orders = ( JSON.parse(localStorage.getItem(JSON.stringify(userId))) );

        console.log(orders)

        if(orders === null)
            return;
        this.setState({ ...this.state, allOrders: orders});
    }

    fetchBalance = async() => {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        
        const balance = await window.provider.getBalance(window.wallet.address);
        
        this.setState({balance});
    }

    async componentDidMount() {
        this.getProduct();
        this.fetchData();
        this.fetchBalance();
    }

    render() {
        return (
            <div>
                <NavBar />

                <section className="mt100 pdt20 my-account">
                    <Container >
                        <Row>
                            <Col lg={12}>
                                <h4>My Account</h4>
                            </Col>
                        </Row>
                        <hr />

                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                            <Row>
                                <Col sm={3} className="mb20">
                                    <Nav variant="pills" className="flex-column tab-com">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first" className="list-group-item list-group-item-action">My Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second" className="list-group-item list-group-item-action">My Orders</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third" className="list-group-item list-group-item-action mb20">My Listings</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Row>
                                                <Col lg={12} style={{textAlign: "center"}}>
                                                    {/*<Card className="text-center" >
                                                        <Card.Body>*/}
                                                            <Card.Text>
                                                                <img src={Images.path.defaultProfile} className="img-circle avatar" alt="User avatar" />
                                                            </Card.Text>

                                                            <Button variant="primary">Change Photo</Button>
                                                            <br/><br/>
                                                            
                                                            <div className="yourwallet ">
                                                                <h5 className="feature-head text-left"> Account address</h5>
                                                                <div className="wallet-address">{window.wallet.address}</div>
                                                             </div>
                                                             <div className="yourwallet ">
                                                                <h5 className="feature-head text-left">Balance</h5>
                                                                <div className="wallet-address">{this.state.balance!==null ? ethers.utils.formatEther(this.state.balance) : "Loading..."} ES</div>
                                                             </div>
                                                             <div className="yourwallet ">
                                                                <h5 className="feature-head text-left">KYC Level</h5>
                                                              </div>
                                                        {/*</Card.Body>

                                                        </Card>*/}
                                                </Col>

                                            </Row>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="second">
                                            <Row>
                                                {
                                                    this.state.allOrders.map((ele: React.ReactNode[]) => {
                                                        return <Col lg={6}>
                                                                    <div className="card-category-container">
                                                                        <div className="overflow">
                                                                            <img className="catg-imgs" src={ele?.images ? ele.images[0] : Images.path.noPreview} />
                                                                        </div>

                                                                        <div className='card-category-body' >
                                                                            <div className='title' ><p> <Link to={'/Product/'+ele.address}> {ele.title}</Link></p></div>

                                                                            <p className='desc my-3' > <strong> Description: </strong> {ele.description}</p>
                                                                            
                                                                            <p> <strong> Address: </strong> {ele.location}</p>
                                                                            <p> <strong>Rent:</strong> {ele.rent} ES</p>
                                                                            <p> <strong> Security Fee: </strong> {ele.security} ES</p>
                                                                            <p> <strong> Cancellation Fee: </strong> {ele.cancellation} ES</p>
                                                                            <br/>
                                                                            <p className='mb-2' > <strong> Booked on: </strong> {((new Date(Number(ele.bookingDate))).toString()).split("GMT+0530 (India Standard Time)")}</p> 
                                                                            <p className='mb-2' > <strong> Starts on: </strong> {((new Date(Number(ele.startDate)*1000)).toString()).split("GMT+0530 (India Standard Time)")}</p>
                                                                            <p className='mb-2' > <strong> Ends on: </strong> {((new Date(Number(ele.endDate)*1000)).toString()).split("GMT+0530 (India Standard Time)")}</p>                                                                            
                                                                        </div>    
                                                 
                                                                    </div>
                                                                </Col>
                                                    })
                                                }

                                            </Row>
                                        </Tab.Pane>


                                        <Tab.Pane eventKey="third">
                                            <Row>
                                                {
                                                    this.state.allProduct.map((ele: React.ReactNode[]) => {
                                                        const strArray = ele[10]
                                                        const imgArray = strArray.replace(/\[|\]/g,"").split(',')
                                                        const image = imgArray[0].replace(/['"]+/g, '')

                                                        return <Col lg={6}>
                                                                <div className="card-category-container">
                                                                    <div className="overflow">
                                                                        <img className="catg-imgs" src={image ? image : Images.path.noPreview} />
                                                                    </div>

                                                                    <div className='card-category-body' >
                                                                        <div className='title'  ><p><Link to={'/MyProduct/'+ele[1]}>{ele[2]}</Link></p></div>

                                                                        <p className='desc my-3' > <strong>Description:</strong> {ele[3]}</p>

                                                                        <p> <strong> Address: </strong> {ele[4]}</p>
                                                                        <p> <strong> Rent: </strong> {ethers.utils.formatEther(ele[5])} ES</p>
                                                                        <p> <strong> Security Fee: </strong> {ethers.utils.formatEther(ele[6])} ES</p>
                                                                        <p> <strong> Cancellation Fee: </strong> {ethers.utils.formatEther(ele[7])} ES</p>
                                                                        <br/>
                                                                        <p> <strong> Listed on: </strong> {((new Date(Number(ele[9]))).toString()).split("GMT+0530 (India Standard Time)")}</p>                                                                        
                                                                    </div>

                                                                </div>
                                                            </Col>
                                                    })
                                                }
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>

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

export default MyAccount;