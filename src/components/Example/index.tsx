'use client';

import { useEffect, useState } from 'react';
import { getExample } from '@/services/exampleService';
import type { Example } from '@/types/api/example';

export default function Example() {
  const [users, setUsers] = useState<Example[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getExample();
      if (result.success) setUsers(result.data || []);
      else setError(result.error?.message || 'Unknown error');
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
