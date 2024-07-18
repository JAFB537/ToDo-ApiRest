/* --------------------------- Imports  -------------------------- */

import { server } from '../index.js'
import sql from 'mssql'
import { api } from './helpers.js'

/* --------------------------- Test Variables -------------------------- */

// Respuestas de errores comunes
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

const eventCreatedEmpty = {
  name: 'Error',
  message: 'Invalid Request Data Error.',
  status: 400,
  description: [
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: ['IssueID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['UserID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['EndDate'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['StartDate'],
      message: 'Required'
    }
  ],
  isOperational: true
}

const issueCreatedEmpty = {
  name: 'Error',
  message: 'Invalid Request Data Error.',
  status: 400,
  description: [
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: ['ProjectID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['UserID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: ['TypeIssueID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: ['StateID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['Name'],
      message: 'Required'
    }
  ],
  isOperational: true
}

const createdSuccessfully = (input) => ({
  message: `${input} Created Successfully.`,
  status: 200
})

const deletedSuccessfully = (input) => ({
  message: `${input} Deleted Successfully.`,
  status: 200
})

const updatedSuccessfully = (input) => ({
  message: `${input} Updated Successfully.`,
  status: 200
})

const issueCommentCreatedEmpty = {
  name: 'Error',
  message: 'Invalid Request Data Error.',
  status: 400,
  description: [
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['Description'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'number',
      received: 'undefined',
      path: ['IssueID'],
      message: 'Required'
    },
    {
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['UserID'],
      message: 'Required'
    }
  ],
  isOperational: true
}

// Datos esperados para comparación en pruebas GET
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

const expectedIssue = {
  message: 'Issue Gotten Successfully.',
  status: 200,
  data: {
    IssueID: 1,
    Name: 'Issue 1',
    Description: 'Description of issue 1',
    DateCreated: '16/07/2024 23:00:35',
    State: {
      StateID: 1,
      Name: 'Open'
    },
    TypeIssue: {
      TypeIssueID: 1,
      Name: 'Bug'
    },
    Project: {
      ProjectID: 1,
      Name: 'Project A'
    },
    User: {
      UserID: 'F1C0423E-F36B-1410-8361-00D8B93B39A5',
      Name: 'John',
      LastName: 'Doe'
    }
  }
}

const expectedIssueComment = {
  message: 'Issue Comment Gotten Successfully.',
  status: 200,
  data: {
    IssueCommentID: 4,
    Description: 'Thanks for reporting.',
    User: {
      UserID: '00C1423E-F36B-1410-8361-00D8B93B39A5',
      Name: 'Emily',
      LastName: 'Brown',
      Age: 28,
      PhoneNumber: '789-012-3456',
      UserName: 'emilyb',
      Email: 'emily.brown@email.com',
      Image: '',
      Country: 'UK'
    },
    Issue: {
      IssueID: 2,
      Name: 'Issue 2',
      Description: 'Detailed description of issue 2',
      DateCreated: '16/07/2024 23:00:35',
      State: {
        StateID: 2,
        Name: 'In Progress'
      },
      TypeIssue: {
        TypeIssueID: 2,
        Name: 'Feature Request'
      },
      Project: {
        ProjectID: 2,
        Name: 'Project B',
        Description: 'Project B description',
        StartDate: '01/02/2024 00:00:00',
        EndDate: '15/07/2024 00:00:00',
        DateCreated: '16/07/2024 23:00:34'
      }
    }
  }
}

/* --------------------------- End Points Tests -------------------------- */

// ============================================================================================================
// Event
// ============================================================================================================

describe('End Points Event', () => {
  test('GET /events, Get All Events', async () => {
    const response = await api
      .get('/events')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(30)
  })

  test('GET /events/-1, Invalid Format Negative ID Number', async () => {
    const response = await api
      .get('/events/-1')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    expect(response.body).toEqual(errorInvalidFormatNegativeID)
  })

  test('GET /events/999, Not Found', async () => {
    const response = await api
      .get('/events/999')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body).toEqual(errorNotFound('Event'))
  })

  test('GET /events/:id, Get Event', async () => {
    const response = await api
      .get('/events/1')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual(expectedEvent)
  })

  test('POST /events, Create Event', async () => {
    const eventPayload = {
      StartDate: '2024-08-01T10:00:00Z',
      EndDate: '2024-08-01T12:00:00Z',
      Description: 'This is a sample event description.',
      UserID: '00C1423E-F36B-1410-8361-00D8B93B39A5',
      IssueID: 1
    }

    const response = await api
      .post('/events')
      .send(eventPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(createdSuccessfully('Event'))
  })

  test('POST /events, Create Event Empty', async () => {
    const response = await api
      .post('/events')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body).toEqual(eventCreatedEmpty)
  })

  test('PUT /events/:id, Update Event', async () => {
    const eventPayload = {
      StartDate: '2024-08-01T09:00:00Z',
      EndDate: '2024-08-01T17:00:00Z',
      Description: 'Updated event description.',
      UserID: '00C1423E-F36B-1410-8361-00D8B93B39A5',
      IssueID: 1
    }

    const response = await api
      .put('/events/1')
      .send(eventPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(updatedSuccessfully('Event'))
  })

  test('DELETE /events/:id, Delete Event', async () => {
    const response = await api
      .delete('/events/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual(deletedSuccessfully('Event'))
  })
})

// ============================================================================================================
// Issue
// ============================================================================================================

describe('End Points Issue', () => {
  test('GET /issues, Get All Issues', async () => {
    const response = await api
      .get('/issues')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(20)
  })

  test('GET /issues/-1, Invalid Format Negative ID Number', async () => {
    const response = await api
      .get('/issues/-1')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    expect(response.body).toEqual(errorInvalidFormatNegativeID)
  })

  test('GET /issues/999, Not Found', async () => {
    const response = await api
      .get('/issues/999')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body).toEqual(errorNotFound('Issue'))
  })

  test('GET /issues/:id, Get Issue', async () => {
    const response = await api
      .get('/issues/1')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual(expectedIssue)
  })

  test('POST /issues, Create Issue', async () => {
    const issuePayload = {
      ProjectID: 1,
      UserID: 'F1C0423E-F36B-1410-8361-00D8B93B39A5',
      TypeIssueID: 1,
      StateID: 1,
      Name: 'New Issue',
      Description: 'Description of new issue.'
    }

    const response = await api
      .post('/issues')
      .send(issuePayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(createdSuccessfully('Issue'))
  })

  test('POST /issues, Create Issue Empty', async () => {
    const response = await api
      .post('/issues')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body).toEqual(issueCreatedEmpty)
  })

  test('PUT /issues/:id, Update Issue', async () => {
    const issuePayload = {
      Name: 'Updated Issue',
      Description: 'Updated description of issue.',
      StateID: 1,
      TypeIssueID: 1,
      UserID: 'F1C0423E-F36B-1410-8361-00D8B93B39A5',
      ProjectID: 1
    }

    const response = await api
      .put('/issues/1')
      .send(issuePayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(updatedSuccessfully('Issue'))
  })
})

// ============================================================================================================
// Issue Comment
// ============================================================================================================

describe('End Points Issue Comment', () => {
  test('GET /issue-comments, Get All Issue Comments', async () => {
    const response = await api
      .get('/issue-comments')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(23)
  })

  test('GET /issue-comments/-1, Invalid Format Negative ID Number', async () => {
    const response = await api
      .get('/issue-comments/-1')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    expect(response.body).toEqual(errorInvalidFormatNegativeID)
  })

  test('GET /issue-comments/999, Not Found', async () => {
    const response = await api
      .get('/issue-comments/999')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body).toEqual(errorNotFound('Issue Comment'))
  })

  test('GET /issue-comments/:id, Get Issue Comment', async () => {
    const response = await api
      .get('/issue-comments/4')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual(expectedIssueComment)
  })

  test('GET /issue-comments/issue/:id, Get Issue Comment With Issue ID', async () => {
    const response = await api
      .get('/issue-comments/issue/7')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual({
      message: 'Issue Comment Gotten Successfully.',
      status: 200,
      data: [
        {
          IssueCommentID: 10,
          Description: 'Happy to assist with resolving.',
          User: {
            UserID: '1EC1423E-F36B-1410-8361-00D8B93B39A5',
            Name: 'Amanda',
            LastName: 'Lopez',
            Age: 26,
            PhoneNumber: '901-234-5678',
            UserName: 'amandal',
            Email: 'amanda.lopez@email.com',
            Image: '',
            Country: 'Argentina'
          },
          Issue: {
            IssueID: 7,
            Name: 'Issue 7',
            Description: 'Short description of issue 7',
            DateCreated: '16/07/2024 23:00:35',
            State: {
              StateID: 1,
              Name: 'Open'
            },
            TypeIssue: {
              TypeIssueID: 7,
              Name: 'Critical'
            },
            Project: {
              ProjectID: 7,
              Name: 'Project G',
              Description: 'Project G details',
              StartDate: '08/07/2024 00:00:00',
              EndDate: '31/12/2024 00:00:00',
              DateCreated: '16/07/2024 23:00:34'
            }
          }
        }
      ]
    })
  })

  test('GET /issue-comments/user/:id, Get Issue Comment With User ID', async () => {
    const response = await api
      .get('/issue-comments/user/00C1423E-F36B-1410-8361-00D8B93B39A5')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual({
      message: 'Issue Comment Gotten Successfully.',
      status: 200,
      data: [
        {
          IssueCommentID: 4,
          Description: 'Thanks for reporting.',
          User: {
            UserID: '00C1423E-F36B-1410-8361-00D8B93B39A5',
            Name: 'Emily',
            LastName: 'Brown',
            Age: 28,
            PhoneNumber: '789-012-3456',
            UserName: 'emilyb',
            Email: 'emily.brown@email.com',
            Image: '',
            Country: 'UK'
          },
          Issue: {
            IssueID: 2,
            Name: 'Issue 2',
            Description: 'Detailed description of issue 2',
            DateCreated: '16/07/2024 23:00:35',
            State: {
              StateID: 2,
              Name: 'In Progress'
            },
            TypeIssue: {
              TypeIssueID: 2,
              Name: 'Feature Request'
            },
            Project: {
              ProjectID: 2,
              Name: 'Project B',
              Description: 'Project B description',
              StartDate: '01/02/2024 00:00:00',
              EndDate: '15/07/2024 00:00:00',
              DateCreated: '16/07/2024 23:00:34'
            }
          }
        },
        {
          IssueCommentID: 14,
          Description: 'Thanks for reporting.',
          User: {
            UserID: '00C1423E-F36B-1410-8361-00D8B93B39A5',
            Name: 'Emily',
            LastName: 'Brown',
            Age: 28,
            PhoneNumber: '789-012-3456',
            UserName: 'emilyb',
            Email: 'emily.brown@email.com',
            Image: '',
            Country: 'UK'
          },
          Issue: {
            IssueID: 11,
            Name: 'Issue 11',
            Description: 'Description of issue 11',
            DateCreated: '16/07/2024 23:00:35',
            State: {
              StateID: 1,
              Name: 'Open'
            },
            TypeIssue: {
              TypeIssueID: 1,
              Name: 'Bug'
            },
            Project: {
              ProjectID: 11,
              Name: 'Project K',
              Description: 'Project K details',
              StartDate: '18/11/2024 00:00:00',
              EndDate: '30/04/2025 00:00:00',
              DateCreated: '16/07/2024 23:00:34'
            }
          }
        }
      ]
    })
  })

  test('POST /issue-comments, Create Issue Comment', async () => {
    const issueCommentPayload = {
      UserID: 'F1C0423E-F36B-1410-8361-00D8B93B39A5',
      IssueID: 1,
      Description: 'New issue comment.'
    }

    const response = await api
      .post('/issue-comments')
      .send(issueCommentPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(createdSuccessfully('Issue Comment'))
  })

  test('POST /issue-comments, Create Issue Comment Empty', async () => {
    const response = await api
      .post('/issue-comments')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body).toEqual(issueCommentCreatedEmpty)
  })

  test('DELETE /issue-comments/:id, Delete Issue Comment', async () => {
    const response = await api
      .delete('/issue-comments/20')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual(deletedSuccessfully('Issue Comment'))
  })
})

// ============================================================================================================
// Project
// ============================================================================================================

describe('End Points Project /projects', () => {
  test('GET /projects, Get All Projects', async () => {
    const response = await api
      .get('/projects')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.data).toHaveLength(26)
  })

  test('GET /projects/-1, Invalid Format Negative ID Number', async () => {
    const response = await api
      .get('/projects/-1')
      .expect('Content-Type', /application\/json/)
      .expect(400)

    expect(response.body).toEqual(errorInvalidFormatNegativeID)
  })

  test('GET /projects/999, Not Found', async () => {
    const response = await api
      .get('/projects/999')
      .expect('Content-Type', /application\/json/)
      .expect(404)

    expect(response.body).toEqual(errorNotFound('Project'))
  })

  test('GET /projects/:id, Get Project', async () => {
    const response = await api
      .get('/projects/1')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body).toEqual({
      message: 'Project Gotten Successfully.',
      status: 200,
      data: {
        ProjectID: 1,
        Name: 'Project A',
        Description: 'This is project A',
        StartDate: '15/01/2024 00:00:00',
        EndDate: '30/06/2024 00:00:00',
        DateCreated: '16/07/2024 23:00:34',
        State: {
          StateID: 1,
          Name: 'Open'
        },
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
        }
      }
    })
  })

  test('POST /projects, Create Project', async () => {
    const projectPayload = {
      Name: 'Project CREATE',
      Description: 'Brief description of project CREATE',
      StartDate: '2024-06-30',
      EndDate: '2024-07-30',
      StateID: 1,
      UserID: '1EC1423E-F36B-1410-8361-00D8B93B39A5'
    }

    const response = await api
      .post('/projects')
      .send(projectPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(createdSuccessfully('Project'))
  })

  test('POST /projects, Create Project Empty', async () => {
    const response = await api
      .post('/projects')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)

    expect(response.body).toEqual({
      name: 'Error',
      message: 'Invalid Request Data Error.',
      status: 400,
      description: [
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
          expected: 'number',
          received: 'undefined',
          path: [
            'StateID'
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
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: [
            'Name'
          ],
          message: 'Required'
        }
      ],
      isOperational: true
    })
  })

  test('PUT /projects/:id, Update Project', async () => {
    const projectPayload = {
      Name: 'Project UPDATE',
      Description: 'Brief description of project UPDATE',
      StartDate: '2024-06-30',
      EndDate: '2024-07-30',
      StateID: 1,
      UserID: '1EC1423E-F36B-1410-8361-00D8B93B39A5'
    }

    const response = await api
      .put('/projects/15')
      .send(projectPayload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)

    expect(response.body).toEqual(updatedSuccessfully('Project'))
  })
})

// ============================================================================================================
// After
// ============================================================================================================

afterAll((done) => {
  sql.close()
  server.close(done)
})
