import React, { Component } from "react";
import "./RentPage.scss";
import Images from "../../containers/Images/Image";
//import Responsive from '../../Responsive/Responsive.css';
import NavBar from "../../components/Header/NavBar";
import Footer from "../../components/Footer/Index";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Form, InputGroup, Col, FormControl } from 'react-bootstrap';


const queryString = require("query-string");

class RentPage extends Component {
  public state: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      makeBold: false,
      currentCategory: 0,
      currentSubCategory: 0,
      //Follow this structure for adding any Categiry or Sub-Category
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
          cat: "Mobiles",
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

  render() {
    return (
      <div>
        <div className='rental-hero-bgd'>
          <div className='wrapper-container'>
            <NavBar />
              <div className='buy-main-container'>
                <h4 className='hero-txt-style'>List you own Products on RentingDApp</h4>
                <hr/>
                    {/*<div className="">
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          <table style={{ width: "100%" }}>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 0 });
                              }}
                                this.setState({ makeBold: !this.state.makeBold});
                              }}
                              className={`${this.state.makeBold ? "makeBold" : ""}`}
                            >
                              <td>Real Estate</td>
                            </tr>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 1 });
                              }}
                            >
                              <td>Vehicle</td>
                            </tr>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 2 });
                              }}
                            >
                              <td>Electronics & Appliances</td>
                            </tr>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 3 });
                              }}
                            >
                              <td>Mobiles</td>
                            </tr>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 4 });
                              }}
                            >
                              <td>Furniture</td>
                            </tr>
                            <tr
                              onMouseEnter={() => {
                                this.setState({ currentCategory: 5 });
                              }}
                            >
                              <td>Bikes</td>
                            </tr>
                          </table>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <table style={{ width: "100%" }}>
                            {
                              this.state.categoryArr[this.state.currentCategory].sub.map((item, i) => (
                                <tr>
                                  <td>
                                    <Link
                                      to={`/form?${queryString.stringify({
                                        category: this.state.categoryArr[
                                          this.state.currentCategory
                                        ].cat,
                                        sub: item,
                                        id: '' + this.state.categoryArr[this.state.currentCategory].id + '_' + i
                                      })}`}
                                    >
                                      {item}
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            }
                          </table>
                        </div>
                      </div>
                    </div>*/}
                <div className="main-rent-search rent-page">
                  <Form>
                    <Form.Row className="align-items-center">
                      <Col xs="{auto}" className="my-1">
                        <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                          Preference
                        </Form.Label>
                        <p className="heading-txt-style">Select Category</p>
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
                          <option value={3}>Mobiles</option>
                          <option value={4}>Furniture</option>
                          <option value={5}>Bikes</option>
                        </Form.Control>
                      </Col>
                      <Col xs="{auto}" className="my-1">
                        <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" onChange={this.handleInputChange}  srOnly>
                          Preference
                        </Form.Label>
                        <p className="heading-txt-style">Select Sub-Category</p>
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
                    </Form.Row>
                    <br/>
                    <Form.Row>
                      <Col xs="auto" className="my-1" style={{marginLeft: "258px"}}>
                        <button className="search-rent-btn position-relative">
                          <Link 
                            to={`/form?${queryString.stringify({
                            category: this.state.categoryArr[this.state.currentCategory].cat,
                            sub: this.state.categoryArr[this.state.currentCategory].sub[this.state.currentSubCategory],                                               
                            id: '' + this.state.categoryArr[this.state.currentCategory].id + '_' + this.state.currentSubCategory
                            })}`}
                            className="search-rent-btn stretched-link"
                          >
                            Proceed
                          </Link>
                        </button>
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </div>
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

export default RentPage;
