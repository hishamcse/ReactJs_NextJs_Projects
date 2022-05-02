import '../styles/globals.css'
import Layout from "../components/layout/layout";
import Head from 'next/head';
import {NotificationContextProvider} from "../store/notification-context";

function MyApp({Component, pageProps}) {
    return (
        <NotificationContextProvider>
            <Layout>
                <Head>
                    {/* it will get overriden or merged if other pages have also Head element*/}
                    <title>Events Project</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    )
}

export default MyApp
