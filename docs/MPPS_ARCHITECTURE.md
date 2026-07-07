# ANÁLISIS ESTRUCTURAL DEL ORGANIGRAMA DEL MPPS Y SISTEMA DE INFORMACIÓN EN SALUD (SIS)

Para parametrizar correctamente la arquitectura en un entorno de Inteligencia Artificial, la topología del Ministerio del Poder Popular para la Salud (MPPS) debe estructurarse separando los viceministerios, sus direcciones generales, los programas subordinados y los instrumentos estadísticos exactos que cada uno procesa.

A continuación, la planimetría exhaustiva de la institución:

### I. VICEMINISTERIO DE REDES DE SALUD COLECTIVA

Es el núcleo del procesamiento de datos en salud pública de la nación. Controla la morbilidad y la ejecución de los programas preventivos. Se divide en tres Direcciones Generales:

**1. Dirección General de Epidemiología**

* **Función:** Vigilancia, alerta y respuesta ante enfermedades.
* Formatos Estadísticos Exclusivos (Familia SIS):

* `SIS-02 / EPI-10 PRO` y `EMER`: Registro diario de morbilidad en consulta general y emergencia (Nivel transaccional base).
* `SIS-02 / EPI-13`: Registro diario de Enfermedades de Notificación Obligatoria (E.N.O.).
* `SIS-03 / EPI-11`: Tabulador diario de morbilidad por aparatos y sistemas.
* `SIS-04 / EPI-12`: Registro consolidado semanal de E.N.O. (Dispara alertas epidémicas).
* `SIS-04 / EPI-14`: Registro semanal de mortalidad por E.N.O.
* `SIS-04 / EPI-15`: Consolidado mensual de morbilidad registrada por aparatos y sistemas.

**2. Dirección General de Programas de Salud**

* **Función:** Control de patologías específicas y seguimiento de pacientes. Todos los programas subordinados a esta dirección centralizan sus métricas a través del **formato maestro DSP-04 (Registro de Atención Integral en Salud)**.

* **Coordinaciones y Componentes (Sub-divisiones del DSP-04):**
* **Proyecto Madre (Salud Familiar):** Programa de Niños, Niñas y Adolescentes, Lactancia Materna, Salud Sexual y Reproductiva (SSR). Miden control prenatal, planificación familiar, patologías del embarazo y evaluación nutricional.
* **Proyecto CAREMT:** Salud Cardiovascular, Renal, Endocrino-Metabólica (Diabetes), Oncología y Control de Consumo de Tabaco. Miden clubes de hipertensos, despistajes, complicaciones agudas/crónicas (nefropatías, cardiopatías) y diálisis.
* **Proyecto Salud Segura:** Componentes de VIH/SIDA, Infecciones de Transmisión Sexual (Sífilis, Gonorrea, VPH), Salud Respiratoria (Tuberculosis) y Asma. Adicionalmente, incluye el Programa Sangre Segura (Banco de sangre).
* **Proyecto Vida Plena:** Salud Mental, Prevención de Accidentes y Hechos Violentos (violencia doméstica, accidentes de tránsito, heridas por armas), y Programa de Atención para Personas con Discapacidad (PASDIS).
* **Programa de Salud Bucal:** Odontología curativa y preventiva, endodoncia, periodoncia y cirugía bucal.
* **Programa Ampliado de Inmunizaciones (PAI):** Aunque pertenece a la Salud Colectiva, posee formatos independientes al DSP-04. Utilizan los registros `PNV-01` y `PNV-02`, libros foliados de vacunación y tarjetas de vacunación para monitorear biológicos aplicados (BCG, Pentavalente, Toxoide, etc.).

**3. Dirección General de Salud Ambiental**

* **Función:** Control de vectores y patógenos ambientales.
* **Programas Asociados:** Malariología, Zoonosis (Rabia, Leptospirosis, Brucelosis, Encefalitis Equina), Control de Dengue, Leishmaniasis y Oncocercosis.
* **Formatos:** Alimentan módulos específicos del DSP-04 con métricas de personas mordidas por animales, administración de suero antirrábico, focos detectados y control de criaderos.

### II. VICEMINISTERIO DE RECURSOS, TECNOLOGÍA Y REGULACIÓN

Esta instancia **no administra estadísticas de morbilidad o clínicas**. Sus procesos y formatos son estrictamente logísticos, administrativos y legales.

**1. SEFAR (Servicio de Elaboraciones Farmacéuticas)**

* **Función:** Procura, almacenamiento y distribución de medicamentos e insumos médicos a la red hospitalaria y ambulatoria.
* **Formatos:** Manejan inventarios generales de almacén, órdenes de distribución, control de stock y fechas de vencimiento.

**2. SACS (Servicio Autónomo de Contraloría Sanitaria)**

* **Función:** Regulación, emisión de permisos y fiscalización.
* **Sistemas y Formatos:** No usan el SIS. Utilizan bases de datos administrativas como el SIACVISA (Sistema de Información Automatizado de Control y Vigilancia Sanitaria), SIVERCOS (Cosméticos) y plataformas para la emisión de Certificados de Libre Venta (CLV) y registros sanitarios de alimentos/medicamentos.

### III. VICEMINISTERIO DE REDES DE ATENCIÓN AMBULATORIA / HOSPITALES / SALUD INTEGRAL

Estos viceministerios operan la infraestructura física y el talento humano. Son "nodos de consumo" de la estadística generada por Salud Colectiva.

* **Direcciones de Redes (Comunal y Especializada):** Supervisan la operatividad de los ASIC, Consultorios Populares (CPT), Ambulatorios, CDI y SRI. Consumen los indicadores de cumplimiento de metas y cobertura poblacional de la Ficha Familiar (`SIS-01/FF`).
* **Direcciones de Hospitales:** Gestión de camas, emergencias, cirugías (Plan Quirúrgico Nacional) e infraestructura hospitalaria.
* **Oficina de Gestión Humana (RRHH):** Adscrita usualmente a niveles centrales/superiores, procesa la nómina, registros de ausentismo, suplencias y control de personal del Sistema Público Nacional de Salud (SPNS).

### SÍNTESIS DE ASIGNACIÓN PARA EL DESARROLLO DEL DASHBOARD

1. **Bloque Analítico Clínico (Epidemiología y DSP):** Renderizará curvas epidémicas, canales endémicos y gráficos poblacionales basados en las series `EPI-10 al EPI-15` y el `DSP-04`.
2. **Bloque Operativo (Redes y RRHH):** Renderizará mapas geográficos (GIS) de CPTs activos, índice de asistencia médica y disponibilidad de camas.
3. **Bloque Logístico y Legal (SEFAR y SACS):** Renderizará tableros *Kanban* de despachos, progreso de importaciones, alertas de stock en rojo, e inspecciones de establecimientos comerciales pendientes o clausurados.
