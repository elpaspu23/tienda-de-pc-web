import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';


// Lista parcial de códigos de país (los más comunes)
const COUNTRY_CODES = [
    { code: '+57', country: 'Colombia', flag: '🇨🇴', iso: 'CO' },
    { code: '+1', country: 'Estados Unidos', flag: '🇺🇸', iso: 'US' },
    { code: '+52', country: 'México', flag: '🇲🇽', iso: 'MX' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷', iso: 'AR' },
    { code: '+55', country: 'Brasil', flag: '🇧🇷', iso: 'BR' },
    { code: '+56', country: 'Chile', flag: '🇨🇱', iso: 'CL' },
    { code: '+51', country: 'Perú', flag: '🇵🇪', iso: 'PE' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨', iso: 'EC' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪', iso: 'VE' },
    { code: '+34', country: 'España', flag: '🇪🇸', iso: 'ES' },
    { code: '+44', country: 'Reino Unido', flag: '🇬🇧', iso: 'GB' },
    { code: '+33', country: 'Francia', flag: '🇫🇷', iso: 'FR' },
    { code: '+49', country: 'Alemania', flag: '🇩🇪', iso: 'DE' },
    { code: '+39', country: 'Italia', flag: '🇮🇹', iso: 'IT' },
    { code: '+1', country: 'Canadá', flag: '🇨🇦', iso: 'CA' },
    { code: '+507', country: 'Panamá', flag: '🇵🇦', iso: 'PA' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷', iso: 'CR' },
];

export default function CountryCodeSelector({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);

    const selectedCountry = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];

    const filteredCountries = COUNTRY_CODES.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm)
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="country-selector-wrapper" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`country-selector-btn ${isOpen ? 'active' : ''}`}
            >
                <span className="country-flag">{selectedCountry.flag}</span>
                <span className="country-code">{selectedCountry.code}</span>
                <ChevronDown size={14} className={`country-chevron ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="country-dropdown">
                    <div className="country-search">
                        <Search size={14} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar país..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="search-input"
                        />
                    </div>
                    <div className="country-list">
                        {filteredCountries.map((country, index) => (
                            <button
                                key={`${country.iso}-${index}`}
                                type="button"
                                className={`country-option ${country.code === value ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(country.code);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                            >
                                <span className="option-flag">{country.flag}</span>
                                <span className="option-name">{country.country}</span>
                                <span className="option-code">{country.code}</span>
                                {country.code === value && <Check size={14} className="option-check" />}
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="no-results">No se encontraron países</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
