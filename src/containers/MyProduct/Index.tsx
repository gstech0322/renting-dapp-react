import ethers from 'ethers';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
import NavBar from '../../components/Header/NavBar';
import { ProductManagerFactory } from '../../ethereum/typechain/ProductManagerFactory';
import { RentalAgreementFactory } from '../../ethereum/typechain/RentalAgreementFactory';
import './MyProduct.scss';

export default function MyProduct() 
{
    const [state, setstate] = useState({title: 'Loading...', location: 'Loading...', description: 'Loading...', maxRent: '', security: '', cancellation: '',images:'',incentive:''})
    const [discountState, setDiscountState] = useState({added: 0, removed: 0});
    const [discount, setDiscount] = useState('loading...');
    const [contracts, setContracts] = useState({allContracts: []});
    const [check, setCheck] = useState({initial: 0, final: 0});
    const [terminate, setTerminate] = useState({penalty: 0});
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
        const description = await productInstance.description();
        const images = await productInstance.images();
        const maxRent = ethers.utils.formatEther(await productInstance.maxRent());
        const security = ethers.utils.formatEther(await productInstance.security());
        const cancellation = ethers.utils.formatEther(await productInstance.cancellationFee());
        const incentive = ethers.utils.formatEther(await productInstance.incentive()).split('0').slice(-1)[0] 

        // GET IMAGE ===========================================
        const imgArray = images?.replace(/\[|\]/g, "").split(',')
        const parseImages = [imgArray[0]?.replace(/['"]+/g, ''),imgArray[1]?.replace(/['"]+/g, ''),imgArray[2]?.replace(/['"]+/g, ''),imgArray[3]?.replace(/['"]+/g, '')]

        setstate({title, location, description, maxRent, security, cancellation,images:parseImages,incentive});

        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const filter = productInstance.filters.NewRentalContract(window.wallet.address,null,null,null,null,null,null,null,null,null);
        const logs = await productInstance.queryFilter(filter);
        const parseLogs = logs.map((log) => productInstance.interface.parseLog(log));
        const contractLogs = parseLogs.map(ele => ele.args);
        console.log("All contracts:",contractLogs);
        //@ts-ignore
        setContracts({allContracts : contractLogs});
        // return contracts;
    }

    useEffect(()=>{(async () =>
        {
          await fetchData();
        }
    )()
    },[state])

    function handleChange(e:React.ChangeEvent<HTMLInputElement>)
    {
        setDiscountState({...discountState, [e.target.name] : e.target.value})
    }

    function handleChecks(e:React.ChangeEvent<HTMLInputElement>)
    {
        setCheck({...check, [e.target.name] : e.target.value})
    }

    function handlePenalty(e:React.ChangeEvent<HTMLInputElement>)
    {
        setTerminate({...terminate, [e.target.name] : e.target.value})
    }

    async function handleDiscounts()
    {
        const discounts = await productInstance.getDiscounts(); 
        alert("Available discounts : " + discounts);
    }

    async function handleAdd()
    {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const disc = await productInstance.connect(window.wallet).addDiscount(discountState.added);
        alert(discountState.added+"% discount added");
    }

    async function handleRemove()
    {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const disc = await productInstance.connect(window.wallet).removeDiscount(discountState.removed);
        alert(discountState.removed+"% discount removed");
    }

    async function handleDelete()
    {
        if(window.wallet===undefined)
        {
            alert("Wallet not loaded");
            return;
        }
        const deleted = await window.rentingDappInstance.connect(window.wallet).removeItem(address);
        console.log(deleted);
        alert("Listing deleted");
    }


    return (
        <div>
            <NavBar />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="container">

                {/* Portfolio Item Row */}
                <div className="row mt-4 my-product">
                    <div className="col-md-6">

                        <div className='slider-product' >
                             <Carousel>
                                <div><img className="img-fluid" src={state.images[0]} alt="" /></div>    
                                <div><img className="img-fluid" src={state.images[1]} alt="" /></div>    
                                <div><img className="img-fluid" src={state.images[2]} alt="" /></div>    
                                <div><img className="img-fluid" src={state.images[3]} alt="" /></div>    
                             </Carousel>                            
                        </div>

                        
                        <div className="alert alert-warning mt-4" role="alert" >
                           Renting Dapp platform is a middlemen/ Admin free platform &amp; it doesn't restrict users to exchange their Contact Details & Coordinates. Renting Dapp is a free Platform & it doesn't gain any benefits if it is used more or less by users. Before submitting any disagreement on renting dapp lessor & lessee should communicate & resolve mutually. In case of submission of disagreement then the Security Fee amount cannot be recovered.
                           Chat with lessor on Swappers wall chat (on Lessee/Sellers Page)
                        </div>
                    </div>
                    <div className="col-md-6">
                        {/* Portfolio Item Heading */}
                        <h4 className="mb-3 product-title">{state.title}</h4>

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
                        <hr/>

                        <button className="listing-get-discounts" onClick={handleDiscounts}>Get Discounts</button>
                        <button className="listing-delete" onClick={handleDelete}>Delete this listing</button>
                        <br/><br/>

                        <div className='inp-btn' >
                            <input
                                className="select-discount"
                                type="number"
                                placeholder="Select discount"
                                name='added'
                                onChange={handleChange}
                                value={discountState.added}
                            />
                            <button className="listing-add-discount" onClick={handleAdd}>Add Discount in %</button>                          
                        </div>

                        <div className='inp-btn' >
                            <input
                                className="select-discount"
                                type="number"
                                placeholder="Select discount"
                                name='removed'
                                onChange={handleChange}
                                value={discountState.removed}
                            />
                            <button className="listing-remove-discount" onClick={handleRemove}>Remove Discount</button>                            
                        </div>

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
                          <div className='alert-info alert mb-0 p-1 px-2' >{ele[1]}</div>
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
                          <div>
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
                                    const agreementInstance = RentalAgreementFactory.connect(ele[2],window.wallet ?? window.provider);
                                      if(window.wallet===undefined)
                                        {
                                          alert("Wallet not loaded");
                                          return;
                                        }
                                        
                                      const checkInitial = await agreementInstance.connect(window.wallet).initialCheckByLessor(check.initial);
                                      console.log(checkInitial);
                                      alert("Initial check by Lessor done");
                                }}> Initial Lessor </button>
                            </div>
                            <div className='alert-msg' >*To Accept  Contract Submit 1 &amp; To Reject Contract Submit 0</div>
                            
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
                                  const agreementInstance = RentalAgreementFactory.connect(ele[2],window.wallet ?? window.provider);
                                    if(window.wallet=== undefined){
                                      alert("Wallet not loaded");
                                      return;}
                                      
                                      const checkFinal = await agreementInstance.connect(window.wallet).finalCheckByLessor(check.final);
                                      console.log(checkFinal);
                                      alert("Final check by Lessor done");
                               }}>Final Lessor</button>
                            </div>
                            
                                    <div className='alert-msg' >
                                        <p>*Submit 0 to start a despute</p>
                                        <p>*Submit 1 to Mark end of your Service</p>
                                    </div>
                            
                            <hr className='my-2' />

                            <div className="inp-btn">        
                              <button className="listing-rent-big" onClick={async () => {
                                const agreementInstance = RentalAgreementFactory.connect(ele[2],window.wallet ?? window.provider);
                                   if(window.wallet===undefined){
                                      alert("Wallet not loaded");
                                      return;}
                                   
                                   const terminate = await agreementInstance.connect(window.wallet).terminateNormally();
                                   console.log(terminate);
                                   alert("Terminated normally");
                              }}>Terminate Normally</button>    
                            </div>
                            <div className='alert-msg' >*If there are no damages/ penalty from Security Fees then submit <strong>Terminate Normally</strong>. If you don’t terminate normally & lessee doesn’t accept penalty offered then receivable rent cannot be credited and lessee deposit will not be released till you <strong>Terminate Normally</strong></div>

                            <hr className='my-2' />

                            <div className="inp-btn">
                                <input 
                                   type="number" 
                                   placeholder="Enter penalty amount"
                                   style={{width: '160px'}}
                                   name='penalty'
                                   onChange={handlePenalty}
                                   value={terminate.penalty}                                           
                                />
                                <button className="listing-rent-big" style={{fontSize:"14px"}} onClick={async () => {
                                    const agreementInstance = RentalAgreementFactory.connect(ele[2],window.wallet ?? window.provider);
                                    if(window.wallet===undefined){
                                        alert("Wallet not loaded");
                                        return;}
                                    
                                    const penalty = await agreementInstance.connect(window.wallet).terminateWithAdditionalCharges(ethers.utils.parseEther(String(terminate.penalty)));
                                    console.log(penalty);
                                    alert("Contract terminated with penalty");
                                }}>Terminate with penalty</button>
                            </div>
                            <div className='alert-msg' >*Submit Penalty Amount here. Penalty amount cannot be greater than Security Fees. If the lessee agrees with the penalty Fee then you shall receive it in your wallet, but if lessee disagrees with the penalty fee then you will not receive any Penalty Imposed, & the Security Fee will be burnt</div>
 
                          </div>
                       </td>       
                     </tr>
                   </table>    
                  ))
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
    )
}








