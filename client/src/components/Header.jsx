  import React, { useEffect } from "react";
  import { useAuth0 } from "@auth0/auth0-react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  const Header = () => {
    const { isAuthenticated, user, isLoading, loginWithRedirect, logout } =
      useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          if (isAuthenticated && !isLoading) {
            const response = await axios.get(`/api/userRole?email=${user.email}`);
            const userRole = response.data.role || "Client";
            // just to debugg
            console.log(userRole,"just to debug");

            switch (userRole) {
              case "Admin":
                navigate("/admin/dashboard");
                break;
              case "Client":
                navigate("/client/dashboard");
                break;
              case "Auditor":
                navigate("/auditor/dashboard");
                break;
              case "ProjectManager":
                navigate("/projectmanager/dashboard");
                break;
              default:
                navigate("/");
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          navigate("/client/dashboard");
        }
      };

      fetchUserRole();
    }, [isAuthenticated, isLoading, navigate]);


    return (
      <header className="flex justify-between items-center h-20 bg-gray-100 p-4">
        <nav className="border border-gray-300 flex justify-between gap-5 text-lg p-2 m-2 w-10/12 h-full">
          <div className="flex justify-between gap-2 text-black font-semibold whitespace-nowrap leading-7 mb-2">
            <img className="w-12 h-9" src="/logo.jpg" alt="logo" />
            <div className="font-inter self-start mt-3">Customer Support</div>
          </div>
          <div className="rounded border border-gray-400 flex gap-4 text-gray-600 font-semibold leading-9 p-1 w-1/2">
            <input
              type="text"
              className="font-inter w-full"
              placeholder="Search"
            />
            <i className="fas fa-search w-5"></i>
          </div>
        </nav>

        <button
          onClick={() =>
            isAuthenticated
              ? logout({ returnTo: window.location.origin })
              : loginWithRedirect()
          }
          className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>

        <div className="flex flex-col items-center  h-full ml-2 mr-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://style.monday.com/static/media/person1.de30c8ee.png"
            alt="User avatar"
          />
          <p className="font-bold text-lg">
            {isAuthenticated ? user.name || user.email: "Guest"}
          </p>
        </div>
      </header>
    );
  };

  export default Header;
