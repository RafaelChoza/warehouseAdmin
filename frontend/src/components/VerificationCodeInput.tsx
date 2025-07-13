  import { useState } from "react";
  import postValidateCode from "../service/postValidateCode";
  import { useNavigate } from "react-router-dom";



  export default function VerificationCodeInput() {
    const [code, setCode] = useState("");
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await postValidateCode(code)
        navigate("/createNewPassword")
        setCode("")
      } catch (error) {

      }

    };

    return (
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <label htmlFor="verificationCode" className="block mb-2 font-medium text-gray-700">
          Código de Verificación
        </label>
        <input
          id="verificationCode"
          type="text"
          value={code}
          onChange={handleChange}
          placeholder="Ingresa tu código"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Enviar Código
        </button>
      </form>
    );
  }
