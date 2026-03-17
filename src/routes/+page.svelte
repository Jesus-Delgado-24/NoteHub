<script lang="ts">
    import { Carousel, Card, Input, Button, Textarea } from "flowbite-svelte"
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import CardC from "$lib/components/Card.svelte";
    import { SearchOutline, ArrowUpOutline, ArrowDownOutline, StarOutline, StarSolid } from "flowbite-svelte-icons";

    const imagenes = [
        {
            alt: "Image 1",
            src: "/images/Img-1.png"
        },
        {
            alt: "Image 2",
            src: "/images/Img-2.png"
        },
        {
            alt: "Image 3",
            src: "/images/Img-3.png"
        }
    ];

    let filterDate = false;
    let filterFav = false;
</script>

<div class="sticky top-0 z-50">
    <Navbar showNavbar={true}/>
</div>

<div class="bg-[#E9ECFF]">
    <div class="max-w-4xl mx-auto"> 
        <Carousel images={imagenes} duration={4000} />
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
    <div class="mb-12">
        <h2 class="text-3xl font-bold text-center uppercase tracking-widest text-black">Notas Favoritas</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardC showFav={true} />
        <CardC showFav={true} />
        <CardC showFav={true} />
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
    <div class="mb-12">
        <h2 class="text-3xl font-bold text-center uppercase tracking-widest text-black">Crear Nota</h2>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card class="flex flex-col max-w-auto min-h-150 p-6 border-[#DECFFA]">
            <Input class="bg-transparent mb-2 border-transparent font-bold focus:border-[#808CFD]" placeholder="Título..."></Input>
            <Textarea rows={32} class="bg-transparent flex-1 h-full overflow-y-auto resize-none w-full border-[#DECFFA] text-gray-500 focus:border-[#808CFD]" placeholder="Descripción"></Textarea>
            <Button class="mt-4 btn-notehub self-end w-auto h-auto">Guardar</Button>
        </Card>
        
        <Card class="max-w-auto p-6 border-[#DECFFA]">
            <form>
                <Input id="search" placeholder="Search" size="lg" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-gray-500 ps-9">
                    {#snippet left()}
                    <SearchOutline class="h-6 w-6 text-[#DECFFA]" />
                    {/snippet}
                </Input>
            </form>

            <div class="mt-4 flex flex-row items-center justify-start space-x-2">
                <Button class="btn-notehub">
                    Fecha
                    {#if filterDate}
                        <ArrowUpOutline class="h-5 w-5" />
                    {:else}
                        <ArrowDownOutline class="h-5 w-5" />
                    {/if}
                </Button>
                <Button class="btn-notehub">
                    Favoritas
                    {#if filterFav}
                        <StarSolid class="h-5 w-5" />
                    {:else}
                        <StarOutline class="h-5 w-5" />
                    {/if}
                </Button>
            </div>

            <div class="mt-4 flex flex-col items-center gap-6 max-h-160 overflow-y-auto pr-2 custom-scroll">
                <CardC showFav={false} class="w-full max-w-lg" />
                <CardC showFav={false} class="w-full max-w-lg" />
                <CardC showFav={false} class="w-full max-w-lg" />
                <CardC showFav={false} class="w-full max-w-lg" />
                <CardC showFav={false} class="w-full max-w-lg" />
                <CardC showFav={false} class="w-full max-w-lg" />
            </div>
        </Card>
    </div>
</div>

<Footer showFooter={true} />