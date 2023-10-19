import React, { useEffect, useState } from 'react';

const Fetch = () => {
  const URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchResponse = await fetch(URL);
        const body = await fetchResponse.json();
        setResponse(body);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  if (response) {
    // Access and use the response data directly within your component
    // console.log(response);

    // You can render the data here or use it in your component logic
  }

  return (
    <div>
      {/* Render the response data here if needed */}
    </div>
  );
}

export default Fetch;
