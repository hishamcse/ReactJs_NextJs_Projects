import Link from "next/link";

const Clients = () => {

    const allClients = [
        {id: 'max', name: 'maximilian'},
        {id: 'hisham', name: 'hisham'}
    ]

    return (
        <div>
            <h1>All Clients Page</h1>
            <ul>
                {
                    allClients.map(client => <li key={client.id}>
                        <Link href={`/Clients/${client.id}`}>{client.name}</Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Clients;