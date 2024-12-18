import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user:User;
  subscription: Subscription;
  constructor(location: Location,  private element: ElementRef, private router: Router, private securityService: SecurityService,
    private webSocketService: WebSocketService
  ) {
    this.location = location;
    this.subscription = this.securityService.getUser().subscribe(data => {
      this.user = data;
      if (this.user._id) {
        this.webSocketService.setNameEvent(this.user._id)
        this.webSocketService.callback.subscribe((data) => {
          console.log("Llegando desde el backend: "+JSON.stringify(data));
        })
      }
    })
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.webSocketService.setNameEvent("notifications")
    this.webSocketService.callback.subscribe((data) =>{
      console.log("Llegando desde el backend :"+JSON.stringify(data));
    }) 
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  public getSession(){
    return this.securityService.existSession()
  }
  logout(){
    this.securityService.logout()
    //this.router.navigate(["login"]) 
  }

}
