import React, { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users"); // change port if needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name ? item.name : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;