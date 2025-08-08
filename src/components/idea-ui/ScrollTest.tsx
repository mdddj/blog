import React, { useEffect } from 'react';

const ScrollTest: React.FC = () => {
  useEffect(() => {
    // Force enable body scroll on mount
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.documentElement.style.overflow = 'auto';
    
    console.log('ScrollTest mounted - body overflow:', document.body.style.overflow);
    
    return () => {
      console.log('ScrollTest unmounting');
    };
  }, []);

  const checkScrollState = () => {
    console.log('Body styles:', {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      height: document.body.style.height,
    });
    console.log('HTML styles:', {
      overflow: document.documentElement.style.overflow,
    });
    console.log('Computed body styles:', {
      overflow: window.getComputedStyle(document.body).overflow,
      position: window.getComputedStyle(document.body).position,
    });
  };

  return (
    <div style={{ padding: '20px', minHeight: '200vh', backgroundColor: '#f0f0f0' }}>
      <h1>Scroll Test Page</h1>
      <button onClick={checkScrollState} style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
        Check Scroll State (Console)
      </button>
      
      <div style={{ marginTop: '50px' }}>
        <p>This page should be scrollable. If you can't scroll, there's a CSS issue.</p>
        <p>The page height is set to 200vh to ensure there's content to scroll.</p>
      </div>

      {/* Generate lots of content to test scrolling */}
      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} style={{ padding: '20px', margin: '10px', backgroundColor: i % 2 === 0 ? '#e3f2fd' : '#f3e5f5', borderRadius: '8px' }}>
          <h3>Section {i + 1}</h3>
          <p>
            This is test content section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          {i === 10 && (
            <div style={{ padding: '20px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
              <strong>Checkpoint 1:</strong> If you can see this, you've scrolled successfully!
            </div>
          )}
          {i === 25 && (
            <div style={{ padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
              <strong>Checkpoint 2:</strong> Great! Scrolling is working properly.
            </div>
          )}
          {i === 40 && (
            <div style={{ padding: '20px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
              <strong>Checkpoint 3:</strong> Almost at the bottom. Scroll is functioning correctly.
            </div>
          )}
        </div>
      ))}

      <div style={{ padding: '40px', backgroundColor: '#c8e6c9', textAlign: 'center', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🎉 End of Content</h2>
        <p>If you can see this section, scrolling is working perfectly!</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Scroll to Top
        </button>
      </div>
    </div>
  );
};

export default ScrollTest;