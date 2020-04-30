import React from 'react';

import { useRootData } from 'hooks/useRootData';

import { ZK_EXPLORER } from 'constants/links';

import './Transaction.scss';
import { LottiePlayer } from '../Common/LottiePlayer';
import successCheckmark from 'images/success-checkmark.json';

interface IExecutedTxProps {
  addressValue: string;
  handleCancel: any;
  hash: any;
  inputValue: string;
  setTransactionType: (
    transaction: 'deposit' | 'withdraw' | 'transfer' | undefined,
  ) => void;
  symbolName: string;
  title: string;
}

export const ExecutedTx: React.FC<IExecutedTxProps> = ({
  addressValue,
  hash,
  handleCancel,
  inputValue,
  setTransactionType,
  symbolName,
  title,
}): JSX.Element => {
  const { setWalletAddress, walletAddress } = useRootData(
    ({ setWalletAddress, walletAddress }) => ({
      setWalletAddress,
      walletAddress: walletAddress.get(),
    }),
  );

  return (
    <>
      <button
        onClick={() => {
          handleCancel();
        }}
        className='transaction-back'
      ></button>
      <h2 className='transaction-title'>
        {title === 'Deposit' && 'Deposit initiated'}
        {title === 'Withdraw' && 'Withdrawal initiated'}
        {title === 'Send' && 'Transfer complete'}
      </h2>
      <LottiePlayer src={successCheckmark} />
      {title === 'Send' && (
        <span className='transaction-field-title'>
          {'Recepient:'}
          <h3>{walletAddress.length > 0 && walletAddress[0]}</h3>
          <p>{addressValue}</p>
        </span>
      )}
      <span className='transaction-field-title'>
        {title === 'Send' && 'Amount + fee'}
        {title === 'Withdraw' && 'Withdrawn'}
        {title === 'Deposit' && 'Deposited:'}
        <p className='transaction-field-amount'>
          {inputValue} {symbolName}
        </p>
      </span>
      <p className='transaction-hash'>
        <a
          target='_blank'
          href={`${ZK_EXPLORER}/${
            typeof hash === 'string' ? hash : hash?.hash
          }`}
        >
          {'Link to transaction'}
        </a>
      </p>
      <button
        className='btn submit-button'
        onClick={() => {
          handleCancel();
          setWalletAddress([]);
          setTransactionType(undefined);
        }}
      >
        {'OK'}
      </button>
    </>
  );
};
