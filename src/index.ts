import { ApiRequestData } from "./classes/api-request-data";
import { HttpMethod, HttpSchema } from "./enums/enums";

export class ApiBuilder {
  private readonly data: ApiRequestData;

  constructor() {
    this.data = new ApiRequestData();
  }

  /**
   * Set a key-value pair in the ApiRequestData object.
   * @param key - the key
   * @param value - the value
   * @returns The current instance of ApiBuilder.
   */
  private _setter(key: string, value: any): ApiBuilder {
    this.data[key] = value;
    return this;
  }

  /**
   * Set the HTTP method for the API request.
   * @param httpsMethod The HTTP method.
   * @returns The current instance of ApiBuilder.
   */
  public withMethod = (httpsMethod: HttpMethod): ApiBuilder =>
    this._setter("method", httpsMethod);

  /**
   * Set the host for the API request.
   * @param host The host.
   * @returns The current instance of ApiBuilder.
   */
  public withHost = (host: string): ApiBuilder => this._setter("host", host);

  /**
   * Set the port for the API request.
   * @param port The port.
   * @returns The current instance of ApiBuilder.
   */
  public withPort = (port: number): ApiBuilder => this._setter("port", port);

  /**
   * Set the schema (HTTP or HTTPS) for the API request.
   * @param schema The HTTP schema.
   * @returns The current instance of ApiBuilder.
   */
  public withScheme = (schema: HttpSchema): ApiBuilder => {
    this._setter("scheme", schema);
    if (schema === HttpSchema.HTTPS) this.withPort(443);
    else this.withPort(80);
    return this;
  };

  /**
   * Set the path for the API request.
   * @param path The path.
   * @returns The current instance of ApiBuilder.
   */
  public withPath = (path: string): ApiBuilder => this._setter("path", path);

  /**
   * Assign multiple key-value pairs to a property in the ApiRequestData object.
   * @param key - The key
   * @param values - The value
   * @returns The current instance of ApiBuilder.
   */
  private _assigner(key: string, values: any): ApiBuilder {
    if (values) {
      for (const val of Object.keys(values)) {
        this.data[key] = this._assign(this.data[key], { [val]: values[val] });
      }
    }
    return this;
  }

  /**
   * Assign query parameters to the API request.
   * @param params The query parameters.
   * @returns The current instance of ApiBuilder.
   */
  public withQueryParameters = <T>(params: T): ApiBuilder =>
    this._assigner("queryParameters", params);

  /**
   * Assign body parameters to the API request.
   * @param body The body parameters.
   * @returns The current instance of ApiBuilder.
   */
  public withBodyParameters = <T>(body: T): ApiBuilder =>
    this._assigner("bodyParameters", body);

  /**
   * Assign headers to the API request.
   * @param headers The headers.
   * @returns The current instance of ApiBuilder.
   */
  public withHeaders = (headers: object): ApiBuilder =>
    this._assigner("headers", headers);

  /**
   * Set the authorization header with a Bearer token.
   * @param accessToken The access token.
   * @returns The current instance of ApiBuilder.
   */
  public withAuth = (accessToken: string): ApiBuilder => {
    if (accessToken) {
      this.withHeaders({ Authorization: "Bearer " + accessToken });
    }
    return this;
  };

  /**
   * Assign a value to the source object based on the type of the incoming object.
   * @param src - The source object
   * @param obj - The incoming object
   * @returns - The assigned source
   */
  private _assign = (src: any, obj: any) => {
    if (obj && Array.isArray(obj)) {
      return obj;
    }
    if (obj && typeof obj === "string") {
      return obj;
    }
    if (obj && Object.keys(obj).length > 0) {
      return Object.assign(src || {}, obj);
    }
    return src;
  };

  /**
   * Get the value of a specific property in the ApiRequestData object.
   * @param key - The key of the required property
   * @returns - The required property
   */
  private _getter(key: string): any {
    return this.data[key];
  }

  /**
   * Get the host for the API request.
   * @returns The host value.
   */
  public getHost = (): string => this._getter("host");

  /**
   * Get the port for the API request.
   * @returns The port value.
   */
  public getPort = (): number => this._getter("port");

  /**
   * Get the scheme for the API request.
   * @returns The scheme value.
   */
  public getScheme = (): string => this._getter("scheme");

  /**
   * Get the path for the API request.
   * @returns The path value.
   */
  public getPath = (): string => this._getter("path");

  /**
   * Get the query parameters for the API request.
   * @returns The query parameters value.
   */
  public getQueryParameters = (): string => {
    return this._getter("queryParameters");
  };

  /**
   * Get the body parameters for the API request.
   * @returns The body parameters value.
   */
  public getBodyParameters = (): string => this._getter("bodyParameters");

  /**
   * Get the headers for the API request.
   * @returns The headers value.
   */
  public getHeaders = (): string => this._getter("headers");

  /**
   * Get the query parameter string from the provided query parameters object.
   * @param queryParameters The query parameters object.
   * @returns The query parameter string.
   */
  private getQueryParameterString = (queryParameters: string) => {
    if (queryParameters) {
      return (
        "?" +
        Object.keys(queryParameters)
          .filter(function (key) {
            return queryParameters[key] !== undefined;
          })
          .map(function (key) {
            return key + "=" + queryParameters[key];
          })
          .join("&")
      );
    }
  };

  /**
   * Get the URI (Uniform Resource Identifier) for the API request.
   * @returns The constructed URI.
   * @throws Error if any of the necessary components (scheme, host, port) is missing.
   */
  public getURI = (): string => {
    const { scheme, host, port, path } = this.data;
    if (!scheme || !host || !port) {
      throw new Error("Missing components necessary to construct URI");
    }
    let uri = `${scheme}://${host}`;
    if (
      (scheme === "http" && port !== 80) ||
      (scheme === "https" && port !== 443)
    ) {
      uri += `:${port}`;
    }
    if (path) {
      uri += path;
    }
    return uri;
  };

  /**
   * Get the complete URL for the API request, including the query parameters.
   * @returns The complete URL.
   */
  public getURL = (): string => {
    let uri = this.getURI();
    const queryParams = this.getQueryParameters();
    if (queryParams) {
      return uri + this.getQueryParameterString(queryParams);
    } else {
      return uri;
    }
  };

  /**
   * Execute the API request.
   * @returns The response data from the API.
   * @throws Error if the request fails or the response is not successful.
   */
  public execute = async (): Promise<any> => {
    const url = this.getURL();
    const requestOptions: RequestInit = {
      method: this.data.method,
    };

    if (this.data.headers) {
      requestOptions.headers = this.data.headers;
    }

    if (this.data.bodyParameters) {
      requestOptions.body = JSON.stringify(this.data.bodyParameters);
    }

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
