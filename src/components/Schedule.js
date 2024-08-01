import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "../css/Schedule.css";

const Schedule = () => {
  const navigate = useNavigate();
  const isEventListenerAdded = useRef(false);

  useEffect(() => {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const planTripButton = document.getElementById('planTripButton');

    if (startDateInput && endDateInput && planTripButton) {
      //   eslint-disable-next-line no-unused-vars
      const startDatePicker = flatpickr(startDateInput, {
        enableTime: false,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        onClose: function (selectedDates) {
          if (selectedDates[0]) {
            flatpickr(endDateInput, {
              enableTime: false,
              dateFormat: 'Y-m-d',
              minDate: selectedDates[0],
            });
          }
        },
      });
//   eslint-disable-next-line no-unused-vars
      const endDatePicker = flatpickr(endDateInput, {
        enableTime: false,
        dateFormat: 'Y-m-d',
        minDate: 'today',
      });

      if (!isEventListenerAdded.current) {
        planTripButton.addEventListener('click', function () {
          const startDate = new Date(startDateInput.value);
          const endDate = new Date(endDateInput.value);

          if (startDate && endDate) {
            const timeDiff = endDate - startDate;
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

            if (dayDiff > 7) {
              alert('Please choose a date range of 7 days or less.');
            } else {
              localStorage.setItem('startDate', startDate.toISOString().split('T')[0]);
              localStorage.setItem('endDate', endDate.toISOString().split('T')[0]);
              navigate('/list');
            }
          } else {
            alert('Please Select Both Start Date and End Date.');
          }
        });

        isEventListenerAdded.current = true;
      }
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div
        className="container-fluid"
        style={{
          backgroundImage: 'url("/Sunset-at-Angkor-Wat-Siem-Reap-Cambodia.jpg")',
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh',
        }}
      >
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
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center p-3">
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

        <div className="content shadow p-5 mb-5 bg-white rounded mt-5" style={{ width: '40%', height: '50%', margin: '0 auto' }}>
          <h1 className='text-dark text-center text-bold'>Planning Your Trip</h1>
          <form className="d-flex flex-column align-items-center p-4" id="tripForm">
            <label htmlFor="startDate" className="text-dark mb-3 p-3">Start Date</label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              placeholder="Select start date"
              required
              className="form-control"
            />

            <label htmlFor="endDate" className='text-dark mb-3 p-3'>End Date</label>
            <input
              type="text"
              id="endDate"
              name="endDate"
              placeholder="Select end date"
              required
              className="form-control"
            />

            <button type="button" id="planTripButton" className="btn btn-success mt-5">
              Plan Trip
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
