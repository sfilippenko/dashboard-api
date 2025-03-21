export class ValidateError extends Error {
  errors: unknown;
  context: string;

  constructor(errors: unknown, context: string) {
    super('Validate Error');
    this.errors = errors;
    this.context = context;
  }
}
