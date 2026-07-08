#!/bin/bash

# Update EpidemiologyHub
sed -i 's/{config.modules.epidemiology?.name || '\''Sala de Guerra - Epidemiología'\''}/{config.modules.epidemiology?.appTitle || config.modules.epidemiology?.name || '\''Sala de Guerra - Epidemiología'\''}/g' src/components/EpidemiologyHub.tsx
sed -i 's/Vigilancia Activa Regional • MPPS Barinas/{config.modules.epidemiology?.welcomeMessage || '\''Vigilancia Activa Regional • MPPS Barinas'\''}/g' src/components/EpidemiologyHub.tsx

# Update StatisticsHub
sed -i 's/CEIS - Estadística e Información/{config.modules.stats?.appTitle || config.modules.stats?.name || '\''CEIS - Estadística e Información'\''}/g' src/components/StatisticsHub.tsx
sed -i 's/{isRegional ? '\''Sistema Integrado de Análisis de Datos (Nivel Regional)'\'' : `Panel de Control ASIC: ${userAsic}`}/{config.modules.stats?.welcomeMessage || (isRegional ? '\''Sistema Integrado de Análisis de Datos (Nivel Regional)'\'' : `Panel de Control ASIC: ${userAsic}`)}/g' src/components/StatisticsHub.tsx

# Update ImmunizationHub
sed -i 's/<Syringe className="text-indigo-500" \/> Inmunización (PAI)/<Syringe className="text-indigo-500" \/> {config?.modules?.immunization?.appTitle || '\''Inmunización (PAI)'\''}/g' src/components/ImmunizationHub.tsx
sed -i 's/Programa Ampliado de Inmunizaciones y Cadena de Frío/{config?.modules?.immunization?.welcomeMessage || '\''Programa Ampliado de Inmunizaciones y Cadena de Frío'\''}/g' src/components/ImmunizationHub.tsx

# Update LogisticsHub
sed -i 's/SEFAR - Logística y Farmacia/{config?.modules?.logistics?.appTitle || config?.modules?.logistics?.name || '\''SEFAR - Logística y Farmacia'\''}/g' src/components/LogisticsHub.tsx
sed -i 's/Control de inventario, despacho y caducidad de medicamentos/{config?.modules?.logistics?.welcomeMessage || '\''Control de inventario, despacho y caducidad de medicamentos'\''}/g' src/components/LogisticsHub.tsx

# Update HRHub
sed -i 's/Talento Humano (RRHH)/{config?.modules?.hr?.appTitle || config?.modules?.hr?.name || '\''Talento Humano (RRHH)'\''}/g' src/components/HRHub.tsx
sed -i 's/Gestión de guardias, ausentismo y nómina/{config?.modules?.hr?.welcomeMessage || '\''Gestión de guardias, ausentismo y nómina'\''}/g' src/components/HRHub.tsx

# Update SACSHub
sed -i 's/Contraloría Sanitaria (SACS)/{config?.modules?.sacs?.appTitle || config?.modules?.sacs?.name || '\''Contraloría Sanitaria (SACS)'\''}/g' src/components/SACSHub.tsx
sed -i 's/Inspecciones, permisos y multas a establecimientos/{config?.modules?.sacs?.welcomeMessage || '\''Inspecciones, permisos y multas a establecimientos'\''}/g' src/components/SACSHub.tsx

# Update NetworksHub
sed -i 's/Redes de Atención Pública/{config?.modules?.networks?.appTitle || config?.modules?.networks?.name || '\''Redes de Atención Pública'\''}/g' src/components/NetworksHub.tsx
sed -i 's/Monitoreo de operatividad de la red hospitalaria y ambulatoria/{config?.modules?.networks?.welcomeMessage || '\''Monitoreo de operatividad de la red hospitalaria y ambulatoria'\''}/g' src/components/NetworksHub.tsx

# Update ProgramsHub
sed -i 's/Programas de Salud/{config?.modules?.programs?.appTitle || config?.modules?.programs?.name || '\''Programas de Salud'\''}/g' src/components/ProgramsHub.tsx
sed -i 's/Seguimiento de cohortes y cumplimiento de metas trimestrales/{config?.modules?.programs?.welcomeMessage || '\''Seguimiento de cohortes y cumplimiento de metas trimestrales'\''}/g' src/components/ProgramsHub.tsx

