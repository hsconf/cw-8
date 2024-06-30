import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import axiosApi from "../../axiosApi";
import { Quote } from "../../types";
import { useParams} from "react-router-dom";

const Home = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const params = useParams();

    const fetchQuotes = async () => {
        try {
            const response = await axiosApi.get<{ [key: string]: Quote }>('quote.json');
            if (response.data) {
                const fetchedQuotes = Object.keys(response.data).map((id: string) => ({
                    ...response.data[id],
                    id,
                }));
                setQuotes(fetchedQuotes);
            }
        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, [params.categoryId]);

    const handleEdit = (id: string) => {
        window.location.href = `/edit/${id}`;
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosApi.delete(`/quote/${id}.json`);
            setQuotes(quotes.filter(quote => quote.id !== id));
        } catch (error) {
            console.error("Error deleting quote:", error);
        }
    };

    return (
        <div className="d-flex mt-3">
            <Sidebar />
            <div className="quote-cards">
                {quotes.map(quote => (
                    <Card
                        key={quote.id}
                        author={quote.author}
                        quote={quote.quote}
                        edit={() => handleEdit(quote.id)}
                        del={() => handleDelete(quote.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
