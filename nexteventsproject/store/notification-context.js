import {createContext, useEffect, useState} from "react";

const NotificationContext = createContext({
    notification: null,   // {title, message, status}
    showNotification: (notificationData) => {},
    hideNotification: () => {}
})

export const NotificationContextProvider = (props) => {

    const [activeNotification, setActiveNotification] = useState(null);

    useEffect(() => {
        if(activeNotification && activeNotification.status !== 'pending') {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    }

    const notificationObj = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={notificationObj}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;