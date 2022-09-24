import React, { Component } from "react";
import { Link } from "react-router-dom";
import Images from "../../containers/Images/Image";
import "./NavBar.scss";


class NavBar extends Component {
	public state: any;
	// public setState: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      showMenu: false,
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  toggle = () => {
    //@ts-ignore
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark  navbar-light black custom-menu ">
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
            {/* <li className="nav-item dropdown has-megamenu">
                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false"> ALL CATEGORIES  </a>
                      <div className="dropdown-menu megamenu" role="menu">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="col-megamenu">
                                              <h6 className="title">Title Menu One</h6>
                                              <ul className="list-unstyled megamenu-box">
                                                  <li><a href="#">Custom Menu</a></li>
                                                  <li><a href="#">Custom Menu</a></li>
                                                  <li><a href="#">Custom Menu</a></li>
                                                  <li><a href="#">Custom Menu</a></li>
                                                  <li><a href="#">Custom Menu</a></li>
                                                  <li><a href="#">Custom Menu</a></li>
                                              </ul>
                                            </div>  
                                        </div>
                                        <div className="col-md-3">
                                          <div className="col-megamenu">
                                            <h6 className="title">Title Menu Two</h6>
                                                <ul className="list-unstyled megamenu-box">
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                </ul>
                                            </div>  
                                        </div>
                                        <div className="col-md-3">
                                          <div className="col-megamenu">
                                            <h6 className="title">Title Menu Three</h6>
                                                <ul className="list-unstyled megamenu-box">
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                </ul>
                                            </div>  
                                        </div>    
                                        <div className="col-md-3">
                                          <div className="col-megamenu">
                                            <h6 className="title">Title Menu Four</h6>
                                                <ul className="list-unstyled megamenu-box">
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                    <li><a href="#">Custom Menu</a></li>
                                                </ul>
                                            </div>  
                                        </div>
                                    </div>
                        </div> 
                  </li> */}
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              {" "}
              <Link className="nav-link" to="/#">
                Home{" "}
              </Link>{" "}
            </li>
            {/*<li className="nav-item ">
              {" "}
              <Link className="nav-link catgry-texttwo" onClick={this.toggleMenu}>
                All Categories{" "}
              </Link>{" "}
            </li>*/}
            <li className="nav-item ">
              {" "}
              <Link className="nav-link catgry-texttwo" to="/List">
                Listed Products
              </Link>{" "}
            </li>
            <li className="nav-item ">
              {" "}
              <Link className="nav-link catgry-texttwo" to="/MyListing">
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
                className="nav-link mt-0 btn btn-outline-warning conn-wallet-btn"
                to="/RentPage"
              >
                {" "}
                Rent{" "}
              </Link>
            </li>
            <li className="nav-item">
              {window.wallet ? (
                  <Link
                  className="nav-link  mt-0 btn btn-outline-warning conn-wallet-btn"
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
                    className="nav-link  mt-0 btn btn-outline-warning conn-wallet-btn"
                    href="https://eraswap.life/"
                    target="_blank"
                  >
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

export default NavBar;
