import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FxqlServiceService } from './fxql-service.service';
import { CreateFxqlServiceDto } from './dto/create-fxql-service.dto';
import { UpdateFxqlServiceDto } from './dto/update-fxql-service.dto';
import * as responseHelper from './responses';

@Controller('fxql-statements')
export class FxqlServiceController {
  constructor(private readonly fxqlServiceService: FxqlServiceService) {}

  @Post()
  async create(@Body() createFxqlServiceDto: CreateFxqlServiceDto) {
    try {
      const result = await this.fxqlServiceService.create(createFxqlServiceDto);
      if (result.statusCode >= 400 && result.statusCode < 500) {
        throw new HttpException(result, result.statusCode);
      }

      return result;
    } catch (error) {
      if (error.statusCode) {
        throw new HttpException(error, error.statusCode);
      }
      
      throw new HttpException(
        responseHelper.badRequestErrorNoData(error.message),
        HttpStatus.BAD_REQUEST, 
      );
      
    }
  }

  // @Get()
  // findAll() {
  //   return this.fxqlServiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fxqlServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFxqlServiceDto: UpdateFxqlServiceDto) {
  //   return this.fxqlServiceService.update(+id, updateFxqlServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fxqlServiceService.remove(+id);
  // }
}


