import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ConnectionsModule } from "./modules/connections/connections.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { UsersModule } from "./modules/users/users.module";
import { NextModule } from "./next/next.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ConnectionsModule,
    TeamsModule,
    UsersModule,
    NextModule,
  ],
})
export class AppModule {}