// import ethers from 'ethers';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Footer from '../../components/Footer/Index';
// //import Responsive from '../../Responsive/Responsive.css';
// import NavBar from '../../components/Header/NavBar';
// import { ProductManagerFactory } from '../../ethereum/typechain/ProductManagerFactory';
// import { RentalAgreementFactory } from '../../ethereum/typechain/RentalAgreementFactory';
// import Images from '../Images/Image';
// import './MyProduct.scss';


// export default function MyProduct() 
// {
//     const [state, setstate] = useState({title: 'Loading...', location: 'Loading...', description: 'Loading...', maxRent: '', security: '', cancellation: ''})
//     const [discountState, setDiscountState] = useState({added: 0, removed: 0});
//     const [contracts, setContracts] = useState({allContracts: []});
//     const [check, setCheck] = useState({initial: 0, final: 0});
//     const [terminate, setTerminate] = useState({penalty: 0});
//     //@ts-ignore
//     const {address} = useParams(); 
//     //alert(address);
//     const productInstance = ProductManagerFactory.connect(
//         address,
//         window.wallet ?? window.provider
//     );

//     const fetchData = async () => {
//         const title = await productInstance.lessorName();
//         const location = await productInstance.location();
//         const description = await productInstance.description();
//         const maxRent = ethers.utils.formatEther(await productInstance.maxRent());
//         const security = ethers.utils.formatEther(await productInstance.security());
//         const cancellation = ethers.utils.formatEther(await productInstance.cancellationFee());

