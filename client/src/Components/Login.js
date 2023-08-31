import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UserContext from "./UserContext";
import {useContext} from "react";







function Login(){

	const navigate = useNavigate();
	const {initialValues, setInitialValues} = useContext(UserContext);
	// const [logInfo, setLogInfo] = useState();
	// const [logIn, setLogIn] = useState( user? true : false);






	

    

	// 8a. create state error


	const formSchema = yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required(),
	});
	const formik = useFormik({
		initialValues,
		validationSchema: formSchema,
		onSubmit:(values, actions) => {
			fetch( `http://localhost:55556/login`, {
				method: "POST",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
				body: JSON.stringify(values),
			}).then((res) => {
				if (res.ok) {
					
						actions.resetForm();
						navigate("/contacts");
						
				
				}else{
					navigate("/signup");
				} 
			});
		},
	});

	useEffect(() => {
		setInitialValues(formik.values);
	  }, [setInitialValues, formik.values]);
		

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