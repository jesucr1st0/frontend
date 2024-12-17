import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  constructor(private securityService: SecurityService, private router: Router ) {
    this.securityService.getUser().subscribe(user => {
      this.user= user;
    })
   }

  ngOnInit() {
  }

}
