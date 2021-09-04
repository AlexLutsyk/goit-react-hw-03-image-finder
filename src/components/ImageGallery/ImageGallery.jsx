import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../../API/API";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import s from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
  state = {
    page: 1,
    images: null,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { keyWord } = this.props;

    if (prevProps.keyWord !== keyWord) {
      this.setState({ status: "pending", page: 1 });
      API(keyWord, page)
        .then((images) => {
          if (images.total === 0) {
            toast.error(`Sorry this ${keyWord} image is not found.`);
            this.setState({ status: "rejected" });
            return;
          }

          this.setState({
            images: images.hits,
            status: "resolved",
          });
        })
        .catch((error) => {
          this.setState({
            error: error,
            status: "rejected",
          });
        });
    }
  }

  getNextPage = () => {
    console.log("on Load next page");
    const { page } = this.state;
    const { keyWord } = this.props;
    API(keyWord, page).then((images) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...images.hits],
        status: "resolved",
        page: prevState.page + 1,
      }));
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  render() {
    const { images, status } = this.state;

    if (status === "idle") {
      return (
        <>
          <p>Enter a keyword to find images.</p>
        </>
      );
    }
    if (status === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }
    if (status === "rejected") {
      return <p>Wrong keyword. Please try again.</p>;
    }

    if (status === "resolved") {
      return (
        <div>
          <ul className={s.ImageGallery}>
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                tags={image.tags}
                largeImageURL={image.largeImageURL}
              />
            ))}
          </ul>
          <Button onClickMore={this.getNextPage} />
        </div>
      );
    }
  }
}
