/**
 * The response model that is returned by the
 * User Registration API.
 */
export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  memberId: number;
  membershipId: string;
};
