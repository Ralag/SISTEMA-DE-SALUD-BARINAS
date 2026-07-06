import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CIE_10_DATABASE, Cie10Entry } from '../data/cie10';
import { Search } from 'lucide-react';

interface Cie10AutocompleteProps {
  value: string; // The code
  onChange: (code: string) => void;
  className?: string;
}

export default function Cie10Autocomplete({ value, onChange, className = '' }: Cie10AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedEntry = useMemo(() => CIE_10_DATABASE.find(c => c.code === value), [value]);

  // Sync internal search with external value when it changes, but only if not actively searching
  useEffect(() => {
    if (!isOpen) {
      if (selectedEntry) {
        setSearchTerm(`[${selectedEntry.code}] ${selectedEntry.description}`);
      } else {
        setSearchTerm('');
      }
    }
  }, [value, selectedEntry, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to current valid value on blur
        if (selectedEntry) {
          setSearchTerm(`[${selectedEntry.code}] ${selectedEntry.description}`);
        } else {
          setSearchTerm('');
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEntry]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm || (selectedEntry && searchTerm === `[${selectedEntry.code}] ${selectedEntry.description}`)) {
      return CIE_10_DATABASE.slice(0, 50); // Show top 50 when empty
    }
    const lowerSearch = searchTerm.toLowerCase();
    return CIE_10_DATABASE.filter(c => 
      c.code.toLowerCase().includes(lowerSearch) || 
      c.description.toLowerCase().includes(lowerSearch)
    ).slice(0, 50);
  }, [searchTerm, selectedEntry]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full h-full ${className}`} ref={wrapperRef}>
      <div className="relative w-full h-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            // If they clear it, reset the value
            if (e.target.value === '') onChange('');
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar código o enfermedad..."
          className="w-full h-full px-2 py-2 text-[11px] outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 text-slate-700 dark:text-slate-200"
        />
        {!searchTerm && (
          <Search size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 pointer-events-none" />
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 top-full mt-1 w-[300px] max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-[11px] text-slate-500 dark:text-slate-400 text-center">No se encontraron resultados.</div>
          ) : (
            filteredOptions.map((cie) => (
              <button
                key={cie.code}
                type="button"
                className="w-full text-left px-3 py-2 text-[11px] hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20 outline-none transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                onClick={() => handleSelect(cie.code)}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-1">[{cie.code}]</span>
                <span className="text-slate-700 dark:text-slate-300">{cie.description}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
