import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { handleError } from "../../utils/globals";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}/auth/token/`, data);
      
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      
    } catch (err) {
      handleError("Login yoki parolda xatolik!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl text-center text-white">Kirish</h1>
        <div className="my-2">
          <span className="px-1 font-extrabold bg-lime-600">Login</span>
          <input
            type="text"
            {...register("username", {
              required: "Login majburiy!",
            })}
            className="w-full p-3 text-white bg-transparent border-2 outline-none appearance-none border-lime-600"
          />
          {errors.username && (
            <p className="pb-5 text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="my-2">
          <span className="px-1 font-extrabold bg-lime-600">Parol</span>
          <input
            type="password"
            {...register("password", {
              required: "Parol majburiy!",
            })}
            className="w-full p-3 text-white bg-transparent border-2 outline-none appearance-none border-lime-600"
          />
          {errors.password && (
            <p className="pb-5 text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white uppercase bg-green-800"
        >
          Kirish
        </button>
      </form>
    </div>
  );
}
