import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {

    const params = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, error, data: quote} = useHttp(getSingleQuote)

    const {quoteId} = params;

    useEffect(() => {
        sendRequest(quoteId)
    }, [quoteId, sendRequest])

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if (error) {
        return (
            <p className='centered focused'>
                {error}
            </p>
        )
    }

    if (!quote) {
        return <NoQuotesFound/>
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link to={`${match.url}/comments`} className='btn--flat'>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    )
}

export default QuoteDetail;