import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import '../css/Place.css';
import '../css/Footer.css'; 

const calculateDaysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 1 : diffDays; 
};

const getNumberOfPlaces = (days) => {
  switch (days) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 5;
    case 4:
      return 5;
    case 5:
      return 6;
    case 6:
      return 7;
    case 7:
      return 8;
    default:
      return 2; // Default to 2 places if days are out of range
  }
};

const Result = () => {
  const { id } = useParams();
  const [province, setProvince] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysBetween, setDaysBetween] = useState(0);
  const [placesToShow, setPlacesToShow] = useState([]);
  console.log(daysBetween);
  const generatePlacesToShow = useCallback((places, days) => {
    if (!places) return [];

    const numberOfPlaces = getNumberOfPlaces(days);
    const shuffledPlaces = places.sort(() => 0.5 - Math.random());
    return shuffledPlaces.slice(0, numberOfPlaces);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/All_Provinces');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        const selectedProvince = data.find(p => p.id === parseInt(id));
        if (selectedProvince) {
          setProvince(selectedProvince);

          const storedStartDate = localStorage.getItem('startDate');
          const storedEndDate = localStorage.getItem('endDate');
          setStartDate(storedStartDate);
          setEndDate(storedEndDate);

          if (storedStartDate && storedEndDate) {
            const days = calculateDaysBetween(storedStartDate, storedEndDate);
            setDaysBetween(days);
            setPlacesToShow(generatePlacesToShow(selectedProvince.famous_places, days));
          }
        } else {
          setError('Province not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id, generatePlacesToShow]);

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
    <div className="flex-wrapper">
      <Header />
      <div className="flex-content">
        <div className="header d-flex flex-column align-items-center position-relative">
          <nav className="menu d-flex justify-content-center align-items-start mt-5">
            <div className="box box1 me-5">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="text-dark text-decoration-none">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center p-3">
                  <p className="m-0">Schedule</p>
                </div>
              </a>
            </div>
            <div className="box box2 me-5">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="text-dark text-decoration-none">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center p-3">
                  <p className="m-0">Province</p>
                </div>
              </a>
            </div>
            <div className="box box3">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="text-dark text-decoration-none">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center p-3">
                  <p className="m-0">Place to go</p>
                </div>
              </a>
            </div>
          </nav>
        </div>
        <div className="container mt-5">
          <h2 className="text-center text-dark mb-4 svg-shadow shadow-success shadow-intensity-lg custom-shadow font-weight-bold text-uppercase">
            {province ? province.title : 'Popular Places'}
          </h2>
          <div className="mb-3">
            {startDate && endDate && (
              <h5 className="text-center text-dark mb-4 svg-shadow shadow-success shadow-intensity-lg custom-shadow">
                Start Date: {startDate}, End Date: {endDate}
              </h5>
            )}
          </div>
          <div className="content" id="content">
            {error && <p>Error fetching data: {error}</p>}
            {placesToShow && placesToShow.map(item => (
              <div key={item.id} onClick={() => showDetails(item)} style={{ cursor: 'pointer' }}>
                <h2>{item.name}</h2>
                <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;