import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseProviderService } from './../BaseProvider.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseProviderService{

  constructor(public http: HttpClient) {
    super(http);
  }

  getGooglePhoto() {
    return this.makeGetCall(environment.GOOGLEPHOTO + '/mediaItems?pageSize=50');
  }
  getGooglePhotoById(Id) {
    return this.makeGetCall(environment.GOOGLEPHOTO + '/albums/' + Id);
  }
}
