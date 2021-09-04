import React, { Component } from "react";
import { createPortal } from "react-dom";

import s from ".//Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscape);
  }

  onOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  onEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.modalBackdrop} onClick={this.onOverlay}>
        <div className={s.modalContent}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
