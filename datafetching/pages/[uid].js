const UserIdPage = props => {
    return (
        <h1>{props.id}</h1>
    )
}

export async function getServerSideProps(context) {

    const {params} = context;

    if(!params.uid) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            id: 'userid - ' + params.uid
        }
    }
}

export default UserIdPage;