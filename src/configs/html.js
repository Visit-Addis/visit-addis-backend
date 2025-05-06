const createResetPassworForm = (resetLink, token) => {
  const html_form = `
    <style>
      body {
        font-family: sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
      }
      .reset-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 350px;
        text-align: center;
      }
      h2 {
        color: #333;
        margin-bottom: 20px;
      }
      label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: bold;
        text-align: left;
      }
      input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-bo x;
        font-size: 16px;
      }
      button[type="submit"] {
        background-color: #007bff;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }
      button[type="submit"]:hover {
        background-color: #0056b3;
      }
      .error-message {
        color: red;
        margin-top: 10px;
      }
    </style>
    <div class="reset-container">
      <h2>Reset Your Password</h2>
      <form action="${resetLink}" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <div>
          <label for="newPassword">New Password:</label>
          <input type="password" name="newPassword" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  `;
  return html_form;
};

const createResetSuccessMessage = (serverUrl) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #28a745;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 15px;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Successfully</h1>
          <p>Your password has been successfully reset.</p>
          <p>You can now <a href="${serverUrl}/api/v1/auth/login">log in</a> with your new password.</p>
        </div>
      </body>
      </html>`;
};

const createResetErrorMessage = (serverUrl) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Failed</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #dc3545;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 15px;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Failed</h1>
          <p>There was an error resetting your password. Please try again.</p>
          <p>If the problem persists, please contact support.</p>
        </div>
      </body>
      </html>`;
};

const createResetPasswordLink = (resetLink) => {
  return `
      <p>You have requested to reset your password. Please click on the following link to reset it:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire shortly. If you did not request a password reset, please ignore this email.</p>
    `;
};

export {
  createResetPassworForm,
  createResetSuccessMessage,
  createResetErrorMessage,
  createResetPasswordLink,
};
