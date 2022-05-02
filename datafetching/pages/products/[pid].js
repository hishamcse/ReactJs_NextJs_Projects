import path from "path";
import fs from "fs/promises";

const ProductDetails = (props) => {

    // if fallback: 'blocking'. then no need to use it
    // otherwise, reloading the generated page by request will give error
    if (!props.product) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <h1>{props.product.title}</h1>
            <p>{props.product.description}</p>
        </div>
    )
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
}

export async function getStaticProps(context) {
    const {params} = context;

    const finalData = await getData();

    const product = finalData.products.find(prod => prod.id === params.pid);

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product: product
        }
    }
}

export async function getStaticPaths() {

    const finalData = await getData();
    const pathWithParams = finalData.products.map(product => ({params: {pid: product.id}}));

    return {
        paths: pathWithParams,
        fallback: true          // true means no need to generate 'all' pages previously.just only the params given here
    }
}

export default ProductDetails;