import {useRouter} from "next/router";

const ClientProject = () => {

    const router = useRouter();
    console.log(router.query);

    return (
        <div>
            <h1> Client Project Page</h1>
        </div>
    )
}

export default ClientProject;