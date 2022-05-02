import {useContext, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context";

function Comments(props) {

    const {eventId} = props;
    const notificationCtx = useContext(NotificationContext);

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {

        notificationCtx.showNotification({
            title: 'Adding Comment...',
            message: 'Processing comment...',
            status: 'pending'
        })

        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json()
            }

            return res.json().then(data => {
                throw new Error(data.message || 'Something went wrong')
            })
        }).then(data => {
            notificationCtx.showNotification({
                title: 'Comment Added',
                message: 'Successfully added comment',
                status: 'success'
            })
        }).catch(err => {
            notificationCtx.showNotification({
                title: 'Failed adding comment',
                message: err.message || 'Something went wrong',
                status: 'error'
            })
        })
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler}/>}
            {showComments && <CommentList eventId={eventId}/>}
        </section>
    );
}

export default Comments;
