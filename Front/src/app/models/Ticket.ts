import { Categoria } from "./Categoria";
import { Cuenta } from "./Cuenta";
import { Prioridad } from "./Prioridad";
import { Seccion } from "./Seccion";

export interface Ticket {
    id?: number;
    asunto?: string;
    autor?: Cuenta;
    seccion?: Seccion;
    categoria?: Categoria;
    asignado?: Cuenta;
    prioridad?: Prioridad;
}