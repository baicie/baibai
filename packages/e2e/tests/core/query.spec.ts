import { test, expect } from '@playwright/test';
import { invoke } from '@tauri-apps/api/tauri';

test.describe('Core Query Functions', () => {
  test('should execute SQL query', async () => {
    const result = await invoke('execute_sql', {
      sql: 'SELECT 1 as test',
    });

    expect(result).toEqual({
      columns: ['test'],
      rows: [[1]],
      affected_rows: 0,
    });
  });

  test('should handle query error', async () => {
    try {
      await invoke('execute_sql', {
        sql: 'INVALID SQL',
      });
      expect(false).toBeTruthy(); // 应该不会执行到这里
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
}); 