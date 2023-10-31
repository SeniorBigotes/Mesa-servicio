package servicedesk.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import servicedesk.jwt.JwtFiltroAuth;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired private JwtFiltroAuth filtroAuth;
	@Autowired private AuthenticationProvider authenticationProvider;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// retornamos con una cadena de filtros
		return http.csrf(c -> c.disable()).cors(c -> c.disable()) // deshabilita la configuracion csrf
				.authorizeHttpRequests(authRequest -> // rutas privadas y protegidas
				authRequest.requestMatchers("/auth/**", "/user/**", "/api/**").permitAll() // acceso total a esas rutas
																				// "auth" tienen acceso total
				.anyRequest().authenticated()) // cualquier otro request se tiene que autenticar
				.sessionManagement(sessionManager -> sessionManager
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(filtroAuth, UsernamePasswordAuthenticationFilter.class)
				.build(); // construimos
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
