import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

function Signup() {
  return (
    <div className="grid min-h-screen place-items-center drop-shadow-2xl">
      <ScrollArea className="flex max-h-[600px] w-11/12 max-w-xs flex-col items-center rounded-lg bg-white px-4 md:max-h-[700px] md:max-w-md lg:max-h-[700px] lg:max-w-lg xl:max-h-[800px] ">
        <div className="flex w-full flex-col items-center">
          <div className="relative my-8 h-36 w-36 border-2 border-dashed border-gray-800">
            <Image
              className="h-full w-full object-cover hover:cursor-pointer hover:brightness-75 hover:filter hover:transition hover:duration-75"
              src="/images/placeholder.png"
              alt="logo"
              fill
            />
          </div>
          <div className="grid w-full max-w-sm place-items-center space-y-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Nombre(s):</Label>
              <Input id="name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastname">Apellido(s):</Label>
              <Input id="lastname" />
            </div>
            <div className="flex justify-between gap-5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="gender">Genero:</Label>
                <Input id="gender" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="country">País:</Label>
                <Input id="country" />
              </div>
            </div>
            {/* ciudad */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="city">Ciudad:</Label>
              <Input id="city" />
            </div>
            {/* direccion */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="address">Dirección:</Label>
              <Input id="address" />
            </div>
            {/* telefono */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="phone">Teléfono:</Label>
              <Input id="phone" />
            </div>
            <div className="flex justify-between gap-5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="social">Red social:</Label>
                <Input id="social" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="socialUser">Usuario:</Label>
                <Input id="socialUser" />
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Contraseña:</Label>
              <Input id="password" type="password" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
              <Input id="confirmPassword" type="password" />
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
              Registrarse
            </button>
          </div>
          <div className="mt-4 flex w-full justify-center pb-8">
            <button className="text-sm text-gray-600 hover:text-gray-700">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="font-semibold underline underline-offset-2"
              >
                Inicia Sesión
              </Link>
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
export default Signup;
