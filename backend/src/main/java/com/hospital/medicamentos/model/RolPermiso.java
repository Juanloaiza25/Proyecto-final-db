package com.hospital.medicamentos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rol_permiso")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(RolPermisoId.class)
public class RolPermiso {

    @Id
    @Column(name = "id_rol")
    private Integer idRol;

    @Id
    @Column(name = "id_permiso")
    private Integer idPermiso;
}
