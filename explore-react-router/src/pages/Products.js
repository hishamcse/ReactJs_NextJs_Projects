import {Fragment} from "react";
import {Link} from "react-router-dom";

const Products = () => {
    return (<Fragment>
        <h1>Products Page!!</h1>
        <ul>
            <li>
                <Link to='/products/p1'> A book </Link>
            </li>
            <li>
                <Link to='/products/p2'> A carpet </Link>
            </li>
            <li>
                <Link to='/products/p3'> A course </Link>
            </li>
        </ul>
    </Fragment>)
}

export default Products;