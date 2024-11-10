import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/shared/models/users/user';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupForm', { static: false }) signupForm: any;
  @Input() user: User = new User({});

  disableEmail: boolean = false;

  constructor(
    private readonly usersAPIService: UsersApiService,
    private readonly userLocalService: UserLocalService,
    private menu: MenuController,
    private router: Router,
    private toaster: ToasterService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      this.userLocalService.getMe()?.email?.verified &&
      this.userLocalService.getMyToken()
    ) {
      this.router.navigate(['/login']);
    }

    this.user = this.userLocalService.getMe();

    this.user.role = 'CUSTOMER';
  }

  async register() {
    if (this.signupForm.invalid) {
      for (let key in this.signupForm.controls) {
        this.signupForm.controls[key].markAsDirty();
        this.signupForm.controls[key].markAsTouched();
      }
      this.toaster.error('Please fill the required values');

      return;
    }

    try {
      this.user = await lastValueFrom(
        this.usersAPIService.registerUser(this.user.toRegisterDTO())
      );

      this.userLocalService.saveMe(this.user);

      this.toaster.success('Successfully SignUp');

      this.router.navigate(['/login']);
    } catch (e: any) {
      this.toaster.error(
        e && e.error && e.error.status === 'ERROR'
          ? e.error.message.user
          : 'An unknown error occurred saving user'
      );
    }
  }
}
