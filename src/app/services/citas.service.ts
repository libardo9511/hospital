import { Injectable } from '@angular/core';
import { SqliteService } from "./sqlite.service";
import { Cita } from "../modelos/cita";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private sqliteService: SqliteService) { }

  obtenerCitas() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay citas registradas" });
            }
          });
        });
    });
  }

  guardarCita(cita: Cita) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("INSERT INTO citas (pacienteId, medicoId, fechaCita, isAsistio) VALUES (?,?,?,?)", [cita.pacienteId.identificacion, cita.medicoId.tarjetaProf, cita.fechaCita, cita.isAsistio]).then(idGuardado => {
            db.execSQL("insert into logs (sentencia) values (?)", [`INSERT INTO citas (idCita, pacienteId, medicoId, fechaCita, isAsistio) VALUES (${idGuardado}, '${cita.pacienteId.identificacion}','${cita.medicoId.tarjetaProf}','${cita.fechaCita}',${cita.isAsistio})`], function (err, id) {
              console.log("The new record id is:", id);
            });
            resolve({ status: true, message: "Guardado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  actualizarCita(cita: Cita) {
    let jkj = "ssssssssssssss";

    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("UPDATE citas SET pacienteId = ?, medicoId = ?, fechaCita = ?, isAsistio = ?, firma = ? WHERE idCita = ?", [cita.pacienteId, cita.medicoId, cita.fechaCita, 1, cita.firma, cita.id]).then(id => {
            db.execSQL("insert into logs (sentencia) values (?)", [`UPDATE citas SET pacienteId = '${cita.pacienteId}', medicoId = '${cita.medicoId}', fechaCita = '${cita.fechaCita}', isAsistio = ${cita.isAsistio}, firma = '${cita.firma}' WHERE idCita = ${cita.id}`], function (err, id) {
              console.log("The new record id is:", id);
            });
            resolve({ status: true, message: "Registrado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Registrar" });
          });
        });
    });
  }

  obtenerCitaById(idCita: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.get(`SELECT * FROM citas WHERE idCita = ?`, [idCita]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No existe la cita" });
            }
          });
        });
    });
  }

  obtenerCitasByMedico(idMedico: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE medicoId = ?", [idMedico]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay datos" });
            }
          });
        });
    });
  }
  obtenerCitasByPaciente(pacienteId: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE pacienteId = ?", [pacienteId]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay datos" });
            }
          });
        });
    });
  }

  obtenerCitasByPacienteFechaCitas() {
    let fechaActual = new Date();
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE isAsistio = 0").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No se encontraron registros de citas pendientes" });
            }
          });
        });
    });
  }

}