export const UserEndpointsSwaggerData = {
  List: {
    ApiOperation: { summary: 'List of users [additional endpoint]' },
    ApiResponse: {
      status: 200,
      schema: {
        type: 'object',
        example: [{ email: 'Jakub@Wrona.pl' }, { email: 'Jakub2@Wrona.pl' }],
      },
    },
  },
  UserById: {
    ApiOperation: { summary: 'Get single user by id [additional endpoint]' },
    ApiResponse: {
      status: 200,
      schema: {
        type: 'object',
        example: {
          id: 1,
          email: 'example@example.pl',
        },
      },
    },
  },
  AddUser: {
    ApiOperation: { summary: 'Create a new user [additional endpoint]' },
    ApiResponse: {
      status: 201,
      schema: {
        type: 'object',
        example: {
          id: 1,
          email: 'example@example.pl',
        },
      },
    },
  },
};
