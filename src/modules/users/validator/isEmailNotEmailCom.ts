import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsEmailNotEmailCom implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const includes = '@email.com';
    return !text.includes(includes); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Email must not be @email.com';
  }
}
