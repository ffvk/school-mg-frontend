import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/shared/models/users/user';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToasterService } from 'src/app/shared/services/helpers/toaster.service';
import { UserLocalService } from 'src/app/shared/services/local/user-local.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm: any;

  emailValue: string = '';
  password: string = '';

  user: User = new User();

  showPassword: boolean = false;

  constructor(
    private readonly usersAPIService: UsersApiService,
    private readonly userLocalService: UserLocalService,
    private menu: MenuController,
    private router: Router,
    private toaster: ToasterService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (
      this.userLocalService.getMe()?.email?.verified &&
      this.userLocalService.getMyToken()
    ) {
      this.router.navigate(['/home']);
    }

    this.user = this.userLocalService.getMe();

    if (!this.user.email?.verified) {
      this.router.navigateByUrl('/verify-email');
    }
  }

  ionViewWillEnter() {
    this.menu.enable(false);
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeGesture(true);
  }

  login() {
    if (this.loginForm.invalid) {
      for (let key in this.loginForm.controls) {
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].markAsTouched();
      }
      this.toaster.error('Please fill the required values');

      return;
    }

    this.usersAPIService
      .loginUser({
        emailValue: this.emailValue,
        password: this.password,
      })
      .subscribe((user: User) => {
        this.user = user;
        this.userLocalService.saveMe(user);

        this.toaster.success('Successfully logged in!');
        if (!this.user.email.verified) {
          this.router.navigateByUrl('/verify-email');
        } else {
          this.router.navigateByUrl('/home');
        }
      });
  }

  togglePassword(type: string): void {
    if (type === 'create') {
      this.showPassword = !this.showPassword;
    }
    this.cdRef.detectChanges();
  }
}
