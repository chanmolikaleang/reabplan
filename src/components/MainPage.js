import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main_page.css'; 
import Header from './Header';

const MainPage = () => {
    const images = [
        'url("/photos/Angkor Wat .jpg")',
        'url("/photos/prey korng kang.jpg")',
        'url("/photos/beachsihanoukville.jpg")', 
        'url("/photos/Sunset-at-Angkor-Wat-Siem-Reap-Cambodia.jpg")',
        'url("/photos/beachsihanoukville.jpg")'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const content = document.querySelector('.content');

        function changeBackground() {
            content.style.backgroundImage = images[currentIndex];
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setTimeout(changeBackground, 5000);
        }

        changeBackground();

        return () => {
            clearTimeout(changeBackground);
        };
    }, [currentIndex, images]);

    return (
        <div>
            <Header/>
            <div className="logo">
                <img src="/photos/logo-removebg-preview.png" alt="Logo" width="350" />
            </div>

            <div className="additional-links">
                <a href="destinations.html" className="text-white">Destinations</a>
                <a href="#" className="text-white">Favourite</a>
                <a href="#" className="text-white">About Us</a>
                <a href="#" className="text-white">Profile</a>
            </div>

            <div className="content">
                <div className="schedule-btn">
                    <h1 className="schedule-text">
                        Schedule Management on your trip in Cambodia
                        <a href="/Leang Chanmolika/Project/Schedule.html" className="btn btn-primary">Get Started</a>
                    </h1>
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
};
export default MainPage;
