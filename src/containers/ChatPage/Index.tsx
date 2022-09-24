import React, { Component } from 'react';
import './ChatPage.scss';
import Images from '../../containers/Images/Image';
import Responsive from '../../Responsive/Responsive.css';
import NavBar from '../../components/Header/NavBar';
import Footer from '../../components/Footer/Index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class ChatPage extends Component {
	public state: any;
	public handleInputChange: any;

    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        return (
            <div>
                <NavBar />
                <div className='ChatPaget-wrapper-container'>
                    <div className='row'>
                        <div className='r-col-d-5'>
                            <div className='chat-first-container'>
                                <div className='chat-top-style'>
                                <h5>Chats</h5>
                                <form>
                                    <input
                                        placeholder='Search'
                                        className='chat-search-field'
                                        onChange={this.handleInputChange}
                                    />
                                    <span className='chat-search-icon'> 
                                    <FontAwesomeIcon icon={faSearch} color='#A7A7A7'/>
                                    </span>
                                </form>
                                </div>
                                <div className='single-chats'>
                                <img className='chat-user-img' src={Images.path. rlTwo}/>
                                <div className='Interaction-container'>
                                <p className='Owner-title'>Casa do Rio-Beach and Mountains</p>
                                <p className='customer-text-style'>You: Lorem ipsum dimmy text kasasd...</p>
                                </div>
                                   </div>

                                   <div className='single-chats'>
                                <img className='chat-user-img' src={Images.path. rlTwo}/>
                                <div className='Interaction-container'>
                                <p className='Owner-title'>Casa do Rio-Beach and Mountains</p>
                                <p className='customer-text-style'>You: Lorem ipsum dimmy text kasasd...</p>
                                </div>
                                   </div>
                                   <div className='single-chats'>
                                <img className='chat-user-img' src={Images.path. rlTwo}/>
                                <div className='Interaction-container'>
                                <p className='Owner-title'>Casa do Rio-Beach and Mountains</p>
                                <p className='customer-text-style'>You: Lorem ipsum dimmy text kasasd...</p>
                                </div>
                                   </div>
                                   <div className='single-chats'>
                                <img className='chat-user-img' src={Images.path. rlTwo}/>
                                <div className='Interaction-container'>
                                <p className='Owner-title'>Casa do Rio-Beach and Mountains</p>
                                <p className='customer-text-style'>You: Lorem ipsum dimmy text kasasd...</p>
                                </div>
                                   </div>
                            </div>
                        </div>
                        <div className='r-col-d-7'>
                            <div className='chat-second-container'>
                            <img className='empty-chat-img' src={Images.path.EmptyChat}/>
                           <h5 className='chat-select-txt'>Select A chat to View conversation</h5>
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




export default ChatPage;