<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import {Card, Input, Button, Label, P, A} from "flowbite-svelte";
    import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
    import { toast, Toaster } from 'svelte-sonner';
    import { goto } from '$app/navigation';
    import { invalidateAll } from '$app/navigation';

    let showPassword = $state(false);
    let isLoading = $state(false);

    async function handleLogin(event: SubmitEvent) {
        event.preventDefault();

        const target = event.currentTarget as HTMLFormElement;
        if (!target) return;

        isLoading = true;

        const fomData = new FormData(target);
        const data = Object.fromEntries(fomData);

        try{
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.status === 400) {
                toast.warning(result.error || "Ocurrió un error");
            }else if (response.ok) {
                await invalidateAll();
                window.location.href = '/';
                toast.success(result.message || "¡Inicio de sesión exitoso!");
            }else{
                toast.error(result.error || "Ocurrió un error inesperado");
            }
        }catch{
            toast.error("Error de conexión con el servidor");
        } finally {
            isLoading = false;
        }
    }

    async function handleLoginA(event: SubmitEvent) {
        event.preventDefault();

        const target = event.currentTarget as HTMLFormElement;
        if (!target) return;

        const data = {
            email: "admin@notehub.com",
            password: "admin123"
        }

        try{
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                await invalidateAll();
                window.location.href = '/';
                toast.success(result.message || "¡Inicio de sesión exitoso!");
            }else{
                toast.error(result.error || "Ocurrió un error inesperado");
            }
        }catch{
            toast.error("Error de conexión con el servidor");
        }
    }

</script>

<Toaster richColors position="bottom-right" expand={true} />

<div class="sticky top-0 z-50">
    <Navbar showBtnI={true} colorO={"#E9ECFF"} />
</div>

<div>
    <Card class="w-full max-w-115 mx-auto mt-10 mb-10 border-[#DECFFA] p-10 flex flex-col items-center">
        <Label class="font-bold text-black text-xl">NoteHub</Label>
        <Label class="font-semibold text-black text-lg mt-8">Inicio de sesión</Label>
        <form onsubmit={handleLogin} class="w-full flex flex-col items-center" >
            <Label class="text-black mt-8 text-base" for="email">Correo</Label>
            <Input required name="email" id="email" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2" type="email" placeholder="Correo electrónico" />
            <Label class="text-black mt-3 text-base" for="password">Contraseña</Label>
            <div class="relative w-full">
                <Input 
                    required
                    name="password"
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
            <Button type="submit" disabled={isLoading} class="mt-8 h-max-auto w-max-auto btn-notehub">{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Button>
        </form>
        <form onsubmit={handleLoginA}>
            <P>
                <button type="submit" class="mt-3 text-black hover:text-[#808CFD] hover:underline bg-transparent border-none p-0 cursor-pointer">
                    Iniciar sesión como administrador
                </button>
            </P>
        </form>
        <P class="text-base text-black mt-3">¿No Tienes Cuenta? <A href="/register" class="text-[#808CFD] hover:underline">Registrarse</A></P>
    </Card>
</div>

<Footer showInf={false}/>