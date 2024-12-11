import { useEffect, useState, useRef } from "react";
import "./About.css"; // Import the CSS file

const About = () => {
  const s = "Unlock your English Communication Potential!";
  const s1 = "Challenger's AI Communication Assessment Tool";

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  let i1 = 0;
  let es1 = "";
  let i = 0;
  let es = "";

  // Typewrite function for description
  const typewrite = () => {
    if (i < s.length) {
      es = es + s[i];
      setDescription(es);
      i++;
      setTimeout(typewrite, 30);
    }
  };

  // Typewrite function for heading
  const typewrite1 = () => {
    if (i1 < s1.length) {
      es1 = es1 + s1[i1];
      setHeading(es1);
      i1++;
      setTimeout(typewrite1, 30);
    } else {
      typewrite();
    }
  };

  // Ref for triggering the typewriter effect
  const elementRef = useRef(null);

  useEffect(() => {
    const handleInView = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typewrite1();
        } else {
          es = "";
          i = 0;
          setDescription("");
          es1 = "";
          i1 = 0;
          setHeading("");
        }
      });
    };

    const observer = new IntersectionObserver(handleInView, {
      root: null,
      threshold: 0.1,
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="about">
        <p className="heading">{heading}</p>
        <p className="description-1" ref={elementRef}>
          {description}
        </p>
      </div>

      <div className="feature-section">
        <h2 className="feature-heading">Key Features</h2>
        <div className="card">
          <ol className="key-features">
            <li>AI-Driven Precision: Cutting-edge AI evaluates grammar, pronunciation, and fluency for a comprehensive analysis.</li>
            <li>Instant Feedback: Get detailed, actionable feedback to improve instantly.</li>
            <li>Personalized Recommendations: Tailored suggestions based on your strengths and areas for improvement.</li>
            <li>Progress Tracking: Monitor your growth with insightful reports and performance trends.</li>
            <li>Practice Anytime, Anywhere: Access the platform 24/7 on desktop or mobile devices.</li>
          </ol>
        </div>
      </div>

      <div className="feature-section">
        <h2 className="feature-heading">How to Use?</h2>
        <div className="card">
          <ol className="key-features">
            <li>Register and Log In: Create an account to access your personalized dashboard.</li>
            <li>Take an Assessment: Complete grammar, pronunciation, and fluency exercises designed by language experts.</li>
            <li>Get Your Report: Receive a detailed report with AI-powered insights into your communication skills.</li>
          </ol>
        </div>
      </div>

      <div className="feature-section" style={{ marginBottom: "30px" }}>
        <h2 className="feature-heading">Why Choose Us?</h2>
        <div className="card">
          <ol className="key-features">
            <li>Accurate AI Evaluation: Our AI algorithms provide precise analysis, ensuring consistent and unbiased feedback.</li>
            <li>Comprehensive Skill Assessment: Assess multiple facets of communication: grammar, pronunciation, and fluency.</li>
            <li>User-Friendly Interface: Simple, intuitive design for easy navigation and use.</li>
            <li>Trusted by Learners Worldwide: Join thousands of users enhancing their English communication.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default About;
