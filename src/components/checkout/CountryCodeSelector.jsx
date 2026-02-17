import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

const COUNTRY_CODES = [
    // América
    { code: '+57', country: 'Colombia', flag: '🇨🇴', iso: 'CO' },
    { code: '+1', country: 'Estados Unidos', flag: '🇺🇸', iso: 'US' },
    { code: '+1', country: 'Canadá', flag: '🇨🇦', iso: 'CA' },
    { code: '+52', country: 'México', flag: '🇲🇽', iso: 'MX' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷', iso: 'AR' },
    { code: '+55', country: 'Brasil', flag: '🇧🇷', iso: 'BR' },
    { code: '+56', country: 'Chile', flag: '🇨🇱', iso: 'CL' },
    { code: '+51', country: 'Perú', flag: '🇵🇪', iso: 'PE' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨', iso: 'EC' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪', iso: 'VE' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴', iso: 'BO' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾', iso: 'PY' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾', iso: 'UY' },
    { code: '+507', country: 'Panamá', flag: '🇵🇦', iso: 'PA' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷', iso: 'CR' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹', iso: 'GT' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻', iso: 'SV' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳', iso: 'HN' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮', iso: 'NI' },
    { code: '+1', country: 'Puerto Rico', flag: '🇵🇷', iso: 'PR' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺', iso: 'CU' },
    { code: '+1', country: 'Rep. Dominicana', flag: '🇩🇴', iso: 'DO' },
    { code: '+509', country: 'Haití', flag: '🇭🇹', iso: 'HT' },
    { code: '+1', country: 'Jamaica', flag: '🇯🇲', iso: 'JM' },
    { code: '+1', country: 'Trinidad y Tobago', flag: '🇹🇹', iso: 'TT' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾', iso: 'GY' },
    { code: '+597', country: 'Surinam', flag: '🇸🇷', iso: 'SR' },
    // Europa
    { code: '+34', country: 'España', flag: '🇪🇸', iso: 'ES' },
    { code: '+44', country: 'Reino Unido', flag: '🇬🇧', iso: 'GB' },
    { code: '+33', country: 'Francia', flag: '🇫🇷', iso: 'FR' },
    { code: '+49', country: 'Alemania', flag: '🇩🇪', iso: 'DE' },
    { code: '+39', country: 'Italia', flag: '🇮🇹', iso: 'IT' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹', iso: 'PT' },
    { code: '+31', country: 'Países Bajos', flag: '🇳🇱', iso: 'NL' },
    { code: '+32', country: 'Bélgica', flag: '🇧🇪', iso: 'BE' },
    { code: '+41', country: 'Suiza', flag: '🇨🇭', iso: 'CH' },
    { code: '+43', country: 'Austria', flag: '🇦🇹', iso: 'AT' },
    { code: '+45', country: 'Dinamarca', flag: '🇩🇰', iso: 'DK' },
    { code: '+46', country: 'Suecia', flag: '🇸🇪', iso: 'SE' },
    { code: '+47', country: 'Noruega', flag: '🇳🇴', iso: 'NO' },
    { code: '+358', country: 'Finlandia', flag: '🇫🇮', iso: 'FI' },
    { code: '+48', country: 'Polonia', flag: '🇵🇱', iso: 'PL' },
    { code: '+420', country: 'República Checa', flag: '🇨🇿', iso: 'CZ' },
    { code: '+36', country: 'Hungría', flag: '🇭🇺', iso: 'HU' },
    { code: '+40', country: 'Rumanía', flag: '🇷🇴', iso: 'RO' },
    { code: '+380', country: 'Ucrania', flag: '🇺🇦', iso: 'UA' },
    { code: '+7', country: 'Rusia', flag: '🇷🇺', iso: 'RU' },
    { code: '+30', country: 'Grecia', flag: '🇬🇷', iso: 'GR' },
    // Asia
    { code: '+86', country: 'China', flag: '🇨🇳', iso: 'CN' },
    { code: '+81', country: 'Japón', flag: '🇯🇵', iso: 'JP' },
    { code: '+82', country: 'Corea del Sur', flag: '🇰🇷', iso: 'KR' },
    { code: '+91', country: 'India', flag: '🇮🇳', iso: 'IN' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩', iso: 'ID' },
    { code: '+60', country: 'Malasia', flag: '🇲🇾', iso: 'MY' },
    { code: '+63', country: 'Filipinas', flag: '🇵🇭', iso: 'PH' },
    { code: '+66', country: 'Tailandia', flag: '🇹🇭', iso: 'TH' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳', iso: 'VN' },
    { code: '+65', country: 'Singapur', flag: '🇸🇬', iso: 'SG' },
    { code: '+971', country: 'Emiratos Árabes', flag: '🇦🇪', iso: 'AE' },
    { code: '+966', country: 'Arabia Saudita', flag: '🇸🇦', iso: 'SA' },
    { code: '+972', country: 'Israel', flag: '🇮🇱', iso: 'IL' },
    { code: '+90', country: 'Turquía', flag: '🇹🇷', iso: 'TR' },
    // Oceanía
    { code: '+61', country: 'Australia', flag: '🇦🇺', iso: 'AU' },
    { code: '+64', country: 'Nueva Zelanda', flag: '🇳🇿', iso: 'NZ' },
    // África
    { code: '+27', country: 'Sudáfrica', flag: '🇿🇦', iso: 'ZA' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬', iso: 'NG' },
    { code: '+20', country: 'Egipto', flag: '🇪🇬', iso: 'EG' },
    { code: '+212', country: 'Marruecos', flag: '🇲🇦', iso: 'MA' },
    { code: '+254', country: 'Kenia', flag: '🇰🇪', iso: 'KE' },
];

export default function CountryCodeSelector({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);

    const selectedCountry = COUNTRY_CODES.find(c => c.code === value && (value !== '+1' || c.iso === 'CO')) || COUNTRY_CODES[0];

    const filteredCountries = COUNTRY_CODES.filter(c =>
        c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.includes(searchTerm)
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <style>{`
                .ccs-btn:hover { border-color: rgba(0,229,160,0.4) !important; background: rgba(0,229,160,0.06) !important; }
                .ccs-btn.open { border-color: #00e5a0 !important; background: rgba(0,229,160,0.08) !important; }
                .ccs-option:hover { background: rgba(0,229,160,0.08) !important; }
                .ccs-option.selected { background: rgba(0,229,160,0.1) !important; }
                .ccs-search:focus { border-color: rgba(0,229,160,0.4) !important; }
                .ccs-list::-webkit-scrollbar { width: 4px; }
                .ccs-list::-webkit-scrollbar-track { background: transparent; }
                .ccs-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
            `}</style>

            <div ref={wrapperRef} style={{ position: 'relative', flexShrink: 0 }}>
                {/* Trigger button */}
                <button
                    type="button"
                    className={`ccs-btn ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '0 12px', height: '48px', minWidth: '120px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px', cursor: 'pointer',
                        transition: 'all 0.2s', color: '#fff',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                >
                    <span style={{ fontSize: '20px', lineHeight: 1 }}>{selectedCountry.flag}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.3px' }}>
                        {selectedCountry.code}
                    </span>
                    <ChevronDown
                        size={14}
                        style={{
                            color: 'rgba(255,255,255,0.4)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                        }}
                    />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                        width: '300px', maxHeight: '340px',
                        background: '#0d1117',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                        zIndex: 999, overflow: 'hidden',
                        display: 'flex', flexDirection: 'column',
                    }}>
                        {/* Search */}
                        <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={14} style={{
                                    position: 'absolute', left: '10px',
                                    top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.3)',
                                }} />
                                <input
                                    className="ccs-search"
                                    type="text"
                                    placeholder="Buscar país o código..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    autoFocus
                                    style={{
                                        width: '100%', padding: '8px 10px 8px 30px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1.5px solid rgba(255,255,255,0.08)',
                                        borderRadius: '10px', color: '#fff',
                                        fontSize: '13px', outline: 'none',
                                        fontFamily: "'DM Sans', system-ui, sans-serif",
                                        transition: 'border-color 0.2s',
                                    }}
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="ccs-list" style={{ overflowY: 'auto', flex: 1 }}>
                            {filteredCountries.length === 0 ? (
                                <div style={{
                                    padding: '24px', textAlign: 'center',
                                    color: 'rgba(255,255,255,0.25)', fontSize: '13px',
                                }}>
                                    No se encontraron países
                                </div>
                            ) : filteredCountries.map((country, idx) => (
                                <button
                                    key={`${country.iso}-${idx}`}
                                    type="button"
                                    className={`ccs-option ${country.code === value && country.iso === selectedCountry.iso ? 'selected' : ''}`}
                                    onClick={() => {
                                        onChange(country.code);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center',
                                        gap: '10px', padding: '10px 14px',
                                        background: 'none', border: 'none',
                                        cursor: 'pointer', transition: 'background 0.15s',
                                        textAlign: 'left', color: '#fff',
                                        fontFamily: "'DM Sans', system-ui, sans-serif",
                                    }}
                                >
                                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{country.flag}</span>
                                    <span style={{ flex: 1, fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                                        {country.country}
                                    </span>
                                    <span style={{
                                        fontSize: '12px', fontWeight: 600,
                                        color: 'rgba(255,255,255,0.35)',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '2px 7px', borderRadius: '6px',
                                    }}>
                                        {country.code}
                                    </span>
                                    {country.code === value && country.iso === selectedCountry.iso && (
                                        <Check size={14} style={{ color: '#00e5a0', flexShrink: 0 }} />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer count */}
                        <div style={{
                            padding: '8px 14px',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            fontSize: '11px', color: 'rgba(255,255,255,0.2)',
                            textAlign: 'center',
                        }}>
                            {filteredCountries.length} países disponibles
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
