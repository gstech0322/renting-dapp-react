   <Navbar color="transparent" light expand="md">
        <nav className="header-nav-flex">
          <NavbarBrand href="/" className="rentDaap-header-logo">
            <img className="rentDaap-Img" src={Images.path.logocolor} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <ul className="header-listItem">
              <li>
                <a className="catgry-text" href="">
                  Home
                </a>
              </li>
              <li className="catgry-texttwo">
                <a onClick={this.toggleMenu}>All Categories</a>
              </li>
              {this.state.showMenu ? <NavMenu /> : null}
              <li>
                <Link to="/ComingSoon">
                  <i className="fa fa-comment-o" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                <Link to="" onClick={this.toggleProfile}>
                  {" "}
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                </Link>
              </li>
              {/* {
                         this.state.profileMenu ?
                         (<div className='profile-dropdown'>
                                 
                           <Link to='/MyListing'> <div className='drp-txt-profile'>My Listing</div></Link>
                           <div className='drp-txt-profile'>Logout</div>
                                 
                         </div>) :''
                     } */}
              <li>
                <Link to="/ComingSoon">
                  {" "}
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                <a href="https://eraswap.life/" target="_blank">
                  Connect To Wallet
                </a>
              </li>
            </ul>
          </Collapse>
        </nav>
      </Navbar>
