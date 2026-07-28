package com.hospital.medicamentos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Integer idUsuario;
    private String username;
    private String email;
    private String nombre;
    private String apellido;
    private String rolNombre;
    private Integer idRol;
    private Boolean isActive;

    // Para crear/actualizar usuario desde admin (incluye password opcional)
    private String password;
}
