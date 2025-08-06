import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCreationApp from '../components/BookCreationApp';

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 poppins-regular'>
      <BookCreationApp />
      <Footer />
    </div>
  );
};

export default Home;
