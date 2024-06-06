/**
 * Validation Expressions provides
 * an object that contains regular expressions
 * for the proper format of specific form controls.
 */
export const ValidationExpressions = {
  username: /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  membershipId: /^[0-9]{8}$/
};
