import React, { Component } from "react";
import s from "./Button.module.css";

export default class Button extends Component {
  render() {
    const { onClickMore } = this.props;
    return (
      <button className={s.Button} type="button" onClick={onClickMore}>
        Load More
      </button>
    );
  }
}
