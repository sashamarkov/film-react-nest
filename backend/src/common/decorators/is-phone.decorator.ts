import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Взял отсюда: https://habr.com/ru/articles/110731/
          // Ориентировано на российские мобильные + городские с кодом из 3 цифр
          const phoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
          return typeof value === 'string' && phoneRegex.test(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Телефон должен быть в форматах: +79261234567, 89261234567, 8(926)123-45-67, (495)1234567 и др.';
        },
      },
    });
  };
}