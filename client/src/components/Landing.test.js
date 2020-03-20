import Landing from './Landing.jsx';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Landing component should render', () => {
    it('renders correctly', () => {
        const rendered = renderer.create(
        <Landing/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});