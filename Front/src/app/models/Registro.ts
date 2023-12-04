import { Cuenta } from "./Cuenta";
import { Prioridad } from "./Prioridad";
import { Ticket } from "./Ticket";

export interface Registro {
    cambios: string;
    fecha: Date;
    id: number;
    estatus: string;
    prioridad: Prioridad;
    modifico: Cuenta;
    asignado: Cuenta;
    ticket: Ticket;
}