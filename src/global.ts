import { ethers } from 'ethers';

import { RentingDappManager } from './ethereum/typechain/RentingDappManager';
// import { RentingDappManager } from 'eraswap-sdk/dist/typechain/ESN';
import { es, CustomProvider } from 'eraswap-sdk';

declare global {
    interface Window {
      provider: CustomProvider;
      wallet: ethers.Wallet | undefined;
      rentingDappInstance: RentingDappManager;
      ethereum: ethers.providers.ExternalProvider;
    }
  }