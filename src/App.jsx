import React from 'react';
import Booklist from './components/Booklist';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AlarmIcon from '@material-ui/icons/Alarm';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Swipe from './components/swipe';
import "./styles.css";

// 入力値に`books`を追加して出力するシンプルな関数を定義
const getDataFromAPI = async keyword => {
  const requesturl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  const result = await axios.get(`${requesturl}${keyword}`)
  return result;
}

const App = () => {
  const languages = ['React', 'Vue', 'Angular'];

  return (

    <BrowserRouter>
      <div>
        <Swipe />
      </div>

      <ul>
        <li><Link to='/'><Typography variant="subtitle1">
          React
              </Typography></Link></li>
        <li><Link to='/vue'><Typography variant="subtitle1">
          Vue
              </Typography></Link></li>
        <li><Link to='/angular'><Typography variant="subtitle1">
          angular
              </Typography></Link></li>
      </ul>

      <Route
        exact
        path='/'
        render={
          props =>
            <Booklist
              language={languages[0]}
              getData={keyword => getDataFromAPI(keyword)}  // getDataという名前で関数を渡す
            />}
      />
      <Route
        path='/vue'
        render={props =>
          <Booklist
            language={languages[1]}
            getData={keyword => getDataFromAPI(keyword)}  // getDataという名前で関数を渡す
          />}
      />
      <Route
        path='/angular'
        render={props =>
          <Booklist
            language={languages[2]}
            getData={keyword => getDataFromAPI(keyword)}  // getDataという名前で関数を渡す
          />}
      />

    </BrowserRouter >
  );
}

const styles = {
  root: {
    width: "640px",
    height: "120px",
    paddingTop: "15px",
    paddingLeft: "10px",
    backgroundColor: "lightgray",
  },
  paper: {
    width: "200px",
    height: "100px",
    textAlign: "center",
  }
};
export default App;
