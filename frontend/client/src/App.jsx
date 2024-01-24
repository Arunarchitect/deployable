import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import DashboardPage from './containers/DashboardPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import Test from './containers/Test';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {checkAuth} from './features/user'
import BlogPage from './containers/BlogPage';
import Payment from './containers/Payment';
import BlogDetail from './containers/BlogDetail';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/blog' element={<BlogPage />} />
				<Route path='/:id' element={<BlogDetail />} />
				<Route path='/payment' element={<Payment />} />
			</Routes>
		</Router>
	);
};

export default App;