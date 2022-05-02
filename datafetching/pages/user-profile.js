const UserProfile = props => {
    return (
        <h1>{props.username}</h1>
    )
}

// the function returns are same as 'getStaticProps' except it has no 'revalidate' option
// context can now access the full request (may be helpful when we will use cookies)
// as it is the function of 'Server Side Rendering' which executes whenever a new req sent
// that's why, it can't be used at the same file where 'getStaticProps' used
export async function getServerSideProps(context) {

    const {params, req, res} = context;

    // console.log(req)    // same as nodejs req object
    // console.log(res)    // same as nodejs res object

    return {
        props: {
            username: 'Hisham'
        }
    }
}

export default UserProfile;