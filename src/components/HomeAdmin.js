import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../css/HomePage.css';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/Destinations');
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
  
  const showDetails = (item) => {
    Swal.fire({
      title: String(item.name),
      html: `
        <div>
          <img src="${process.env.PUBLIC_URL + item.image}" alt="${item.name}" style="max-width: 100%" />
          <p>${String(item.description)}</p>
          <a href="${String(item.map)}" target="_blank" rel="noopener noreferrer">
            View on Map
          </a>
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <Header />
      <div className="container bg-image text-white text-center d-flex align-items-center">
        <div className="content">
          <h1 id="h1_welcome" className="font-weight-bold text-uppercase">
            Welcome to Cambodia
          </h1>
          <h3 id="para2">
            This Website focuses on planning your travel depending on your available date. It is straightforward for you to choose the date to see your travel schedule and destinations on your own and enjoy your trip without worrying about planning all of your trips. We are here to help you.
          </h3>
        </div>
      </div>

      <Container className="mt-5">
        <h2 className="text-center mb-4 text-dark svg-shadow shadow-success shadow-intensity-lg custom-shadow font-weight-bold text-uppercase">
          Famous Places
        </h2>

        <div className="content" id="content">
          {error && <p>Error fetching data: {error}</p>}
          {destinations.map(item => (
            <div key={item.id} onClick={() => showDetails(item)} style={{ cursor: 'pointer' }}>
              <h2>{item.name}</h2>
              <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;