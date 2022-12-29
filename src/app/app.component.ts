import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) { }  

  ngOnInit(): void { 
    
    this.store.select("auth")
    .subscribe(
      state => {

        if(state.logged) {
          this.router.navigate(["home"], { replaceUrl: true })
        } else if(!state?.isCreatingUser) {
          this.router.navigate(["/"], { replaceUrl: true })
        }
    });
  }
}
