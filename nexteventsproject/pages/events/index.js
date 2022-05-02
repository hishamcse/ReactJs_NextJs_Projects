import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import useSWR from 'swr';
import EventList from "../../components/event-list";
import EventSearch from "../../components/event-detail/event-search";

const AllEvents = (props) => {

    const router = useRouter();

    const searchEvents = async (year, month) => {
        await router.push(`/events/${year}/${month}`)
    }

    const [events, setEvents] = useState(props.allData);

    const defaultFetcher = url => fetch(url).then(res => res.json())

    const {data, error} = useSWR('https://nextjs-course-1f723-default-rtdb.firebaseio.com/events.json', defaultFetcher);

    useEffect(() => {
        if (data) {
            setEvents(data);
        }
    }, [data])

    if (error) {
        return (
            <p>Failed!!</p>
        )
    }

    if (!data && !events) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <Fragment>
            <EventSearch onSearch={searchEvents}/>
            <EventList items={events}/>
        </Fragment>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/events.json');
    const data = await res.json();

    return {
        props: {
            allData: data
        },
        revalidate: 100
    }
}

export default AllEvents;