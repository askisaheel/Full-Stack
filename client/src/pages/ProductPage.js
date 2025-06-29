import React, { useEffect, useState } from 'react'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

const ProductPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', quantity: '' })
  const [editingId, setEditingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    } catch {
      toast.error('Failed to load products')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

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
    } catch {
      toast.error('Operation failed')
    } finally {
      setIsSubmitting(false)
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

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(deleteId)
      toast.success('Product deleted')
      loadProducts()
    } catch {
      toast.error('Delete failed')
    } finally {
      setShowConfirm(false)
      setDeleteId(null)
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

      <ProductForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        isSubmitting={isSubmitting}
      />

      <ProductTable
        products={currentItems}
        onEdit={handleEdit}
        onDelete={confirmDelete}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {showConfirm && (
        <ConfirmModal
          open={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default ProductPage
