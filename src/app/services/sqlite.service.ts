import { Injectable } from '@angular/core';
const Sqlite = require("nativescript-sqlite");

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor() { }

  public getdbConnection() {
    return new Sqlite("hospital", function (err, db) {
      if (err) {
        console.error("failed to open database", err);
      } else {
        db.execSQL("PRAGMA foreign_keys=ON").then(() => {
        }, error => {
          console.log("Pragma ERROR", error);
        });
      }
    });
  }

  public closedbConnection() {
    new Sqlite('hospital')
      .then((db) => {
        db.close();
      });
  }

}
