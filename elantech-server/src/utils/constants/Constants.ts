export default {
  HTTP: {
    SUCCESS: {
      get DELETE() {
        return {
          statusCode: 200,
          message: 'Resource Deleted',
        };
      },
      get UPDATE() {
        return {
          statusCode: 200,
          message: 'Update Successful',
          id: -1,
        };
      },
      get SELECTED() {
        return {
          statusCode: 200,
          message: 'Resource Found',
          payload: [],
        };
      },
      get CREATED() {
        return {
          statusCode: 201,
          message: 'Resource Created',
          id: -1,
        };
      },
      get UPLOADED() {
        return {
          statusCode: 201,
          message: 'Resource(s) Uploaded and Created',
        };
      },
    },
    ERROR: {
      get NOT_FOUND() {
        return {
          statusCode: 404,
          message: 'Resource Not Found',
        };
      },
    },
  },
  AUTH: {
    get PASSWORD_FAIL() {
      return {
        statusCode: 401,
        message: 'Incorrect Password',
      };
    },
    get PASSWORD_SUCCESS() {
      return {
        statusCode: 201,
        message: 'Login Successful',
      };
    },
    get LOGOUT_SUCCESS() {
      return {
        statusCode: 200,
        message: 'Logout Successful',
      };
    },
    get SESSION_FAIL() {
      return {
        statusCode: 401,
        message: 'Invalid Session',
      };
    },
    get SESSION_EXPIRED() {
      return {
        statusCode: 401,
        message: 'Session Expired',
      };
    },
    get SESSION_MISSING() {
      return {
        statusCode: 401,
        message: 'Cookie Missing',
      };
    },
    get SESSION_LOGGED_OUT() {
      return {
        statusCode: 200,
        message: 'Logout Successful',
      };
    },
    get LOGIN_EXPIRED() {
      return {
        statusCode: 401,
        message: 'Login Expired',
      };
    },
    get UNAUTHORIZED() {
      return {
        statusCode: 401,
        message: 'Endpoint is accesible to admins only',
      };
    },
  },
  DB: {
    USER_TYPE: {
      ADMIN: 'Admin',
      USER: 'User',
    },
  },
  USER: {
    PASSWORD: {
      REGEX: /(?=^.{8,32}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/,
    },
  },
};
