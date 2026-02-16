import { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <Breadcrumbs items={[{ label: 'Inicio', path: '/' }, { label: 'Contacto' }]} />
      <section className="contact-hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contactanos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ¿Tenés alguna consulta? Estamos para ayudarte.
        </motion.p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Información de Contacto</h2>
            <div className="contact-details">
              <div className="contact-item">
                <MapPin size={24} />
                <div>
                  <strong>Dirección</strong>
                  <p>Bogotá, Colombia</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <strong>Teléfono</strong>
                  <p>+57 312 527 4640</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <strong>Email</strong>
                  <p>info@techstore.com</p>
                  <p>soporte@techstore.com</p>
                </div>
              </div>
            </div>
            <div className="contact-hours">
              <h3>Horarios de atención</h3>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábados: 10:00 - 14:00</p>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2><MessageSquare size={24} /> Envianos un mensaje</h2>
            {submitted ? (
              <div className="form-success">
                <p>¡Gracias por tu mensaje! Te responderemos pronto.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Asunto *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <div className="form-group">
                  <label>Mensaje *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribí tu consulta..."
                  />
                </div>
                <button type="submit" className="btn-primary">
                  <Send size={20} />
                  Enviar Mensaje
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
