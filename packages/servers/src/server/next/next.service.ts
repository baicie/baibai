import { Injectable, OnModuleInit } from "@nestjs/common";
import next from "next";
import { NextServer } from "next/dist/server/next";

@Injectable()
export class NextService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit() {
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== "production",
        dir: "./src/client",
      });
    } catch (error) {
      console.error("Error initializing Next.js", error);
    }
  }

  async prepare() {
    try {
      await this.server.prepare();
    } catch (error) {
      console.error("Error preparing Next.js", error);
    }
  }

  getHandler() {
    return this.server.getRequestHandler();
  }
}
