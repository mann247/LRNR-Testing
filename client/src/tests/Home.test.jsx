import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from '../pages/Home';


const renderHome = () =>
  render(
    React.createElement(
      MemoryRouter,
      null,
      React.createElement(Home, null)
    )
  );

test('renders the homepage tagline', () => {
  renderHome();

  const tagline = screen.getByText(
    /guided path to programming enlightenment/i
  );
  expect(tagline).toBeInTheDocument();
});

test('renders all three info sections with correct headings', () => {
  renderHome();


  expect(
    screen.getByRole('heading', { name: /Personalized Quizzess/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /Rewarding/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /Personal SME/i })
  ).toBeInTheDocument();
});
