package servicedesk.jwt;

import java.io.IOException;

import org.springframework.util.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFiltroAuth extends OncePerRequestFilter{

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	    throws ServletException, IOException {
	final String token = getTokenFromRequest(request); // metodo personal
	
	if(token == null) {
	    filterChain.doFilter(request, response);
	    return;
	}
	
	filterChain.doFilter(request, response);
    }
    
    // Verificar si existe el encabezado del JWT
    private String getTokenFromRequest(HttpServletRequest request) {
	final String authHead = request.getHeader(HttpHeaders.AUTHORIZATION);
	
	// Si existe el encabezado, retorna desde el caracter 7 en adelante
	if(StringUtils.hasText(authHead) && authHead.startsWith("Bearer ")) {
	    return authHead.substring(7);
	}
	
	return null;
    }
    
    
}
