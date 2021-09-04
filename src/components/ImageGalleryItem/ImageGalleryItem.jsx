import React, { Component } from "react";

import Modal from "../Modal/Modal";
import s from "./ImageGalleryItem.module.css";

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { showModal } = this.state;
    const { webformatURL, tag, largeImageURL } = this.props;
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            alt={tag}
            onClick={this.toggleModal}
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
