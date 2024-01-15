const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

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

module.exports = router;
