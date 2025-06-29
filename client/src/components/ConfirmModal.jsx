import React from 'react'

const ConfirmModal = ({ open, onCancel, onConfirm }) => {
  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-lg p-6 w-80 text-center'>
        <h2 className='text-lg font-semibold mb-4'>Confirm Delete</h2>
        <p className='mb-6'>Are you sure you want to delete this product?</p>
        <div className='flex justify-center gap-4'>
          <button
            className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
