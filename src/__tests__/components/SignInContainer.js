import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('submitting the form calls onSubmit with correct arguments', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('password'), 'password');
      fireEvent.press(getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});