export const testData = {

  base_url: process.env.BASE_URL!,
  screenshot_path: process.env.SCREENSHOT_PATH!,

  validUser: {
    username: process.env.STANDARD_USER_USERNAME!,
    password: process.env.PASSWORD!,
  },
  invalidUser: {
    username: 'wrong_user',
    password: 'wrong_pass',
  },
};