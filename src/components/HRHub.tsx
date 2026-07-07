import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, UserX, UserCheck, Clock, FileText, CheckCircle2, Search, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function HRHub() {
  const { user } = useAppContext();
  const [currentMonth] = useState('Julio 2026');

  // Dummy calendar data
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Offset to start properly
    if (day <= 0 || day > 31) return null;
    return day;
  });

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-4 md:p-6 ">
      
      {/* Header RRHH */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Users className="text-amber-600" size={28} strokeWidth={2.5} />
            RRHH - Talento Humano
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium tracking-wide uppercase">
            Control de Nómina, Guardias y Ausentismo
          </p>
        </div>
        
        {/* Top Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex items-center gap-2 px-3 py-1.5 border-r border-slate-200 dark:border-slate-800">
             <CalendarIcon size={14} className="text-slate-400" />
             <select className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none uppercase cursor-pointer">
               <option>Hospital Central</option>
               <option>Hospital Materno Infantil</option>
               <option>Todos los ASIC</option>
             </select>
           </div>
           <button className="bg-amber-600 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-amber-700 transition-colors ml-1">
             Programar Guardia
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden pb-4">
        
        {/* Main Grid Calendar (Flexible width) */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm overflow-hidden">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 flex-shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center border border-amber-100 dark:border-amber-800/50">
                 <CalendarIcon className="text-amber-600 dark:text-amber-500" size={20} />
               </div>
               <div>
                 <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight leading-none">Roles de Guardia</h2>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Personal Médico y Enfermería</p>
               </div>
             </div>
             
             <div className="text-sm font-black bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 uppercase tracking-widest shadow-sm">
               {currentMonth}
             </div>
           </div>
           
           {/* Grid Calendar Container */}
           <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[400px]">
             <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
               {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                 <div key={day} className="bg-slate-100 dark:bg-slate-900/80 p-3 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                   {day}
                 </div>
               ))}
               
               {calendarDays.map((day, idx) => (
                 <div key={idx} className={`min-h-[100px] bg-white dark:bg-slate-950 p-2 md:p-3 transition-colors ${day ? 'hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer' : ''}`}>
                   {day && (
                     <>
                       <span className={`text-xs font-black mb-2 flex items-center justify-center w-6 h-6 rounded-full ${day === 7 ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                         {day}
                       </span>
                       <div className="space-y-1.5">
                         {/* Simulating shifts for some days */}
                         {day % 5 === 0 && <ShiftBadge color="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" label="Dr. Silva (UCI)" />}
                         {day % 7 === 0 && <ShiftBadge color="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800" label="Dra. Rojas (Emerg)" />}
                         {day === 7 && <ShiftBadge color="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800" label="Dr. Gómez (Trauma)" />}
                       </div>
                     </>
                   )}
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Right Sidebar - Absences & Quick Actions (Fixed width) */}
        <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest text-xs flex items-center gap-2 mb-5">
               <CheckCircle2 size={14} className="text-emerald-500" /> Aprobaciones
             </h3>
             
             <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 text-left transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={18}/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase">Vacaciones</p>
                    <p className="text-[10px] text-slate-500 font-medium">5 solicitudes pendientes</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 text-left transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <UserCheck size={18}/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase">Suplencias</p>
                    <p className="text-[10px] text-slate-500 font-medium">Asignar reemplazos</p>
                  </div>
                </button>
             </div>
          </div>

          {/* Absence Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
             <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest text-xs flex items-center gap-2 mb-5">
               <UserX size={14} className="text-rose-500" /> Reposos Médicos
             </h3>
             <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                <AbsenceCard name="Dra. María Antonieta" role="Pediatra - Hospital Central" status="Pre-Natal" days="12 días" avatar="MA" color="bg-rose-500" />
                <AbsenceCard name="Lic. Carlos Luis" role="Enfermero Jefe - ASIC Corazón" status="Reposo Médico" days="3 días" avatar="CL" color="bg-amber-500" />
                <AbsenceCard name="Dr. José Antonio" role="Cirujano - HGO" status="Vacaciones" days="5 días" avatar="JA" color="bg-blue-500" />
                <AbsenceCard name="Dra. Elena Rojas" role="Anestesióloga" status="Congreso" days="2 días" avatar="ER" color="bg-purple-500" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ShiftBadge({ color, label }: { color: string, label: string }) {
  return (
    <div className={`text-[9px] md:text-[10px] font-bold px-1.5 py-1 rounded border truncate ${color}`}>
      {label}
    </div>
  );
}

function AbsenceCard({ name, role, status, days, avatar, color }: { name: string, role: string, status: string, days: string, avatar: string, color: string }) {
  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-black text-white flex-shrink-0 text-sm shadow-sm group-hover:scale-105 transition-transform`}>
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{name}</p>
        <p className="text-[10px] text-slate-500 font-medium truncate mb-1.5">{role}</p>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
          <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            {status}
          </span>
          <span className="text-slate-400 flex items-center gap-0.5"><Clock size={10} /> {days}</span>
        </div>
      </div>
    </div>
  );
}
