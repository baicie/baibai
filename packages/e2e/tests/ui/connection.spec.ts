import { test, expect } from '@playwright/test';

test.describe('Connection Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should create new connection', async ({ page }) => {
    await page.getByRole('button', { name: '添加连接' }).click();

    await page.getByLabel('连接名称').fill('Test Connection');
    await page.getByLabel('主机地址').fill('localhost');
    await page.getByLabel('端口').fill('3306');
    await page.getByLabel('用户名').fill('root');
    await page.getByLabel('密码').fill('password');

    await page.getByRole('button', { name: '保存' }).click();
    await expect(page.getByText('Test Connection')).toBeVisible();
  });
}); 