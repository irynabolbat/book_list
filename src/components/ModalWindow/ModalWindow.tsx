import React from 'react';
import './ModalWindow.scss';
import success from '../../icons/success.png';
import close from '../../icons/close.png';

type Props = {
  setIsModalOpened: (value: boolean) => void;
}

export const ModalWindow: React.FC<Props> = ({ setIsModalOpened }) => {
  return (
    <div className='ModalContainer'>
      <div className='ModalWindow'>
        <div className='ModalWindow__Content'>
          <div className='ModalWindow__CloseBtn' onClick={(event) => {
            event?.preventDefault();
            setIsModalOpened(false);
          }}>
            <img
              src={close}
              alt="success"
              className='ModalWindow__CloseBtn__Icon'
            />
          </div>
          <div className='ModalWindow__Img'>
            <img
              src={success}
              alt="success"
              className='ModalWindow__Img__Icon'
            />
          </div>

          <div className='ModalWindow__Text'>
            You have successfully deleted the book!
          </div>
        </div>
      </div>
    </div>
  );
}
