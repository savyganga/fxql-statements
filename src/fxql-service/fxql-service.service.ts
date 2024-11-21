import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Repository } from 'typeorm';
import { FxqlService } from './entities/fxql-service.entity';
import { CreateFxqlServiceDto } from './dto/create-fxql-service.dto';
import { transformFxqlEntries } from './fxql.utils';
import * as responseHelper from './responses';

@Injectable()
export class FxqlServiceService {
  constructor(
    @InjectRepository(FxqlService)
    private readonly fxqlRepository: Repository<FxqlService>,
  ) {}

  async create(createFxqlServiceDto: CreateFxqlServiceDto) {

    try {

      const { FXQL } = createFxqlServiceDto;

      // parse the FXQL input
      const parsedPairs = this.parseFxql(FXQL);

      const results = [];
      for (const { sourceCurrency, destinationCurrency, entries } of parsedPairs) {
        // check if record exists
        const existingRecord = await this.fxqlRepository.findOne({
          where: {
            sourceCurrency,
            destinationCurrency,
          },
        });

        if (existingRecord) {
          // add the new entries to the beginning of the fxqlEntries array
          existingRecord.fxqlEntries = [...entries, ...existingRecord.fxqlEntries];
          await this.fxqlRepository.save(existingRecord);
          results.push(existingRecord);
        } else {
          // create a new record
          const newRecord = this.fxqlRepository.create({
            sourceCurrency,
            destinationCurrency,
            fxqlEntries: entries,
          });
          await this.fxqlRepository.save(newRecord);
          results.push(newRecord);
        }
      }

      const formattedResults = transformFxqlEntries(results);

      return responseHelper.createSuccessData('FXQL Entries Created Successfully.', formattedResults);


    } catch (error) {
      return responseHelper.badRequestErrorNoData(error.message)
    }
  }
  
  private parseFxql(fxqlString: string) {
    fxqlString = fxqlString.replace(/\\n/g, '\n');
  
    const regex = /^([A-Z]{3})-([A-Z]{3}) \{\n\s*BUY ([0-9]+(\.[0-9]+)?)\n\s*SELL ([0-9]+(\.[0-9]+)?)\n\s*CAP ([0-9]+)\n\}(\n\n([A-Z]{3})-([A-Z]{3}) \{\n\s*BUY ([0-9]+(\.[0-9]+)?)\n\s*SELL ([0-9]+(\.[0-9]+)?)\n\s*CAP ([0-9]+)\n\})*$/;
  
    if (!regex.test(fxqlString)) {
      throw new BadRequestException('Invalid FXQL format or invalid FXQL pairs found in input');
    }
  
    const pairsMap = new Map();
  
    const pairRegex = /([A-Z]{3})-([A-Z]{3}) \{\n\s*BUY ([0-9]+(\.[0-9]+)?)\n\s*SELL ([0-9]+(\.[0-9]+)?)\n\s*CAP ([0-9]+)\n\}/g;
  
    let match;
    while ((match = pairRegex.exec(fxqlString)) !== null) {
      const [_, sourceCurrency, destinationCurrency, buy, , sell, , cap] = match;
    
      const entry = {
        buy: parseFloat(buy),
        sell: parseFloat(sell),
        cap: parseInt(cap, 10),
        created_at: new Date().toISOString(),
      };
    
      const pairKey = `${sourceCurrency}-${destinationCurrency}`;
      if (!pairsMap.has(pairKey)) {
        pairsMap.set(pairKey, {
          sourceCurrency,
          destinationCurrency,
          entries: [],
        });
      }
      pairsMap.get(pairKey).entries.push(entry);
    }
  
    return Array.from(pairsMap.values());
  }
  


}
