import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ creator }) => {
  const navigate = useNavigate(); 

  const cardStyle = {
    backgroundImage: `url(${creator.imageURL})`,
  };

  const viewCreator = () => {
    const slug = creator.name.toLowerCase().replace(/\s+/g, '');
    navigate(`/view/${slug}`);
  };

  const editCreator = () => {
    const slug = creator.name.toLowerCase().replace(/\s+/g, '');
    navigate(`/edit/${slug}`);
  };

  return (
    <article className="card">
      <div className="card-background" style={cardStyle}></div>
      <div className="card-content">
        <h3 className="card-title">{creator.name}</h3>
        <p className='card-text'><strong>Follow Them Here 👉 </strong>
          <a href={creator.url} className="contrast card-link" target="_blank" rel="noopener noreferrer">{creator.url}</a>
        </p>
        <p className="card-text">{creator.description}</p>
      </div>
      <div className="card-icons">
        <div className="icon-wrapper left-icon" onClick={viewCreator}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="icon info-icon"
          />
        </div>
        <div className="icon-wrapper right-icon" onClick={editCreator}>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="icon pencil-icon"
          />
        </div>
      </div>
    </article>
  );
};

export default Card;

