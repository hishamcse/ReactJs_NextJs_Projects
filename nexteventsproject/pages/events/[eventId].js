import {Fragment} from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

const EventDetail = (props) => {

    if (!props.event) {
        return (
            <p>Loading...</p>
        )
    }

    const pageHeadData =
            <Head>
                <title>NextJs Events</title>
                <meta name='description' content={`a event for the ${props.event.title}`}/>
            </Head>

    const eventDetails = props.event;

    if (eventDetails) {
        return (
            <Fragment>
                {pageHeadData}
                <EventSummary title={eventDetails.title}/>
                <EventLogistics date={eventDetails.date} address={eventDetails.location}
                                image={eventDetails.image} imageAlt={eventDetails.title}/>
                <EventContent>
                    <p>{eventDetails.description}</p>
                </EventContent>

                <Comments eventId={eventDetails.id} />
            </Fragment>
        )
    }

    return (
        <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>Error! No Event Found!!</p>
            </ErrorAlert>
        </Fragment>
    )
}

const getData = async () => {
    const res = await fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/events.json');
    return await res.json();
}

export async function getStaticProps(context) {
    const data = await getData();
    const event = data.find((event) => event.id === context.params.eventId);

    if (!event) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            event: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const finalData = await getData();
    const pathWithParams = finalData.map(event => ({params: {eventId: event.id}}));

    return {
        paths: pathWithParams,
        fallback: true
    }
}

export default EventDetail;