import React, { useState } from "react";
import { Quote } from "../../types";
import axiosApi from "../../axiosApi";

const NewQuote = () => {
    const [data, setData] = useState<Quote>({
        author: "",
        category: "",
        quote: "",
    });

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosApi.post("/quote.json", data);
        console.log("Submitted Data:", data);

        setData({
            author: "",
            category: "",
            quote: "",
        });
    };

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
            <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
    );
};

export default NewQuote;
