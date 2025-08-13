import { exampleEndpoint } from '@/lib/endpoints/example';
import { get } from '@/lib/apiClient';
import { Example } from '@/types/api/example';

export const getExample = async () => {
  return get<Example[]>(exampleEndpoint);
};
