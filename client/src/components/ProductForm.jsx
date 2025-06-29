import React from 'react'

const ProductForm = ({ form, onChange, onSubmit, editingId, isSubmitting }) => (
  <form onSubmit={onSubmit} className='mb-6 space-y-4'>
    <input
      type='text'
      name='name'
      placeholder='Name'
      value={form.name}
      onChange={onChange}
      required
      className='border px-3 py-2 rounded w-full'
    />
    <input
      type='number'
      name='price'
      placeholder='Price'
      value={form.price}
      onChange={onChange}
      required
      className='border px-3 py-2 rounded w-full'
    />
    <input
      type='number'
      name='quantity'
      placeholder='Quantity'
      value={form.quantity}
      onChange={onChange}
      required
      className='border px-3 py-2 rounded w-full'
    />
    <button
      type='submit'
      disabled={isSubmitting}
      className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isSubmitting
        ? editingId
          ? 'Updating...'
          : 'Adding...'
        : editingId
        ? 'Update Product'
        : 'Add Product'}
    </button>
  </form>
)

export default ProductForm
