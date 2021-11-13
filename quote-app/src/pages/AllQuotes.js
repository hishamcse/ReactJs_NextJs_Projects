import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api";
import {useEffect} from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {

    const {sendRequest: fetchQuotes, status, data: quotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes])

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

    if (status === 'completed' && (!quotes || quotes.length === 0)) {
        return (
            <NoQuotesFound/>
        )
    }

    return (
        <QuoteList quotes={quotes}/>
    )
}

export default AllQuotes;