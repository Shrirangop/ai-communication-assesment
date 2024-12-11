import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase.jsx';
import { doc, getDoc } from 'firebase/firestore';
import './Profile.css';
import {Link} from 'react-router-dom';
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('User document not found');
        }
      } else {
        console.log('User is not logged in');
      }
    });
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = '/login';
      localStorage.setItem("testlink","login");
      alert('User logged out successfully!');
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchUserData();
    localStorage.setItem("testlink","profile");
    let logbutton = document.getElementById('auth-button');
    let mobile_logbutton = document.getElementById('mobile-auth-button');
    if (logbutton || mobile_logbutton) {
      logbutton.innerText = 'Log out';
      mobile_logbutton.innerText = 'Log out';
      logbutton.addEventListener('click', handleLogout);
      mobile_logbutton.addEventListener('click',handleLogout);
    }
  }, []);

  return (
    <div className="profile-container">
      {userDetails ? (
        <div className="profile-card">
          <h2 className="profile-name">{userDetails.name}</h2>
          <p className="profile-email">{userDetails.email}</p>
          <div className="previous-reports">
            <h3>Previous Reports</h3>
            <ul>
              {userDetails.reports && userDetails.reports.length > 0 ? (
                userDetails.reports.map((report, index) => (
                  <li key={index}>{report}</li>
                ))
              ) : (
                <li>No reports available</li>
              )}
            </ul>
          </div>
          <Link to="/test">
            <button className="start-test-button">Start Test</button>
          </Link>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
