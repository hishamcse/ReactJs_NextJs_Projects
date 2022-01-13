import React, {Component} from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import {Transition} from "react-transition-group";

class App extends Component {

    state = {
        showModal: false,
        showBlock: false
    }

    showModalHandler() {
        this.setState({showModal: true});
    }

    hideModalHandler() {
        this.setState({showModal: false});
    }

    showBlockHandler() {
        this.setState(prevState => ({showBlock: !prevState.showBlock}))
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>
                <button className='Button' onClick={this.showBlockHandler.bind(this)}>
                    Toggle
                </button>
                <br/>

                <Transition in={this.state.showBlock} timeout={1000} mountOnEnter unmountOnExit
                            onEnter={console.log('enter')}
                            onEntering={console.log('entering')}
                            onEntered={console.log('entered')}
                            onExit={console.log('exit')}
                            onExiting={console.log('exiting')}
                            onExited={console.log('exited')}
                >
                    {state => (
                        <div style={{
                            backgroundColor: 'red',
                            width: 100,
                            height: 100,
                            margin: 'auto',
                            transition: 'opacity 1s ease-out',
                            opacity: state === 'exiting' ? 0 : 1
                        }}/>
                    )}
                </Transition>

                <Modal show={this.state.showModal} closed={this.hideModalHandler.bind(this)}/>

                {this.state.showModal && <Backdrop show={this.state.showModal}/>}
                <button className="Button" onClick={this.showModalHandler.bind(this)}>Open Modal</button>
                <h3>Animating Lists</h3>
                <List/>
            </div>
        );
    }
}

export default App;