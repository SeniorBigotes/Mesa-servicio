import { Categoria } from "./Categoria";
import { Cuenta } from "./Cuenta";
import { Perfil } from "./Perfil";
import { Prioridad } from "./Prioridad";
import { Seccion } from "./Seccion";

export interface Ticket {
    id: number;
    asunto: string;
    descripcionCambios: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
    estatus: string;
    autor: Cuenta;
    seccion: Seccion;
    categoria: Categoria;
    prioridad: Prioridad;
    perfil: Cuenta;
    asignado?: Cuenta;
}