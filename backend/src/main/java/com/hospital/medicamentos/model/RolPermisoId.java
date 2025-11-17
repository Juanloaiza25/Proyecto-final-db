package com.hospital.medicamentos.model;

import java.io.Serializable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolPermisoId implements Serializable {
    private Integer idRol;
    private Integer idPermiso;
}
