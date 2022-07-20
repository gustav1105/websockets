import { Module } from '@nestjs/common';
import { ContentGateway } from './content.gateway';
import { ContentController } from './content.controller';

@Module({
  providers: [ContentGateway],
  controllers: [ContentController],
})
export class ContentModule {}
