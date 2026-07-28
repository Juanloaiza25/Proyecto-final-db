package com.hospital.medicamentos.service;

import com.hospital.medicamentos.dto.UsuarioDTO;
import com.hospital.medicamentos.model.Rol;
import com.hospital.medicamentos.model.Usuario;
import com.hospital.medicamentos.repository.RolRepository;
import com.hospital.medicamentos.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;
    private final RolRepository rolRepo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepo, RolRepository rolRepo,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.rolRepo = rolRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioDTO> getAll() {
        return usuarioRepo.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public UsuarioDTO getById(Integer id) {
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return toDTO(usuario);
    }

    public UsuarioDTO create(UsuarioDTO dto) {
        if (usuarioRepo.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("El username ya está en uso");
        }

        if (dto.getEmail() != null && usuarioRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(dto.getUsername());
        usuario.setEmail(dto.getEmail());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        } else {
            throw new RuntimeException("La contraseña es obligatoria al crear un usuario");
        }

        if (dto.getIdRol() != null) {
            Rol rol = rolRepo.findById(dto.getIdRol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado con ID: " + dto.getIdRol()));
            usuario.setRol(rol);
        } else {
            Rol rolUsuario = rolRepo.findByNombre("ROLE_USUARIO")
                    .orElseThrow(() -> new RuntimeException("Rol USUARIO no encontrado"));
            usuario.setRol(rolUsuario);
        }

        Usuario saved = usuarioRepo.save(usuario);
        return toDTO(saved);
    }

    public UsuarioDTO update(Integer id, UsuarioDTO dto) {
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        if (dto.getUsername() != null) {
            usuario.setUsername(dto.getUsername());
        }
        if (dto.getEmail() != null) {
            usuario.setEmail(dto.getEmail());
        }
        if (dto.getNombre() != null) {
            usuario.setNombre(dto.getNombre());
        }
        if (dto.getApellido() != null) {
            usuario.setApellido(dto.getApellido());
        }
        if (dto.getIsActive() != null) {
            usuario.setIsActive(dto.getIsActive());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getIdRol() != null) {
            Rol rol = rolRepo.findById(dto.getIdRol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado con ID: " + dto.getIdRol()));
            usuario.setRol(rol);
        }

        Usuario saved = usuarioRepo.save(usuario);
        return toDTO(saved);
    }

    public void delete(Integer id) {
        if (!usuarioRepo.existsById(id)) {
            throw new RuntimeException("No existe un usuario con ID: " + id);
        }
        usuarioRepo.deleteById(id);
    }

    public List<Rol> getAllRoles() {
        return rolRepo.findAll();
    }

    private UsuarioDTO toDTO(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdUsuario(u.getIdUsuario());
        dto.setUsername(u.getUsername());
        dto.setEmail(u.getEmail());
        dto.setNombre(u.getNombre());
        dto.setApellido(u.getApellido());
        dto.setIsActive(u.getIsActive());
        if (u.getRol() != null) {
            dto.setRolNombre(u.getRol().getNombre());
            dto.setIdRol(u.getRol().getIdRol());
        }
        return dto;
    }
}
