/* --------------------------- Imports  -------------------------- */

// Express
import express, { json } from "express";

// Cors
import { corsMiddleware } from "./middlewares/cors.js";

// Routes
import { createUserRouter } from "./routes/user.routes.js";
import { createStateRouter } from "./routes/state.routes.js";
import { createProjectRouter } from "./routes/project.routes.js";
import { createUserProjectRouter } from "./routes/userProject.routes.js";
import { createProjectCommentRouter } from "./routes/projectComment.routes.js";
import { createTypeIssueRouter } from "./routes/typeIssue.routes.js";
import { createIssueRouter } from "./routes/issue.routes.js";
import { createIssueCommentRouter } from "./routes/issueComment.routes.js";
import { createEventRouter } from "./routes/event.routes.js";

// Environment Variables
import "dotenv/config";

// Models
import { UserModel } from "./models/mssql/user.models.js";
import { StateModel } from "./models/mssql/state.models.js";
import { ProjectModel } from "./models/mssql/project.models.js";
import { UserProjectModel } from "./models/mssql/userProject.models.js";
import { ProjectCommentModel } from "./models/mssql/projectComment.models.js";
import { TypeIssueModel } from "./models/mssql/typeIssue.models.js";
import { IssueModel } from "./models/mssql/issue.models.js";
import { IssueCommentModel } from "./models/mssql/issueComment.models.js";
import { EventModel } from "./models/mssql/event.models.js";

/* --------------------------- Configuration  -------------------------- */

const app = express();

// Add Express Json Middleware
app.use(json());

// CORS
app.use(corsMiddleware());

// Disable x-powered-by HTTP head
app.disable("x-powered-by");

// Add Routes
app.use("/users", createUserRouter({ userModel: UserModel }));
app.use("/states", createStateRouter({ stateModel: StateModel }));
app.use("/projects", createProjectRouter({ projectModel: ProjectModel }));
app.use("/user-projects", createUserProjectRouter({ userProjectModel: UserProjectModel }));
app.use("/project-comments",createProjectCommentRouter({ projectCommentModel: ProjectCommentModel }));
app.use("/type-issues", createTypeIssueRouter({ typeIssueModel: TypeIssueModel }));
app.use("/issues", createIssueRouter({ issueModel: IssueModel }));
app.use("/issue-comments", createIssueCommentRouter({ issueCommentModel: IssueCommentModel }));
app.use("/events", createEventRouter({ eventModel: EventModel }));

export default app;
