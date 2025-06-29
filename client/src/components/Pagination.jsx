import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <div className='flex justify-center items-center gap-2 mt-4'>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'
        }`}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
  </div>
)

export default Pagination
