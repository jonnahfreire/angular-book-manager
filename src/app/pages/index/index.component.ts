import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadBooks, loadUsers } from 'src/app/store/app.actions';
import { AppState, AuthState } from 'src/app/store/models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  private alertListener!: Subscription;
  alert = { 
    error: false, 
    success: false, 
    message: ""
  };
  
  constructor(
    private store: Store<{ app: AppState, auth: AuthState }>,
    private router: Router
  ) { }  
  
  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadBooks());

    this.alertListener = this.store.select("auth").subscribe(state => {
      state.authError?.error &&
        this.showAlertMessage(state.authError.message, "error");
      
      state.authSuccess?.success &&
        this.showAlertMessage(state.authSuccess.message, "success");
    });
  }

  ngOnDestroy(): void {
    this.alertListener.unsubscribe();
  }

  private showAlertMessage(message: string, type: string): void {
    this.alert = {
      error: type === "error",
      success: type === "success",
      message
    }

    setTimeout(() => {
      this.alert = {
        error: false,
        success: false,
        message: ""
      }
    }, 4000);
  }
}
