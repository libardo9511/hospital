import { Injectable } from '@angular/core';
import { SqliteService } from "./sqlite.service";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private sqliteService: SqliteService) { }

  obtenerSentencias() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM logs").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay logs registradas" });
            }
          });
        });
    });
  }

  eliminarLogs() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("DELETE FROM logs").then(id => {
            resolve({ status: true, message: "Sincronización realizada Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Eliminar" });
          });
        });
    });
  };
}
