import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Home/Form';
import ItemList from './Home/ItemList';
import { Container } from 'react-bootstrap';

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`);
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Project Management</h1>
      <Form fetchItems={fetchItems} />
      <ItemList items={items} fetchItems={fetchItems} />
    </Container>
  );
};

export default App;
