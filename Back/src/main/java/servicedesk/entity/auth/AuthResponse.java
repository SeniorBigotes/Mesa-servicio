package servicedesk.entity.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getters and setters autpmaticas
@Builder // construye objetos de manera limpia
// modifica de forma automatica
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
}
