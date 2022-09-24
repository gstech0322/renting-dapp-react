import ethers from 'ethers';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
//import Responsive from '../../Responsive/Responsive.css';
import NavBar from '../../components/Header/NavBar';
import { ProductManagerFactory } from '../../ethereum/typechain/ProductManagerFactory';
import { RentalAgreementFactory } from '../../ethereum/typechain/RentalAgreementFactory';
import Images from '../Images/Image';
import './Product.scss';

export default function Product() 
{
    const [state, setstate] = useState({title: 'Loading...', location: 'Loading...', description: 'Loading...', maxRent: '', security: '', cancellation: '',images:'',incentive:''})
    const [timestate, settimestate] = useState({startTime: '', endTime: ''})
    const [modalstate, setmodalstate] = useState({showModal: false}); 
    const [dateState, setDateState] = useState([['','']]);
    const [contracts, setContracts] = useState({allContracts: []});
    const [check, setCheck] = useState({initial: 0, final: 0});
    const [arrState, setarrState] = useState([]);

    //@ts-ignore
    const {address} = useParams(); 
    //alert(address);
    const productInstance = ProductManagerFactory.connect(
        address,
        window.wallet ?? window.provider
    );

    const fetchData = async () => {
        const title = await productInstance.lessorName();
        const location = await productInstance.location();
        const images = await productInstance.images();
        const description = await productInstance.description();
        const maxRent = ethers.utils.formatEther(await productInstance.maxRent());
        const security = ethers.utils.formatEther(await productInstance.security());
        const cancellation = ethers.utils.formatEther(await productInstance.cancellationFee());
        const incentive = ethers.utils.formatEther(await productInstance.incentive()).split('0').slice(-1)[0] 

        const imgArray = images?.replace(/\[|\]/g, "").split(',')
        const parseImages = [imgArray[0]?.replace(/['"]+/g, ''),imgArray[1]?.replace(/['"]+/g, ''),imgArray[2]?.replace(/['"]+/g, ''),imgArray[3]?.replace(/['"]+/g, '')]

        setstate({title, location, description, maxRent, security, cancellation,images:parseImages,incentive});

        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const filter = productInstance.filters.NewRentalContract(null,window.wallet.address,null,null,null,null,null,null,null,null);
        const logs = await productInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => productInstance.interface.parseLog(log));
        const contractLogs = parseLogs.map(ele => ele.args);
        console.log("All contracts:",contractLogs);
        //@ts-ignore
        setContracts({allContracts : contractLogs});
        //return contracts;
        console.log(contracts.allContracts);
    }

    useEffect(()=>{(async () =>
        {
          await fetchData();
        }
      )()
    },[])

    
    function renderTimeStamp(datetime : string): number{
        const date = new Date(datetime);
        const timeStamp = date.getTime();
        return (timeStamp/1000);
    }

    function handleChecks(e:React.ChangeEvent<HTMLInputElement>)
    {
        setCheck({...check, [e.target.name] : e.target.value})
    }

    const handleRent = async () => {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        // const agreement = await productInstance.connect(window.wallet).createAgreement(0, renderTimeStamp(timestate.startTime), renderTimeStamp(timestate.endTime));
        const agreement = await productInstance.connect(window.wallet).createAgreement(renderTimeStamp(timestate.startTime), renderTimeStamp(timestate.endTime));
        const contract = await agreement.wait();
        //console.log(agreement);

        const parseLogs = (contract.logs).map((log) => productInstance.interface.parseLog(log));
        console.log(parseLogs[0].args);
        const currentDate = Date.now();
        const product = {address: address,images:state.images, title: state.title, rent: state.maxRent, security: state.security, cancellation: state.cancellation, description: state.description, location: state.location, bookingDate: currentDate, startDate: renderTimeStamp(timestate.startTime), endDate: renderTimeStamp(timestate.endTime)};        
        const userId = ''+window.wallet.address+'store';
        
        //console.log( (localStorage.getItem(JSON.stringify(user))) === null ? "True" : "False");
        if(localStorage.getItem(JSON.stringify(userId)) === null)
        {
            let val = [];
            val.push(product);
            localStorage.setItem(JSON.stringify(userId), JSON.stringify(val));
        }
        else
        {
            let arr = [];
            //@ts-ignore
            arr = ( JSON.parse(localStorage.getItem(JSON.stringify(userId))) );

            arr.push(product);
            localStorage.setItem(JSON.stringify(userId), JSON.stringify(arr));              
        }

        alert("Rented");
    }

    console.log(state)

    const handleClose = () => {
        setmodalstate({
            showModal: false,
        })
    }

    const handleDates = async () => {
        const booked = await productInstance.getBookedDates();
        const bookings = (await productInstance.bookings()).toNumber();
        const parseDate = booked.map(ele => {
            const a = new Date(ele[0]*1000);
            const b = new Date(ele[1]*1000);
            return [a.toString(), b.toString()]
        });

        //@ts-ignore
        setDateState(parseDate);
        setmodalstate({showModal: true})
        //alert("Dates already booked: " + parseDate);
        console.log(booked);
    }
    
    function handleFav(){
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }

        const product = {address: address,images:state.images, title: state.title, rent: state.maxRent, security: state.security, cancellation: state.cancellation, description: state.description, location: state.location};        
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

    }
     
    const handleChange= (e:React.ChangeEvent<HTMLInputElement>) => {
        settimestate({...timestate,[e.target.name] : e.target.value});
    }

    return (
        <div>
            <NavBar />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="container">
                
                {/* Portfolio Item Row */}
                <div className="row my-product">
                    <div className="col-md-6">
                        {/* <img className="img-fluid w-100" src={(state.images.split(','))[0]} alt="" /> */}
                        <Carousel>
                            <div><img className="img-fluid" src={state.images[0]} alt="" /></div>    
                            <div><img className="img-fluid" src={state.images[1]} alt="" /></div>    
                            <div><img className="img-fluid" src={state.images[2]} alt="" /></div>    
                            <div><img className="img-fluid" src={state.images[3]} alt="" /></div>
                        </Carousel>   
                    </div>

                    <div className="col-md-6">
                        {/* Portfolio Item Heading */}
                        <div className='mb-3 d-flex align-items-center justify-content-between' >
                            <h4 className="product-title">{state.title}</h4>
    
                            <i className="fa fa-heart ml-2 title-heart" aria-hidden="true" onClick={handleFav} ></i>
                        </div>
                        

                        <h4 className="mt-4  product-title">Product Description</h4>
                        <h6 className="desc-para">{state.description}</h6>

                        <h4 className="mt-4 product-title">Payment Info</h4>
                        <h6 className="desc-para">Rent: {state.maxRent} ES</h6>
                        <h6 className="desc-para">Security Fee: {state.security} ES</h6>
                        <h6 className="desc-para">Cancellation Fee: {state.cancellation} ES</h6>
                        <h6 className="desc-para">Available Discounts : Loading...</h6>
                        <h6 className="desc-para">Promotional Incentive Offered : <strong>{state.incentive} %</strong> </h6>

                        <h4 className="mt-4 product-title">Pick Up Address</h4>
                        <h6 className="desc-para">{state.location}</h6>
                       
                       <hr />

                        <h6 className="my-3 catg-body-txt desc-para">Start Time: <input className="form-control" type="datetime-local" name="startTime" value ={timestate.startTime} onChange={handleChange} placeholder="Finised Time" /></h6>
                        <h6 className="my-3 catg-body-txt desc-para">End Time: <input className="form-control" type="datetime-local" name="endTime" value ={timestate.endTime} onChange={handleChange} placeholder="Finised Time" /></h6>
                        <button className='listing-rent-now' onClick={handleRent}>Rent Now</button>
                        <button onClick={handleDates} className='listing-booked-dates'>Check Booked Dates</button>

                        <div className='alert alert-secondary alert-product' >Transfer advance rent to <strong>RentinDapp</strong> contract and  Request to check availability of asset or services to Lessor. You may choose to contact Lessor.</div>
                    </div>
                </div>
                <br/><br/>
                
                <div className='row my-product' >
                {
                contracts.allContracts.map(ele => (
                  <table className='table' >           
                     <tr>
                       <td>Contract Orders Received</td>       
                       <td><div className='alert-info alert mb-0 p-1 px-2' >{ele[2]}</div></td>       
                     </tr>    
    
                     <tr >
                       <td>Lessee</td>       
                       <td>
                          <div className='alert-info alert mb-0 p-1 px-2' >{ele[0]}</div>
                       </td>       
                     </tr>    
    
                     <tr>
                       <td>Start Date</td>       
                       <td>{((new Date(Number(ele[3])*1000)).toString()).split("GMT+0530 (India Standard Time)")}</td>       
                     </tr>    
    
                     <tr>
                       <td>End Date</td>       
                       <td>{((new Date(Number(ele[4])*1000)).toString()).split("GMT+0530 (India Standard Time)")}</td>       
                     </tr>
    
                     <tr>
                       <td>Respond to Orders</td>       
                       <td>
                           <div className="inp-btn">
                               <input 
                                    type="number" 
                                    placeholder="Enter 1 if OK else 0"
                                    style={{width: '160px'}}
                                    name='initial'
                                    onChange={handleChecks}
                                    value={check.initial}                                           
                                />
                                <button className="listing-rent-small" onClick={async () => {
                                    const agreementInstance = RentalAgreementFactory.connect(
                                        ele[2],
                                        window.wallet ?? window.provider
                                    );
                                    if(window.wallet===undefined)
                                    {
                                      alert("Wallet not loaded");
                                      return;
                                    }
                                                
                                    const checkInitial = await agreementInstance.connect(window.wallet).initialCheckByLessee( check.initial, {value: ele[6]} );

                                    console.log(checkInitial);
                                    alert("Initial check by Lessee done");
                                }}> Initial Lessee </button>

                               
                            </div>
                                <div className='alert-msg alert-msg-product' >
                                    Post "<strong>Rent Now</strong>" request by lessee now lessor shall confirm if asset or service is available and dates matching to lessee requirement.
                                    Post Initial lessor availability confirmation lessee should input “<strong>1</strong>” if satisfied with product condition and availability else “<strong>0</strong>”. Lessee input of “<strong>1</strong>” shall initiate peer to peer exchange. *When You Submit 1 Your Deposit Fee (If Any) will be deducted & will be Deposited to Contract
                                </div>
                               <hr className='my-2' />
                                    
                            <div className="inp-btn">
                                    <button className="listing-rent-small" onClick={async () => {
                                            const agreementInstance = RentalAgreementFactory.connect(
                                                ele[2],
                                                window.wallet ?? window.provider
                                            );
                                            if(window.wallet===undefined)
                                            {
                                                alert("Wallet not loaded");
                                                return;
                                            }
                                            const cancelRent = await agreementInstance.connect(window.wallet).cancelRent({value: ele[7]});
                                            console.log(cancelRent);
                                            alert(ethers.utils.formatEther(ele[7])+" ES rent paid as cencellation charge");
                                     }}>
                                     Cancel Rent
                                 </button>
                            </div>
                                    
                            <div className='alert-msg alert-msg-product' >
                              You can cancel only before time of lease or service begins paying cancelation charges mentioned in listing by Lessor.
                            </div>
                                
                            <hr className='my-2' />

                            <div className="inp-btn">        
                                <button className="listing-rent-small" onClick={async () => {
                                    const agreementInstance = RentalAgreementFactory.connect(
                                       ele[2],
                                       window.wallet ?? window.provider
                                    );
                                            if(window.wallet===undefined)
                                            {
                                                alert("Wallet not loaded");
                                                return;
                                            }
                                            const payRent = await agreementInstance.connect(window.wallet).payRent({value: ele[5]});
                                            console.log(payRent);
                                            alert(ethers.utils.formatEther(ele[5])+" ES rent paid");
                                }}> Pay Rent </button>  
                            </div>
                                    
                            <div className='alert-msg alert-msg-product' >
                              This confirmation by Lessee will confirm transfer of funds to Lessor. Once rent paid is not returnable.
                            </div>
                                
                            <hr className='my-2' />

                            <div className="inp-btn">
                              <input 
                                type="number" 
                                placeholder="Enter 1 if OK else 0"
                                style={{width: '160px'}}
                                name='final'
                                onChange={handleChecks}
                                value={check.final}                                           
                               />
                              <button className="listing-rent-small" onClick={async () => {
                                const agreementInstance = RentalAgreementFactory.connect(
                                    ele[2],
                                    window.wallet ?? window.provider
                                );
                                if(window.wallet===undefined){
                                    alert("Wallet not loaded");
                                    return;
                                }
                                                    
                                const checkFinal = await agreementInstance.connect(window.wallet).finalCheckByLessee(check.final);

                                console.log(checkFinal);
                                alert("Final check by Lessee done");
                              }}>
                                    Final Lessee
                                </button>
                          </div>
                          
                          <div className='alert-msg alert-msg-product' > This step confirms mutual closure of Peer-to-peer with all dues. If there is a damage or additional payable which both parties should agree and this is proposed by Lessor. If lessor and Lessee don’t agree to terminate peer to peer normally then both parties will be losing any deposited ES as security or ES receivable from this peer-to-peer.  </div>
                       </td>       
                     </tr>
                   </table>    
                  ))
                 }
                </div>

                <div className='alert alert-success m-auto mt-3' style={{width:'fit-content'}}  >
                   Happy dispute free peer-to-peer Renting.
                </div>

                {/* /.row */}
                {/*Related Projects Row 
                <h3 className="my-4">Related Products</h3>
                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                        <img className="img-fluid" src={Images.path.rlTwo} alt="" />
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                        <img className="img-fluid" src={Images.path.rlTwo} alt="" />
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                        <img className="img-fluid" src={Images.path.rlTwo} alt="" />
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="#">
                        <img className="img-fluid" src={Images.path.rlTwo} alt="" />
                        </a>
                    </div>
                </div>
                {/* /.row */}
            </div>
            <br/>
            <br/>
            <br/>
            <div className='footer-bgd'>
                <div className='wrapper-container'>
                    <Footer />
                </div>
            </div>

            {/* Bootstrap Modal */}
            <Modal 
                show={modalstate.showModal}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> 
                        <div className='rentDaap-header-logo'> 
                            <img className='rentDaap-Img-modal'  src={Images.path.logocolor} />
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <div className='listing-txt-modal'>Product is booked already as per dates below:</div>
                    <table className='table'>
                        <tr>
                            <th style={{textAlign: "center"}}>Starting Date</th>
                            <th style={{textAlign: "center"}}>Ending Date</th>
                        </tr>
                        {
                            dateState.map(ele => (
                                <tr>
                                    <td>{ele[0].split("GMT+0530 (India Standard Time)")}</td>
                                    <td>{ele[1].split("GMT+0530 (India Standard Time)")}</td>
                                </tr>
                            ))                             
                        }
                    </table>
                </Modal.Body>
                <Modal.Footer className='delete-footer'>
                    <Button variant="secondary" className='delete-btn' onClick={() => setmodalstate({showModal: false})}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}