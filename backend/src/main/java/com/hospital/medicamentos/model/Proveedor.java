package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "proveedor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    private String nombre;
    private String contacto;
    private String telefono;
    private String correo;
    private String direccion;

    private LocalDateTime created_at;
}
