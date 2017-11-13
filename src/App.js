import React from 'react'
import './App.css'
import TopBar from './TopBar'
import Sorter from './Sorter'
import Post from './Post'
import Comment from './Comment'
import Navigation from './Navigation'

class App extends React.Component {
  render() {
    return (
      <div className="App">
       <TopBar/>
       <Sorter/>
       <Post/>
       <Comment/>
       <Navigation/>
      </div>
    );
  }
}

export default App;
