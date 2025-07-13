import { useState } from "react"
import postSendEmail from "../service/postSendEmail"

export default function SendMailRecoverPassword() {
  const [email, setEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor ingresa tu correo electrónico")
      return
    }

    localStorage.setItem("StorageEmail", email)

    await postSendEmail(email)
    alert("Correo enviado exitosamente. Revisa tu bandeja de entrada.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Recuperación de contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Enviar código de verificación
          </button>
        </form>
      </div>
    </div>
  )
}
