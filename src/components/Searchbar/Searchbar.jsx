import React, { Component } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    imageKeyWord: "",
  };

  handleChange = (e) => {
    this.setState({ imageKeyWord: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { imageKeyWord } = this.state;
    if (imageKeyWord.trim() === "") {
      toast.error("Please enter a word.");
      return;
    }

    const { onSubmitKeyword } = this.props;
    onSubmitKeyword(this.state.imageKeyWord);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.keyWord}
          />

          <button type="submit" className={s.searchFormButton}>
            <BiSearchAlt />
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
