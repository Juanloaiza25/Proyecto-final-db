package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    private String username;
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    private String nombre;
    private String apellido;

    @Column(name = "id_rol")
    private Integer idRol;

    @Column(name = "is_active")
    private Integer isActive;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
