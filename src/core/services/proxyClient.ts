export async function apiProxyFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const proxyUrl = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(proxyUrl, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json() as T;
  } catch (error) {
    console.error(`Failed executing proxy fetch to ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => apiProxyFetch<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) => apiProxyFetch<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) => apiProxyFetch<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestInit) => apiProxyFetch<T>(endpoint, { ...options, method: "DELETE" }),
};