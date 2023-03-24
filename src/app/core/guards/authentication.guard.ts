import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route, UrlSegment, RouteConfigLoadEnd } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthenticationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad{

  private isLoggedIn: boolean  

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.isLoggedIn = false    
  }  

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    if(!this.authenticationService.getToken() || this.authenticationService.getToken() === ''){
        this.router.navigate(['login'])
        return false
    }
    return true    
  }

  canActivate(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    console.log(this.authenticationService.getToken());
    if(!this.authenticationService.getToken() || this.authenticationService.getToken() === ''){
        this.router.navigate(['login'])
        return false
    }
    return true    
  }
}
