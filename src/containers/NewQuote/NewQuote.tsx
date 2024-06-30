import React, { useState } from "react";
import { Quote } from "../../types";
import axiosApi from "../../axiosApi";
import {Navigate} from "react-router-dom";

const NewQuote = () => {
    const [data, setData] = useState<Quote>({
        author: "",
        category: "",
        quote: ""
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
        await axiosApi.post("/quote.json", data)
        console.log("Submitted Data:", data);

        setData({
            author: "",
            category: "",
            quote: ""
        });
    };

    return (
        <form className="form-control" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Select Category</label>
                <select className="form-select" id="category" name="category" value={data.category} onChange={onFieldChange}>
                    <option value="">Select</option>
                    <option value="Star Wars">Star Wars</option>
                    <option value="Famous people">Famous people</option>
                    <option value="Saying">Saying</option>
                    <option value="Humour">Humour</option>
                    <option value="Motivational">Motivational</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Enter author name</label>
                <input type="text" className="form-control" name="author" id="author" value={data.author} onChange={onFieldChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="quote" className="form-label">Enter quote</label>
                <textarea className="form-control" name="quote" id="quote" value={data.quote} onChange={onFieldChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default NewQuote;
