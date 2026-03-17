<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {Card, Input, Button, Label, P, A} from "flowbite-svelte";
    import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

    let showPassword = $state(false);
</script>

<div class="sticky top-0 z-50">
    <Navbar showBtnI={true}/>
</div>

<div>
    <Card class="w-full max-w-115 mx-auto mt-10 mb-10 border-[#DECFFA] p-10 flex flex-col items-center">
        <Label class="font-bold text-black text-xl">NoteHub</Label>
        <Label class="font-semibold text-black text-lg mt-8">Registro</Label>
        <Label class="text-black mt-8 text-base" for="username">Nombre de Usuario</Label>
        <Input id="username" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2" type="text" placeholder="Nombre de Usuario" />
        <Label class="text-black mt-3 text-base" for="email">Correo</Label>
        <Input id="email" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2" type="email" placeholder="Correo electrónico" />
        <Label class="text-black mt-3 text-base" for="email-confirm">Confirmar Correo</Label>
        <Input id="email-confirm" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2" type="email" placeholder="Correo electrónico" />
        <Label class="text-black mt-3 text-base" for="password">Contraseña</Label>
        <div class="relative w-full">
            <Input 
                id="password" 
                class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2 pr-10" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
            />
            
            <button 
                type="button" 
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#DECFFA] hover:text-[#808CFD] z-10"
                onclick={() => (showPassword = !showPassword)}
            >
                {#if showPassword}
                    <EyeSlashOutline class="h-5 w-5" />
                {:else}
                    <EyeOutline class="h-5 w-5" />
                {/if}
            </button>
        </div>
        <Label class="text-black mt-3 text-base" for="password_confirm">Confirmar Contraseña</Label>
        <div class="relative w-full">
            <Input 
                id="password_confirm" 
                class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2 pr-10" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
            />
            
            <button 
                type="button" 
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#DECFFA] hover:text-[#808CFD] z-10"
                onclick={() => (showPassword = !showPassword)}
            >
                {#if showPassword}
                    <EyeSlashOutline class="h-5 w-5" />
                {:else}
                    <EyeOutline class="h-5 w-5" />
                {/if}
            </button>
        </div>
        <Button class="mt-8 h-max-auto w-max-auto btn-notehub">Registrarse</Button>
        <P class="text-base text-black mt-3">¿Ya Tienes Cuenta? <A href="/login" class="text-[#808CFD] hover:underline">Iniciar sesión</A></P>
    </Card>
</div>

<Footer showInf={false}/>