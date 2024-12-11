import React, { useRef, useState, useEffect } from "react";
import './Evaluation.css';
const Evaluation = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(""); // To store the final transcript
  
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    // Access user's webcam and display video
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          mediaRecorderRef.current = new MediaRecorder(stream);
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));

    // Initialize SpeechRecognition if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let fullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + " ";
        }
      
        fullTranscript = fullTranscript.trim();
        setTranscription(fullTranscript);
        finalTranscriptRef.current = fullTranscript;
      };
      

      recognition.onend = () => {
        // Transcription ended, now we stop the media recorder
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        // Use the final transcript stored in the ref
        saveRecording(url, finalTranscriptRef.current || "No transcription available");
        // Reset transcription for next recording
        setTranscription("");
        finalTranscriptRef.current = "";
      };

      setTranscription("");
      finalTranscriptRef.current = "";
      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTranscription();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Stop transcription first. onend will fire and stop the MediaRecorder.
    stopTranscription();
  };

  const startTranscription = () => {
    if (recognitionRef.current) {
      setTranscription("");
      finalTranscriptRef.current = "";
      recognitionRef.current.start();
    }
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const saveRecording = (videoUrl, transcript) => {
    const newRecording = { videoUrl, transcript, id: Date.now() };
    const updatedRecordings = [newRecording, ...recordings];
    setRecordings(updatedRecordings);
    localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
  };

  const deleteRecording = (id) => {
    const updatedRecordings = recordings.filter((rec) => rec.id !== id);
    setRecordings(updatedRecordings);
    localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
  };

  useEffect(() => {
    const savedRecordings = JSON.parse(localStorage.getItem("recordings")) || [];
    setRecordings(savedRecordings);
  }, []);

  return (
    <div className="evaluation-container">
      <div className="video-area-container">
        <video ref={videoRef} autoPlay playsInline muted className="video-element" />
      </div>
      <div className="controls">
        {isRecording ? (
          <button className="stop-btn" onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button className="start-btn" onClick={startRecording}>Start Recording</button>
        )}
      </div>
      <div className="text-area">
        <h3>Live Transcription</h3>
        <p>{transcription}</p>
      </div>

      <div className="recordings-list">
        <h3>Past Recordings</h3>
        {recordings.length > 0 ? (
          recordings.map((rec) => (
            <div key={rec.id} className="recording-item">
              <video src={rec.videoUrl} controls width="300" />
              <p><strong>Transcription:</strong> {rec.transcript}</p>
              <button className="delete-btn" onClick={() => deleteRecording(rec.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No recordings yet.</p>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
