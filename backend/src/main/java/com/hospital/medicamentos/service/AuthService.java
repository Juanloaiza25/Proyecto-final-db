package com.hospital.medicamentos.service;

import com.hospital.medicamentos.dto.LoginRequest;
import com.hospital.medicamentos.dto.LoginResponse;
import com.hospital.medicamentos.dto.RegisterRequest;
import com.hospital.medicamentos.model.Rol;
import com.hospital.medicamentos.model.Usuario;
import com.hospital.medicamentos.repository.RolRepository;
import com.hospital.medicamentos.repository.UsuarioRepository;
import com.hospital.medicamentos.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UsuarioRepository usuarioRepo;
    private final RolRepository rolRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepo, RolRepository rolRepo,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioRepo = usuarioRepo;
        this.rolRepo = rolRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!usuario.getIsActive()) {
            throw new RuntimeException("Usuario desactivado");
        }

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String rolNombre = usuario.getRol().getNombre();
        String token = jwtUtil.generateToken(usuario.getUsername(), rolNombre, usuario.getIdUsuario());

        return new LoginResponse(
                token,
                usuario.getUsername(),
                usuario.getNombre(),
                usuario.getApellido(),
                rolNombre
        );
    }

    public LoginResponse register(RegisterRequest request) {
        if (usuarioRepo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El username ya está en uso");
        }

        if (request.getEmail() != null && usuarioRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Rol rolUsuario = rolRepo.findByNombre("ROLE_USUARIO")
                .orElseThrow(() -> new RuntimeException("Rol USUARIO no encontrado en la base de datos"));

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setEmail(request.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setRol(rolUsuario);
        usuario.setIsActive(true);

        usuarioRepo.save(usuario);

        String token = jwtUtil.generateToken(usuario.getUsername(), rolUsuario.getNombre(), usuario.getIdUsuario());

        return new LoginResponse(
                token,
                usuario.getUsername(),
                usuario.getNombre(),
                usuario.getApellido(),
                rolUsuario.getNombre()
        );
    }
}
