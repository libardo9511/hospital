import { Injectable } from '@angular/core';
import { SqliteService } from "./sqlite.service";
import { Medico } from "../modelos/medico";

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private sqliteService: SqliteService) { }

  obtenerMedicos() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM medicos").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay médicos registrados" });
            }
          });
        });
    });
  }

  guardarMedico(medico: Medico) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("INSERT INTO medicos (tarjetaProf, especialidad, aniosExperiencia, consultorio, isDomicilio) VALUES (?,?,?,?,?)", [medico.tarjetaProf, medico.especialidad, medico.aniosExperiencia, medico.consultorio, medico.isDomicilio]).then(id => {
            db.execSQL("insert into logs (sentencia) values (?)", [`INSERT INTO medicos (tarjetaProf, especialidad, aniosExperiencia, consultorio, isDomicilio) VALUES ('${medico.tarjetaProf}','${medico.especialidad}',${medico.aniosExperiencia},'${medico.consultorio}',${medico.isDomicilio})`], function (err, id) {
              console.log("The new record id is:", id);
            });
            resolve({ status: true, message: "Guardado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  obtenerMedicoById(tarjetaProf: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.get(`SELECT * FROM medicos WHERE tarjetaProf = ?`, [tarjetaProf]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No exite el médico" });
            }
          });
        });
    });
  }

  actualizarMedico(medico: Medico) {
    //console.log("medico update: " + medico);
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("UPDATE medicos SET especialidad = ?, aniosExperiencia = ?, consultorio = ?, isDomicilio = ? WHERE tarjetaProf = ?", [medico.especialidad, medico.aniosExperiencia, medico.consultorio, medico.isDomicilio, medico.tarjetaProf]).then(id => {
            db.execSQL("insert into logs (sentencia) values (?)", [`UPDATE medicos SET especialidad = '${medico.especialidad}', aniosExperiencia = ${medico.aniosExperiencia}, consultorio = '${medico.consultorio}', isDomicilio = ${medico.isDomicilio} WHERE tarjetaProf = '${medico.tarjetaProf}'`], function (err, id) {
              console.log("The new record id is:", id);
            });
            resolve({ status: true, message: "Actualizado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  eliminarMedico(codTarjeta: string) {
    //console.log("medico delete: " + codTarjeta);
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("DELETE FROM medicos WHERE tarjetaProf = ?", [codTarjeta]).then(id => {
            db.execSQL("insert into logs (sentencia) values (?)", [`DELETE FROM medicos WHERE tarjetaProf = '${codTarjeta}'`], function (err, id) {
              console.log("The new record id is:", id);
            });
            resolve({ status: true, message: "Eliminado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Eliminar" });
          });
        });
    });
  }

  verificarHistorialCitas(tarjetaProf: string) {
    //console.log("Verificar Historial");
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all(`SELECT * FROM citas WHERE medicoId = ? and isAsistio = 0`, [tarjetaProf]).then(rows => {
            console.log("ROWS: " + rows);
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            } else {
              reject({ status: false, message: "No exiten registros." });
            }
          });
        });
    });
  }


}
