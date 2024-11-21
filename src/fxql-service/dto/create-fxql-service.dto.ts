import { IsString, Matches, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'fxqlValidator', async: false })
export class FxqlFormatValidator implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    const pattern = /^([A-Z]{3})-([A-Z]{3}) \{\n\s*BUY ([0-9]+(?:\.[0-9]+)?)\n\s*SELL ([0-9]+(?:\.[0-9]+)?)\n\s*CAP ([0-9]+)\n\}(?:\n\n([A-Z]{3})-([A-Z]{3}) \{\n\s*BUY ([0-9]+(?:\.[0-9]+)?)\n\s*SELL ([0-9]+(?:\.[0-9]+)?)\n\s*CAP ([0-9]+)\n\})*$/;
    return pattern.test(text);
  }

  defaultMessage(): string {
    return 'FXQL format is invalid. Please provide valid FXQL string(s) with uppercase currency codes and proper formatting.';
  }
}


export class CreateFxqlServiceDto {
  @IsString()
  @Validate(FxqlFormatValidator)
  FXQL: string;
}
