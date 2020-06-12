// InputForm.jsx
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

const InputForm = props => {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState('');
    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
        setImageName(image.name)
        postDataToCloudstorage(image.name, image);
    };
    // cloudsttageにfileを格納する関数
    const postDataToCloudstorage = async (imageName, image) => {
        // アップロード処理
        await firebase.storage().ref(`/images/${imageName}`).put(image);
        await complete(imageName);
        // console.log('Uploaded a file!');
    };
    const complete = async (imageName) => {
        // 完了後の処理
        // 画像表示のため、アップロードした画像のURLを取得
        await firebase.storage()
            .ref("images")
            .child(imageName)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setImageUrl(fireBaseUrl);
            });
    };
    // useEffectを利用してFirestoreからデータの一覧を取得．
    useEffect(() => {
        const result = postDataToCloudstorage();
    }, [props])
    // Firestoreにデータを送信する関数
    const postDataToFirestore = async (collectionName, postData) => {
        const addedData = await firebase.firestore().collection(collectionName).add(postData);
        return addedData;
    }

    // submitボタンクリック時の処理
    const submitData = async () => {
        if (content === '' || date === '') { return false };

        props.handleClose();
        await postDataToCloudstorage(image.name, image);
        console.log(imageUrl)
        const postData = {
            oshiID: props.oshiid,
            userID: props.userid,
            content: content,
            title: title,
            date: new Date(date),
            flg: true,
            createdat: new Date(Date.now()),
            year: new Date(date).getFullYear(),
            mediaUrl: imageUrl
        }
        await postDataToFirestore('histories', postData);
        setContent('');
        setTitle('');
        setDate('');
        setImage('');
        // console.log(props.Input)
        // props.setInput(props.Input ? false : true)
        props.history.push(`/oshi/${props.index}`)
    }

    return (
        <form action="">
            <ul>
                <li>
                    <label htmlFor="title"><Typography variant="subtitle1">title</Typography></label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="date"><Typography variant="subtitle1">date</Typography></label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="content"><Typography variant="subtitle1">history</Typography></label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="file"><Typography variant="subtitle1">file</Typography></label>
                    <input
                        type="file"
                        id="file"
                        value={imageName.name}
                        onChange={e => handleImage(e)}
                    />
                    <img src={imageUrl} style={{ width: '64px', height: '64px' }}></img>
                </li>
                <button
                    type="button"
                    onClick={submitData}
                >submit</button>

            </ul>
        </form>
    )
}

export default withRouter(InputForm);