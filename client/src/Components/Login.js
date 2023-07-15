import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { useFormik } from "formik";
import * as yup from "yup";





function Login(){
	// const [user, setUser] = useContext(UserContext)
	const [logInfo, setLogInfo] = useState({});
	// const [logIn, setLogIn] = useState( user? true : false);
	const navigate = useNavigate();


	useEffect(() => {
	fetch(`/users/${logInfo.username}`)
			.then(res=>res.json())
			.then((data) =>localStorage.setItem("user", JSON.stringify(data)));

	},[]);

	

    

	// 8a. create state error


	const formSchema = yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required(),
	});
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: formSchema,
		onSubmit: (values, actions) => {
			fetch( "/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(values),
			}).then((res) => {
				if (res.ok) {
					res.json().then((data) => { 
						actions.resetForm();
						setLogInfo(data);
						navigate("/home");
						
					});
				}else{
					navigate("/signup");
				} 
			});
		},
	});

	
		

	return (
		<section>
				<form className="form" onSubmit={formik.handleSubmit}>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{/* formik.touched is enabled with onBlur */}
					{/* 
						1. onBlur events - toggles formik.touched
						2. conditional: if formik.touched and formik.errors 
					*/}
					{formik.touched.username && formik.errors.username ? (
						<h3>{formik.errors.username}</h3>
					) : (
						""
					)}
					<label>Password</label>

					<input
						type="password"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.password && formik.errors.password ? (
						<h3>{formik.errors.password}</h3>
					) : (
						""
					)}
					<button type="submit">Submit</button>
					{/* 8c. use conditional rendering to display the error to user */}
				</form>
			
		</section>
	);
}

export default Login;