import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NextModule } from "./next/next.module";
import { NextService } from "./next/next.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger API 文档配置
  const config = new DocumentBuilder()
    .setTitle("Baibai API")
    .setDescription("数据库连接管理 API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  // 获取 Next.js 处理器
  const nextService = app.get(NextService);
  await nextService.prepare();

  // 使用 Next.js 中间件
  app.use((req: any, res: any, next: () => void) => {
    const handle = nextService.getHandler();
    // 如果不是 API 路由，交给 Next.js 处理
    if (!req.path.startsWith("/api")) {
      return handle(req, res);
    }
    next();
  });

  await app.listen(3000);
}
bootstrap();
