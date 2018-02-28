import React from 'react';
import ReactModal from 'react-modal';

import '../styles/Modal.scss';

ReactModal.setAppElement('#___gatsby');

const Modal = (props) => {

  // style overrides are here. new stuff is in ReactModal.scss
  const styles = {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(225, 225, 225, 0.75)'
    },
    content : {
      WebkitOverflowScrolling    : 'touch',
      width                      : `${props.width ? props.width : 40}vw`
    }
  };

  return (
    <ReactModal
      isOpen={props.showModal}
      contentLabel="Modal"
      portalClassName="modal"
      overlayClassName="modal-overlay"
      className="modal-container"
      style={styles}>
      { props.children }
    </ReactModal>
  );
};

export default Modal;
