import classes from './comment-list.module.css';
import {useEffect, useState} from "react";
import useSWR from "swr";

function CommentList(props) {

    const [comments, setComments] = useState(props.allData);

    const defaultFetcher = url => fetch(url).then(res => res.json())

    const {data, error} = useSWR(`/api/comments/${props.eventId}`, defaultFetcher);

    useEffect(() => {
        if (data) {
            setComments(data.comments);
        }
    }, [data])

    if (error) {
        return (
            <p>Failed!!</p>
        )
    }

    if (!data || !comments) {
        return (
            <p>Loading...</p>
        )
    }

    if(comments.length === 0) {
        return (
            <p>No comment yet. Add one!!</p>
        )
    }

    return (
        <ul className={classes.comments}>
            {/* Render list of comments.json - fetched from API */}
            {comments.map(comment =>
                <li key={comment._id}>
                    <p>{comment.text}</p>
                    <div>
                        By <address>{comment.name}</address>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default CommentList;
