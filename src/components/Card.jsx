import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import firebase from '../firebase';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "50%",
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

const Characard = props => {

    const classes = useStyles();
    const theme = useTheme();
    const img_ = ["/img/meyple.jpeg", "/img/joseph.jpeg", ""]
    const userid = props.userid;

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.oshiname}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.oshiwork}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                </CardContent>

            </div>
            <CardMedia
                className={classes.cover}
                image={props.oshiurl}
                title="Live from space album cover"
            />
        </Card>
    );
}
export default Characard;