//@ts-nocheck
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  private bearer;

  public constructor(baseURL: string, bearer: string) {
    this.instance = axios.create({
      baseURL
    });

    this.bearer = bearer;
    this.initializeResponseInterceptor();
    this.initializeRequestInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest, this.handleError);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + this.bearer;

    return config;
  };

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: any) => Promise.reject(error);
}
