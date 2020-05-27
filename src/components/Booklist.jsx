import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const Booklist = props => {
    const [bookData, setBookData] = useState(null);   // ここから追加
    useEffect(() => {
        const result = props.getData?.(props.language).then(response => setBookData(response));
    }, [props])
    return (
        <ul class="list">{console.log(bookData)}
            {     // このあたり編集
                bookData === null
                    ? <CircularProgress />
                    : bookData.data.items.map((x, index) =>
                        x.volumeInfo.imageLinks
                            ? <div class="listChild" key={index}>
                                <li><a href={x.volumeInfo.canonicalVolumeLink}><Typography variant="subtitle1">{x.volumeInfo.title}</Typography></a></li>
                                <img src={x.volumeInfo.imageLinks.thumbnail}></img></div>
                            : <div class="listChild" key={index}>
                                <li><a href={x.volumeInfo.canonicalVolumeLink}><Typography variant="subtitle1">{x.volumeInfo.title}</Typography></a></li>
                                <img src="aaa"></img></div>
                    )
            }
        </ul>
    );
}
export default Booklist;