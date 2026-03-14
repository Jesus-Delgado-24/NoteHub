<script>
    import { Carousel } from "flowbite-svelte"
    import Navbar from "../lib/components/Navbar.svelte";
    import Footer from "../lib/components/Footer.svelte";


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

<Footer showFooter={true} />