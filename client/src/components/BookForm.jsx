import React from 'react';

const BookForm = ({ formData, handleChange, handleSubmit, isLoading }) => (
  <form onSubmit={handleSubmit} className='space-y-4'>
    <div className='space-y-2'>
      <label htmlFor='title' className='block text-sm font-medium'>
        Title
      </label>
      <input
        id='title'
        type='text'
        name='title'
        value={formData.title}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
        placeholder='Enter book title'
      />
    </div>

    <div className='space-y-2'>
      <label htmlFor='author' className='block text-sm font-medium'>
        Author
      </label>
      <input
        id='author'
        type='text'
        name='author'
        value={formData.author}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
        placeholder='Enter author name'
      />
    </div>

    <div className='space-y-2'>
      <label htmlFor='genre' className='block text-sm font-medium'>
        Genre
      </label>
      <select
        id='genre'
        name='genre'
        value={formData.genre}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none bg-white'
      >
        <option value='Fiction'>Fiction</option>
        <option value='Non-Fiction'>Non-Fiction</option>
        <option value='Science Fiction'>Science Fiction</option>
        <option value='Fantasy'>Fantasy</option>
        <option value='Mystery'>Mystery</option>
        <option value='Thriller'>Thriller</option>
        <option value='Romance'>Romance</option>
        <option value='Biography'>Biography</option>
      </select>
    </div>

    <div className='space-y-2'>
      <label htmlFor='isbn' className='block text-sm font-medium'>
        ISBN
      </label>
      <input
        id='isbn'
        type='text'
        name='isbn'
        value={formData.isbn}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
        placeholder='Enter ISBN'
      />
    </div>

    <button
      type='submit'
      className='w-full px-4 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={isLoading}
    >
      {isLoading ? (
        <span className='flex items-center justify-center'>
          <svg
            className='w-5 h-5 mr-2 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        'Add Book'
      )}
    </button>
  </form>
);

export default BookForm;
