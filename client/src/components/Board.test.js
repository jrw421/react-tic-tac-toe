import checkForWin from './Board.jsx';
import Square from './Square.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

test('Board solution to horizontally win', () => {
    expect(checkForWin.checkForWin(0, 0)).toBe(true);
});

describe('Square component renders the move correctly', () => {
    it('renders correctly', () => {
      const value = 'X';
      const rendered = renderer.create(
        <Square value={value} />
      );
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });