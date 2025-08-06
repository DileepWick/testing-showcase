import React from 'react';

const BooksTable = ({ books, isLoading }) => (
  <div className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
    <div className='px-6 py-4 border-b border-gray-200'>
      <h2 className='text-xl font-semibold '>Book Collection</h2>
      <p className='text-sm text-gray-500 '>View your entire book collection</p>
    </div>
    <div className='p-6'>
      {isLoading ? (
        <div className='flex justify-center py-6'>
          <svg
            className='w-8 h-8 animate-spin text-black'
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
        </div>
      ) : books.length === 0 ? (
        <div className='text-center py-6 text-gray-500'>No books available</div>
      ) : (
        <div className='overflow-x-auto rounded-md border border-gray-200'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Author
                </th>
                <th
                  scope='col'
                  className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Genre
                </th>
                <th
                  scope='col'
                  className='px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  ISBN
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {books.map((book) => (
                <tr key={book._id} className='hover:bg-gray-50'>
                  <td className='px-4 py-3 whitespace-nowrap text-sm text-center'>
                    {book.title}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap text-sm text-center'>
                    {book.author}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap text-sm text-center'>
                    {book.genre}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap text-sm text-center'>
                    {book.isbn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

export default BooksTable;
