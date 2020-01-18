import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from './../../package';
import { AuthenticationService } from './../../_services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public socialUser = new SocialUser();
  constructor(private socialAuthService: SocialAuthService, public authService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((response: SocialUser) => {
      if (response) {
        this.socialUser = response as SocialUser;
      }
    });
  }
  logout(): void {
    this.socialUser = new SocialUser();
    this.toastr.info('logout successfully!');
    this.authService.logout();
  }
}
