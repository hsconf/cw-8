import React from "react";

interface Props {
    author: string;
    quote: string;
    edit: VoidFunction;
    del: VoidFunction;
}

const Card: React.FC<Props> = ({ author, quote, edit, del }) => {
    return (
        <div className="card text-bg-light mb-3" style={{ width: '900px' }}>
            <div className="card-header d-flex align-items-center">
                <span>{author}</span>
                <button className="btn btn-primary ms-auto" onClick={edit}>Редактировать</button>
                <button className="btn btn-danger ms-1" onClick={del}>Удалить</button>
            </div>
            <div className="card-body">
                <p className="card-text">{quote}</p>
            </div>
        </div>
    );
};

export default Card;
