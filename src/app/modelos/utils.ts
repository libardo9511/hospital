

export class Utilidades {

    public alertaInformacion(titulo, mensaje, okBoton) {
        let options = {
            title: titulo,
            message: mensaje,
            okButtonText: okBoton
        };

        alert(options);
    };

    public configurarFecha(fecha: Date): string {
        let strFecha = "";
        strFecha += fecha.getFullYear() + "/";
        strFecha += (fecha.getMonth() + 1) + "/";
        strFecha += fecha.getDate();
        return strFecha;
    }

    public formatoHoraAMPM(date: Date): string {
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let ampm = hora >= 12 ? 'pm' : 'am';
        hora = hora % 12;
        hora = hora ? hora : 12;
        let strMinutos = minutos < 10 ? "0" + minutos : minutos;
        return hora + ':' + strMinutos + ' ' + ampm;
    }

    public formatoFechaHoraStringCompleta(fechaStr: string): string {
        let fecha: Date = new Date(fechaStr);
        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let monthStr = month < 10 ? "0" + month : month;
        let day = fecha.getDate();
        let dayStr = day < 10 ? "0" + day : day;
        let hora = this.formatoHoraAMPM(fecha);
        return year + "/" + monthStr + "/" + dayStr + " - " + hora;
    }

    public convertirFechaStringADate(fecha: string): string {

        let year = fecha.slice(0, fecha.indexOf("/"));
        fecha = fecha.slice(fecha.indexOf("/"));

        let month = fecha.slice(1, fecha.indexOf("/", 2));
        fecha = fecha.slice(fecha.indexOf("/", 2));

        let day = fecha.slice(1, fecha.indexOf(" "));
        fecha = fecha.slice((fecha.indexOf("-") + 2));

        let hour = fecha.slice(0, fecha.indexOf(":"));
        fecha = fecha.slice(fecha.indexOf(":"));


        let minutes = fecha.slice(1, fecha.indexOf(" "));

        let fechaDate: Date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minutes));
        return fechaDate.toString();
    }

    agregarSentencia() {

    }



    // Writing text to the file.



}
