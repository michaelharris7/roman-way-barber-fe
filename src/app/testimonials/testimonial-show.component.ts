import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Angular2TokenService, UserData } from 'angular2-token';
import { AuthenticationService } from '../authentication/authentication.service';
import { TestimonialService } from './testimonial.service';
// import { FeaturedArticle } from './featured-article';
import { TestimonialUser } from './testimonial-user';
import { Testimonial } from './testimonial';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  templateUrl: 'testimonial-show.component.html'
})

export class TestimonialShowComponent implements OnInit {
  id: number;
  userType: string;
  userData: UserData = <UserData>{};
  testimonialUser: TestimonialUser = <TestimonialUser>{};
  testimonialUsers: TestimonialUser[];
  testimonials: Testimonial[];
  // testimonial: Testimonial = <Testimonial>{}

  @Input() testimonial: Testimonial;


  constructor(
    private route: ActivatedRoute,
    private tokenService: Angular2TokenService,
    private authService: AuthenticationService,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit() {
    this.loginVerification();
    this.getTestimonial();
  }


  // Testimonial Function
  getTestimonial() {
    let testimonialRequest = this.route.params
        .flatMap((params: Params) =>
          this.testimonialService.getTestimonial(+params['id']));
    testimonialRequest.subscribe(response => this.testimonial = response.json());
  }


  // Account Functions
  loginVerification() {
    if(this.isLoggedIn()) {
      this.tokenService.validateToken().subscribe(
        res => {
          this.userData = this.tokenService.currentUserData;
          this.userType = this.tokenService.currentUserType;
        },
        err => {
          console.log('No user logged in. Logging out:' + err);
          this.logOut();
        }
      );
    }
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logOut() {
    this.authService.logOut().subscribe(
        res => { return true },
        err => { console.log('There was an error in logging out:' + err); }
      );
  }
  isAdmin(): boolean {
    return (this.isLoggedIn() && this.userType === 'ADMIN');
  }
}