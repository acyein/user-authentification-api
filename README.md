# About
A Node.js authentication API that allows myself to register, login, see my profile and another user's profile, while blocking that other user from seeing my profile

# Dependencies
- express
- mongoose (connects to your MongoDB database)
- bcrypt (hashes password)
- jsonwebtoken (verifies and generates tokens)
- @hapi/joi (validates data passed into API)
- dotenv (loads environment variables from .env file into process.env)

# Routes
| Verb | URL                   | Description                     | Header / Body Input                              |
|------|-----------------------|---------------------------------|--------------------------------------------------|
| POST | /api/register         | Lets user register              | firstName  <br>lastName  <br>email  <br>password |
| POST | /api/login            | Lets user login                 | email  <br>password                              |
| GET  | /api/users/my-profile | Displays my profile             | auth-token                                       |
| GET  | /api/users/:id        | Displays another user's profile | auth-token                                       |
| GET  | /api/posts            | Displays a blog post            | -                                                |

# Credits
Followed Dev Ed's [tutorial](https://youtu.be/2jqok-WgelI), 'Build A Node.js API Authentication With JWT Tutorial'