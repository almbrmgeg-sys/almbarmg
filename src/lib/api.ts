const API_BASE = 'http://localhost:4000/api';

export async function apiFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({message: 'حدث خطأ غير متوقع'}));
    throw new Error(error.message ?? 'فشل الاتصال بالخادم');
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? 'تعذر تسجيل الدخول');
  }

  return data as {token: string; user: {id: number; fullName: string; role: string}};
}
