<script lang="ts">
    import { Carousel } from "flowbite-svelte"
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Card from "$lib/components/Card.svelte";

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
        <h2 class="text-3xl font-bold text-center uppercase tracking-widest text-black">
            Notas Favoritas
        </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card showFav={true} />
        <Card showFav={true} />
        <Card showFav={true} />
    </div>
</div>

<Footer showFooter={true} />