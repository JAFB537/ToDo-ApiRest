import { Router } from 'express'

// Routes
import { createUserRouter } from './user.routes.js'
import { createStateRouter } from './state.routes.js'
import { createProjectRouter } from './project.routes.js'
import { createUserProjectRouter } from './userProject.routes.js'
import { createProjectCommentRouter } from './projectComment.routes.js'
import { createTypeIssueRouter } from './typeIssue.routes.js'
import { createIssueRouter } from './issue.routes.js'
import { createIssueCommentRouter } from './issueComment.routes.js'
import { createEventRouter } from './event.routes.js'

// Models mssql
import { UserModel } from '../models/mssql/user.models.js'
import { StateModel } from '../models/mssql/state.models.js'
import { ProjectModel } from '../models/mssql/project.models.js'
import { UserProjectModel } from '../models/mssql/userProject.models.js'
import { ProjectCommentModel } from '../models/mssql/projectComment.models.js'
import { TypeIssueModel } from '../models/mssql/typeIssue.models.js'
import { IssueModel } from '../models/mssql/issue.models.js'
import { IssueCommentModel } from '../models/mssql/issueComment.models.js'
import { EventModel } from '../models/mssql/event.models.js'

export const createRouter = ({ app = null, db = 'mssql' }) => {
  const router = Router()

  router.use('/users', createUserRouter({ model: UserModel }))
  router.use('/states', createStateRouter({ model: StateModel }))
  router.use('/projects', createProjectRouter({ model: ProjectModel }))
  router.use('/user-projects', createUserProjectRouter({ model: UserProjectModel }))
  router.use('/project-comments', createProjectCommentRouter({ model: ProjectCommentModel }))
  router.use('/type-issues', createTypeIssueRouter({ model: TypeIssueModel }))
  router.use('/issues', createIssueRouter({ model: IssueModel }))
  router.use('/issue-comments', createIssueCommentRouter({ model: IssueCommentModel }))
  router.use('/events', createEventRouter({ model: EventModel }))

  if (app !== null) {
    app.use(router)
  }

  return router
}
