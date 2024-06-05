import { render, screen, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';

test('renders item list and handles delete', () => {
    const fetchItems = jest.fn();
    const items = [
        { _id: '1', title: 'Test Item 1', description: 'Description 1' },
        { _id: '2', title: 'Test Item 2', description: 'Description 2' },
    ];

    render(<ItemList items={items} fetchItems={fetchItems} />);

    expect(screen.getByText(/test item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test item 2/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/delete/i));

    expect(fetchItems).toHaveBeenCalled();
});
