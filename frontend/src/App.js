import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './App.css';

function FormComponent({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="container">
      <h2>Insert Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Content:</label>
          <textarea className="form-control" name="content" value={formData.content} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get('http://localhost:8000/api/posts/') // Replace with your API endpoint
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleFormSubmit = (formData) => {
    axios.post('http://localhost:8000/api/posts/', formData)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        // Fetch updated data after saving
        axios.get('http://localhost:8000/api/posts/')
          .then(response => {
            setPosts(response.data);
          })
          .catch(error => {
            console.error('Error fetching updated data:', error);
          });
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  return (
    <div className="App">
      {/* Render your form component */}
      <FormComponent onFormSubmit={handleFormSubmit} />

      {/* Render your data here */}
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {posts.map(post => (
            <li key={post.id} className="list-group-item">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;




















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';


// function FormComponent({ onFormSubmit }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFormSubmit(formData);
//   };

//   return (
//     <div>
//       <h2>Insert Data</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input type="text" name="title" value={formData.title} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Content:</label>
//           <textarea name="content" value={formData.content} onChange={handleChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// function App() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Fetch data from your API endpoint
//     axios.get('http://localhost:8000/api/posts/') // Replace with your API endpoint
//       .then(response => {
//         setPosts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   const handleFormSubmit = (formData) => {
//     axios.post('http://localhost:8000/api/posts/', formData)
//       .then(response => {
//         console.log('Data saved successfully:', response.data);
//         // Fetch updated data after saving
//         axios.get('http://localhost:8000/api/posts/')
//           .then(response => {
//             setPosts(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching updated data:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error saving data:', error);
//       });
//   };

//   return (
//     <div className="App">
//       {/* Render your form component */}
//       <FormComponent onFormSubmit={handleFormSubmit} />

//       {/* Render your data here */}
//       <h1>Posts</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//             <p>{post.date}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;