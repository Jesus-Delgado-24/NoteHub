<script>
      import { Navbar, NavBrand, NavLi, NavUl, Button } from "flowbite-svelte";
</script>

<Navbar class="bg-[#E9ECFF]">
  <NavBrand>
    <span class="self-center text-xl font-bold whitespace-nowrap dark:text-white text-[30px]">NoteHub</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <NavUl>
        <NavLi href="/" class="hover:font-bold">Crear nota</NavLi>
    </NavUl>
    <Button href="/" class="font-semibold bg-[#808CFD] border-2 border-solid border-[#808CFD] rounded-xl hover:bg-[#6B79E0] hover:border-[#6B79E0] hover:text-white hover:font-bold focus:ring-0 transition-all hover:shadow-lg focus:shadow-md">Iniciar sesión</Button>
  </div>
</Navbar>
