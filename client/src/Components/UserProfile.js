import UserContext from "./UserContext";
import {useContext, useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function UserProfile() {
	const {currentUser, setCurrentUser} = useContext(UserContext);
    const [visibleForm, setVisibleForm] = useState(false);


	const toggleForm = () => setVisibleForm(visibleForm => !visibleForm);

	const formSchema = yup.object().shape({
		username: yup.string(),
		password: yup.string(),
        name: yup.string(),
        avatar: yup.string(),
        background: yup.string().min(20, "must be more!").max(800, "must be less than!"),
        online_status: yup.string(),
	});
	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
            password: "",
            avatar: "",
            background: "",
            online_status: "",
		},
		validationSchema: formSchema,
		onSubmit: (values, actions) => {
			fetch( `/users/${currentUser.id}`, {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(values),
			}).then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						actions.resetForm();
						setCurrentUser(data);
                        setVisibleForm(visibleForm =>!visibleForm);
						
				
					});
				} 
			});
		},
	});

    return(
        <div>
        <section>
            <p> Name: {currentUser.name}</p>
            <p> Background: {currentUser.background} </p>
            <p> Status: {currentUser.online_status}</p>
            <p> User ID: {currentUser.id}</p>
        </section>
        <section style={{
       visibility: visibleForm ? "visible" : "hidden",
    }}>
        <form className="form" onSubmit={formik.handleSubmit}>
                <label>Name</label>
					<input
						type="text"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				
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
				
					{formik.touched.username && formik.errors.username ? (
						<h3>{formik.errors.username}</h3>
					) : (
						""
					)}
                    	<label>Online status</label>
					<input
						type="text"
						name="online_status"
						value={formik.values.online_status}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				
					{formik.touched.online_status && formik.errors.online_status ? (
						<h3>{formik.errors.online_status}</h3>
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
					<input type="submit" value="Edit Profile" className="button" />
					{/* 8c. use conditional rendering to display the error to user */}
				</form>
                </section>
                <section>
				<button className="button" onClick={toggleForm}>
					{visibleForm? "" : "Edit Profile"}
				</button>
			</section>

        </div>
  
    )
}
export default UserProfile;