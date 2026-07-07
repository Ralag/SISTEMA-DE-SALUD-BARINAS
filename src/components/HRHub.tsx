import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, UserX, UserCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function HRHub() {
  const [currentMonth] = useState('Julio 2026');

  // Dummy calendar data
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Offset to start properly
    if (day <= 0 || day > 31) return null;
    return day;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight">Recursos Humanos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Control de Nómina, Guardias Médicas y Asistencia</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
             Generar Nómina
           </button>
           <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
             <CalendarIcon size={16} /> Programar Guardia
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Grid Calendar (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
               <CalendarIcon className="text-amber-500" size={20} />
               <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Roles de Guardia Hospitalaria</h2>
             </div>
             <div className="text-sm font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-lg">
               {currentMonth}
             </div>
           </div>
           
           <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
             {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
               <div key={day} className="bg-slate-50 dark:bg-slate-900 p-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                 {day}
               </div>
             ))}
             
             {calendarDays.map((day, idx) => (
               <div key={idx} className={`min-h-[80px] bg-white dark:bg-slate-950 p-1 md:p-2 ${day ? 'hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer' : ''}`}>
                 {day && (
                   <>
                     <span className={`text-xs font-bold mb-1 block ${day === 7 ? 'text-amber-600' : 'text-slate-600 dark:text-slate-400'}`}>
                       {day}
                     </span>
                     {/* Simulating shifts for some days */}
                     {day % 5 === 0 && <ShiftBadge color="bg-blue-100 text-blue-700" label="Dr. Silva" />}
                     {day % 7 === 0 && <ShiftBadge color="bg-emerald-100 text-emerald-700" label="Dra. Rojas" />}
                     {day === 7 && <ShiftBadge color="bg-amber-100 text-amber-700" label="Dr. Gómez" />}
                   </>
                 )}
               </div>
             ))}
           </div>
        </div>

        {/* Right Sidebar - Absences & Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
               <CheckCircle2 className="text-emerald-500" size={18} />
               <h3 className="font-bold text-sm">Acciones Rápidas</h3>
             </div>
             
             <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-left transition-colors group">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-slate-500 group-hover:text-emerald-600 transition-colors"><CheckCircle2 size={16}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Aprobar Vacaciones</p>
                    <p className="text-[10px] text-slate-500">5 solicitudes pendientes</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-left transition-colors group">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-slate-500 group-hover:text-amber-600 transition-colors"><UserCheck size={16}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Registrar Suplencia</p>
                    <p className="text-[10px] text-slate-500">Asignar personal de reemplazo</p>
                  </div>
                </button>
             </div>
          </div>

          {/* Absence Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
               <UserX className="text-rose-500" size={18} />
               <h3 className="font-bold text-sm">Reposos y Ausencias</h3>
             </div>

             <div className="space-y-3">
                <AbsenceCard name="Dra. María Antonieta" role="Pediatra - Hospital Central" status="Reposo Pre-Natal" days="12 días restantes" avatar="MA" />
                <AbsenceCard name="Lic. Carlos Luis" role="Enfermero Jefe - ASIC Corazón" status="Reposo Médico" days="3 días restantes" avatar="CL" />
                <AbsenceCard name="Dr. José Antonio" role="Cirujano" status="Vacaciones" days="5 días restantes" avatar="JA" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ShiftBadge({ color, label }: { color: string, label: string }) {
  return (
    <div className={`text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded truncate mb-1 border border-white/20 dark:border-slate-800 ${color}`}>
      {label}
    </div>
  );
}

function AbsenceCard({ name, role, status, days, avatar }: any) {
  return (
    <div className="flex items-start gap-3 p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 flex-shrink-0 text-sm">
        {avatar}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">{name}</p>
        <p className="text-[10px] text-slate-500 mb-1">{role}</p>
        <div className="flex items-center gap-2 text-[10px] font-medium">
          <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 px-1.5 py-0.5 rounded uppercase">{status}</span>
          <span className="text-slate-400 flex items-center gap-0.5"><Clock size={10} /> {days}</span>
        </div>
      </div>
    </div>
  );
}
