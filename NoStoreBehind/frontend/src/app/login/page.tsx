import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2 } from "lucide-react";
import Link from "next/link";

function Login() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex w-11/12 max-w-xs flex-col items-center rounded-2xl bg-white px-4 py-16 drop-shadow-xl lg:max-w-lg">
        <User2 className="h-[50px] w-[50px]" />
        <div className="grid w-full max-w-sm place-items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" />
          </div>

          <div className="mb-1 mt-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
          <div className="place-self-start">
            <button className="text-sm font-semibold text-gray-600 hover:text-gray-700">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
        {/* create no acount? sign up */}
        <div className="mt-4 flex w-full justify-center">
          <button className="w-full max-w-sm rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 ">
            Iniciar sesión
          </button>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button className="text-sm text-gray-600 hover:text-gray-700">
            ¿No tienes cuenta?{" "}
            <Link
              href="/signup"
              className="font-semibold underline underline-offset-2"
            >
              Regístrate
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
