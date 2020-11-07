import { Paciente } from "../modelos/paciente";
import { Medico } from "../modelos/medico";

export class Cita {
    id: number;
    pacienteId: Paciente;
    medicoId: Medico;
    fechaCita: string;
    isAsistio: number;
    firma: string;
}