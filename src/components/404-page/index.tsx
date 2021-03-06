import React from 'react';
import placeholder from 'images/404.svg';
import './style.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className="page-wrapper">
            <img
                src={placeholder}
                alt="page not found placeholder"
                className="not-found-placeholder-image"
                data-testid="404-image"
            />
        </div>
    );
};

export default NotFoundPage;
