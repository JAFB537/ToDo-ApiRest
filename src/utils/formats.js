export async function EventFormat (result) {
  return result.map((row) => ({
    EventID: row.EventID,
    StartDate: row.StartDate,
    EndDate: row.EndDate,
    Description: row.EventDescription,
    User: {
      UserID: row.EventUserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    },
    Issue: {
      IssueID: row.IssueID,
      Name: row.IssueName,
      Description: row.IssueDescription,
      DateCreated: row.IssueDateCreated,
      StateID: row.IssueStateID,
      TypeIssueID: row.IssueTypeIssueID,
      ProjectID: row.IssueProjectID
    }
  }))
}

export async function IssueFormat (result) {
  return result.map((row) => ({
    IssueID: row.IssueID,
    Name: row.IssueName,
    Description: row.IssueDescription,
    DateCreated: row.IssueDateCreated,
    State: {
      StateID: row.StateID,
      Name: row.StateName
    },
    TypeIssue: {
      TypeIssueID: row.TypeIssueID,
      Name: row.TypeIssueName
    },
    Project: {
      ProjectID: row.ProjectID,
      Name: row.ProjectName,
      Description: row.ProjectDescription,
      StartDate: row.ProjectStartDate,
      EndDate: row.ProjectEndDate,
      DateCreated: row.ProjectDateCreated
    },
    User: {
      UserID: row.UserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    }
  }))
}

export async function IssueCommentFormat (result) {
  return result.map((row) => ({
    IssueCommentID: row.IssueCommentID,
    Description: row.CommentDescription,
    User: {
      UserID: row.UserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    },
    Issue: {
      IssueID: row.IssueID,
      Name: row.IssueName,
      Description: row.IssueDescription,
      DateCreated: row.IssueDateCreated,
      State: {
        StateID: row.StateID,
        Name: row.StateName
      },
      TypeIssue: {
        TypeIssueID: row.TypeIssueID,
        Name: row.TypeIssueName
      },
      Project: {
        ProjectID: row.ProjectID,
        Name: row.ProjectName,
        Description: row.ProjectDescription,
        StartDate: row.ProjectStartDate,
        EndDate: row.ProjectEndDate,
        DateCreated: row.ProjectDateCreated
      }
    }
  }))
}

export async function ProjectFormat (result) {
  return result.map((row) => ({
    ProjectID: row.ProjectID,
    Name: row.ProjectName,
    Description: row.ProjectDescription,
    StartDate: row.ProjectStartDate,
    EndDate: row.ProjectEndDate,
    DateCreated: row.ProjectDateCreated,
    State: {
      StateID: row.StateID,
      Name: row.StateName
    },
    User: {
      UserID: row.UserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    }
  }))
}

export async function ProjectCommentFormat (result) {
  return result.map((row) => ({
    ProjectCommentID: row.ProjectCommentID,
    Description: row.CommentDescription,
    User: {
      UserID: row.UserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    },
    Project: {
      ProjectID: row.ProjectID,
      Name: row.ProjectName,
      Description: row.ProjectDescription,
      StartDate: row.ProjectStartDate,
      EndDate: row.ProjectEndDate,
      DateCreated: row.ProjectDateCreated,
      State: {
        StateID: row.StateID,
        Name: row.StateName
      }
    }
  }))
}

export async function StateFormat (result) {
  return result.map((row) => ({
    StateID: row.StateID,
    Name: row.Name
  }))
}

export async function TypeIssueFormat (result) {
  return result.map((row) => ({
    TypeIssueID: row.TypeIssueID,
    Name: row.Name,
    Description: row.Description,
    Image: row.Image,
    DateCreated: row.DateCreated
  }))
}

export async function UserFormat (result) {
  return result.map((row) => ({
    UserID: row.UserID,
    Name: row.Name,
    LastName: row.LastName,
    Age: row.Age,
    PhoneNumber: row.PhoneNumber,
    UserName: row.UserName,
    Password: row.Password,
    Email: row.Email,
    Image: row.Image,
    Country: row.Country
  }))
}

export async function UserProjectFormat (result) {
  return result.map((row) => ({
    UserProjectID: row.UserProjectID,
    User: {
      UserID: row.UserID,
      Name: row.UserName,
      LastName: row.UserLastName,
      Age: row.UserAge,
      PhoneNumber: row.UserPhoneNumber,
      UserName: row.UserUserName,
      Password: row.UserPassword,
      Email: row.UserEmail,
      Image: row.UserImage,
      Country: row.UserCountry
    },
    Project: {
      ProjectID: row.ProjectID,
      Name: row.ProjectName,
      Description: row.ProjectDescription,
      StartDate: row.ProjectStartDate,
      EndDate: row.ProjectEndDate,
      DateCreated: row.ProjectDateCreated,
      State: {
        StateID: row.ProjectStateID,
        Name: row.ProjectStateName
      }
    }
  }))
}
