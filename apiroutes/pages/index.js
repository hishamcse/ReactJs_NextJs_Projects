import {useRef, useState} from "react";

const HomePage = () => {

    const [allFeedbacks, setAllFeedbacks] = useState([]);

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();

    const submitHandler = e => {
        e.preventDefault();

        const email = emailInputRef.current.value;
        const feedback = feedbackInputRef.current.value;

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({email: email, feedback: feedback}),
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(data => console.log(data))
    }

    const showFeedback = e => {
        e.preventDefault();

        fetch('/api/feedback').then(res => res.json())
            .then(data => {
                setAllFeedbacks(data.feedbacks);
            })
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">Feedback</label>
                    <textarea id="feedback" ref={feedbackInputRef}/>
                </div>
                <button type='submit'>submit</button>
            </form>
            <hr/>
            <button onClick={showFeedback}>Show all feedbacks</button>
            <ul>
                {allFeedbacks.map(feedback => <li key={feedback.id}>{feedback.feedback}</li>)}
            </ul>
        </div>
    )
}

export default HomePage;