//         setstate({title, location, description, maxRent, security, cancellation});

//         if(window.wallet===undefined)
//         {
//             alert("Wallet not loaded");
//             return;
//         }
//         const filter = productInstance.filters.NewRentalContract(window.wallet.address,null,null,null,null,null,null,null,null,null);
//         const logs = await productInstance.queryFilter(filter);
//         const parseLogs = logs.map((log) => productInstance.interface.parseLog(log));
//         const contractLogs = parseLogs.map(ele => ele.args);
//         console.log("All contracts:",contractLogs);
//         //@ts-ignore
//         setContracts({allContracts : contractLogs});
//         //return contracts;
//     }

//     useEffect(()=>{(async () =>
//         {
//           await fetchData();
//         }
//       )()
//     },[])

//     function handleChange(e:React.ChangeEvent<HTMLInputElement>)
//     {
//         setDiscountState({...discountState, [e.target.name] : e.target.value})
//     }

//     function handleChecks(e:React.ChangeEvent<HTMLInputElement>)
//     {
//         setCheck({...check, [e.target.name] : e.target.value})
//     }

//     function handlePenalty(e:React.ChangeEvent<HTMLInputElement>)
//     {
//         setTerminate({...terminate, [e.target.name] : e.target.value})
//     }

//     async function handleDiscounts()
//     {
//         const discounts = await productInstance.getDiscounts();
//         alert("Available discounts: " + discounts);
//     }

//     async function handleAdd()
//     {
//         if(window.wallet===undefined)
//         {
//             alert("Wallet not loaded");
//             return;
//         }
//         const disc = await productInstance.connect(window.wallet).addDiscount(discountState.added);
//         alert(discountState.added+"% discount added");
//     }

