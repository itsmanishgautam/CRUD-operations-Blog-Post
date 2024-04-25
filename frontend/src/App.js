import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); 
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: ''
  });
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

  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditFormData({
      title: post.title,
      content: post.content
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...editingPost, ...editFormData };
    axios.put(`http://localhost:8000/api/posts/${editingPost.id}/`, updatedPost)
      .then(response => {
        console.log('Post updated successfully:', response.data);
        fetchPosts();
        setEditingPost(null); 
      })
      .catch(error => {
        console.error('Error updating post:', error);
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

  return (
    <div className="container mt-5">
      <h1>Blog Posts</h1>
      {/* Display existing posts */}
      <ul className="list-group mt-4">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            {editingPost && editingPost.id === post.id ? (
              <div>
                <h2>Edit Post</h2>
                <form onSubmit={handleEditFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">Title:</label>
                    <input type="text" id="editTitle" className="form-control" name="title" value={editFormData.title} onChange={handleEditFormChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editContent" className="form-label">Content:</label>
                    <textarea id="editContent" className="form-control" name="content" value={editFormData.content} onChange={handleEditFormChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </form>
              </div>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEditClick(post)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(post.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* New post form */}
      <div className="mt-4">
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
