import type { RouteObject } from "react-router-dom";

export interface ProtectedRouteObject extends  Omit<RouteObject, "children"> {
  meta?: {
    resource: string;
    action?: string;
  };
  children?: ProtectedRouteObject[];

}
