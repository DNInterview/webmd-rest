import * as http from "http";

export type ExpressRouteMiddleware = (req: http.IncomingMessage,
                                      res: http.ServerResponse,
                                      next: (error?: any) => void) => void;
