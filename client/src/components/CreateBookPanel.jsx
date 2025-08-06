import React from 'react';
import MessageAlert from './MessageAlert';
import BookForm from './BookForm';

const CreateBookPanel = ({
  message,
  formData,
  handleChange,
  handleSubmit,
  isLoading,
}) => (
  <div className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
    <div className='px-6 py-4 border-b border-gray-200'>
      <h2 className='text-xl font-semibold'>Add New Book</h2>
      <p className='text-sm text-gray-500'>
        Fill in the details to add a book to your collection.
      </p>
    </div>
    <div className='p-6'>
      <MessageAlert message={message} />
      <BookForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  </div>
);

export default CreateBookPanel;
