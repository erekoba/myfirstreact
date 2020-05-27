import React from "react";
import SwipeableViews from "react-swipeable-views";
import Booklist from './Booklist';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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
        height: "900px"
    };
    const activeBaseStyle = {
        color: "white",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px"
    };

    return {
        slide0: {
            ...baseStyle,
            backgroundColor: "skyblue"
        },
        slide1: {
            ...baseStyle,
            backgroundColor: "orange"
        },
        slide2: {
            ...baseStyle,
            backgroundColor: "indianred"
        },
        image: {
            width: "auto",
            height: "100%"
        },
        active0: {
            ...activeBaseStyle,
            backgroundColor: "lightseagreen"
        },
        active1: {
            ...activeBaseStyle,
            backgroundColor: "yellowgreen"
        },
        active2: {
            ...activeBaseStyle,
            backgroundColor: "pink"
        }
    };
});

const Swipe = () => {
    const [swipeableActions, setSwipeableActions] = React.useState();
    const [tabIndex, setTabIndex] = React.useState(0);
    const classes = useStyles();
    const items = ["React", "Vue", "angular"];
    const itemNames = ["React", "Vue", "angular"];

    const handleChange = index => {
        setTabIndex(index);
    };

    return (
        <React.Fragment>
            <Tabs
                value={tabIndex}
                onChange={(e, value) => handleChange(value)}
                variant="fullWidth"
                indicatorColor="primary"
            >
                {itemNames.map((itemName, i) => (
                    <Tab
                        className={tabIndex === i && classes[`active${i}`]}
                        label={itemName}
                    />
                ))}
            </Tabs>
            <SwipeableViews
                enableMouseEvents
                action={actions => setSwipeableActions(actions)}
                resistance
                animateHeight
                index={tabIndex}
                onChangeIndex={index => handleChange(index)}
            >
                {items.map((item, index) => (
                    <div className={classes[`slide${index}`]}>
                        {tabIndex === index
                            && <Booklist
                                language={item}
                                getData={keyword => getDataFromAPI(keyword)}  // getDataという名前で関数を渡す
                            />
                        }
                    </div>
                ))}
            </SwipeableViews>
        </React.Fragment>
    );
};
export default Swipe;