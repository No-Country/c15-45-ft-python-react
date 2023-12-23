"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import imageLogin from "../../../../public/images/background_html_ecommerce.jpg";

const Signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signIn("credentials", {
      username: user,
      password,
      callbackUrl: "/products",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <section className="gradient-form h-screen w-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="flex h-screen w-full items-center rounded-lg bg-white shadow-lg dark:bg-neutral-800 sm:flex-col sm:items-stretch sm:justify-center">
          <div className="g-0 h-full w-full lg:flex lg:flex-wrap">
            <div className="relative flex items-center lg:w-6/12">
              <Image
                src={imageLogin.src}
                fill
                className="bg-no-repeat object-cover object-center opacity-75"
                alt="Login Image"
              />
            </div>

            <div className="h-full w-full px-4 md:px-0 lg:w-6/12">
              <div className="flex h-full flex-col justify-center sm:mx-6 sm:p-12">
                <div className="text-center">
                  <Store size={48} className="mx-auto" />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    NSB e-commerce
                  </h4>
                </div>

                <form>
                  <p className="mb-4 text-center text-lg font-semibold">
                    Por favor inicia sesión
                  </p>
                  <div className="relative mb-4" data-te-input-wrapper-init>
                    <div className="grid items-center gap-1.5">
                      <Label htmlFor="user">Usuario</Label>
                      <Input
                        id="user"
                        placeholder="Usuario"
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid items-center gap-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-12 py-2.5 text-center">
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    >
                      Iniciar Sesión
                    </Button>

                    <Link href="/auth/signup" className="text-sm">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </form>
                <div className="flex items-center justify-between pb-6">
                  <p className="mb-0 mr-2">¿No tienes cuenta?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-danger text-danger hover:border-danger-600 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 active:border-danger-700 active:text-danger-700 inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  >
                    <Link href="/auth/signup">Regístrate</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
