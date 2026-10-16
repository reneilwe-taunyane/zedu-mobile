import { PostRequest } from '@/utils/requests';
import { joinChannel } from '@/services/channels/join-channel';

jest.mock('@/utils/requests', () => ({
  PostRequest: jest.fn(),
}));

const mockedPost = PostRequest as jest.Mock;

describe('joinChannel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('posts to the channel join endpoint', async () => {
    mockedPost.mockResolvedValueOnce({
      data: { message: 'Joined' },
      error: null,
    });

    const result = await joinChannel('ch-1', 'rene');

    expect(PostRequest).toHaveBeenCalledWith('/channels/ch-1/join', {
      username: 'rene',
    });
    expect(result.error).toBeNull();
  });

  it('returns the error when joining fails', async () => {
    mockedPost.mockResolvedValueOnce({ data: null, error: 'Nope' });

    const result = await joinChannel('ch-1', 'rene');

    expect(result.error).toBe('Nope');
  });
});
