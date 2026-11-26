/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

jest.useFakeTimers();

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  // Unmount before the environment is torn down so pending
  // navigation animations and timers do not run afterwards.
  await ReactTestRenderer.act(() => {
    renderer?.unmount();
    jest.runOnlyPendingTimers();
  });
});
