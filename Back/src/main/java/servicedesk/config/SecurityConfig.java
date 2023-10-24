package servicedesk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	// retornamos con una cadena de filtros
	return http.csrf(csrf -> csrf.disable()) // deshabilita la configuracion csrf
		.authorizeHttpRequests(authRequest -> // rutas privasas y protegidas 
		authRequest.requestMatchers("/auth/**").permitAll() // todas las rutas hijas que tengan a la ruta padre "auth" tienen acceso total
		.anyRequest().authenticated()) // cualquier otro request se tiene que autenticar
		.formLogin(withDefaults()) //configuracion por default del login de spring security
		.build(); // llamamos al metodo build
    }
}
