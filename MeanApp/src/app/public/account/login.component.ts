import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  ref: string = '';
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.ref = route.snapshot.queryParams['ref'];

    this.userForm = formBuilder.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  login(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value).subscribe((res) => {
        if (res.status == 200) {
          const obj: User = res.json();
          this.authService.setAuthInfo(obj);
          if (this.ref != undefined) {
            this.router.navigate([this.ref]);
          }
          else {
            if (obj.roles.indexOf('Admin') > -1) {
              this.router.navigate(['admin']);
            }
            else if (obj.roles.indexOf('User') > -1) {
              this.router.navigate(['user']);
            }
          }
        }
      });
    }
  }
}
