import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import '../css/Place.css';

const Place = () => {
    const { id } = useParams();
    const [province, setProvince] = useState(null);
    const [error, setError] = useState(null);

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
                } else {
                    setError('Province not found');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);

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
            <div className="container mt-5 p-5 footer">
                <h2 className="text-center text-dark mb-4 mt-5 svg-shadow shadow-success shadow-intensity-lg custom-shadow font-weight-bold text-uppercase">
                    {province ? province.title : 'Popular Places'}
                </h2>
                <div className="content" id="content">
                    {error && <p>Error fetching data: {error}</p>}
                    {province && province.famous_places && province.famous_places.map(item => (
                        <div key={item.id} onClick={() => showDetails(item)} style={{ cursor: 'pointer' }}>
                            <h2>{item.name}</h2>
                            <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Place;
