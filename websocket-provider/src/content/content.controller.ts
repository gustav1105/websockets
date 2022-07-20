import { Controller, Get } from '@nestjs/common';
import { ContentGateway } from './content.gateway';

@Controller('content')
export class ContentController {
  constructor(private readonly gateway: ContentGateway) {}

  @Get()
  publishContent() {
    this.gateway.broadcastPlaybookUpdated(1);
    return { status: 'OK' };
  }
}
