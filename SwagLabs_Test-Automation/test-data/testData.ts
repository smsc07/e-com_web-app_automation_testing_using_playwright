export const testData = {

  base_url: 'https://www.saucedemo.com'!,
  screenshot_path: './screenshots',

  validUser: {
    // username: process.env.STANDARD_USER_USERNAME!,
    // password: process.env.PASSWORD!,
    username: 'standard_user'!,
    password: 'secret_sauce'!,
  },
  invalidUser: {
    username: 'wrong_user',
    password: 'wrong_pass',
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: process.env.PASSWORD!,
  },

};