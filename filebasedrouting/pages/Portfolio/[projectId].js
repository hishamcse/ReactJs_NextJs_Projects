import {useRouter} from "next/router";

const ProjectDetails = () => {

    const router = useRouter();

    console.log(router.pathname)
    console.log(router.query)

    return (
        <div>
            <h1>Portfolio Project Details Page</h1>
        </div>
    )
}

export default ProjectDetails;