import React from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import axios from 'axios';

const ItemList = ({ items, fetchItems }) => {
    const handleDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`);
        fetchItems();
    };

    return (
        <List>
            {items.map((item) => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.title} secondary={item.description} />
                    <Button onClick={() => handleDelete(item._id)} color="secondary">
                        Delete
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default ItemList;
