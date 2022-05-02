import Link from "next/link";

const HomePage = () => {
    return (
        <div>
            <h1>The home page</h1>
            <ul>
                <li>
                    <Link href='/Portfolio'>Portfolio</Link>
                </li>
                <li>
                    <Link href='/Clients'>Client</Link>
                </li>
            </ul>
        </div>
    )
}

export default HomePage;