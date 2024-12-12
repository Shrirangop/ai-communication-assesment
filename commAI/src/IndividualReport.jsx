import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IndividualReport.css';
import { auth } from './firebase.jsx';

const IndividualReport = () => {
  const { id } = useParams(); // Extract the id from the URL
  const index = parseInt(id, 10); // Convert id to a number

  let user_reports = JSON.parse(localStorage.getItem('user_report')) || [];
  let user_report = user_reports[index];
  user_report = {
    "RecognitionStatus": "Success",
    "Offset": 0,
    "Duration": 34567000,
    "NBest": [
      {
        "Lexical": "the quick brown fox jumps over the lazy dog i enjoy learning new languages and exploring different cultures public speaking has always been a challenge for me but i am improving",
        "ITN": "The quick brown fox jumps over the lazy dog. I enjoy learning new languages and exploring different cultures. Public speaking has always been a challenge for me, but I am improving.",
        "MaskedITN": "The quick brown fox jumps over the lazy dog. I enjoy learning new languages and exploring different cultures. Public speaking has always been a challenge for me, but I am improving.",
        "Display": "The quick brown fox jumps over the lazy dog. I enjoy learning new languages and exploring different cultures. Public speaking has always been a challenge for me, but I am improving.",
        "Confidence": 0.94,
        "PronunciationAssessment": {
          "AccuracyScore": 88.4,
          "FluencyScore": 85.7,
          "CompletenessScore": 97.5,
          "PronScore": 87.2,
          "Words": [
            {
              "Word": "The",
              "AccuracyScore": 90.0,
              "ErrorType": "None"
            },
            {
              "Word": "quick",
              "AccuracyScore": 85.0,
              "ErrorType": "None"
            },
            {
              "Word": "brown",
              "AccuracyScore": 88.0,
              "ErrorType": "None"
            },
            {
              "Word": "fox",
              "AccuracyScore": 92.0,
              "ErrorType": "None"
            },
            {
              "Word": "jumps",
              "AccuracyScore": 80.0,
              "ErrorType": "None"
            },
            {
              "Word": "over",
              "AccuracyScore": 87.0,
              "ErrorType": "None"
            },
            {
              "Word": "the",
              "AccuracyScore": 90.0,
              "ErrorType": "None"
            },
            {
              "Word": "lazy",
              "AccuracyScore": 84.0,
              "ErrorType": "None"
            },
            {
              "Word": "dog",
              "AccuracyScore": 90.0,
              "ErrorType": "None"
            },
            {
              "Word": "I",
              "AccuracyScore": 89.0,
              "ErrorType": "None"
            },
            {
              "Word": "enjoy",
              "AccuracyScore": 86.0,
              "ErrorType": "None"
            },
            {
              "Word": "learning",
              "AccuracyScore": 83.0,
              "ErrorType": "None"
            },
            {
              "Word": "new",
              "AccuracyScore": 88.0,
              "ErrorType": "None"
            },
            {
              "Word": "languages",
              "AccuracyScore": 82.0,
              "ErrorType": "None"
            },
            {
              "Word": "and",
              "AccuracyScore": 91.0,
              "ErrorType": "None"
            },
            {
              "Word": "exploring",
              "AccuracyScore": 84.0,
              "ErrorType": "None"
            },
            {
              "Word": "different",
              "AccuracyScore": 87.0,
              "ErrorType": "None"
            },
            {
              "Word": "cultures",
              "AccuracyScore": 83.0,
              "ErrorType": "None"
            },
            {
              "Word": "Public",
              "AccuracyScore": 85.0,
              "ErrorType": "None"
            },
            {
              "Word": "speaking",
              "AccuracyScore": 82.0,
              "ErrorType": "None"
            },
            {
              "Word": "has",
              "AccuracyScore": 90.0,
              "ErrorType": "None"
            },
            {
              "Word": "always",
              "AccuracyScore": 85.0,
              "ErrorType": "None"
            },
            {
              "Word": "been",
              "AccuracyScore": 88.0,
              "ErrorType": "None"
            },
            {
              "Word": "a",
              "AccuracyScore": 92.0,
              "ErrorType": "None"
            },
            {
              "Word": "challenge",
              "AccuracyScore": 80.0,
              "ErrorType": "None"
            },
            {
              "Word": "for",
              "AccuracyScore": 89.0,
              "ErrorType": "None"
            },
            {
              "Word": "me",
              "AccuracyScore": 90.0,
              "ErrorType": "None"
            },
            {
              "Word": "but",
              "AccuracyScore": 87.0,
              "ErrorType": "None"
            },
            {
              "Word": "I",
              "AccuracyScore": 91.0,
              "ErrorType": "None"
            },
            {
              "Word": "am",
              "AccuracyScore": 93.0,
              "ErrorType": "None"
            },
            {
              "Word": "improving",
              "AccuracyScore": 85.0,
              "ErrorType": "None"
            }
          ]
        }
      }
    ]
  };
  if (!user_report) {
    return <div className="report-container">Report not found.</div>;
  }

  const { NBest } = user_report;
  const { PronunciationAssessment, Display } = NBest[0];
  const { AccuracyScore, FluencyScore, CompletenessScore, PronScore, Words } = PronunciationAssessment;

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = '/login';
      localStorage.setItem("testlink", "login");
      alert('User logged out successfully!');
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    localStorage.setItem("testlink", "profile");
    let logbutton = document.getElementById('auth-button');
    let mobile_logbutton = document.getElementById('mobile-auth-button');
    if (logbutton || mobile_logbutton) {
      logbutton.innerText = 'Log out';
      mobile_logbutton.innerText = 'Log out';
      logbutton.addEventListener('click', handleLogout);
      mobile_logbutton.addEventListener('click', handleLogout);
    }
  }, []);

  return (
    <div className="report-container">
      <button className="go-back-button" onClick={() => (window.location.href = '/reports')}>
        Go Back
      </button>

      <div className="report-card">
        <h2 className="report-title">Pronunciation Report</h2>
        <p className="report-text">
          <strong>Transcript:</strong> {Display}
        </p>

        <div className="report-scores">
          <div className="score-item">
            <p><strong>Accuracy Score:</strong> {AccuracyScore}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${AccuracyScore}%` }}></div>
            </div>
          </div>

          <div className="score-item">
            <p><strong>Fluency Score:</strong> {FluencyScore}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${FluencyScore}%` }}></div>
            </div>
          </div>

          <div className="score-item">
            <p><strong>Completeness Score:</strong> {CompletenessScore}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${CompletenessScore}%` }}></div>
            </div>
          </div>

          <div className="score-item">
            <p><strong>Pronunciation Score:</strong> {PronScore}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${PronScore}%` }}></div>
            </div>
          </div>
        </div>

        <h3 className="words-title">Word-by-Word Analysis</h3>
        <div className="words-container">
          {Words.map((word, idx) => (
            <div key={idx} className="word-item">
              <span className="word-text">{word.Word}:</span>
              <span className="word-score">Accuracy: {word.AccuracyScore}</span>
              <div className="progress-bar word-progress-bar">
                <div className="progress" style={{ width: `${word.AccuracyScore}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="go-back-button" onClick={() => (window.location.href = '/reports')}>
        Go Back
      </button>
    </div>
  );
};

export default IndividualReport;
