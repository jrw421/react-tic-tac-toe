import Square from './Square.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Square component renders the move correctly', () => {
    it('renders correctly', () => {
        const value = 'X';
        const rendered = renderer.create(
        <Square value={value} />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});