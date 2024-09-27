import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
const CatCard = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
    );
    const fetchedCats = res.data.map(cat => ({
      url: cat.url,
      width: cat.width,
      height: cat.height,
    }));
    setCats((prevCats) => [...prevCats, ...fetchedCats]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1 && !loading) {
      fetchCats();
    }
  };

  useEffect(() => {
    fetchCats();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Cat Gallery</h1>
      <div style={cardContainerStyle}>
        {cats.map((cat, index) => (
          <div key={index} style={cardStyle}>
            <img 
              src={cat.url} 
              alt="cat" 
              style={{ 
                ...imageStyle, 
                width: '100%', // Ensure full width on mobile
                height: 'auto',
              }} 
            />
          </div>
        ))}
      </div>
      {loading && (
        <div style={spinnerContainerStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#0A2647',
  minHeight: '100vh',
  padding: '2rem',
  color: '#FFFFFF',
  animation: 'centerContent 1s ease-in-out forwards',
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '2rem',
  textAlign: 'center',
  color: '#E0E1DD',
};

const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  animation: 'resizeContent 1s ease-in-out forwards',
};

const cardStyle = {
  backgroundColor: '#144272',
  borderRadius: '0.625rem', // 10px converted to rem
  overflow: 'hidden',
  boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)', // 4px and 8px converted to rem
  marginBottom: '1.25rem', // 20px converted to rem
  width: '100%',
  maxWidth: '25rem', // 400px converted to rem
  padding: '0.625rem', // Padding inside the card for mobile responsiveness
};

const imageStyle = {
  borderRadius: '0.625rem', // 10px converted to rem
};

const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.25rem', // 20px converted to rem
};

const spinnerStyle = {
  border: '0.25rem solid rgba(255, 255, 255, 0.1)', // 4px converted to rem
  borderTop: '0.25rem solid #E0E1DD', // 4px converted to rem
  borderRadius: '50%',
  width: '1.875rem', // 30px converted to rem
  height: '1.875rem', // 30px converted to rem
  animation: 'spin 1s linear infinite',
};

const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes centerContent {
    0% {
      transform: translateY(-50%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes resizeContent {
    0% {
      max-width: 50rem; // 800px converted to rem
    }
    100% {
      max-width: 31.25rem; // 500px converted to rem
    }
  }

  @media (max-width: 768px) {
    ${cardStyle} {
      width: 95%; /* Take most of the width on smaller devices */
      max-width: 95%; /* Remove the fixed width limit on mobile */
    }

    @keyframes resizeContent {
      0% {
        max-width: 31.25rem;
      }
      100% {
        max-width: 100%;
      }
    }

    @keyframes centerContent {
      0% {
        transform: translateY(-50%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;
document.head.appendChild(styles);

export default CatCard;
