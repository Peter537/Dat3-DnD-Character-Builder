import React, { useState } from 'react';
import './Features.css'; // Import the CSS file

const Features = ({ feats = ["Feat1", "Feat2", "Feat3"]}) => {
  const [selectedFeats, setSelectedFeats] = useState([]);

  const selectFeat = (feat) => {
    if (selectedFeats.includes(feat)) {
      setSelectedFeats(selectedFeats.filter(f => f !== feat));
    } else {
      setSelectedFeats([...selectedFeats, feat]);
    }
  };

  return (
<>
    <h1>Choose a Feat</h1>
    <div className="feats-container">
      
      <div className="feats-grid">
        {feats.map((feat, index) => (
          <div key={index} className="feat-item" style={{border: "solid 1px red"}}>
            <p style={{marginRight: "5%"}}>{feat}</p>
            <button onClick={() => selectFeat(feat)}>
              {selectedFeats.includes(feat) ? 'Deselect' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>

    <div style={{margin: "1%"}}></div>

    <p>Selected Feats: {selectedFeats.join(', ')}</p>
    </>
  );
};

export default Features;