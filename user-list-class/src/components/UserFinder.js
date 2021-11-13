import {Fragment, Component} from 'react';

import Users from './Users';
import classes from './UserFinder.module.css'
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
    static contextType = UsersContext;

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        }
    }

    // similar as useEffect with no dependency or having dependencies which don't change at any case
    componentDidMount() {
        // send http req
        this.setState({
            filteredUsers: this.context.users
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                    filteredUsers: this.context.users.filter((user) =>
                        user.name.includes(this.state.searchTerm))
                }
            );
        }
    }

    searchChangeHandler(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <Fragment>
                <ErrorBoundary>
                    <div className={classes.finder}>
                        <input type='search' onChange={this.searchChangeHandler.bind(this)}/>
                        <Users users={this.state.filteredUsers}/>
                    </div>
                </ErrorBoundary>
            </Fragment>
        );
    }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');
//
//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);
//
//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };
//
//   return (
//     <Fragment>
//       <div className={classes.finder}>
//       <input type='search' onChange={searchChangeHandler} />
//       <Users users={filteredUsers} />
//       </div>
//     </Fragment>
//   );
// };

export default UserFinder;
