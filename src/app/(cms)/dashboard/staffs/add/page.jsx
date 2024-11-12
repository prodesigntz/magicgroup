"use client";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { imageUploadToFirebase } from "@/firebase/fileOperations";
import useFetchAll from "@/lib/hooks/useFetchAll";
import firebase from "@/firebase/firebaseInit";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

function AddStaff() {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const { data: propertiesData, isLoading: isLoadingProperties } =
    useFetchAll("Properties");
  const { auth } = firebase;

  // State for form input and error handling
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    propertyID: "",
    department: "",
    role: "",
    profilePicture: "", // To hold the URL of the uploaded image
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null); // For profile image file upload

  // Fetch properties on page load
  useEffect(() => {
    if (propertiesData) {
      setProperties(propertiesData);
    }
  }, [propertiesData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Upload profile picture if available
      let profilePictureURL = "";
      if (profileImageFile) {
        profilePictureURL = await imageUploadToFirebase(
          profileImageFile,
          `profilePictures/${userCredential.user.uid}`
        );
      }

      // Save user details to Firestore with profile picture URL (if uploaded)
      const userDoc = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        role: formData.role,
        propertyID: formData.propertyID,
        department: formData.department,
        profilePicture: profilePictureURL,
      };

      // Save user details to Firestore in the 'users' collection
    //   await setDoc(doc(db, "users", userCredential.user.uid), userDoc);

     await createDocument(userDoc, "users");


      // Send email verification
      await sendEmailVerification(userCredential.user);
      setSuccessMessage("User created successfully. Verification email sent.");

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/dashboard"; // Adjust routing as needed
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture selection
  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        {isLoading ? (
          <div className="psektion sektion md:grid-cols-2 respons">
            <p>Loading...</p>
          </div>
        ) : (
          <section className="respons space-y-5">
            <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
              Add Staff
            </h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-slate-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Add Email
                </label>
                <input
                  className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="sektion md:grid-cols-2">
                <div className="mb-4">
                  <label
                    className="block text-slate-700 text-sm font-bold mb-2"
                    htmlFor="firstname"
                  >
                    Add First Name
                  </label>
                  <input
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-slate-700 text-sm font-bold mb-2"
                    htmlFor="lastname"
                  >
                    Add Last Name
                  </label>
                  <input
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="sektion md:grid-cols-2">
                <div className="mb-4">
                  <label
                    className="block text-slate-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Add Password
                  </label>
                  <input
                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-slate-700 text-sm font-bold mb-2"
                    htmlFor="profilePicture"
                  >
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={handleProfilePictureChange}
                    className="w-full px-4 py-2"
                  />
                </div>
              </div>

              <div className="sektion md:grid-cols-2">
                <div className="mb-4">
                  <label
                    className="block text-slate-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Select Role
                  </label>
                  <select
                    className="bg-pamojaaccent py-2 px-3 rounded"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="normal user">Normal User</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                {formData.role !== "normal user" && (
                  <>
                    <div className="mb-4">
                      <label
                        className="block text-slate-700 text-sm font-bold mb-2"
                        htmlFor="propertyID"
                      >
                        Select Property
                      </label>
                      <select
                        className="bg-pamojaaccent py-2 px-3 rounded"
                        name="propertyID"
                        value={formData.propertyID}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Property</option>
                        {isLoadingProperties ? (
                          <option>Loading properties...</option>
                        ) : (
                          properties.map((property) => (
                            <option key={property.id} value={property.id}>
                              {property.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-slate-700 text-sm font-bold mb-2"
                        htmlFor="department"
                      >
                        Select Department
                      </label>
                      <select
                        className="bg-pamojaaccent py-2 px-3 rounded"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        {properties
                          .find(
                            (property) => property.id === formData.propertyID
                          )
                          ?.departments.map((department) => (
                            <option key={department} value={department}>
                              {department}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

export default AddStaff;
