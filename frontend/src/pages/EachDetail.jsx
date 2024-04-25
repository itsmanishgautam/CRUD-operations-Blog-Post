import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EachDetail() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: '',
        content: ''
    });


    const [posts, setPosts] = useState([]);
    const fetchPosts = () => {
        axios.get('http://localhost:8000/api/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };






    useEffect(() => {
        fetchPostDetail();
        fetchPosts();
    }, [postId]);




    const fetchPostDetail = () => {
        axios.get(`http://localhost:8000/api/posts/${postId}`)
            .then(response => {
                setPost(response.data);
                setEditFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching post detail:', error);
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
        axios.put(`http://localhost:8000/api/posts/${postId}/`, editFormData)
            .then(response => {
                console.log('Post updated successfully:', response.data);
                setPost(response.data);
                setEditMode(false);
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });
    };




    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    return (
        <div className="container">
            <div className="row" style={{ marginTop: '40px', backgroundColor: '#ADBADA' }}>
                <h1 style={{ marginTop: '50px', textAlign: 'center', lineHeight: '30px' }}>Blog Post</h1>

                <div className="col-md-8" style={{ marginTop: '50px', lineHeight: '30px' }}>
                    <div className="card" style={{ marginTop: '40px', backgroundColor: '#ADBADA' }}>
                        {!editMode ? (
                            <>
                                <h2 style={{ marginBottom: '10px', textAlign: 'center', lineHeight: '50px' }}>{post.title}</h2>
                                <p style={{ marginBottom: '10px', textAlign: 'center' }}>{post.content}</p>
                                <p style={{ marginBottom: '10px', textAlign: 'center' }}>Date: {formatDate(post.date)}</p>
                                <button className="btn btn-primary" onClick={toggleEditMode}>Edit</button>
                            </>
                        ) : (
                            <form onSubmit={handleEditFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        id="editTitle"
                                        className="form-control"
                                        name="title"
                                        value={editFormData.title}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editContent" className="form-label">Content:</label>
                                    <textarea
                                        id="editContent"
                                        className="form-control"
                                        name="content"
                                        value={editFormData.content}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button className="btn btn-secondary ml-2" onClick={toggleEditMode}>Cancel</button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="col-md-3">
                    <h2 style={{ marginBottom: '50px', lineHeight: '20px' }}>Blogs</h2>
                    {posts.map(post => (
                        <div key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title" style={{ lineHeight: '30px', marginBottom: '10px' }}>{post.title}</h5>
                                <p className="card-text">{post.content.substring(0, 50)}...</p>
                                <p style={{ marginBottom: '10px', }}>Date: {formatDate(post.date)}</p>
                                <Link to={`/posts/${post.id}`} className="btn btn-primary mr-2" style={{ marginBottom: '30px' }}>Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EachDetail;