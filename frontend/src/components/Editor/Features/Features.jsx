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
    <div className="feats-container">
      <h1>Choose a Feat</h1>
      <div className="feats-grid">
        {feats.map((feat, index) => (
          <div key={index} className="feat-item">
            {feat}
            <button onClick={() => selectFeat(feat)}>
              {selectedFeats.includes(feat) ? 'Deselect' : 'Select'}
            </button>
          </div>
        ))}
      </div>
      <p>Selected Feats: {selectedFeats.join(', ')}</p>
    </div>
  );
};

export default Features;