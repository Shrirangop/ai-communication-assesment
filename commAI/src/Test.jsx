import React, { useEffect, useRef } from 'react';

const ScrollTriggerComponent = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    // Function to be called when the element comes into view
    const handleInView = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Element is in view!');
          // Trigger any function here
        }
      });
    };

    // Set up the IntersectionObserver
    const observer = new IntersectionObserver(handleInView, {
      root: null, // Default to viewport
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Start observing the element
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Clean up the observer on unmount
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll Down</div>
      <div
        ref={elementRef}
        style={{
          height: '200px',
          backgroundColor: 'lightblue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Watch me for a trigger!
      </div>
      <div style={{ height: '100vh' }}>More Content</div>
    </div>
  );
};

export default ScrollTriggerComponent;
