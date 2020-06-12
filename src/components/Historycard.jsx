import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from '../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0px",
        boxShadow: "0px 0px 0px",
        // maxWidth: 345,
        // border: "solid 1px #FF8500"
    },
    media: {
        height: 140,
        backgroundSize: 'contain'
    },
    skelton: {
        backgroundColor: "#c9c9c9"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    card: {
        boxShadow: "0px 0px 0px",
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
        width: "100%"
    }
}));

const Historycard = props => {

    const classes = useStyles();
    const img_ = ["/img/meyple.jpeg", "/img/joseph.jpeg", ""];
    const oshiid = props.oshiid;
    const contents = {
        title: "aaaa",
        content: "aaaa",
        date: "May 22"
    }
    const Month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    const _d = new Date(props.date.seconds * 1000)
    const m = _d.getMonth()
    const d = _d.getDate().toString()
    // console.log(Month[m] + d)
    // console.log(m)
    // console.log(d)
    // Expansionを全て閉じる
    const updateDataOnExpansion = (collectionName, documentId) => async (event, expanded) => {
        const updatedData = await firebase.firestore()
            .collection(collectionName)
            .doc(documentId)
            .update({
                flg: expanded,
            });
        return
    }
    // ドキュメントIDを指定してFirestoreのデータを更新する関数
    const updateDataOnFirestore = (collectionName, documentId) => async (event, expanded) => {
        const updatedData = await firebase.firestore()
            .collection(collectionName)
            .doc(documentId)
            .update({
                flg: expanded,
            });
        return
    }
    // ドキュメントIDを指定してFirestoreのデータを削除する関数
    const deleteDataOnFirestore = async (collectionName, documentId) => {
        const removedData = await firebase.firestore()
            .collection(collectionName)
            .doc(documentId)
            .delete();
        props.getHitoryFromFirestore();
        return
    }

    const handleChange = (panel) => (event, newExpanded) => {
        props.setExpanded(newExpanded);
    };

    return (

        <div style={{ position: "relative", margin: "12px" }}>
            <ExpansionPanel
                defaultExpanded={props.expanded}
                onChange={updateDataOnFirestore('histories', props.index)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography className={classes.heading}>{props.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                    className={classes.root}
                >
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia

                                className={classes.media}
                                image={props.media}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                {/* <Typography gutterBottom variant="h5" component="h2">
                                    {props.content}
                                </Typography> */}
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                        </Button>
                            <Button size="small" color="primary">
                                Learn More
                        </Button>
                        </CardActions>
                    </Card>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <div style={{ position: "absolute", top: "4px", left: "-54px", width: "24px", height: "24px", borderRadius: "32px", border: "solid 4px #FF8500", backgroundColor: "#FFF" }}></div>
            <Typography variant="body2" color="textSecondary" component="h2"
                style={{ position: "absolute", top: "36px", left: "-54px" }}>
                {Month[m] + d}
            </Typography>
        </div>
    );
}
export default Historycard;