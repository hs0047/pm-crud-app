import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('renders form and submits data', () => {
    const fetchItems = jest.fn();
    render(<Form fetchItems={fetchItems} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText(/add item/i));

    expect(fetchItems).toHaveBeenCalled();
});