//     async function handleRemove()
//     {
//         if(window.wallet===undefined)
//         {
//             alert("Wallet not loaded");
//             return;
//         }
//         const disc = await productInstance.connect(window.wallet).removeDiscount(discountState.removed);
//         alert(discountState.removed+"% discount removed");
//     }

//     async function handleDelete()
//     {
//         if(window.wallet===undefined)
//         {
//             alert("Wallet not loaded");
//             return;
//         }
//         const deleted = await window.rentingDappInstance.connect(window.wallet).removeItem(address);
//         console.log(deleted);
//         alert("Listing deleted");
//     }

//     /*const getProduct = async () => {
//         if(window.wallet===undefined)
//         {
//             alert("Wallet not loaded");
//             return;
//         }
//         const filter = productInstance.filters.NewRentalContract(window.wallet.address,null,null,null,null,null,null,null,null,null);
//         const logs = await productInstance.queryFilter(filter);
//         const parseLogs = logs.map((log) => productInstance.interface.parseLog(log));
//         const contracts = parseLogs.map(ele => ele.args);
//         console.log("All contracts:",contracts)
//         setContracts({allContracts : contracts});
//         //return contracts;
//     }*/

//     return (
//         <div>
//             <NavBar />
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <div className="container">
//                 {/* Portfolio Item Heading */}
//                 <h1 className="my-4 catg-body-txt">{state.title}</h1>
//                 {/* Portfolio Item Row */}
//                 <div className="row">
//                     <div className="col-md-8">
//                         <img className="img-fluid" src={Images.path.rlTwo} alt="" />
//                     </div>
//                     <div className="col-md-4">
//                         <h3 className="my-3 catg-body-txt">Product Description</h3>
//                         <h6 className="my-3 catg-body-txt desc-para">{state.description}</h6>

//                         <h3 className="my-3 catg-body-txt">Payment Info</h3>
//                         <h6 className="my-3 catg-body-txt desc-para">Rent: {state.maxRent} ES</h6>
//                         <h6 className="my-3 catg-body-txt desc-para">Security Fee: {state.security} ES</h6>
//                         <h6 className="my-3 catg-body-txt desc-para">Cancellation Fee: {state.cancellation} ES</h6>
//                         <h6 className="my-3 catg-body-txt desc-para">Available Discounts: Loading...</h6>

//                         <h3 className="my-3 catg-body-txt">Pick Up Address</h3>
//                         <h6 className="my-3 catg-body-txt desc-para">{state.location}</h6>
//                         <hr/>

//                         <button className="listing-get-discounts" onClick={handleDiscounts}>Get Discounts</button>
//                         <button className="listing-delete" onClick={handleDelete}>Delete this listing</button>
//                         <br/><br/>

//                         <input
//                             className="select-discount"
//                             type="number"
//                             placeholder="Select discount"
//                             name='added'
//                             onChange={handleChange}
//                             value={discountState.added}
//                         />
//                         <button className="listing-add-discount" onClick={handleAdd}>Add Discount</button>
//                         <br/><br/>

