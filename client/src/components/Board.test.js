import Board from './Board.jsx';
import Square from './Square.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

const state = {
    horizontalWin: [['X','X','X'], [null, null, null], [null, null, null]],
    verticalWin: [['X', null, null], ['X', null, null], ['X', null, null]],
    diagonalWin: [['X', null, null], [null, 'X', null], [null, null, 'X']]
}

const board = renderer.create(<Board/>).getInstance();

test('Board solution to horizontally win', () => {
    expect(board.checkForWin(0, 0, state.horizontalWin)).toBe(true);
});

test('Board solution to vertically win', () => {
    expect(board.checkForWin(0, 0, state.verticalWin)).toBe(true);
});

test('Board solution to diagonally win', () => {
    expect(board.checkForWin(0, 0, state.diagonalWin)).toBe(true);
});

describe('Board component should render', () => {
    it('renders correctly', () => {
        const rendered = renderer.create(
        <Board/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});