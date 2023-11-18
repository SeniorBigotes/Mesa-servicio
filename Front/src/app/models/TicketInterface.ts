export interface Ticket {
    asunto: string;
    usuario: {
        id: number
    }
    seccion: {
        id: number
    }
    categoria: {
        id: number
    }
    prioridad: {
        id: number
    }
}