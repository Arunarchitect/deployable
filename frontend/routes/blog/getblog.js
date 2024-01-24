const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

// Route to get blog list
router.get('/api/blog/list', async (req, res) => {
  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/blog/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong while fetching the blog list',
    });
  }
});

// Route to get blog by ID
router.get('/api/blog/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/blog/${blogId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: `Something went wrong while fetching the blog with ID ${blogId}`,
    });
  }
});

module.exports = router;
