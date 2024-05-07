export class AlreadyValidated extends Error {
  constructor() {
    super("Check-In already validated!");
  }
}
