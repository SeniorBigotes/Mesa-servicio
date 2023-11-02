package servicedesk.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import servicedesk.services.JwtService;

@Component
@RequiredArgsConstructor // inicializa datos en el constructor
public class JwtFiltroAuth extends OncePerRequestFilter {

	@Autowired private final JwtService jwtService;
	@Autowired private final UserDetailsService detailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// obtener el encabezado del token
		final String token = getTokenFromRequest(request);
		// obtener el nombre de usuario a travez del token
		final String nombreUsuario;

		// si el token es nulo
		if (token == null || token.trim().isEmpty()) {
			// continua con la solicitud sin autenticacion
			filterChain.doFilter(request, response);
			return;
		}

		nombreUsuario = jwtService.getUsernameFromToken(token);

		// token valido && sin autenticacion actual en seguridad
		if(nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// Carga detalles del usuario a travez del token
			UserDetails userDetails = detailsService.loadUserByUsername(nombreUsuario);
			// verificar token
			if(jwtService.isTokenValid(token, userDetails)) {
				// Se autentifica el usuario con un token
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
					userDetails,
					null,
					userDetails.getAuthorities()
				);
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		// pasa la solicitud ya configurada
		filterChain.doFilter(request, response);
	}

	// Verificar si existe el encabezado del JWT
	private String getTokenFromRequest(HttpServletRequest request) {
		final String authHead = request.getHeader(HttpHeaders.AUTHORIZATION);
		// Si existe el encabezado, retorna desde el caracter 7 en adelante
		if (authHead != null && authHead.startsWith("Bearer ")) {
			return authHead.substring(7);
		}

		return null;
	}
}
