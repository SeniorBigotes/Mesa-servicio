import { Perfil } from "./Perfil";
import { Rol } from "./Rol";
import { Seccion } from "./Seccion";

export interface Cuenta {
    id: number,
    nombreUsuario?: string;
    contraseña?: string;
    perfil?: Perfil;
    role?: Rol;
    seccion?: Seccion;
    authorities?: [authority: string];
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    enabled?: boolean;
    username?: string;
    password?: string;
}