import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './ShowCreator.css';

const ShowCreator = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('id'); 

        if (error) {
          throw error;
        }

        setCreators(data);
      } catch (error) {
        console.error('Error fetching creators:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCreators();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {creators.length > 0 ? (
        <div className="creators-page">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <p className="no-creators-message">No creators found! Check back later or add a new creator. 🥲</p>
      )}
    </>
  );
};

export default ShowCreator;

