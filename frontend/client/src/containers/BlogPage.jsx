import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { fetchBlogListData } from '../features/blog';
import { Link } from 'react-router-dom'; // Import Link

const BlogPage = () => {
  const dispatch = useDispatch();
  const bloglist = useSelector((state) => state.blog.bloglist);
  const loading = useSelector((state) => state.blog.loading);

  useEffect(() => {
    // Fetch the blog list when the component mounts
    dispatch(fetchBlogListData());
  }, [dispatch]);
    console.log(bloglist);
    console.log(loading);

  return (
    <Layout title='Auth Site | Blog' content='Blog page'>
      <h1 className='mb-5'>Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {bloglist.map((blog) => (
            <li key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <img src={`${import.meta.env.VITE_APP_API_URL}${blog.image}`} alt={blog.title} />
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default BlogPage;