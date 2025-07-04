import './App.css';
import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
   Routes,
    Route,
   } from 'react-router-dom';

const App = () =>{
  const pagesize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress,setProgress] = useState(10);

    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress = {setProgress} apikey = {apikey} key="generalH" pagesize={pagesize} country="in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress = {setProgress} apikey = {apikey} key="business" pagesize={pagesize} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress = {setProgress} apikey = {apikey} key="entertainment" pagesize={pagesize} country="in" category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress = {setProgress} apikey = {apikey} key="general" pagesize={pagesize} country="in" category="general"/>} />
          <Route exact path="/health" element={<News setProgress = {setProgress} apikey = {apikey} key="health" pagesize={pagesize} country="in" category="health"/>} />
          <Route exact path="/science" element={<News setProgress = {setProgress} apikey = {apikey} key="science" pagesize={pagesize} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News setProgress = {setProgress} apikey = {apikey} key="sports" pagesize={pagesize} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress = {setProgress} apikey = {apikey} key="technology" pagesize={pagesize} country="in" category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
  export default App;



