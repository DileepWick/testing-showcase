import React from 'react';

const MessageAlert = ({ message }) => {
  if (!message.text) return null;

  return (
    <div
      className={`mb-6 px-4 py-3 rounded-md ${
        message.isError
          ? 'bg-red-50 text-red-700 border border-red-100'
          : 'bg-green-50 text-green-700 border border-green-100'
      }`}
    >
      {message.text}
    </div>
  );
};

export default MessageAlert;
