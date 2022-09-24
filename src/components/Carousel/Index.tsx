import ethers from 'ethers';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
// import Responsive from '../../Responsive/Responsive.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import Images from '../../containers/Images/Image';
import './Carousel.scss';

class CarouselPage extends Component {
	public state: any;
	public props: any;

  constructor(props: any) {
    super(props);
    this.state = {
      allProduct: [],
    };
  }
   
  getProduct = async () => {
    // @ts-ignore
    const filter = window.rentingDappInstance.filters.ProductDetails(null,null,null,null,null,null,null,null,null,null);
    const logs = await window.rentingDappInstance.queryFilter(filter);
    const parseLogs = logs.map((log) => window.rentingDappInstance.interface.parseLog(log));
    const productAll = parseLogs.map(ele => ele.args);
    
    var displayProducts = [];

        for(var i=0; i<productAll.length; i++)
        {
            var status = await window.rentingDappInstance.isAvailable(productAll[i][1]);
            if(status === true)
            {
                displayProducts.push(productAll[i]);
            }
        }

        console.log(displayProducts);

        this.setState({...this.state , allProduct : displayProducts});
        return displayProducts;
  }

  async componentDidMount() {
      this.getProduct();
  }

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
        items: 1,
      },
      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };

    return (
      <div className='slider-item-main'>
        <Container>
          <Carousel
            responsive={responsive}
            //@ts-ignore
            infiniteLoop
            deviceType={this.props.deviceType}
            useKeyboardArrows
          >                  
            {
              this.state.allProduct.reverse().map((ele: any) => {
                const strArray = ele[10]
                const imgArray = strArray.replace(/\[|\]/g,"").split(',')
                const image = imgArray[0].replace(/['"]+/g, '')


                return <div className='card text-center'>
                          <div className='overflow'>
                            <img className='car-slider-img' src={image ? image : Images.path.noPreview}/>
                          </div>
                          <div className='card-body text-dark'>
                            <h5 className='card-title'>{ele[2]}</h5>
                            <h6 className='card-rent-text'>Rent</h6>
                            <p>{ethers.utils.formatEther(ele[5])} ES</p>
                            <Link className='btn btn-outline' to={'/Product/'+ele[1]}>View</Link>
                          </div>
                        </div>
              })
            }
          </Carousel>
        </Container>
      </div>
    );
  }
}

export default CarouselPage ;