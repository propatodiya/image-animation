import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig, JwtModule, JWT_OPTIONS, SocialAuthService } from './package/index';
import { HomeComponent } from './home/home.component';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
    }
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    }),
  ],
  providers: [
    ToastrService,
    { provide: AuthServiceConfig, useValue: undefined },
    SocialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
