import ethers from 'ethers';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
import NavBar from '../../components/Header/NavBar';
import Image from '../Images/Image';
import './ListPage.scss';

class ListPage extends Component {
	public state: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            allProduct: [],
        }
    }

    getProduct = async () => {
        const filter = window.rentingDappInstance.filters.ProductDetails(null,null,null,null,null,null,null,null,null,null,null);
        const logs = await window.rentingDappInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => window.rentingDappInstance.interface.parseLog(log));
        var productAll = parseLogs.map(ele => ele.args);
        // let products = (JSON.parse(localStorage.getItem(JSON.stringify(window.wallet.address))));

        console.log(parseLogs)

        var displayProducts = [];

        for(var i=0; i<productAll.length; i++)
        {
          var status = await window.rentingDappInstance.isAvailable(productAll[i][1]);
          if(status === true)
          {
            displayProducts.push(productAll[i]);
          }
        }

        this.setState({...this.state , allProduct : displayProducts});


        return displayProducts;

    }

    async componentDidMount() {
        this.getProduct()
    }

    render() {
        return (
            <div>
                <NavBar />
                <br/>
                <br/>
                <br />
                <br/>
                <br/>
                <div className='myListing-wrapper-container'>
                    <div className='list-header' >
                      <p className='point-1' >Lessor is defined as a peer who receives <strong>Era Swap</strong> in exchange for the usage of its Asset or Service.</p>  
                      <p className='point-2' >Lessee is defined as a peer who pays <strong>Era Swap</strong> in exchange to lessor for the use of the asset and service.</p>  
                    </div>

                    <div className="row">
                    {
                        this.state.allProduct.reverse().map((ele: any) => {
                            const strArray = ele[10]
                            const imgArray = strArray.replace(/\[|\]/g,"").split(',')
                            const image = imgArray[0].replace(/['"]+/g, '')

                        return <div className='r-col-d-4 position-relative'>
                            <div className='card-category-container'>

                                <div className='overflow'>
                                    <img className='catg-imgs' src={image ? image : Image.path.noPreview} />
                                </div>
                                
                                <div className='card-category-body' >
                                    <div className='title' >
                                        <p><Link to={'/Product/'+ele[1]}>{ele[2]}</Link></p>
                                        {/*<div className='catg-rating'><img className='rate-imgs' src={Images.path.orangeStar} />4.5</div>*/}
                                    </div>

                                    <p className='desc my-3' > <strong> Description: </strong> {ele[3]}</p>
                                    <p> <strong> Address: </strong> {ele[4]}</p>
                                    <p> <strong> Rent: </strong> {ethers.utils.formatEther(ele[5])} ES</p>
                                    <p> <strong> Security Fee: </strong> {ethers.utils.formatEther(ele[6])} ES</p>
                                    <p> <strong> Cancellation Fee: </strong> {ethers.utils.formatEther(ele[7])} ES</p>
                                    <p> <strong> Promotional Incentive Offered : </strong> loading... </p>
                                    <p> <strong> Available Discounts : </strong> loading... </p>
                                    <p style={{marginBottom: '2rem'}}> <strong> Listed on: </strong> {((new Date(Number(ele[9]))).toString()).split("GMT+0530 (India Standard Time)")}</p>
                                
                                    <i 
                                        aria-hidden="true" 
                                        onClick={() => {
                                            const address = ele[1];
                                            if(window.wallet===undefined)
                                            {
                                                alert("Wallet not loaded");
                                                return;
                                            }

                                            const product = {address: address, title: ele[2], rent: ethers.utils.formatEther(ele[5]), security: ethers.utils.formatEther(ele[6]), cancellation: ethers.utils.formatEther(ele[7]), description: ele[3], location: ele[4],images:strArray};        
                                            const user = window.wallet.address;
                                            
                                            //console.log( (localStorage.getItem(JSON.stringify(user))) === null ? "True" : "False");
                                            if(localStorage.getItem(JSON.stringify(user)) === null)
                                            {
                                                let val = [];
                                                val.push(product);
                                                localStorage.setItem(JSON.stringify(user), JSON.stringify(val));
                                                alert("Added to favourites");
                                            }
                                            else
                                            {
                                                let arr = [];
                                                //@ts-ignore
                                                arr = ( JSON.parse(localStorage.getItem(JSON.stringify(user))) );
                                                let check = false;
                                                arr.map((ob: any)=> {
                                                    if(ob.title === product.title)
                                                    check = true;
                                                })
                                                if(check === false)
                                                {
                                                    arr.push(product);
                                                    localStorage.setItem(JSON.stringify(user), JSON.stringify(arr));
                                                    alert("Added to favourites");
                                                }
                                                else
                                                {
                                                    alert("Already added to favourites list");
                                                    for(var i=0; i<arr.length; i++)
                                                    {
                                                        if(arr[i].address === product.address)
                                                        {
                                                            arr.splice(i, 1);
                                                            i--;
                                                        }
                                                    }
                                                    console.log(arr);
                                                    localStorage.setItem(JSON.stringify(user), JSON.stringify(arr));
                                                    alert("Therefore removed from favourites");
                                                }
                                            }

                                        }}
                                        className={`fa fa-heart favourite-icon `}
                                    >                                    
                                    </i>
                                </div>
                                
                            </div>
                        </div>
                        })
                    }    
                    </div>                
                </div>
                <br/>
            <br/>
            <br/>
            <div className='footer-bgd'>
                <div className='wrapper-container'>
                    <Footer />
                </div>
            </div>
            </div>

        );
    }
}

export default ListPage;