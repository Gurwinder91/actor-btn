import { Component } from "@angular/core";

import { of } from "rxjs";
import { delay, tap } from "rxjs/operators";

import { BtnAction, BtnState } from "actor-btn";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  name = "Angular";

  btnActionOb: BtnAction;
  btnActionPm: BtnAction;
  btnActionVoid: BtnAction;
  btnActionBl: BtnAction;
  btnActionHeaders: BtnAction;
  btnState1: BtnState;
  btnState2: BtnState;
  btnState3: BtnState;
  btnState4: BtnState;

  btnHeaders: any;

  ngOnInit() {
    this.btnActionOb = {
      act: () => of("sucess").pipe(delay(2000))
    };
    this.btnActionPm = {
      act: this.asyncOperationWithPromise
    };
    this.btnActionVoid = {
      act: this.asyncOperationNoReturn
    };
    this.btnActionBl = {
      act: this.asyncOperationWithBoolean
    };
    this.btnActionHeaders = {
      act: options => this.asyncOperation(options)
    };
  }

  asyncOperation(options: { [name: string]: any }) {
    this.btnHeaders = options.headers.has('actorBtn');
    return of().pipe(delay(2000));
  }

  asyncOperationWithPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("sucees"), 3000);
    });
  }

  asyncOperationWithBoolean() {
    return true;
  }

  asyncOperationNoReturn() {
    return;
  }
}
