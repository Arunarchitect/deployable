import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { fetchBlogListData } from '../features/blog';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const dispatch = useDispatch();
  const bloglist = useSelector((state) => state.blog.bloglist || []);
  const loading = useSelector((state) => state.blog.loading);

  useEffect(() => {
    // Fetch the blog list only if it's not already loaded
    if (!bloglist.length) {
      dispatch(fetchBlogListData());
    }
  }, [dispatch, bloglist]);

  return (
    <Layout title='Auth Site | Blog' content='Blog page'>
      <h1 className='mb-5'>Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        bloglist && bloglist.length > 0 ? (
          <ul>
            {bloglist.map((blog) => (
              <li key={blog.id}>
                <Link to={`/${blog.id}`}>
                  <h2>{blog.title}</h2>
                </Link>
                <p>{blog.content}</p>
                <img src={`${import.meta.env.VITE_APP_API_URL}${blog.image}`} alt={blog.title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs available</p>
        )
      )}
    </Layout>
  );
};

export default BlogPage;
