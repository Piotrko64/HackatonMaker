export const AuthEndpointsDataSwagger = {
  SignUp: {
    ApiOperation: { summary: 'Sign up to our app' },
    ApiResponse: {
      status: 201,
      schema: {
        type: 'object',
        example: {
          id: 5,
          email: 'example@mail.pl',
        },
      },
    },
  },
  SignIn: {
    ApiOperation: { summary: 'Sign In to app' },
    ApiResponse: {
      status: 200,
      schema: {
        type: 'object',
        example: {
          id: 5,
          email: 'example@mail.pl',
        },
      },
    },
  },
  Whoami: {
    ApiOperation: { summary: 'Check login user' },
    ApiResponse: {
      status: 200,
      schema: {
        type: 'object',
        example: {
          id: 5,
          email: 'example@mail.pl',
        },
      },
    },
  },
  Logout: {
    ApiOperation: { summary: 'Logout' },
    ApiResponse: {
      status: 200,
    },
  },
};
