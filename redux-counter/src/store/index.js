import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counter";
import authSlice from "./auth";

// const store = createStore(counterSlice.reducer)       // only applicable for one slice

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;

// const counterReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'increment':
//             return {
//                 counter: state.counter + 1,
//                 showCounter: state.showCounter
//             }
//         case 'increase':
//             return {
//                 counter: state.counter + action.amount,
//                 showCounter: state.showCounter
//             }
//         case 'decrement':
//             return {
//                 counter: state.counter - 1,
//                 showCounter: state.showCounter
//             }
//         case 'toggle':
//             return {
//                 counter: state.counter,
//                 showCounter: !state.showCounter
//             }
//         default:
//             return state;
//     }
// }
//
// const store = createStore(counterReducer);

// export default store;