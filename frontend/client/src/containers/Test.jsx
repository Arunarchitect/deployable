
import React, { useEffect, useState } from 'react';

const Test = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      // Make a simple API request to /api/test
      fetch('/api/users/register')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    return (
      <div>
        <h1>Test Page</h1>
        <p>Data from API: {data ? JSON.stringify(data) : 'Loading...'}</p>
      </div>
    );
};

export default Test;