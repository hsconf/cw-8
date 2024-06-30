import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { Quote } from "../../types";

const EditQuote = () => {
    const { quoteId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<Quote | null>(null);

    const fetchQuote = async () => {
        try {
            const response = await axiosApi.get<Quote>(`/quote/${quoteId}.json`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, [quoteId]);

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data) {
            await axiosApi.put(`/quote/${quoteId}.json`, data);
            navigate("/");
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <form className="form-control" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Выберите категорию</label>
                <select className="form-select" id="category" name="category" value={data.category} onChange={onFieldChange} required>
                    <option value="">Выберите</option>
                    <option value="star-wars">Star Wars</option>
                    <option value="famous-people">Известные люди</option>
                    <option value="saying">Пословицы</option>
                    <option value="humour">Юмор</option>
                    <option value="motivational">Мотивация</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Введите имя автора</label>
                <input type="text" className="form-control" name="author" id="author" value={data.author} onChange={onFieldChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="quote" className="form-label">Введите цитату</label>
                <textarea className="form-control" name="quote" id="quote" value={data.quote} onChange={onFieldChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Сохранить</button>
        </form>
    );
};

export default EditQuote;
