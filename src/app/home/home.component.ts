import { Component, OnInit } from '@angular/core';
import { HomeService } from './../_services';
import { GoogleAlbumResponse, MediaItem, VideoOptions } from './../_model';
import Swiper from 'swiper';
// import videoshow from 'videoshow';
import {Howl, Howler} from 'howler';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public googleAlbum: Array<MediaItem> = [];
  public apiCall = true;
  public selectedPic: Array<any> = [];
  public selectPicModel = false;
  public isDisplayAnimation = false;
  public mySwiper = new Swiper();
  public sound = new Howl({ src: ['/assets/audiofile.mp3'] });
  public mp3Audio = '/assets/audiofile.mp3';
  constructor(public homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getGooglePhoto().subscribe((res: GoogleAlbumResponse) => {
      if (res && res.mediaItems) {
        res.mediaItems.forEach((ele) => {ele.selected = false; })
        this.googleAlbum = res.mediaItems as MediaItem[];
      }
      setTimeout(() => {this.apiCall = false;});
    }, (error: any) => {
      this.apiCall = false;
    });
  }
  selectAlbum(album) {
    if (album) {
      const tempList = [];
      this.googleAlbum.forEach((item: any) => {
        if (item.selected) {
          tempList.push(item.baseUrl);
        }
      });
      this.selectedPic = tempList;
    }
  }
  createAnimation() {
    $('body').css({overflow: 'hidden'});
    this.isDisplayAnimation = true;
    this.sound = new Howl({ src: ['/assets/audiofile.mp3'], html5 :true });
    this.sound.play();
    setTimeout(() => {
      this.mySwiper = new Swiper('.swiper-container', {
        effect: 'cube',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }
      });
    });
  }
  playAnimation() {
    this.sound.play();
    this.sound.volume(0.5);
    this.mySwiper.init();
    // this.mySwiper.update('autoplay');
  }
  pauseAnimation() {
    this.sound.pause();
    this.sound.volume(0.5);
    this.mySwiper.init();
    // this.mySwiper.update('autoplay');
  }
  stopAnimation() {
    this.sound.stop();
    this.sound.volume(0.5);
    this.mySwiper.init();
    // this.mySwiper.off('autoplay');
  }
  muteAnimation() {
    this.sound.volume(0);
    this.mySwiper.init();
  }
  unMuteAnimation() {
    this.sound.volume(0.5);
  }
  closeSlider() {
    $('body').css({overflow: 'auto'});
    this.sound.stop();
    this.isDisplayAnimation = false;
  }
  downloadMp4() {
  //   new videoshow([ 'image1.jpg', 'image2.jpg', 'image3.jpg'])
  // .save('video.mp4')
  // .on('error', function () {})
  // .on('end', function () {});
  }
}
