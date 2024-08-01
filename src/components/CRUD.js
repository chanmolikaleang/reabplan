import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import '../css/Place.css';

const CRUD = () => {
  const { id } = useParams();
  const [province, setProvince] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deletePlace = async (provinceId, placeId) => {
    try {
      const response = await fetch(`http://localhost:3000/All_Provinces/${provinceId}/famous_places/${placeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting place');
      }
      fetchData();
      Swal.fire({
        title: 'Deleted!',
        text: 'Place has been deleted.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the place.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const updatePlace = async (provinceId, placeId, updatedPlace) => {
    try {
      // Fetch the entire province object
      const provinceResponse = await fetch(`http://localhost:3000/All_Provinces/${provinceId}`);
      if (!provinceResponse.ok) {
        throw new Error(`Error fetching province: ${provinceResponse.statusText}`);
      }
      const province = await provinceResponse.json();

      // Find the place within the province and update it
      const placeIndex = province.famous_places.findIndex(p => p.id === parseInt(placeId));
      if (placeIndex === -1) {
        throw new Error('Place not found');
      }
      province.famous_places[placeIndex] = updatedPlace;

      // Send a PUT request to update the entire province object
      const response = await fetch(`http://localhost:3000/All_Provinces/${provinceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(province)
      });
      if (!response.ok) {
        throw new Error(`Error updating place: ${response.statusText}`);
      }
      fetchData();
      Swal.fire({
        title: 'Updated!',
        text: 'Place has been updated.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the place.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const addPlace = async (provinceId, newPlace) => {
    try {
      // Fetch the entire province object
      const provinceResponse = await fetch(`http://localhost:3000/All_Provinces/${provinceId}`);
      if (!provinceResponse.ok) {
        throw new Error(`Error fetching province: ${provinceResponse.statusText}`);
      }
      const province = await provinceResponse.json();

      // Add the new place to the famous_places array
      newPlace.id = province.famous_places.length ? Math.max(...province.famous_places.map(p => p.id)) + 1 : 1;
      province.famous_places.push(newPlace);

      // Send a PUT request to update the entire province object
      const response = await fetch(`http://localhost:3000/All_Provinces/${provinceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(province)
      });
      if (!response.ok) {
        throw new Error(`Error adding place: ${response.statusText}`);
      }
      fetchData();
      Swal.fire({
        title: 'Added!',
        text: 'Place has been added.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while adding the place.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const showDetails = (provinceId, item) => {
    if (!item) {
      console.error('Item is undefined or null');
      return;
    }
    Swal.fire({
      title: item.name,
      html: `
        <div>
          <img src="${process.env.PUBLIC_URL + item.image}" alt="${item.name}" style="max-width: 100%" />
          <p>${item.description}</p>
          <a href="${item.map}" target="_blank" rel="noopener noreferrer">
            View on Map
          </a>
          <div>
            <button class="btn btn-danger" id="deleteButton" style="margin-top: 10px;">Delete</button>
            <button class="btn btn-warning" id="updateButton" style="margin-top: 10px;">Update</button>
          </div>
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: () => {
        document.getElementById('deleteButton').addEventListener('click', () => {
          deletePlace(provinceId, item.id);
        });
  
        document.getElementById('updateButton').addEventListener('click', () => {
          Swal.fire({
            title: 'Update Place',
            html: `
              <input id="placeName" class="swal2-input" placeholder="Name" value="${item.name}" />
              <input id="placeImage" class="swal2-input" placeholder="Image URL" value="${item.image}" />
              <textarea id="placeDescription" class="swal2-textarea" placeholder="Description">${item.description}</textarea>
              <input id="placeMap" class="swal2-input" placeholder="Map URL" value="${item.map}" />
            `,
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: () => {
              const name = document.getElementById('placeName').value;
              const image = document.getElementById('placeImage').value;
              const description = document.getElementById('placeDescription').value;
              const map = document.getElementById('placeMap').value;
              return { name, image, description, map };
            }
          }).then((result) => {
            if (result.isConfirmed) {
              const updatedPlace = {
                ...item,
                name: result.value.name,
                image: result.value.image,
                description: result.value.description,
                map: result.value.map
              };
              updatePlace(provinceId, item.id, updatedPlace);
            }
          });
        });
      }
    });
  };

  const openAddModal = () => {
    Swal.fire({
      title: 'Add New Place',
      html: `
        <input id="newPlaceName" class="swal2-input" placeholder="Name" />
        <input id="newPlaceImage" class="swal2-input" placeholder="Image URL" />
        <textarea id="newPlaceDescription" class="swal2-textarea" placeholder="Description"></textarea>
        <input id="newPlaceMap" class="swal2-input" placeholder="Map URL" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        const name = document.getElementById('newPlaceName').value;
        const image = document.getElementById('newPlaceImage').value;
        const description = document.getElementById('newPlaceDescription').value;
        const map = document.getElementById('newPlaceMap').value;
        return { name, image, description, map };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newPlace = result.value;
        addPlace(id, newPlace);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: '140px' }}>
        <h2 className="text-center text-dark mb-4 svg-shadow shadow-success shadow-intensity-lg custom-shadow font-weight-bold text-uppercase">
          {province ? province.title : 'Popular Places'}
        </h2>
        <Container className="mt-5">
          <Button
            variant ="success"
            className="mb-2"
            onClick={openAddModal}
          >
            Add New Place
          </Button>
        </Container>
        <div className="content" id="content">
          {error && <p>Error fetching data: {error}</p>}
          {province && province.famous_places && province.famous_places.map(item => (
            <div key={item.id} onClick={() => showDetails(province.id, item)} style={{ cursor: 'pointer' }}>
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

export default CRUD;

