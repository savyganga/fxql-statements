export interface SuccessResponse<T> {
    message: string;
    code: string;
    data: T;
    statusCode: number;
  }
  
  export interface ErrorResponse {
    message: string;
    code: string;
    error: string;
    statusCode: number;
  }
  export function createSuccessData<T>(message: string, data: T): SuccessResponse<T> {
    return {
      message,
      code: "FXQL-201",
      data,
      statusCode: 201,
    };
  }
  
  export function createSuccessNoData(message: string): SuccessResponse<null> {
    return {
      message,
      code: "FXQL-201",
      data: null,
      statusCode: 201,
    };
  }
  
  export function getSuccessData<T>(message: string, data: T): SuccessResponse<T> {
    return {
      message,
      code: "FXQL-200",
      data,
      statusCode: 200,
    };
  }
  
  export function getSuccessNoData(message: string): SuccessResponse<null> {
    return {
      message,
      code: "FXQL-200",
      data: null,
      statusCode: 200,
    };
  }

  export function badRequestErrorData(message: string, error: string): ErrorResponse {
    return {
      message,
      code: "FXQL-400",
      error,
      statusCode: 400,
    };
  }
  
  export function badRequestErrorNoData(message: string): ErrorResponse {
    return {
      message,
      code: "FXQL-400",
      error: "",
      statusCode: 400,
    };
  }
  
  export function serverError(message: string, error: string): ErrorResponse {
    return {
      message,
      code: "SERVER-ERROR-500",
      error,
      statusCode: 500,
    };
  }
  