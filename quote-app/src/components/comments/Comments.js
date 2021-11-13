import {useCallback, useEffect, useState} from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {getAllComments} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const {sendRequest, data:comments,status } = useHttp(getAllComments);

    useEffect(() => {
       sendRequest(params.quoteId);
    },[sendRequest, params.quoteId])

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addCommentHandler = useCallback(() => {
        sendRequest(params.quoteId);
    }, [sendRequest,params.quoteId])

    let commentData;

    if(status === 'pending'){
        commentData = <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if(status === 'completed' && comments && comments.length > 0) {
        commentData = <CommentsList comments={comments}/>
    }

    if(status === 'completed' && (!comments || comments.length === 0)) {
        commentData = <p className='centered'>No comment has been added yet!!</p>
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm onAddedComment={addCommentHandler} quoteId={params.quoteId}/>}
            {commentData}
        </section>
    );
};

export default Comments;