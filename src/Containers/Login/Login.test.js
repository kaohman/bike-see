import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { setError } from '../../actions';
import { fetchUser } from '../../thunks/fetchUser';
import { postUser } from '../../thunks/postUser';
jest.mock('../../thunks/fetchUser');
jest.mock('../../thunks/postUser');

describe('Login', () => {
  let wrapper;
  let fetchUserMock;
  let postUserMock;
  let setErrorMock;
  let mockUser;
  let mockError;
  let mockEvent;
  let mockHistory;

  beforeEach(() => {
    fetchUserMock = jest.fn();
    postUserMock = jest.fn();
    setErrorMock = jest.fn();
    mockError = '';
    mockHistory = { replace: jest.fn() };
    mockUser = { id: '1', name: 'Bobby', email: 'b@b', password: 'b'};
    wrapper = shallow(
      <Login
        error={mockError}
        user={mockUser}
        fetchUser={fetchUserMock}
        setError={setErrorMock}
        postUser={postUserMock}
        login={true}
        history={mockHistory}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      name: '',
      email: '',
      password: '',
      verifyPassword: ''
    });
  });

  describe('clearError', () => {
    it('should call setError', () => {
      wrapper.instance().clearError();
      expect(wrapper.instance().props.setError).toHaveBeenCalled();
    });
  });

  describe('updateState', () => {
    it('should update state with new values', () => {
      mockEvent = {
        preventDefault: jest.fn(),
        target: { id: 'email', value: 'C@C' }
      };
      const expected = 'c@c';
      wrapper.instance().updateState(mockEvent);
      expect(wrapper.state('email')).toEqual(expected);
    });

    it('should update more state with new values', () => {
      mockEvent = {
        preventDefault: jest.fn(),
        target: { id: 'name', value: 'Karin' }
      };
      const expected = 'Karin';
      wrapper.instance().updateState(mockEvent);
      expect(wrapper.state('name')).toEqual(expected);
    });
  });

  describe('handleSubmit', () => {
    it('should call loginUser with the correct params', async () => {
      wrapper.instance().loginUser = jest.fn();
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().loginUser).toHaveBeenCalled();
    });

    it('should call signUpUser with the correct params', async () => {
      wrapper = shallow(
        <Login
          user={mockUser}
          fetchUser={fetchUserMock}
          postUser={postUserMock}
          history={mockHistory}
          login={false}
        />
      );
      wrapper.instance().signUpUser = jest.fn();
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().signUpUser).toHaveBeenCalled();
    });

    it('should call updatePath', async () => {
      wrapper.instance().clearError = jest.fn();
      wrapper.instance().updatePath = jest.fn();
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().updatePath).toHaveBeenCalled();
    });
  });

  describe('signUpUser', () => {
    it('should call postUser with the correct params', async () => {
      await wrapper.instance().signUpUser(mockEvent);
      expect(wrapper.instance().props.postUser).toHaveBeenCalledWith({ name: '', email: '', password: '' });
    });

    it('should call setError if passwords dont match', async () => {
      wrapper.setState({ password: 'bleep', verifyPassword: 'bloop'});
      await wrapper.instance().signUpUser(mockEvent);
      expect(wrapper.instance().props.setError).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('should call fetchUser with the correct params', async () => {
      await wrapper.instance().loginUser(mockEvent);
      expect(wrapper.instance().props.fetchUser).toHaveBeenCalledWith({ email: '', password: '' });
    });
  });

  describe('updatePath', () => {
    it('should call history.replace', () => {
      wrapper.instance().updatePath();
      expect(wrapper.instance().props.history.replace).toHaveBeenCalled();
    });

    it('should not call history.replace if there is an error', () => {
      mockError = 'There is an error';
      wrapper = shallow(
        <Login
          error={mockError}
          history={mockHistory}
        />
      );
      wrapper.instance().updatePath();
      expect(wrapper.instance().props.history.replace).not.toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        error: mockError,
        user: mockUser,
        otherState: false,
      };
      const expected = {
        error: mockError,
        user: mockUser,
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when setError is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setError();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setError();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch when postUser is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = postUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.postUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});