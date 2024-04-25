import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostFormData, setNewPostFormData] = useState({
    title: '',
    content: ''
  });



  useEffect(() => {
    fetchPosts();
  }, []);



  const fetchPosts = () => {
    axios.get('http://localhost:8000/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };



  const handleDeleteClick = (postId) => {
    axios.delete(`http://localhost:8000/api/posts/${postId}/delete`)
      .then(response => {
        console.log('Post deleted successfully:', response.data);
        fetchPosts();
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };


  const handleNewPostFormChange = (e) => {
    setNewPostFormData({
      ...newPostFormData,
      [e.target.name]: e.target.value
    });
  };


  const handleNewPostFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/posts/', newPostFormData)
      .then(response => {
        console.log('New post added successfully:', response.data);
        fetchPosts();
        setNewPostFormData({
          title: '',
          content: ''
        });
      })
      .catch(error => {
        console.error('Error adding new post:', error);
      });
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#3D52A1';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="container mt-5"style={{ backgroundColor:'#3D52A1' }}>
      <h1 style={{color:'white'}}>Blog Posts</h1>
      <div className="row">
        {posts.map((post, index) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 50)}...</p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary mr-2">Read More</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      



      <div className="mt-4" style={{ marginTop: '10px',padding:'100px 100px 100px 100px' , backgroundColor: '#ADBADA' }}>
        <h2>Add New Post</h2>
        <form onSubmit={handleNewPostFormSubmit}>
          <div className="mb-3">
            <label htmlFor="newTitle" className="form-label">Title:</label>
            <input type="text" id="newTitle" className="form-control" name="title" value={newPostFormData.title} onChange={handleNewPostFormChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="newContent" className="form-label">Content:</label>
            <textarea id="newContent" className="form-control" name="content" value={newPostFormData.content} onChange={handleNewPostFormChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
      </div>
    </div>
  );
}

export default App;
