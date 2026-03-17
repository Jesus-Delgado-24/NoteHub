<script lang="ts">
    import { Footer as FlowbiteFooter, FooterCopyright, FooterLinkGroup, FooterLink, P } from "flowbite-svelte";
    
    let { showInf = true } = $props();
</script>

<FlowbiteFooter footerType="socialmedia" class="bg-[#E9ECFF]">
    <div class="flex flex-col items-end">
        <div class="mb-6 md:mb-0">
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="font-bold self-center text-[40px] whitespace-nowrap dark:text-white">
                    NoteHub
                </span>
            </div>
        </div>
    </div>

    {#if showInf}
        <div class="grid grid-cols-2 gap-8">
            <div>
                <h2 class="mb-6 text-lg font-bold text-gray-900 uppercase dark:text-white">Contacto</h2>
                <FooterLinkGroup>
                    <P class="mb-4 text-black">Email: NoteHub@gmail.com</P>
                    <P class="mb-4 text-black">Telefono: (555) 123-4567</P>
                </FooterLinkGroup>
            </div>
            <div class="flex flex-col items-end">
                <h2 class="mb-6 text-lg font-bold text-gray-900 uppercase dark:text-white">Social</h2>
                <FooterLinkGroup class="grid grid-cols-2 grid-rows-2 text-black">
                    <FooterLink class="mb-4" href="https://www.facebook.com" target="_blank">Facebook</FooterLink>
                    <FooterLink class="mb-4" href="https://twitter.com" target="_blank">X</FooterLink>
                    <FooterLink class="mb-4" href="https://www.instagram.com" target="_blank">Instagram</FooterLink>
                    <FooterLink class="mb-4" href="https://www.linkedin.com" target="_blank">LinkedIn</FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    {/if}

    <hr class="my-6 border-y-black sm:mx-auto lg:my-8 dark:border-gray-700" />
    <FooterCopyright class="text-black" by="NoteHub™" />
</FlowbiteFooter>