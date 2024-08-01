import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Province.css';
import Header from './Header';
import Footer from './Footer';

function Province() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/All_Provinces');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5 p-5" id='all'>
        <h2 className="text-center text-dark mb-4 mt-5 svg-shadow shadow-success shadow-intensity-lg custom-shadow font-weight-bold text-uppercase">
          Province Management
        </h2>

        <div className="content" id="content">
          {error && <p>Error fetching data: {error}</p>}
          {destinations.map(item => (
            <Link key={item.id} to={`/province/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ cursor: 'pointer' }}>
                <h2>{item.title}</h2>
                <img src={process.env.PUBLIC_URL + item.image} alt={item.title} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Province;
