"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Store } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import imageLogin from "../../../../public/images/background_html_ecommerce.jpg";

const Signin = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<any | string | undefined>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // const data_user = e.target;
    setUser("");
    setPassword("");
    signIn("credentials", {
      username: user,
      password,
      callbackUrl: "/products",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <section className="gradient-form h-screen w-screen bg-neutral-400 dark:bg-neutral-700">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="flex h-full w-full items-center bg-neutral-200 shadow-lg  dark:bg-neutral-800 sm:block sm:items-stretch lg:flex lg:flex-col lg:justify-center">
          <div className="g-0 drop-shadow-xl lg:flex lg:flex-wrap">
            <div className="relative flex items-center lg:w-6/12">
              <Image
                src={imageLogin.src}
                fill
                className="bg-no-repeat object-cover object-center opacity-75"
                alt="Login Image"
              />
            </div>
            <div className="w-full px-4 md:px-0 lg:w-6/12">
              <ScrollArea className="flex max-h-screen w-full flex-col items-center bg-white px-4">
                <div className="flex w-full flex-col items-center">
                  <div className="relative my-8 h-36 w-36 border-2 border-dashed border-cyan-800">
                    <Image
                      className="h-full w-full object-cover hover:cursor-pointer hover:brightness-90 hover:filter hover:transition hover:duration-75"
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
                      <Label htmlFor="confirmPassword">
                        Confirmar Contraseña:
                      </Label>
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
                    <Button
                      className="w-full max-w-sm "
                      onClick={(e) => handleSubmit(e)}
                    >
                      Registrarse
                    </Button>
                  </div>
                  <div className="mt-4 flex w-full justify-center pb-8">
                    <button className="text-sm text-gray-600 hover:text-gray-700">
                      ¿Ya tienes cuenta?{" "}
                      <Link
                        href="/auth/signin"
                        className="font-semibold underline underline-offset-2"
                      >
                        Inicia Sesión
                      </Link>
                    </button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
