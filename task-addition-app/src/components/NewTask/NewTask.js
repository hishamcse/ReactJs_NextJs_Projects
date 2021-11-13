import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {

    const populateData = (taskText, data) => {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = {id: generatedId, text: taskText};

        props.onAddTask(createdTask);
    }

    const {isLoading, error, sendRequest: addTask} = useFetch();

    const enterTaskHandler = (taskText) => {
        addTask({
            url: 'https://react-http-d4388-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: {text: taskText},
            headers: {
                'Content-Type': 'application/json',
            }
        }, populateData.bind(null, taskText))
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;