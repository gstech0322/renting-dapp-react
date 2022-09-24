import React, { Component } from "react";
import "./Footer.scss";
import Images from "../../containers/Images/Image";
import { Col, Button, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faTrashAlt,
faFacebookSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class Footer extends Component {
	public state: any;

constructor(props) {
super(props);
this.state = {};
}
render() {
return (
<div className="Footer-container mt40">
   <Container>
      <Row>
         <Col sm={5}>
         <img
            className="rentDaap-Img"
            src={Images.path.rentingdapp}
            alt="rent"
            />
         <div className="social-links social-menu mt10">
            <li><a href="https://www.facebook.com/eraswap" target="_blank"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://www.linkedin.com/company/eraswap/" target="_blank"><i class="fa fa-linkedin"></i></a></li>
            <li><a href="https://www.instagram.com/eraswap/?hl=en" target="_blank"><i class="fa fa-instagram"></i></a> </li>
            <li><a href="https://twitter.com/EraSwapTech" target="_blank"><i class="fa fa-twitter"></i></a></li>
            <li><a href="https://medium.com/@eraswap" target="_blank"><i class="fa fa-medium"></i></a></li>
            <li><a href="https://eraswap.tumblr.com/" target="_blank"><i class="fa fa-tumblr"></i></a></li>
            <li><a href="https://t.me/eraswap" target="_blank"><i class="fa fa-telegram"></i></a></li>
            <li> <a href="https://github.com/KMPARDS" target="_blank"><i class="fa fa-github"></i></a></li>
            <li><a href="https://www.reddit.com/user/EraSwap" target="_blank"><i class="fa fa-reddit"></i></a> </li>
            <li><a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" target="_blank"><i class="fa fa-youtube"></i></a></li>
         </div>
        
         </Col>
         <Col sm={3}>
          <div className="rentDaap-help">
            <ul>
               <h5 className="footer-link"> Link</h5>

               <li>
                  <a href="https://www.rentingdapp.com/" >
                  <i class="fa fa-angle-double-right"></i> Home
                  </a>
               </li>
               <li>
                  <a href="/pdf/ListingPolicyRentingDAp.pdf" target="_blank">
                  <i class="fa fa-angle-double-right"></i>  Listing Policy of <br />
                  renting Dapp
                  </a>
               </li>
               <li>
                  <a href="https://eraswap.life/" target="_blank"><i class="fa fa-angle-double-right"></i> About Eraswap Life</a>
               </li>  

               <li>
                  <a href="https://www.coingecko.com/en/coins/era-swap-token" target="_blank"><i class="fa fa-angle-double-right"></i> CoingGecko </a>
               </li>  
              
            </ul>
          </div>
         </Col>
         <Col sm={4}>
         <div className="rentDaap-help">
            
            <ul>
               <h5 className="other-footer-txt">Other Links</h5>
               <li>
                  <a
                     href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf"
                     target="_blank"
                     >
                 <i class="fa fa-angle-double-right"></i> ES White Paper{" "}
                  </a>
               </li>
               <li>
                  <a
                     href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                     target="_blank"
                     >
                 <i class="fa fa-angle-double-right"></i> Howey Test
                  </a>
               </li>
               <li>
                  <a
                     href="http://eraswaptoken.io/pdf/es-statuary-warning.pdf"
                     target="_blank"
                     >
                <i class="fa fa-angle-double-right"></i> Statuary Warning{" "}
                  </a>
               </li>
            
               <li>
                  <a
                     href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                     target="_blank"
                     >
                <i class="fa fa-angle-double-right"></i>  Era Swap Terms & Conditions
                  </a>
               </li>
               <li>
                  <a href="/pdf/renting-terms-conditions.pdf" target="_blank">
                  <i class="fa fa-angle-double-right"></i> Terms & Condition
                  </a>
               </li>
               <li>
                  <a href="/pdf/privacy policy_rentingdapp.pdf" target="_blank">
                  <i class="fa fa-angle-double-right"></i> Privacy policy
                  </a>
               </li>
               
              
            </ul>
         </div>
         </Col>
         <Col sm={12}>
         <div className="copyright">All Rights Reserved ©2020.</div>
         </Col>
         {/* <Col sm={2}>
         <div className="subscribe-container">
            <div className="subscribe-detail">
               Subscribe to Our News Letterww
            </div>
            <form>
               <input
                  placeholder="Your email address"
                  className="subscribe-field"
                  onChange={this.handleInputChange}
                  />
            </form>
            <div className="subscribe-btn-container">
               <button className="subscribe-rent-btn">Subscribe</button>
            </div>
         </div>
         </Col> */}

      </Row>
   </Container>
</div>
);
}
}
export default Footer;