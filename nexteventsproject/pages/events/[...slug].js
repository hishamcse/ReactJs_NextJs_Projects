import EventList from "../../components/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/event-detail/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

const FilteredEvents = (props) => {

    let pageHeadData =
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content='filtered events showing'/>
        </Head>

    if (props.loading) {
        return (
            <Fragment>
                {pageHeadData}
                <p className='center'>Loading...</p>
            </Fragment>
        )
    }

    if (props.error) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Wrong input!! Please check your input again!</p>
                </ErrorAlert>
            </Fragment>
        )
    }

    pageHeadData =
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`all events for month ${props.filteredMonth}, ${props.filteredYear}`}/>
        </Head>

    if (props.events && props.events.length !== 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ResultsTitle date={new Date(props.filteredYear, props.filteredMonth)}/>
                <EventList items={props.events}/>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <ErrorAlert>
                <p>No Event Found!!</p>
            </ErrorAlert>
        </Fragment>
    )
}

export async function getServerSideProps(context) {

    const {params} = context;

    if (!params.slug) {
        return {
            props: {
                loading: true
            }
        }
    }

    const filteredYear = +params.slug[0];
    const filteredMonth = +params.slug[1];

    if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 ||
        filteredMonth < 1 || filteredMonth > 12) {
        return {
            props: {
                error: true
            }
            // notFound or redirect would also be an option
        }
    }

    const res = await fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/events.json');
    const data = await res.json();

    const events = data.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1;
    });

    return {
        props: {
            events, filteredYear, filteredMonth
        }
    }
}

export default FilteredEvents;