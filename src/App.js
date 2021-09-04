import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';



import './App.css';


class App extends Component {
  state = {
    keyWord: '',
  }

  handleKeywordSubmit = (imageKeyWord) => {
    this.setState({ keyWord: imageKeyWord });
  }


  render() {
    const { keyWord } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmitKeyword={this.handleKeywordSubmit}/>
        <ImageGallery keyWord={keyWord} />
        

        <ToastContainer position="top-right"
          autoClose={3000}
          />
    </div>
  );
  }
  
}

export default App;
