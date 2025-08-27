export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';
export const INVALID_OR_EXPIRED_TOKEN = 'Invalid or Expired Token';

export const internalServerErrorResponse = Response.json({error: INTERNAL_SERVER_ERROR}, {status: 500});