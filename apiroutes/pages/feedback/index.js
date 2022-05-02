import path from "path";
import {allFeedBacks} from "../api/feedback/index";
import {Fragment, useState} from "react";

const Feedback = props => {

    const [feedback, setFeedback] = useState();

    const details = (id) => {
        fetch(`/api/feedback/${id}`).then(res => res.json())
            .then(data => {
                setFeedback(data.feedback)
            });
    }

    return (
        <Fragment>
            {feedback && <p>{feedback.email}</p>}
            <ul>
                {props.feedbacks.map(feedback =>
                    <li key={feedback.id}>{feedback.feedback}
                        <button onClick={details.bind(null, feedback.id)}>Show Email</button>
                    </li>)}
            </ul>
        </Fragment>
    )
}

// if we want to get data from our own api route files, then we should write pure nodejs code here.
// using 'fetch' is not recommended
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'feedback.json')
    const data = allFeedBacks(filePath);

    return {
        props: {
            feedbacks: data
        },
        revalidate: 100
    }
}

export default Feedback;