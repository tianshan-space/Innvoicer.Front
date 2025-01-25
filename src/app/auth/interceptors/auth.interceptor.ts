import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  const authData = JSON.parse(localStorage.getItem("auth") as any);
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authData?.token}`,
    },
  });
  return next(cloneRequest);
}