import React, { useEffect, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ProductPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', quantity: '' })
  const [editingId, setEditingId] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user')
    if (!isLoggedIn) navigate('/login')
    loadProducts()
  }, [navigate])

  const loadProducts = async () => {
    try {
      const res = await getProducts()
      setProducts(res.data)
    } catch (err) {
      toast.error('Failed to load products')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateProduct(editingId, form)
        toast.success('Product updated')
      } else {
        await createProduct(form)
        toast.success('Product created')
      }
      setForm({ name: '', price: '', quantity: '' })
      setEditingId(null)
      loadProducts()
    } catch (err) {
      toast.error('Operation failed')
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    })
    setEditingId(product._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product deleted')
        loadProducts()
      } catch (err) {
        toast.error('Delete failed')
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(products.length / itemsPerPage)

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <ToastContainer />
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Product Management</h1>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className='mb-6 space-y-4'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={form.name}
          onChange={handleChange}
          required
          className='border px-3 py-2 rounded w-full'
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={form.price}
          onChange={handleChange}
          required
          className='border px-3 py-2 rounded w-full'
        />
        <input
          type='number'
          name='quantity'
          placeholder='Quantity'
          value={form.quantity}
          onChange={handleChange}
          required
          className='border px-3 py-2 rounded w-full'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

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
          {currentItems.map((product) => (
            <tr key={product._id} className='text-center'>
              <td className='border p-2'>{product.name}</td>
              <td className='border p-2'>${product.price}</td>
              <td className='border p-2'>{product.quantity}</td>
              <td className='border p-2 space-x-2'>
                <button
                  className='bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500'
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600'
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center items-center gap-2 mt-4'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductPage
