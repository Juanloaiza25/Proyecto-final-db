package com.hospital.medicamentos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "El username es obligatorio")
    @Size(min = 3, max = 80, message = "El username debe tener entre 3 y 80 caracteres")
    private String username;

    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    private String nombre;
    private String apellido;
}
