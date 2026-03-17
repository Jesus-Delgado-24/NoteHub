<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, Button, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  let { showNavbar= true } = $props();
</script>

<Navbar class="bg-[#E9ECFF] shadow-md w-full border-b border-gray-200">
  <NavBrand href="/">
    <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white text-[30px]">NoteHub</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <NavUl>
        <NavLi href="/#create-note" class="hover:font-bold">Crear nota</NavLi>
    </NavUl>
    {#if showNavbar}
      <Button href="/" class="btn-notehub">Iniciar sesión</Button>
    {:else}
      <NavHamburger />
      <NavUl>
        <NavLi class="cursor-pointer hover:font-bold">
          Correo<ChevronDownOutline class="ms-2 inline h-6 w-6 hover:font-bold" />
        </NavLi>
        <Dropdown simple class="w-44">
          <DropdownItem href="/" class="hover:font-bold">Editar Perfil</DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/" class="hover:font-bold">Cerrar sesión</DropdownItem>
        </Dropdown>
      </NavUl>
    {/if}
  </div>
</Navbar>