//                         <input
//                             className="select-discount"
//                             type="number"
//                             placeholder="Select discount"
//                             name='removed'
//                             onChange={handleChange}
//                             value={discountState.removed}
//                         />
//                         <button className="listing-remove-discount" onClick={handleRemove}>Remove Discount</button>
//                     </div>
//                 </div>
//                 <br/><br/>
//                 <div className="row">
//                     <table className='table'>
//                         <tr>
//                             <th style={{textAlign: "center"}}>Contract Address</th>
//                             <th style={{textAlign: "center"}}>Lessee</th>
//                             <th style={{textAlign: "center"}}>Start Date</th>
//                             <th style={{textAlign: "center"}}>End Date</th>
//                             <th style={{textAlign: "center"}}>Buttons</th>
//                         </tr>
//                         {
//                             contracts.allContracts.map(ele => (
//                                 <tr>
//                                     <td style={{textAlign: "center"}}>{ele[2]}</td>
//                                     <td style={{textAlign: "center"}}>{ele[1]}</td>
//                                     <td style={{textAlign: "center"}}>{((new Date(Number(ele[3])*1000)).toString()).split("GMT+0530 (India Standard Time)")}</td>
//                                     <td style={{textAlign: "center"}}>{((new Date(Number(ele[4])*1000)).toString()).split("GMT+0530 (India Standard Time)")}</td>
//                                     <td>
//                                         <div className="prd-flex">
//                                             <input 
//                                                 type="number" 
//                                                 placeholder="Enter 1 if OK else 0"
//                                                 style={{width: '160px'}}
//                                                 name='initial'
//                                                 onChange={handleChecks}
//                                                 value={check.initial}                                           
//                                             />
//                                             <button className="listing-rent-small" onClick={async () => {
//                                                 const agreementInstance = RentalAgreementFactory.connect(
//                                                     ele[2],
//                                                     window.wallet ?? window.provider
//                                                 );
//                                                 if(window.wallet===undefined)
//                                                 {
//                                                     alert("Wallet not loaded");
//                                                     return;
//                                                 }
//                                                 const checkInitial = await agreementInstance.connect(window.wallet).initialCheckByLessor(check.initial);
//                                                 console.log(checkInitial);
//                                                 alert("Initial check by Lessor done");
//                                             }}>
//                                                 Initial Lessor
//                                             </button>
//                                         </div>
//                                         <hr/>

//                                         <div>
//                                             <input 
//                                                 type="number" 
//                                                 placeholder="Enter 1 if OK else 0"
//                                                 style={{width: '160px'}}
//                                                 name='final'
//                                                 onChange={handleChecks}
//                                                 value={check.final}                                           
//                                             />
//                                             <button className="listing-rent-small" onClick={async () => {
//                                                 const agreementInstance = RentalAgreementFactory.connect(
//                                                     ele[2],
//                                                     window.wallet ?? window.provider
//                                                 );
//                                                 if(window.wallet===undefined)
//                                                 {
//                                                     alert("Wallet not loaded");
//                                                     return;
//                                                 }
//                                                 const checkFinal = await agreementInstance.connect(window.wallet).finalCheckByLessor(check.final);
//                                                 console.log(checkFinal);
//                                                 alert("Final check by Lessor done");
//                                             }}>
//                                                 Final Lessor
//                                             </button>
//                                         </div>
//                                         <hr/>

//                                         <button className="listing-rent-big" onClick={async () => {
//                                             const agreementInstance = RentalAgreementFactory.connect(
//                                                 ele[2],
//                                                 window.wallet ?? window.provider
//                                             );
//                                             if(window.wallet===undefined)
//                                             {
//                                                 alert("Wallet not loaded");
//                                                 return;
//                                             }
//                                             const terminate = await agreementInstance.connect(window.wallet).terminateNormally();
//                                             console.log(terminate);
//                                             alert("Terminated normally");
//                                         }}>
//                                             Terminate Normally
//                                         </button>
//                                         <hr/>

//                                         <div className="prd-flex">
//                                             <input 
//                                                 type="number" 
//                                                 placeholder="Enter penalty amount"
//                                                 style={{width: '160px'}}
//                                                 name='penalty'
//                                                 onChange={handlePenalty}
//                                                 value={terminate.penalty}                                           
//                                             />
//                                             <button className="listing-rent-big" style={{fontSize:'14px'}} onClick={async () => {
//                                                 const agreementInstance = RentalAgreementFactory.connect(
//                                                     ele[2],
//                                                     window.wallet ?? window.provider
//                                                 );
//                                                 if(window.wallet===undefined)
//                                                 {
//                                                     alert("Wallet not loaded");
//                                                     return;
//                                                 }
//                                                 const penalty = await agreementInstance.connect(window.wallet).terminateWithAdditionalCharges(ethers.utils.parseEther(String(terminate.penalty)));
//                                                 console.log(penalty);
//                                                 alert("Contract terminated with penalty");
//                                             }}>
//                                                 Terminate with penalty
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </table>
//                 </div>

//             </div>
//             <br/>
//             <br/>
//             <br/>
//             <div className='footer-bgd'>
//                 <div className='wrapper-container'>
//                     <Footer />
//                 </div>
//             </div>
//         </div>
//     )
// }
