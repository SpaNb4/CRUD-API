export enum StatusCode {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ErrorMessages {
  InvalidRequestUrl = 'Invalid request URL: No user ID provided',
  InvalidRequestBody = 'Invalid request body',
  InvalidUserId = 'Invalid user ID (Not a valid UUID)',
  UserNotFound = 'User not found',
  MissingFields = 'Request body must contain username, age, and hobbies',
  InvalidUsername = 'Invalid username type, string expected',
  InvalidAge = 'Invalid age type, number expected',
  InvalidHobbies = 'Invalid hobbies, array of strings expected',
}
