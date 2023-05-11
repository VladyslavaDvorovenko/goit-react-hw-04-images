import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ closeModal, largeImageURL }) => {
  const onOverlay = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const onEscape = event => {
      if (event.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={onOverlay}>
      <div className={css.modal}>
        <img className={css.img} src={largeImageURL} alt="largeImageURL" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
