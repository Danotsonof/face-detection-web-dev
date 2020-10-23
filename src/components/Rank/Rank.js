import React from 'react';
import "../ImageLinkForm/ImageLinkForm.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white text'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f2'>
        <strong>{entries}</strong>
      </div>
    </div>
  );
}

export default Rank;