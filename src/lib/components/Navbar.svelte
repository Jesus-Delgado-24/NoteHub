<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, Button, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { invalidateAll } from '$app/navigation';
  import { toast, Toaster } from 'svelte-sonner';

  let { showBtnI= true, user = null, colorO } = $props();

  async function handleLogout() {
    const response = await fetch('/api/logout', { method: 'POST' });
    if (response.ok) {
        await invalidateAll();
        window.location.href = '/';
        toast.success("¡Cierre de sesión exitoso!");
    }
  }

  function getContrastColor(hex: string) {
    if (!hex) return 'text-black';

    const cleanHex = hex.replace('#', '');
    
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    return (yiq >= 128) ? 'text-black' : 'text-white';
}
</script>

<Toaster richColors position="bottom-right" expand={true} />

<Navbar style="background-color: {colorO};" class="shadow-md w-full border-b border-gray-200 transition-colors duration-300 {getContrastColor(colorO)}">
  <NavBrand href="/">
    <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white text-[30px]">NoteHub</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <NavUl>
        <NavLi href="/#create-note" class="hover:font-bold {getContrastColor(colorO)}">Crear nota</NavLi>
    </NavUl>
    {#if showBtnI}
      <Button href="/login" class="btn-notehub">Iniciar sesión</Button>
    {:else}
      <NavHamburger />
      <NavUl>
        <NavLi class="cursor-pointer hover:font-bold font-semibold {getContrastColor(colorO)}">
          {user}<ChevronDownOutline class="ms-2 inline h-6 w-6 hover:font-bold" />
        </NavLi>
        <Dropdown simple class="w-44">
          <DropdownItem href="/profile" class="hover:font-bold">Editar Perfil</DropdownItem>
          <DropdownDivider />
          <DropdownItem onclick={handleLogout} class="hover:font-bold">Cerrar sesión</DropdownItem>
        </Dropdown>
      </NavUl>
    {/if}
  </div>
</Navbar>
