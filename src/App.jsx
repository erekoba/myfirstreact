import React, { useState, useEffect } from 'react';
import Booklist from './components/Booklist';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AlarmIcon from '@material-ui/icons/Alarm';

import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Swipe from './components/swipe';
import "./styles.css";
import History from './components/History';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './firebase';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}));
const App = props => {
  const [Input, setInput] = useState(true);
  console.log(Input)
  const [todoList, setTodoList] = useState(null);
  // firestoreから全データを取得してstateに格納する関数
  const getUserFromFirestore = async () => {
    const itemListArray = await firebase.firestore().collection('oshies')
      .where('userID', '==', 'niFkenfMWIVSpO5YmpQT')
      .get();
    const todoArray = itemListArray.docs.map(x => {
      return {
        id: x.id,
      }
    })

    setTodoList(todoArray);
    return todoArray;

  }

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getUserFromFirestore();
  }, [props])


  const languages = ['React', 'Vue', 'Angular'];
  const classes = useStyles();
  const userid = 'niFkenfMWIVSpO5YmpQT';
  const oshilists = [0, 1, 2]

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar position="fixed" style={{ backgroundColor: "#FF8500" }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
          </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ height: "64px" }}></div>
      <div>
        <Swipe
          userid={userid} />
      </div>

      {todoList === null
        ? <Route
          exact
          path={`/`}
          render={
            props =>
              <History
                userid={userid}
              />}
        />
        : <Route
          exact
          path={`/oshi`}
          render={
            props =>
              <History
                userid={userid}
                oshiid={todoList[0].id}
              />
          }
        />
      }
      {todoList?.map((oshi, index) => (
        <Route
          exact
          path={`/oshi/${index}`}
          render={
            props =>
              <History
                userid={userid}
                oshiid={oshi.id}
                index={index}
              />}
        />
      ))}

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
