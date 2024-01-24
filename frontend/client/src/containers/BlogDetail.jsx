import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { fetchBlogById } from '../features/blogdetail';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogdetail.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  console.log(blog);

  return (
    <Layout title='Auth Site | Blog' content='Blog page'>
      <h1 className='mb-5'>Blog Detail</h1>
      {blog && blog.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {blog && blog.blog && (
            <>
              <h2>Blog title: {blog.blog.title}</h2>
              <h3>Subtitle: {blog.blog.subtitle}</h3>
              <img src={`${import.meta.env.VITE_APP_API_URL}${blog.blog.image}`} alt="" />
              {/* Add other details you want to display */}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default BlogDetail;
