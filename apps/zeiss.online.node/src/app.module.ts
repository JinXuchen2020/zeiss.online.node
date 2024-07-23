import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { default as DatabaseModule } from './database.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { SaleStatusModule } from './sale-status/sale-status.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [AutomapperModule.forRoot({
              strategyInitializer: classes(),
            }),
            DatabaseModule, 
            UsersModule, 
            AuthModule, 
            SaleStatusModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
