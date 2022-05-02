import EventList from "../components/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name='description' content='Find the events that allow you to revolve...'/>
            </Head>
            <NewsletterRegistration />
            <EventList items={props.featuredList}/>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/events.json');
    const data = await res.json();

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            featuredList: data.filter((event) => event.isFeatured)
        },
        revalidate: 1000
    }
}

export default HomePage;