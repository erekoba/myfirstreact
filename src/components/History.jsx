import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Historycard from './Historycard';
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
import firebase from '../firebase';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputForm from './InputForm';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        border: "solid 1px #FF8500"
    },
    media: {
        height: 140,
    },
    skelton: {
        backgroundColor: "#c9c9c9"
    },
    footer: {
        height: '54px',
        width: '54px',
        borderRadius: '36px',
        backgroundColor: '#FF8500',
        color: '#FFF', position: "fixed",
        top: '640px',
        left: '320px',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const History = props => {

    const [historyList, setHistorylist] = useState(null);
    console.log(historyList)
    // firestoreから全データを取得してstateに格納する関数
    const getHistoryFromFirestore = async () => {
        const itemListArray = await firebase.firestore().collection('histories')
            .where('oshiID', '==', props.oshiid)
            .where('userID', '==', props.userid)
            .orderBy('date', 'desc')
            .get();

        const todoArray = itemListArray.docs.map(x => {
            return {
                id: x.id,
                data: x.data(),
            }
        })
        setHistorylist(todoArray);
        return todoArray;
    }

    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = getHistoryFromFirestore();
    }, [props])


    const classes = useStyles();
    const histories = ["a", "b", "c"];
    const oshiid = props.oshiid;
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = useState(null);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="body2" color="textSecondary"
                style={{ padding: "12px 0px 0 36px", fontWeight: "900", fontSize: "Large" }}
            >Now</Typography>
            <div style={{ display: "flex", padding: "6px 24px" }}>
                <div>
                    <div style={{ height: "100%", width: "5px", backgroundColor: "#FF8500", margin: "0 24px", borderRadius: "5px", }}></div>
                </div>
                <div style={{ width: "100%" }}>
                    {historyList?.map((history, index) => (
                        <Historycard
                            id={oshiid}
                            title={history.data.title}
                            content={history.data.content}
                            media={history.data.mediaUrl}
                            date={history.data.date}
                            key={history.id}
                            index={history.id}
                            getHistoryFromFirestore={getHistoryFromFirestore}
                            expanded={history.data.flg}
                            setExpanded={setExpanded}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.footer} onClick={handleOpen}>
                <img src='/icon/footer.svg' style={{ height: '54px' }}></img>
            </div>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <InputForm
                                oshiid={props.oshiid}
                                userid={props.userid}
                                index={props.index}
                                getHistoryFromFirestore={getHistoryFromFirestore}
                                handleClose={handleClose}
                                setInput={props.setInput}
                                Input={props.Input}
                            />
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}
export default History;