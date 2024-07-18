// src/utils/messages.js

export const messages = {
  success: {
    GOTTEN: (resource) => `${resource} Gotten Successfully.`,
    CREATED: (resource) => `${resource} Created Successfully.`,
    UPDATED: (resource) => `${resource} Updated Successfully.`,
    DELETED: (resource) => `${resource} Deleted Successfully.`,
    FETCHED: (resource) => `${resource} Successfully Obtained.`
  },
  error: {
    NOT_FOUND: (resource) => `${resource} Not Found.`,
    EMPTY_REQUEST: 'Empty Request Body.',
    INVALID_REQUEST_DATA_ERROR: 'Invalid Request Data Error.',
    INVALID_INPUT: 'Invalid Input Data.',
    SERVER_ERROR: 'Internal Server Error.'
  }
}
