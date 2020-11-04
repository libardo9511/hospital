import { Injectable } from '@angular/core';
import { SqliteService } from "./sqlite.service";
import { Paciente } from "../modelos/paciente";

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private sqliteService: SqliteService) { }

  obtenerPacientes() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM pacientes").then(rows => {
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

  guardarPaciente(paciente: Paciente) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("INSERT INTO pacientes (pacienteId, nombres, apellidos, fechaNaci, isTratamiento, valorCuota) VALUES (?,?,?,?,?,?)", [paciente.identificacion, paciente.nombres, paciente.apellidos, paciente.fechaNaci, paciente.isTratamiento, paciente.valorCuota]).then(id => {
            resolve({ status: true, message: "Guardado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  obtenerPacienteById(identificacion: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.get(`SELECT * FROM pacientes WHERE pacienteId = ?`, [identificacion]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No exite el paciente" });
            }
          });
        });
    });
  }

  /*verificarHistorialPaciente(id: string) {
    console.log("id verificar historial: " + id);
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.get(`SELECT * FROM citas WHERE pacienteId = ?`, [id]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, message: "Existen registros en el Historal. " });
            }
            else {
              reject({ status: false, message: "No exite el paciente" });
            }
          });
        });
    });
  }*/

  actualizarPaciente(paciente: Paciente) {
    //console.log("paciente updata: " + paciente);
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("UPDATE pacientes SET nombres = ?, apellidos = ?, fechaNaci = ?, isTratamiento = ?, valorCuota = ? WHERE pacienteId = ?", [paciente.nombres, paciente.apellidos, paciente.fechaNaci, paciente.isTratamiento, paciente.valorCuota, paciente.identificacion]).then(id => {
            resolve({ status: true, message: "Actualizado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  eliminarPaciente(identificacion: string) {
    //console.log("paciente delete: " + identificacion);
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("DELETE FROM pacientes WHERE pacienteId = ?", [identificacion]).then(id => {
            resolve({ status: true, message: "Eliminado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Eliminar" });
          });
        });
    });
  }
}
