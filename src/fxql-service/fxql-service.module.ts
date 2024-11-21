import { Module } from '@nestjs/common';
import { FxqlServiceService } from './fxql-service.service';
import { FxqlServiceController } from './fxql-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FxqlService } from './entities/fxql-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FxqlService])],
  controllers: [FxqlServiceController],
  providers: [FxqlServiceService],
})
export class FxqlServiceModule {}
