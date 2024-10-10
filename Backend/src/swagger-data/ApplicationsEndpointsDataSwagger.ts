export const ApplicationsEndpointsDataSwagger = {
  Get: {
    ApiOperation: { summary: 'Get all applications on hackaton' },
    ApiResponse: {
      status: 200,
      schema: {
        type: 'array',
        example: [
          {
            team_name: '234234',
            contacts: [
              {
                id: 5,
                name: '23423',
                email: 'qwe@sad.pl',
                phone: '123456789',
                applicationId: 3,
              },
              {
                id: 6,
                name: '546',
                email: 'qweq@asd.pl',
                phone: '123456789',
                applicationId: 3,
              },
            ],
            id: 3,
            desc: 'werwer',
            file_ids: [
              {
                id: 3,
                name: 'README.md2024-04-09T18:36:01.123Z',
                upload_date: '2024-04-09T18:36:01.462Z',
                applicationId: 3,
              },
            ],
          },
        ],
      },
    },
  },
  Delete: {
    ApiOperation: { summary: 'Delete application' },
    ApiResponse: {
      status: 200,
    },
  },
  Post: {
    ApiOperation: { summary: 'Add new application' },
    ApiResponse: {
      status: 201,
      schema: {
        type: 'object',
        example: {
          id: 10,
          team_name: 'Example1sds23',
          desc: 'Example12dsdssdds3',
        },
      },
    },
    ApiBody: {
      schema: {
        type: 'object',
        required: ['team_name', 'desc', 'contacts', 'file'],
        properties: {
          team_name: { type: 'string', example: 'Example123' },
          desc: { type: 'string', example: 'Example123' },
          contacts: {
            type: 'string',
            example:
              '[{"phone": "123456789", "name": "NAME", "email": "qwer@qwerty.pl"}]',
          },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
        example: {
          id: { type: 'string', example: 'Example123' },
          team_name: 'Example12sss3',
          desc: 'Example123',
        },
      },
    },
  },
  Put: {
    ApiOperation: { summary: 'Update application' },
    ApiResponse: {
      status: 201,
      schema: {
        type: 'object',
        example: {
          id: 10,
          team_name: 'Example1sds23',
          desc: 'Example12dsdssdds3',
        },
      },
    },
  },
};
