import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './AddCreator.css'; 

const AddCreator = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, ''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, url, description, imageURL } = formData;

    const { data, error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageURL }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      setFormData({ name: '', url: '', description: '', imageURL: '' });
      const slug = generateSlug(name);
      navigate(`/view/${slug}`);
    }
  };

  return (
    <>
      <h1>Add a New Creator 😎</h1>
  
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name 📜</label>
          <p>You can add the creator's full names here.</p>
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
          <p>Show off the creator's social media profile link.</p>
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
          <p>Write a brief description that markets your creator.</p>
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
          <p>Paste the URL of the creator's image.</p>
          <textarea
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
  
        <button type="submit" className="center-button">Done 🎇</button>
      </form>
    </>
  );  
};

export default AddCreator;
