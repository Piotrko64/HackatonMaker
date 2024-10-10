export const FilesEndpointsDataSwagger = {
  Delete: {
    ApiOperation: { summary: 'Delete PDF file' },
    ApiResponse: {
      status: 200,
    },
  },
  Post: {
    ApiBody: {
      schema: {
        type: 'object',
        required: ['applicationId', 'file'],
        properties: {
          applicationId: { type: 'string', example: '2' },

          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
    ApiOperation: { summary: 'Upload PDF file' },
    ApiResponse: {
      status: 201,
      schema: {
        type: 'object',
        example: {
          id: 4,
          name: 'aaa.pdf',
          upload_date: '2024-04-10T10:11:00.471Z',
          applicationId: 8,
        },
      },
    },
  },
};
