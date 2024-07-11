import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import './ViewCreator.css'; 

const ViewCreator = () => {
  const { slug } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const foundCreator = data.find(creator => generateSlug(creator.name) === slug);
        if (foundCreator) {
          setCreator(foundCreator);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!creator) {
    return <p>Creator not found.</p>;
  }

  return (
    <div className="view-creator-container">
      <div className="creator-image-container">
        <img src={creator.imageURL} alt={creator.name} className="creator-image" />
      </div>
      <div className="creator-details">
        <h1 className="creator-name">{creator.name}</h1>
        <p className="creator-description">{creator.description}</p>
        <a href={creator.url} className="creator-social-link" target="_blank" rel="noopener noreferrer">Social Media 🔗</a>
      </div>
    </div>
  );
};

export default ViewCreator;
