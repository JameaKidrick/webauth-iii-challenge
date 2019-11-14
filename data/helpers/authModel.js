/*
POST -- /api/register -- Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.

POST -- /api/login -- Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'
*/