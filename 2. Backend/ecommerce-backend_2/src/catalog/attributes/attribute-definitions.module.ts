import { Module } from '@nestjs/common';
import { AttributeDefinitionsController } from './attribute-definitions.controller';
import { AttributeDefinitionsService } from './attribute-definitions.service';

@Module({
  controllers: [AttributeDefinitionsController],
  providers: [AttributeDefinitionsService],
  exports: [AttributeDefinitionsService],
})
export class AttributeDefinitionsModule {}
