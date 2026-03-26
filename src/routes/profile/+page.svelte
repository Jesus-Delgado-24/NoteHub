<script>
    import  Navbar  from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { Card, Label, Input, Button, P, Radio } from "flowbite-svelte";
    import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

    let { data } = $props();
    let selectedValue = $state("3");
    let showPassword = $state(false);
    let showPassword2 = $state(false);
    let showPassword3 = $state(false);
</script>

<div class="sticky top-0 z-50">
    {#if data.user}
        <Navbar showBtnI={false} user={data.user.username}/>
    {:else}
        <Navbar showBtnI={true}/>
    {/if}
</div>

<div>
    <Card class="w-full max-w-225 mx-auto mt-10 mb-10 border-[#DECFFA] p-10 flex flex-col items-center">
        <Label class="font-semibold text-black text-lg mt-2">Perfil</Label>
        <form class="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            
            <div class="flex flex-col items-center space-y-4">
                <div class="w-full max-w-sm flex flex-col items-center">
                    <Label class="text-black text-base mb-2" for="username">Nombre de Usuario</Label>
                    <Input name="username" required id="username" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2" type="text" placeholder="Nombre de Usuario" />
                </div>

                <div class="flex flex-col items-center">
                    <Label class="text-black text-base mb-2" for="color">Color Favorito</Label>
                    <input name="color" id="color" 
                        class="h-12 w-24 cursor-pointer rounded-lg border-2 border-[#DECFFA] bg-transparent p-1 focus:border-[#808CFD] [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-md" 
                        type="color" />
                </div>

                <div class="w-24 flex flex-col items-center">
                    <Label class="text-black text-base mb-2" for="age">Edad</Label>
                    <Input name="age" id="age" 
                        class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black text-center placeholder:text-gray-500 focus:border-2" 
                        type="number" min="1" max="120" placeholder="18" />
                </div>

                <div class="flex flex-col items-center">
                    <Label class="text-black text-base mb-2" for="gender">Género</Label>
                    <div class="flex flex-row items-center gap-4">
                        <Radio name="example1" value="1" class="text-[#6750A4] focus:ring-[#6750A4] border-[#DECFFA]" bind:group={selectedValue}>Masculino</Radio>
                        <Radio name="example1" value="2" class="text-[#6750A4] focus:ring-[#6750A4] border-[#DECFFA]" bind:group={selectedValue}>Femenino</Radio>
                    </div>           
                    <div class="flex flex-row items-center mt-2">
                        <Radio name="example1" value="3" class="text-[#6750A4] focus:ring-[#6750A4] border-[#DECFFA]" bind:group={selectedValue}>Otro</Radio>
                    </div>                             
                </div>
            </div>

            <div class="flex flex-col items-center space-y-4">

                <div class="w-full max-w-sm flex flex-col items-center">
                    <Label class="text-black mb-2 text-base" for="password">Contraseña actual</Label>
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
                </div>

                <div class="w-full max-w-sm flex flex-col items-center">
                    <Label class="text-black mb-2 text-base" for="new_password">Nueva Contraseña</Label>
                    <div class="relative w-full">
                        <Input 
                            required
                            name="new_password" 
                            id="new_password" 
                            class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2 pr-10" 
                            type={showPassword2 ? "text" : "password"} 
                            placeholder="••••••••" 
                        />
                        
                        <button 
                            type="button" 
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#DECFFA] hover:text-[#808CFD] z-10"
                            onclick={() => (showPassword2 = !showPassword2)}
                        >
                            {#if showPassword2}
                                <EyeSlashOutline class="h-5 w-5" />
                            {:else}
                                <EyeOutline class="h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>

                <div class="w-full max-w-sm flex flex-col items-center">
                    <Label class="text-black mb-2 text-base" for="con_password">Confirmar Contraseña</Label>
                    <div class="relative w-full">
                        <Input 
                            required
                            name="con_password" 
                            id="con_password" 
                            class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 focus:border-2 pr-10" 
                            type={showPassword3 ? "text" : "password"} 
                            placeholder="••••••••" 
                        />
                        
                        <button 
                            type="button" 
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#DECFFA] hover:text-[#808CFD] z-10"
                            onclick={() => (showPassword3 = !showPassword3)}
                        >
                            {#if showPassword3}
                                <EyeSlashOutline class="h-5 w-5" />
                            {:else}
                                <EyeOutline class="h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>                
            </div>

            <div class="col-span-1 md:col-span-2 flex justify-end">
                <Button class="btn-notehub" >Guardar</Button>
            </div>            
        </form>
    </Card>
</div>

<Footer showInf={true} />