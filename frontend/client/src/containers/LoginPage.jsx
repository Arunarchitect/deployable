import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetRegistered, login } from '../features/user';
import Layout from '../components/Layout';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  
  const dispatch = useDispatch();

  const { loading, isAuthenticated, registered} = useSelector(state => state.user);

  
  const [formData, setFormData] = useState({
    email: '',
    password:''
  });

  useEffect(() => {
    if (registered) 
      dispatch(resetRegistered());
  },[registered]);


  const { email, password } = formData;



  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({email, password}))
    
  }

  if (isAuthenticated ) return <Navigate to='/dashboard' />;

  return (
    <Layout title='Auth Site | Login' content='Login page'>
        <h1>Login to your Account</h1>
        <form className='mt-5' action="" onSubmit={onSubmit}>
          <div  className='form-group'>
            <label className='form-label' htmlFor='email'>Email</label>
            <input className='form-control' type="email" name='email' onChange={onChange} value={email} required/>
          </div>
          <div className='form-group mt-3'>
            <label className='form-label' htmlFor='password'>Passsword</label>
            <input className='form-control' type="password" name='password' onChange={onChange} value={password} required/>
          </div>
          {
            loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            ): (
              <button className='btn btn-primary mt-4'>
                Login
              </button>
            )
          }
          
        </form>
    </Layout>
  )
}

export default LoginPage