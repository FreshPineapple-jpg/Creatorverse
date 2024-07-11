import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCreator.css'; 

const EditCreator = () => {
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [creatorId, setCreatorId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const creator = data.find(creator => generateSlug(creator.name) === slug);
        if (creator) {
          setFormData({
            name: creator.name,
            url: creator.url,
            description: creator.description,
            imageURL: creator.imageURL
          });
          setCreatorId(creator.id); 
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, url, description, imageURL } = formData;
    const newSlug = generateSlug(name);

    const { data, error } = await supabase
      .from('creators')
      .update({ name, url, description, imageURL })
      .eq('id', creatorId);

    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('Data updated successfully:', data);
      if (slug !== newSlug) {
        navigate(`/view/${newSlug}`);
      } else {
        navigate(`/view/${slug}`);
      }
    }
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', creatorId);

    if (error) {
      console.error('Error deleting data:', error);
    } else {
      console.log('Data deleted successfully:', data);
      navigate('/');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Edit Creator</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name 📜</label>
          <textarea
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Social Media 📱</label>
          <textarea
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Creator's Blurb 🤓</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Creator's Image 📸</label>
          <textarea
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="update-button">Update</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </>
  );
};

export default EditCreator;
