import UserContext from "./UserContext";
import {useContext, useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReactComponent as EditSvg } from "/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/Edit.svg";


function UserProfile() {
	const {currentUser, setCurrentUser} = useContext(UserContext);
    const [visibleForm, setVisibleForm] = useState(false);


	function toggleForm(){ 
        setVisibleForm(visibleForm => !visibleForm)};

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
			fetch( `http://localhost:5555/users/${currentUser.id}`, {
				method: "PATCH",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
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
			<span role="img">
				<img src={currentUser.avatar} alt={currentUser.name} width={320} />
			</span>

            <h4> {currentUser.name}</h4>
            <p> Background: {currentUser.background} </p>
			<p> User ID: {currentUser.id}</p>
            <em> Online status: {currentUser.online_status}</em>
         
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
				<span role="img"><EditSvg className="button" onClick={()=>toggleForm()} width={"35px"}>
					{visibleForm? "" : "Edit Profile"}
				</EditSvg></span>
			</section>

        </div>
  
    )
}
export default UserProfile;