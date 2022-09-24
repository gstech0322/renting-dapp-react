import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Responsive/Responsive.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './ethereum/instances';
import { ethers } from 'ethers';
// import { CustomWallet } from './ethereum/custom-wallet';


ReactDOM.render(
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// era swap life login hook
window.onload = function () {
  !window.opener || window.opener.postMessage('loaded', '*');
};

// load wallet from era swap life
window.addEventListener(
  'message',
  (e) => {
    setTimeout(() => {
      const message = e.data;
      if (message.substring) {
        if (message.substring(0, 2) == '0x') {
          window.wallet = new ethers.Wallet(message).connect(window.provider);
        }
      }
    }, 0);
  },
  false
);