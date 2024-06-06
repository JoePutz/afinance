/**
 * User Registration model to send to the API.
 * This is a registration model for member users.
 */
export class UserRegistration {
  private readonly role: string = 'member';
  constructor(private username: string,
              private password: string,
              private membershipId: string,
              private lastFourOfSSN: string) {
  }
}
