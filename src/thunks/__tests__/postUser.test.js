import { postUser } from '../postUser';
import { setLoading, setError } from '../../actions';
import { fetchData } from '../../utils/api';
jest.mock('../../utils/api');

describe('postUser', () => {
  let mockDispatch;
  let mockUser;

  beforeEach(() => {
    mockUser = {name: 'Bob', email: 'bob@bob', password: 'password'};
    mockDispatch = jest.fn();
  });

  it('should call dispatch with the setLoading action', () => {
    const thunk = postUser(mockUser);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    const thunk = postUser(mockUser);
    await thunk(mockDispatch);
    expect(fetchData).toHaveBeenCalledWith(`https://bike-see.herokuapp.com/api/v1/users/new`, 'POST', mockUser);
  });

  it('should dispatch setLoading(false)', async () => {
    const thunk = postUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch setError with message if response is not ok', async () => {
    fetchData.mockImplementation(() => {
      throw { message: 'Error fetching data' }
    });
    const thunk = postUser(mockUser);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('User already exists. Please log in.'));
  });
});