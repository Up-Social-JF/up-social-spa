import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  it('renders the App component', () => {
    render(<></>);

    screen.debug();
  });
});
