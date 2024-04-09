import React, { useState, useEffect } from "react";
import axios from 'axios';

const AddUserForm = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: '',
    role: 'Client', 
    email: '',
    password: '',
  });

  // State for user list, form errors, and error message
  const [userList, setUserList] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [fetch, setFetch] = useState(false);

  // Fetch user list on component mount
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get('/api/users');
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserList();
  }, []);

  // Validate form input
  const validateForm = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email is not valid';
    }

    if (!userData.password.trim()) {
      errors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        // Add user to the server
        await axios.post('/admin/adduser', userData);

        // Reset form data and clear errors
        setUserData({ name: '', role: 'Client', email: '', password: '' });
        setErrors({});
        setErrorMessage('');
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      setErrorMessage('Failed to add user. Please check your criteria.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleAddUser}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className={`border p-2 rounded w-full ${errors.name && 'border-red-500'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          {/* ... (other form fields) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role:</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="Client">Client</option>
              <option value="Auditor">Auditor</option>
              <option value="ProjectManager">Project Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className={`border p-2 rounded w-full ${errors.email && 'border-red-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className={`border p-2 rounded w-full ${errors.password && 'border-red-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
            Add User
          </button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
