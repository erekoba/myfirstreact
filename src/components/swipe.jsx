import React, { useState, useEffect } from 'react';
import SwipeableViews from "react-swipeable-views";
import Booklist from './Booklist';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Characard from './Card';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types'
import firebase from '../firebase';

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// 入力値に`books`を追加して出力するシンプルな関数を定義
const getDataFromAPI = async keyword => {
    const requesturl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
    const result = await axios.get(`${requesturl}${keyword}`)
    return result;
};

const useStyles = makeStyles(() => {
    const baseStyle = {
        color: "white",
        // height: "164px",
        padding: "8px"
    };
    const activeBaseStyle = {
        color: "white",
        height: "12px",
        width: "12px",
        borderRadius: "24px",
    };

    return {
        slide0: {
            ...baseStyle,
            backgroundColor: "#eFeFeF",
        },
        slide1: {
            ...baseStyle,
            backgroundColor: "#eFeFeF",
        },
        slide2: {
            ...baseStyle,
            backgroundColor: "#efefef",
        },
        image: {
            width: "auto",
            height: "100%"
        },
        active0: {
            ...activeBaseStyle,
            backgroundColor: "#fff"
        },
        active1: {
            ...activeBaseStyle,
            backgroundColor: "#B9B9B9"
        },
        card: {
            backgroundColor: "#fff",
            height: "180px",
            borderRadius: "4px",
            border: "1px solid #c3c3c3"
        }
    };
});

const Swipe = props => {

    const [todoList, setTodoList] = useState(null);
    // firestoreから全データを取得してstateに格納する関数
    const getTodosFromFirestore = async () => {
        const itemListArray = await firebase.firestore().collection('oshies')
            .where('userID', '==', props.userid)
            .get();
        const todoArray = itemListArray.docs.map(x => {
            return {
                id: x.id,
                data: x.data(),
            }
        })
        setTodoList(todoArray);
        return todoArray;
    }
    console.log(todoList)
    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = getTodosFromFirestore();
    }, [props])
    const [swipeableActions, setSwipeableActions] = React.useState();
    const [tabIndex, setTabIndex] = React.useState(0);
    const classes = useStyles();
    const handleChange = index => {
        setTabIndex(index);
        props.history.push(`/oshi/${index}`)
    };

    return (
        <React.Fragment>
            {/* <Tabs
                value={tabIndex}
                onChange={(e, value) => handleChange(value)}
                style={{}}
                indicatorColor="none"
            >
                {itemNames.map((itemName, i) => (
                    <Tab
                        className={tabIndex === i ? classes[`active0`] : classes[`active1`]}
                    />
                ))}
            </Tabs> */}
            <SwipeableViews
                enableMouseEvents
                action={actions => setSwipeableActions(actions)}
                resistance
                animateHeight
                index={tabIndex}
                onChangeIndex={index => handleChange(index)}
            >
                {todoList?.map((value, index) => (
                    <div className={classes[`slide${index}`]}>
                        <Characard
                            oshiid={value.id}
                            oshiname={value.data.oshi}
                            oshiurl={value.data.oshiurl}
                            oshiwork={value.data.work}
                            index={index}
                        />


                        {/* {tabIndex === index
                            && <Booklist
                                language={item}
                                getData={keyword => getDataFromAPI(keyword)}  // getDataという名前で関数を渡す
                            />
                        } */}
                    </div>
                ))}
            </SwipeableViews>
        </React.Fragment >
    );
};
export default withRouter(Swipe);