// supertest
import request from 'supertest'

import app from '../index.js'

const api = request(app)

/* --------------------------- Json  -------------------------- */

const errorInvalidFormatNegativeID = {
  name: 'Error',
  message: 'Invalid Input Data.',
  status: 400,
  description: 'Invalid ID type or format.',
  isOperational: true
}

const errorNotFound = (input) => ({
  name: 'Error',
  message: `${input} Not Found.`,
  status: 404,
  description: 'Record with ID provided not found.',
  isOperational: true
})

const expectedEvent = {
  message: 'Event Gotten Successfully.',
  status: 200,
  data: {
    EventID: 1,
    StartDate: '2024-06-01T09:00:00.000Z',
    EndDate: '2024-06-01T17:00:00.000Z',
    Description: 'Event for Project A',
    User: {
      UserID: 'F1C0423E-F36B-1410-8361-00D8B93B39A5',
      Name: 'John',
      LastName: 'Doe',
      Age: 30,
      PhoneNumber: '123-456-7890',
      UserName: 'johndoe',
      Email: 'john.doe@email.com',
      Image: '',
      Country: 'USA'
    },
    Issue: {
      IssueID: 1,
      Name: 'Issue 1',
      Description: 'Description of issue 1',
      DateCreated: '2024-07-16T23:00:35.043Z',
      StateID: 1,
      TypeIssueID: 1,
      ProjectID: 1
    }
  }
}

const eventCreatedSuccessfully = {
  message: 'Event Created Successfully.',
  status: 200
}

const eventUpdatedSuccessfully = {
  message: 'Event Updated Successfully.',
  status: 200
}

const eventDeletedSuccessfully = {
  message: 'Event Deleted Successfully.',
  status: 200
}

const eventCreatedEmpty = {
  name: 'Error',
  message: 'Invalid Request Data Error.',
  status: 400,
  description: [
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: [
        'IssueID'
      ],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: [
        'UserID'
      ],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: [
        'EndDate'
      ],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: [
        'StartDate'
      ],
      message: 'Required'
    }
  ],
  isOperational: true
}

/* --------------------------- Exports  -------------------------- */

export {
  api,
  errorInvalidFormatNegativeID,
  errorNotFound,
  expectedEvent,
  eventCreatedEmpty,
  eventCreatedSuccessfully,
  eventDeletedSuccessfully,
  eventUpdatedSuccessfully
}
