import * as path from "path";
import * as fs from "fs/promises";
import Link from "next/link";

const HomePage = (props) => {
    return (
        <ul>
            {props.products.map(product =>
                <li><Link href={`/products/${product.id}`}>{product.title}</Link></li>)
            }
        </ul>
    )
}

export async function getStaticProps(context) {          // SSG (static site generation)
    console.log('(Re-)generating');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const data = await fs.readFile(filePath);
    const finalData = JSON.parse(data);

    if (!finalData) {
        return {
            redirect: {
                destination: '/no-data'              // path will be here
            }
        }
    }

    if (finalData.products.length === 0) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            products: finalData.products
        },
        revalidate: 10      // ISR (Incremental Static Regeneration). in every 10 seconds, it will regenerate. only at production
        // redirect, notFound
    }
}

export default HomePage;