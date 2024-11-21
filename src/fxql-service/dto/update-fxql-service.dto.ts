import { PartialType } from '@nestjs/mapped-types';
import { CreateFxqlServiceDto } from './create-fxql-service.dto';

export class UpdateFxqlServiceDto extends PartialType(CreateFxqlServiceDto) {}
