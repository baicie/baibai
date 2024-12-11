import { test, expect } from '@playwright/test';

test.describe('Server API', () => {
  const API_URL = 'http://localhost:3000/api';

  test('should list connections', async ({ request }) => {
    const response = await request.get(`${API_URL}/connections`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
}); 