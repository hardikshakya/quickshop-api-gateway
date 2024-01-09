/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

/** RegisterRequest is the request format for user registration */
export interface RegisterRequest {
  email: string;
  password: string;
}

/** RegisterResponse is the response format for user registration */
export interface RegisterResponse {
  status: number;
  error: string[];
}

/** LoginRequest is the request format for user login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** LoginResponse is the response format for user login */
export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

/** ValidateRequest is the request format for token validation */
export interface ValidateRequest {
  token: string;
}

/** ValidateResponse is the response format for token validation */
export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTH_PACKAGE_NAME = "auth";

/** AuthService provides methods for user registration, login and token validation */

export interface AuthServiceClient {
  /** Register a new user */

  register(request: RegisterRequest): Observable<RegisterResponse>;

  /** Login an existing user */

  login(request: LoginRequest): Observable<LoginResponse>;

  /** Validate a user's token */

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

/** AuthService provides methods for user registration, login and token validation */

export interface AuthServiceController {
  /** Register a new user */

  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  /** Login an existing user */

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  /** Validate a user's token */

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
