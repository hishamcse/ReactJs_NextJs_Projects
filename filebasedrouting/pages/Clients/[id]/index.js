import {useRouter} from "next/router";
import Link from "next/link";

const SingleClient = () => {

    const allClients = [
        {id: 'max', name: 'maximilian'},
        {id: 'hisham', name: 'hisham'}
    ]

    const router = useRouter();
    console.log(router.query);

    const clickHandler = async (e) => {
        e.preventDefault();

        // 1 (if back navigation allowed)
        // await router.push('/Clients/max/1212');

        // 2 (if back navigation not allowed)
        // await router.replace('/Clients/max/1212');

        // 3 (using object)
        await router.push({
            pathname: '/Clients/[id]/[clientProjectId]',
            query: {id: 'max', clientProjectId: 342374}
        });
    }

    return (
        <div>
            <h1>Single Client Page</h1>
            <ul>
                {
                    allClients.map(client => <li key={client.id}>
                        <Link href={{
                            pathname: '/Clients/[id]/[clientProjectId]',
                            query: {id: client.id, clientProjectId: 1212}
                        }}>
                            {client.name}</Link>
                    </li>)
                }
            </ul>
            <button onClick={clickHandler}>Click Me!!</button>
        </div>
    )
}

export default SingleClient;