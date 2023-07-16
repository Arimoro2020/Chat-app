import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import UserContext from "./UserContext";

import * as yup from "yup";

function Signup() {

	const [signUp, setSignUp] = useState(false);
	const {currentUser, setCurrentUser} = useContext(UserContext);
	// 8a. create state error

	const navigate = useNavigate();
	function toggleSignup(){
		 setSignUp((prev) => !prev)};

	const formSchema = yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required(),
        name: yup.string().required(),
        avatar: yup.string().required(),
        background: yup.string().min(20, "must be more!").max(800, "must be less than!").required(),
	});
	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
            password: "",
            avatar: "",
            background: "",
		},
		validationSchema: formSchema,
		onSubmit: (values, actions) => {
			fetch( "/signup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(values),
			}).then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						actions.resetForm();
						navigate("/");
				
					});
				} 
			});
		},
	});

	return (
		<section>
				<form className="form" onSubmit={formik.handleSubmit}>
                <label>Name</label>
					<input
						type="text"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{/* formik.touched is enabled with onBlur */}
					{/* 
						1. onBlur events - toggles formik.touched
						2. conditional: if formik.touched and formik.errors 
					*/}
					{formik.touched.username && formik.errors.name ? (
						<h3>{formik.errors.name}</h3>
					) : (
						""
					)}
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
                    <label>Background</label>
					<input
						type="text"
						name="background"
						value={formik.values.background}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{/* formik.touched is enabled with onBlur */}
					{/* 
						1. onBlur events - toggles formik.touched
						2. conditional: if formik.touched and formik.errors 
					*/}
					{formik.touched.background && formik.errors.background ? (
						<h3>{formik.errors.background}</h3>
					) : (
						""
					)}
                    <label>Profile Picture</label>
					<input
						type="text"
						name="avatar"
						value={formik.values.avatar}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{/* formik.touched is enabled with onBlur */}
					{/* 
						1. onBlur events - toggles formik.touched
						2. conditional: if formik.touched and formik.errors 
					*/}
					{formik.touched.avatar && formik.errors.avatar ? (
						<h3>{formik.errors.avatar}</h3>
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
					<input type="submit" value="Sign Up" className="button" />
					{/* 8c. use conditional rendering to display the error to user */}
				</form>
			<section>
				<button className="button" onClick={()=>toggleSignup()}>
					{(signUp || currentUser)? "" : "Sign Up"}
				</button>
			</section>
		</section>
	);
}

export default Signup;