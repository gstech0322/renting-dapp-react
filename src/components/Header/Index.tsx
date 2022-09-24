import React, { Component } from "react";
import { Link } from "react-router-dom";
import Images from "../../containers/Images/Image";
import "./Header.scss";

class Header extends Component {
  public state: any;
  
//@ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      profileMenu: false,
      isOpen: false,
      
    };
    //this.toggleMenu = this.toggleMenu.bind(this);
    //this.toggleProfile = this.toggleProfile.bind(this);
  }

  toggleMenu = () => {
    this.setState({
      //@ts-ignore
      showMenu: !this.state.showMenu,
    });
  };

  toggleProfile = () => {
    this.setState({
      //@ts-ignore
      profileMenu: !this.state.profileMenu,
    });
  };

  toggle = () => {
    //@ts-ignore
    this.setState({ isOpen: !this.state.isOpen });
  };


  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark  navbar-light bg-transparent black custom-menu ">
        <img className="rentDaap-Img" src={Images.path.logocolor} />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main_nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav">
          </ul>

          <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
              <Link className="nav-link" to="/#">
                Home{" "}
              </Link>{" "}
            </li>

            <li className="nav-item ">
              {" "}
              <Link className="nav-link catgry-texttwo" to="/List">
                {" "}
                Listed Products{" "}
              </Link>{" "}
            </li>

            <li className="nav-item ">
              {" "}
              <Link className="nav-link catgry-texttwo" to="/MyListing">
                {" "}
                My Listings{" "}
              </Link>{" "}
            </li>
            
            <li className="nav-item position-relative">
              <Link className="nav-link" to="#">
                <i className="fa fa-comment-o" onClick={this.toggle} aria-hidden="true"></i>{" "}
              </Link>

                <div className={`chat-dropdown ${!this.state.isOpen ? 'd-none' : ''}`} >
                  <div className="alert alert-warning" role="alert" >You can chat with your peers (Lesser/ Lessee Wallet) on
                    Swappers Wall Chat. Find your peers on SwappersWall <a target='_blank' href='https://swapperswall.com/' >https://swapperswall.com/#</a>
                  </div>
                </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MyAccount">
                {" "}
                <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myFav">
                {" "}
                <i className="fa fa-heart" aria-hidden="true"></i>{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-warning conn-wallet-btn"
                to="/RentPage"
              >
                {" "}
                Rent{" "}
              </Link>
            </li>
            <li className="nav-item">
              
              {window.wallet ? (
                <Link
                className="nav-link btn btn-outline-warning conn-wallet-btn"
                to="/#"
                onClick={() => {
                  delete window.wallet;
                }}
              >
                {" "}
                LOGOUT{" "}
              </Link>
              ) : (
                <a
                  className="nav-link btn btn-outline-warning conn-wallet-btn"
                  href="https://eraswap.life/"
                  target="_blank"
                >
                  {" "}
                  CONNECT TO WALLET{" "}
                </a>
              )}
              
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
