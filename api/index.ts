/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateWorkEntryRequest {
  title: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  /** @format int64 */
  projectId: number;
  taskId: string;
  description: string;
}

export interface CreateWorkEntryResponse {
  /** @format int64 */
  newWorkEntryId: number;
}

export interface GetWorkEntriesByPeriodResponse {
  workEntries: WorkEntryItem[];
}

export interface Project {
  /** @format int64 */
  id: number;
  name: string;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface UpdateWorkEntryRequest {
  title: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  /** @format int64 */
  projectId: number;
  taskId: string;
  description: string;
}

export interface WorkEntryItem {
  /** @format int64 */
  id: number;
  title: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  project: Project;
  taskId: string;
  description: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:4507/",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Api | v1
 * @version 1.0.0
 * @baseUrl http://localhost:4507/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Tracking
     * @name TrackingGetWorkEntriesByPeriod
     * @summary Get work entries by period
     * @request GET:/api/time/tracking/work-entries
     */
    trackingGetWorkEntriesByPeriod: (
      query: {
        /** @format date */
        startDate: string;
        /** @format date */
        endDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetWorkEntriesByPeriodResponse, any>({
        path: `/api/time/tracking/work-entries`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tracking
     * @name TrackingCreateWorkEntry
     * @summary Create a work entry
     * @request POST:/api/time/tracking/work-entries
     */
    trackingCreateWorkEntry: (
      data: CreateWorkEntryRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreateWorkEntryResponse, any>({
        path: `/api/time/tracking/work-entries`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tracking
     * @name TrackingUpdateWorkEntry
     * @summary Update a work entry
     * @request POST:/api/time/tracking/work-entries/{workEntryId}
     */
    trackingUpdateWorkEntry: (
      workEntryId: number,
      data: UpdateWorkEntryRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/time/tracking/work-entries/${workEntryId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tracking
     * @name TrackingGetEmployeeProjects
     * @summary Get employee projects by date
     * @request GET:/api/time/tracking/work-entries/projects
     */
    trackingGetEmployeeProjects: (
      query: {
        /** @format date */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProjectsResponse, any>({
        path: `/api/time/tracking/work-entries/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tracking
     * @name TrackingHardDeleteWorkEntry
     * @summary Deletes specific work entry
     * @request DELETE:/api/time/tracking/work-entries/{workEntryId}/hard-delete
     */
    trackingHardDeleteWorkEntry: (
      workEntryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/time/tracking/work-entries/${workEntryId}/hard-delete`,
        method: "DELETE",
        ...params,
      }),
  };
}
