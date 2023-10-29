package servicedesk.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "586E3272357538782F4428472B4B6205655368566B597033733676397924";

    // llama al metodo de abajo
    // metodo que hace funcion para crear el token
    public String getToken(UserDetails cuenta) {
        return createToken(new HashMap<>(), cuenta);
    }

    // generar token
    private String createToken(Map<String, Object> extraClaims, UserDetails cuenta) {
        return Jwts.builder() // generar token con...
            .setClaims(extraClaims) // informacion del token (reclamaciones)
            .setSubject(cuenta.getUsername()) // sujeto que genera el token
            .setIssuedAt(new Date(System.currentTimeMillis())) // fecha de creacion del token
            .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 8)))  // fecha de expiracion del token
            .signWith(getKey(), SignatureAlgorithm.HS256) // codificar el token
            .compact(); // compactar todo lo generado
    }

    // Codificar el secretKey
    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Obtener nombre de usuario por el token
    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    // Verificar si el token es valido
    public boolean isTokenValid(String token, UserDetails userDetails) {
        if(token == null || token.isEmpty()) {
            return false;
        }
        final String nombreUsuario = getUsernameFromToken(token);
        return (nombreUsuario.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Obtener los claims del token
    private Claims getAllClaims(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }
}
