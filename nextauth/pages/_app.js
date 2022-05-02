import Layout from '../components/layout/layout';
import '../styles/globals.css';
import {Provider} from "next-auth/client";

function MyApp({Component, pageProps}) {
    return (
        <Provider session={pageProps.session}>     {/* in case page has session it will be passed here and thus optimized  */}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
