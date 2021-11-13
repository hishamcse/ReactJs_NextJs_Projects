import {Route} from "react-router-dom";

const Welcome = () => {
    return (
        <div>
          <h1>Welcome page!!</h1>
            <Route path='/welcome/new-user'>
                <p>Welcome, new User!!</p>
            </Route>
        </div>
    )
}

export default Welcome;