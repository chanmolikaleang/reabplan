import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/List.css';
import Header from './Header';
import Footer from './Footer';

function List() {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [error, setError] = useState(null);
//   eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState('');
  //   eslint-disable-next-line no-unused-vars
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/All_Provinces');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setDestinations(data);
        setFilteredDestinations(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
    setStartDate(storedStartDate);
    setEndDate(storedEndDate);

    console.log(`Start Date: ${storedStartDate}`);
    console.log(`End Date: ${storedEndDate}`);
  }, []);

  useEffect(() => {
    const filteredResults = destinations.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDestinations(filteredResults);
  }, [searchQuery, destinations]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // You can implement search logic here if needed
    // For now, it's handled by useEffect when searchQuery changes
  };

  return (
    <div>
      <Header />
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
              <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-3">
                <p className="m-0">Place to go</p>
              </div>
            </a>
          </div>
        </nav>
      </div>
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by province name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="content" id="content">
          {error && <p>Error fetching data: {error}</p>}
          {filteredDestinations.map(item => (
            <Link key={item.id} to={`/result/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default List;
