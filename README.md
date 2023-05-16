# API Builder

## Easy construction and execution of API requests.

The API Builder is a class that provides a convenient way to construct and execute API requests.

![Example GIF](https://github.com/nir11/api-builder/src/assets/example.gif)

## Builder Pattern

The API Builder follows the [Builder Pattern](https://refactoring.guru/design-patterns/builder) allowing the step-by-step construction of complex objects by separating the construction process from the object representation.

In the context of the API Builder, it enables the construction of API requests by setting individual properties using method chaining.

## Usage

To use the API Builder, follow these steps:

1. Create an instance of `ApiBuilder`.

2. Use the various setter methods (**withScheme**, **withHost**, **withMethod**, **withPort**, **withPath**, **withQueryParameters**, **withBodyParameters**, **withHeaders**, **withAuth**) to set the desired properties of the API request.

3. Call the **execute** method to send the API request and receive the response data.

## Example

Here's an example of how to use the API Builder:

```
import { ApiBuilder } from './apiBuilder';
import { HttpMethod, HttpSchema } from "./enums/enums";

// Create an instance of ApiBuilder
const api = new ApiBuilder()
  .withScheme(HttpSchema.HTTPS)
  .withHost("api.example.com");

// Set the required properties of the API request and execute the request
try {
  const response = await
  api
  .withMethod(HttpMethod.GET)
  .withPath('/users')
  .withQueryParameters({ page: 1, limit: 10 })
  .withHeaders({ 'Content-Type': 'application/json' })
  .execute();

  console.log('API response:', response);
} catch (error) {
  console.error('API request failed:', error);
}
```

## API Builder Methods

**withMethod(httpsMethod: HttpMethod): ApiBuilder**

Set the HTTP method for the API request.

**withHost(host: string): ApiBuilder**

Set the host for the API request.

**withPort(port: number): ApiBuilder**

Set the port for the API request.

**withScheme(schema: HttpSchema): ApiBuilder**

Set the schema (HTTP or HTTPS) for the API request.

**withPath(path: string): ApiBuilder**

Set the path for the API request.

**withQueryParameters<T>(params: T): ApiBuilder**

Assign query parameters to the API request.

**withBodyParameters<T>(body: T): ApiBuilder**

Assign body parameters to the API request.

**withHeaders(headers: object): ApiBuilder**

Assign headers to the API request.

**withAuth(accessToken: string): ApiBuilder**

Set the authorization header with a Bearer token.

**execute(): Promise<any>**

Execute the API request and return the response data.

**getHost(): string**

Get the host for the API request.

**getPort(): number**

Get the port for the API request.

**getScheme(): string**

Get the scheme for the API request.

**getPath(): string**

Get the path for the API request.

**getQueryParameters(): string**

Get the query parameters for the API request.

**getBodyParameters(): string**

Get the body parameters for the API request.

**getHeaders(): string**

Get the headers for the API request.

**getURI(): string**

Get the URI (Uniform Resource Identifier) for the API request.
Returns: The constructed URI.
Throws: Error if any of the necessary components (scheme, host, port) is missing.

**getURL(): string**

Get the complete URL for the API request, including the query parameters.
Returns: The complete URL.
