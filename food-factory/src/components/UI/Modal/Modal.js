import React from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css';
import Card from "../Card/Card";

const BackDrop = props => {
    return (<div className={styles.backdrop} onClick={props.onClick}>
    </div>)
}

const Overlay = props => {
    return (
        <Card className={styles.modal}>
            {props.children}
        </Card>
    )
}

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onClick={props.onClick}/>, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById('overlay-root'))}
        </React.Fragment>
    );
}

export default Modal;