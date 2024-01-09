/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

/** CreateOrderRequest represents the required information to create a new order */
export interface CreateOrderRequest {
  productId: number;
  quantity: number;
  userId: number;
}

/** CreateOrderResponse represents the response after order creation */
export interface CreateOrderResponse {
  status: number;
  error: string[];
  id: number;
}

export const ORDER_PACKAGE_NAME = "order";

/** OrderService provides methods for creating and managing orders */

export interface OrderServiceClient {
  /** CreateOrder creates a new order based on the provided request */

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
}

/** OrderService provides methods for creating and managing orders */

export interface OrderServiceController {
  /** CreateOrder creates a new order based on the provided request */

  createOrder(
    request: CreateOrderRequest,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
