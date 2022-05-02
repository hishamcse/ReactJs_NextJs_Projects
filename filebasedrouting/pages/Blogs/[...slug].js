// /Blogs/12
// /Blogs/22128/3432/2131...
// all valid in 'catchAll'
// but not valid: /Blogs. it will go to another route
// to make this also valid, need [[...slug]]

import {useRouter} from "next/router";

const BlogPost = () => {

    const router = useRouter();
    console.log(router.query);          // array of values for 'slug'

    return (
        <div>
            <h1>Blog Post Page</h1>
        </div>
    )
}

export default BlogPost;