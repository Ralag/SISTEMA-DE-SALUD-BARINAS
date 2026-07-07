# ARQUITECTURA DE DASHBOARDS Y MÓDULOS POR COORDINACIÓN

De acuerdo a las directrices de diseño asimétrico y la topología del MPPS, cada coordinación cuenta con un Dashboard de Inicio (Home) con diseño exclusivo y un conjunto de módulos funcionales (DataEntry y Visualizadores) asignados.

## 1. EPIDEMIOLOGÍA REGIONAL (La Sala de Guerra)
**Naturaleza:** Análisis estadístico puro y respuesta a brotes epidémicos.
- **Dashboard de Inicio:**
  - Componente Principal: Gráfico de "Canal Endémico" (series de tiempo de 52 semanas) y/o Mapa de Calor Espacial (GIS).
  - Componente Lateral: Radar E.N.O. (Enfermedades de Notificación Obligatoria) con alertas parpadeantes en rojo para brotes.
  - Filtros: Temporales hiper-detallados (Semana Epidemiológica, Año, ASIC).
  - *Restricción:* Cero tablas administrativas en el inicio.
- **Módulos Asignados:**
  - `Registro E.N.O. (EPI-12 / EPI-13)`: Módulo de alerta temprana y carga de casos sospechosos/confirmados.
  - `Analítica Espacial`: Visualización de casos geolocalizados para establecer cercos epidemiológicos.

## 2. CEIS - ESTADÍSTICA E INFORMACIÓN EN SALUD (DHIS2)
**Naturaleza:** Consolidación de datos de morbilidad general y calidad del dato.
- **Dashboard de Inicio:**
  - Componente Principal: Panel de estado de consolidación (ASICs que han reportado vs faltantes).
  - Componente Lateral: Reloj de "Semana Epidemiológica Actual" y bandeja de "Tareas de Auditoría".
- **Módulos Asignados:**
  - `Visualizador DHIS2`: Tablas dinámicas y gráficos para análisis de morbilidad por filtros múltiples (orgUnit, periods, dx).
  - `Carga de Datos SIS`: Formularios tabulares para transcripción de EPI-10 (Morbilidad General) y DSP-04 (Programas).
  - `Gestión de Reportes (EPI-15)`: Emisor de boletines y consolidados mensuales.

## 3. REDES DE ATENCIÓN PÚBLICA (Infraestructura y Operatividad)
**Naturaleza:** Monitoreo técnico de la red ambulatoria y hospitalaria.
- **Dashboard de Inicio:**
  - Componente Principal: Panel estilo "Server Uptime" con grillas de estado de CPTs (Verde: Abierto, Rojo: Cerrado por fallas).
  - Rastreadores: Monitoreo de camas UCI disponibles y estatus de ambulancias.
- **Módulos Asignados:**
  - `Reporte de Operatividad`: Registro diario de estado de servicios básicos (agua, luz) e insumos de emergencia.
  - `Gestión de Camas (Hospitales)`: Censo de ocupación hospitalaria y emergencias.

## 4. INMUNIZACIÓN (PAI - Programa Ampliado de Inmunizaciones)
**Naturaleza:** Cobertura de vacunación y logística de cadena de frío.
- **Dashboard de Inicio:**
  - Componente Principal: Gráficos de anillo y medidores de progreso mostrando cumplimiento de metas (mensual vs anual) por biológico (Ej. BCG, Pentavalente).
  - Componente Lateral: Alertas críticas de Cadena de Frío e Inventario de biológicos.
- **Módulos Asignados:**
  - `Registro PNV-01 / PNV-02`: Formulario de dosis aplicadas por edad y tipo de biológico.
  - `Monitor de Cadena de Frío`: Registro de temperatura de equipos de refrigeración.

## 5. PROGRAMAS DE SALUD (CAREMT, Madre, Salud Segura, Vida Plena)
**Naturaleza:** Seguimiento de pacientes crónicos, promoción y prevención.
- **Dashboard de Inicio:**
  - Componente Principal: Pirámide poblacional de pacientes en control y gráficos de adherencia a tratamientos.
  - Componente Lateral: Metas trimestrales de despistaje y captación de pacientes.
- **Módulos Asignados:**
  - `Carga DSP-04`: Módulo específico de atención integral según las variables del programa (ej. diabéticos compensados, control prenatal).
  - `Control de Cohortes`: Listado de pacientes crónicos y recordatorios de consultas periódicas.

## 6. SEFAR - LOGÍSTICA Y FARMACIA (El Almacén)
**Naturaleza:** Cadena de suministro, despachos y fechas de caducidad.
- **Dashboard de Inicio:**
  - Componente Principal: Tablero estilo Kanban (Solicitudes, En Preparación, Despachado, Entregado).
  - Componente Secundario: Barras horizontales de "Índice de Rotación" y alertas de stock en rojo.
  - Timeline: Visor visual de lotes a 30, 60 y 90 días de caducidad.
- **Módulos Asignados:**
  - `Control de Inventario`: Kardex de entradas, salidas y ajustes de inventario.
  - `Órdenes de Despacho`: Aprobación y seguimiento de envíos a los ASIC y Hospitales.

## 7. SACS - CONTRALORÍA SANITARIA (Los Inspectores)
**Naturaleza:** Legal, emisión de permisos, fiscalización comercial.
- **Dashboard de Inicio:**
  - Componente Principal: Flujo de Aprobación (Workflows) de comercios inspeccionados (Botones para Aprobar o Clausurar).
  - Componente Lateral: Checklists visuales de avance de inspecciones.
  - Mapa: Mapa urbano con pines (comercios solventes vs clausurados).
- **Módulos Asignados:**
  - `Actas de Inspección`: Formulario de levantamiento de irregularidades en establecimientos.
  - `Emisión de Permisos`: Generación de Certificados de Libre Venta (CLV) y Permisos Sanitarios.

## 8. RRHH - TALENTO HUMANO (El Reloj de Personal)
**Naturaleza:** Gestión de personal, guardias, ausentismo y nómina.
- **Dashboard de Inicio:**
  - Componente Principal: Grid Calendar interactivo visualizando quién está de guardia por hospital/ASIC.
  - Panel de Ausentismo: Tarjetas estilo directorio con fotos del personal de reposo, permisos o vacaciones.
- **Módulos Asignados:**
  - `Planificador de Turnos`: Asignación de guardias (24h/12h).
  - `Registro de Incidencias`: Carga de reposos médicos, faltas injustificadas y suplencias.

## 9. DESPACHO / AUTORIDAD ÚNICA (Espectador Maestro)
**Naturaleza:** Supervisión gerencial y toma de decisiones.
- **Dashboard de Inicio:**
  - Componente Principal: Consolidado de indicadores clave (KPIs) de todas las coordinaciones (Morbilidad general, Alertas E.N.O., Operatividad de Redes, Stock Crítico).
- **Módulos Asignados:**
  - Al ser un rol "Maestro", no ingresa datos transaccionales, pero posee accesos de visualización cruzada (drill-down) a los visualizadores de todas las demás áreas.
