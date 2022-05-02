import {useEffect, useState} from "react";
import useSWR from 'swr';

const SalesPage = (props) => {

    // // using traditional client side fetching
    // const [sales, setSales] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/sales.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const transformedData = [];
    //
    //             for (const key in data) {
    //                 transformedData.push({id: key, userName: data[key].userName, volume: data[key].volume})
    //             }
    //
    //             setSales(transformedData);
    //             setIsLoading(false)
    //         })
    // }, [])
    //
    // if (isLoading) {
    //     return (
    //         <p>Loading...</p>
    //     )
    // }

    // using useSWR hook. it is also applicable for any react project
    const [sales, setSales] = useState(props.sales);

    const defaultFetcher = url => fetch(url).then(res => res.json())

    const {data, error} = useSWR('https://nextjs-course-1f723-default-rtdb.firebaseio.com/sales.json', defaultFetcher);

    useEffect(() => {
        if (data) {
            const transformedData = [];

            for (const key in data) {
                transformedData.push({id: key, userName: data[key].userName, volume: data[key].volume})
            }

            setSales(transformedData);
        }
    }, [data])

    if (error) {
        return (
            <p>Failed!!</p>
        )
    }

    if (!data && !sales) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>user: {sale.userName} - ${sale.volume}</li>)}
        </ul>
    )
}

// combining client side fetching with server side fetching
export async function getStaticProps() {
    const res = await fetch('https://nextjs-course-1f723-default-rtdb.firebaseio.com/sales.json');
    const data = await res.json();
    const transformedData = [];

    for (const key in data) {
        transformedData.push({id: key, userName: data[key].userName, volume: data[key].volume})
    }

    return {
        props: {
            sales: transformedData
        },
        revalidate: 10
    }
}

export default SalesPage;