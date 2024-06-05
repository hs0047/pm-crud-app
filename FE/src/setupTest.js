import '@testing-library/jest-dom/extend-expect';

const originalError = console.error;
console.error = (...args) => {
    if (/findDOMNode/.test(args[0])) {
        return;
    }
    originalError.call(console, ...args);
};
