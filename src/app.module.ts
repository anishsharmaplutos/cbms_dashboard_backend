import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderEntity } from './entities/header.entity';
import { FooterEntity } from './entities/footer.entity';
import { PlutosHomeEntity } from './entities/plutos_home.entity';
import { ExternalEntity } from './entities/external.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([HeaderEntity, FooterEntity, PlutosHomeEntity, ExternalEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
