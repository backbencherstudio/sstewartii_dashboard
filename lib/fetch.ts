// lib/fetchApi.ts
import { redirect } from 'next/navigation';

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // sends cookie automatically
    }
  );

  if (response.status === 401) {
    redirect('/login');          // token invalid/expired
  }

  if (response.status === 403) {
    redirect('/unauthorized');   // logged in but no permission
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}