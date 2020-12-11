import React from 'react';
import App from './App';
import {render} from '@testing-library/react';


test('render HEllo world' , ()=>{
    const { getByText }  = render(<App />);
    const linkElement = getByText(/hello/i);
    expect(linkElement).toBeInTheDocument();

});

test('render input world' , ()=>{
    const response = render(<App />);
    const ele = response.getByPlaceholderText(/pakistan/i);
    expect(ele).toBeInTheDocument();
});
