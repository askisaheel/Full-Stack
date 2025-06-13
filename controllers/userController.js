const User = require('../models/User')

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username, password })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.status(200).json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
