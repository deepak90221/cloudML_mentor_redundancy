import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }
  
      try {
        const res = await axios.get("http://localhost:6500/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
  
    fetchProfile();
  }, [token]); // ✅ Add token as a dependency
  

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
