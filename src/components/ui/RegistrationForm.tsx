
import { useState } from 'react';

export default function RegistrationForm() {
 const [formData, setFormData] = useState({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   company: '',
   position: ''
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   setError('');

   try {
     const response = await fetch('https://chatcampuslands.com:8443/landingpageapp/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
     });

     if (!response.ok) {
       throw new Error('Error al registrar');
     }

     // Redirect to WhatsApp after successful registration
     const whatsappText = encodeURIComponent(`
¡Hola! Me he registrado al Master en IA Generativa

Datos de registro:
- Nombre: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Teléfono: ${formData.phone}
- Empresa: ${formData.company}
- Cargo: ${formData.position}

Por favor, necesito información sobre el proceso de pago.`);

     window.open(`https://wa.me/573012463004?text=${whatsappText}`, '_blank');
     
   } catch (err) {
     setError('Error al enviar el formulario. Por favor intenta nuevamente.');
   } finally {
     setIsSubmitting(false);
   }
 };

 return (
   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
     <div className="space-y-6 bg-white/5 p-8 rounded-xl border border-purple-500/20">
       <div className="text-center mb-8">
         <h3 className="text-2xl font-bold text-white mb-2">Inscríbete Ahora</h3>
         <p className="text-purple-300">Completa tus datos y te contactaremos</p>
       </div>

       {error && (
         <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
           {error}
         </div>
       )}

       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             Nombre
           </label>
           <input
             type="text"
             name="firstName"
             value={formData.firstName}
             onChange={e => setFormData({...formData, firstName: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
           />
         </div>

         <div className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             Apellido
           </label>
           <input
             type="text"
             name="lastName"
             value={formData.lastName}
             onChange={e => setFormData({...formData, lastName: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
           />
         </div>
       </div>

       {[
         { label: 'Email', name: 'email', type: 'email' },
         { label: 'Celular', name: 'phone', type: 'tel' },
         { label: 'Empresa', name: 'company', type: 'text' },
         { label: 'Cargo', name: 'position', type: 'text' }
       ].map(field => (
         <div key={field.name} className="space-y-2">
           <label className="block text-sm font-medium text-white/80">
             {field.label}
           </label>
           <input
             type={field.type}
             name={field.name}
             value={formData[field.name as keyof typeof formData]}
             onChange={e => setFormData({...formData, [field.name]: e.target.value})}
             className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        text-white placeholder:text-white/30"
             required
           />
         </div>
       ))}

       <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 
                    hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium 
                    transition-all transform hover:scale-105 disabled:opacity-50 
                    disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Enviando...' : 'Completar Inscripción'}
       </button>

       <p className="text-center text-sm text-white/60 mt-4">
         Al inscribirte aceptas recibir información sobre el curso
       </p>
     </div>
   </form>
 );
}