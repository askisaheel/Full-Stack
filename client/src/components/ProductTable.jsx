import React from 'react'

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className='w-full border'>
    <thead>
      <tr className='bg-gray-100'>
        <th className='p-2 border'>Name</th>
        <th className='p-2 border'>Price</th>
        <th className='p-2 border'>Quantity</th>
        <th className='p-2 border'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product._id} className='text-center'>
          <td className='border p-2'>{product.name}</td>
          <td className='border p-2'>${product.price}</td>
          <td className='border p-2'>{product.quantity}</td>
          <td className='border p-2 space-x-2'>
            <button
              className='bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500'
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className='bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600'
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default ProductTable
