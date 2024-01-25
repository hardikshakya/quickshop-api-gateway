/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

/** CreateProductRequest represents the required information to create a new product */
export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}

/** CreateProductResponse represents the response after product creation */
export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

/** FindOneData represents the data of a product */
export interface FindOneData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

/** FindOneRequest represents the required information to retrieve a product */
export interface FindOneRequest {
  id: number;
}

/** FindOneResponse represents the response after retrieving a product */
export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

/** DecreaseStockRequest represents the required information to decrease the stock of a product */
export interface DecreaseStockRequest {
  id: number;
  orderId: number;
}

/** DecreaseStockResponse represents the response after decreasing the stock of a product */
export interface DecreaseStockResponse {
  status: number;
  error: string[];
}

export const PRODUCT_PACKAGE_NAME = "product";

/** ProductService provides methods for creating, retrieving and managing products */

export interface ProductServiceClient {
  /** CreateProduct creates a new product based on the provided request */

  createProduct(request: CreateProductRequest): Observable<CreateProductResponse>;

  /** FindOne retrieves a product based on the provided request */

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  /** DecreaseStock decreases the stock of a product based on the provided request */

  decreaseStock(request: DecreaseStockRequest): Observable<DecreaseStockResponse>;
}

/** ProductService provides methods for creating, retrieving and managing products */

export interface ProductServiceController {
  /** CreateProduct creates a new product based on the provided request */

  createProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  /** FindOne retrieves a product based on the provided request */

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  /** DecreaseStock decreases the stock of a product based on the provided request */

  decreaseStock(
    request: DecreaseStockRequest,
  ): Promise<DecreaseStockResponse> | Observable<DecreaseStockResponse> | DecreaseStockResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProduct", "findOne", "decreaseStock"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
