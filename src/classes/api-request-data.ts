export class ApiRequestData {
  scheme: string = "";
  host: string = "";
  port: number = 0;
  method: string = "";
  queryParameters: string = "";
  bodyParameters: string = "";
  headers: Record<string, string> = {};
  path: string = "";
}
