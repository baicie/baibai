import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/common/prisma.service";
import { EncryptionService } from "@/common/encryption.service";
import { CreateConnectionDto, UpdateConnectionDto } from "./dto";

@Injectable()
export class ConnectionService {
  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService
  ) {}

  async create(teamId: number, dto: CreateConnectionDto) {
    const encryptedPassword = await this.encryption.encrypt(dto.password);

    return this.prisma.connection.create({
      data: {
        ...dto,
        password: encryptedPassword,
        teamId,
      },
    });
  }

  async findByTeam(teamId: number) {
    return this.prisma.connection.findMany({
      where: { teamId },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        host: true,
        port: true,
        username: true,
        database: true,
        createdAt: true,
        // 不返回密码
      },
    });
  }
}
