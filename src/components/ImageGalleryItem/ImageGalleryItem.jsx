import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImage}
        onClick={toggleModal}
        src={webformatURL}
        alt={tags}
      />
      {openModal && (
        <Modal largeImageURL={largeImageURL} closeModal={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
