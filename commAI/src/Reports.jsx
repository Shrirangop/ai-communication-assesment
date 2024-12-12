import React,{useEffect} from 'react';
import './Reports.css';
import { auth, db } from './firebase.jsx';
const Reports = () => {
  let user_reports = JSON.parse(localStorage.getItem('user_report')) || [];
  user_reports = [{
    date: "01/01/2024",
    Time: "9:00 pm",
  },{
    date: "01/01/2024",
    Time: "9:00 pm",
  },{
    date: "01/01/2024",
    Time: "9:00 pm",
  },{
    date: "01/01/2024",
    Time: "9:00 pm",
  },{
    date: "01/01/2024",
    Time: "9:00 pm",
  },{
    date: "01/01/2024",
    Time: "9:00 pm",
  }];

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
    <div className="reports-container">
      <h1>Your Reports</h1>
      <div className="reports-list">
        {user_reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          user_reports.map((report, index) => (
            <div className="reports-card" key={index}>
              <div className="report-details">
                <h3>Report {index + 1}</h3>
                <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(report.date).toLocaleTimeString()}</p>
              </div>
              <button
                className="view-report-button"
                onClick={() => window.location.href = `/reports/${index}`}
              >
                View Report
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
