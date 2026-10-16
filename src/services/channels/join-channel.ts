import { PostRequest } from '@/utils/requests';

export async function joinChannel(channelsId: string, username?: string) {
  const { data, error } = await PostRequest(`/channels/${channelsId}/join`, {
    username,
  });
  return { data, error };
}
