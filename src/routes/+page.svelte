<script lang="ts">
    import { Carousel, Card, Input, Button, Textarea } from "flowbite-svelte"
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import CardC from "$lib/components/Card.svelte";
    import { SearchOutline, ArrowUpOutline, ArrowDownOutline, StarOutline, StarSolid } from "flowbite-svelte-icons";
    import { enhance } from "$app/forms";

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

    let filterDate = $state(false);
    let filterFav = $state(false);

    let searchQuery = $state("");

    let title_T = $state("");
    let description_T = $state("");
    let listNotes = $state<any[]>([]);

    let editingId = $state<number | null>(null);

    const displayNotes = $derived.by(() => {
        let filtered = listNotes.filter(n => 
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            n.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filtered.sort((a, b) => filterDate ? a.timestamp - b.timestamp : b.timestamp - a.timestamp);

        if (filterFav) {
            filtered.sort((a, b) => (a.fav === b.fav ? 0 : a.fav ? -1 : 1));
        }

        return filtered;
    });
    
    function filterByDate() {
        filterDate = !filterDate;
    }

    function filterByFav() {
        filterFav = !filterFav;
    }

    function btnFav(nota: any) {
        const index = listNotes.findIndex(n => n.id === nota.id);
        if (index !== -1) {
            listNotes[index].fav = !listNotes[index].fav;
            listNotes = [...listNotes];
        }
    }

    function fDate(){
        listNotes = [...listNotes].sort((a, b) => {
            return filterDate 
                ? a.timestamp - b.timestamp 
                : b.timestamp - a.timestamp;
        });
    }

    function saveNote(){
        if(title_T.trim() === "" || description_T.trim() === ""){
            alert("Por favor, completa ambos campos antes de guardar la nota.");
            return;
        }else{

            if (editingId) {
                listNotes = listNotes.map(n => 
                    n.id === editingId 
                    ? { ...n, title: title_T, description: description_T, timestamp: Date.now(), fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) }
                    : n
                );
                editingId = null;

                fDate();
            } else {
                const newNote = {
                    id: Date.now(),
                    title: title_T,
                    description: description_T,
                    timestamp: Date.now(),
                    fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                };
                listNotes = [newNote, ...listNotes];
            }

            title_T = "";
            description_T = "";
        }
    };

    function prepareEdit(nota: any) {
        editingId = nota.id;
        title_T = nota.title;
        description_T = nota.description;
        
        document.getElementById('create-note')?.scrollIntoView({ behavior: 'smooth' });
    }

    function deleteNote(id: number) {
        if (confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
            listNotes = listNotes.filter(nota => nota.id !== id);
            
            if (editingId === id) {
                editingId = null;
                title_T = "";
                description_T = "";
            }
        }
    }

    const topFavorites = $derived.by(() => {
        return listNotes
            .filter(n => n.fav)
            .sort((a, b) => b.timestamp - a.timestamp) 
            .slice(0, 3);
    });

    

</script>

<div class="sticky top-0 z-50">
    <Navbar showBtnI={true}/>
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
        {#each topFavorites as fN (fN.id)}
            <CardC 
                title={fN.title} 
                description={fN.description} 
                fecha={fN.fecha} 
                showFav={fN.fav} 
                onEdit={() => prepareEdit(fN)} 
                onFav={() => btnFav(fN)} 
                onDelete={() => deleteNote(fN.id)} 
                class="w-full max-w-lg" 
            />
        {/each}
    </div>

    {#if topFavorites.length === 0}
        <p class="text-center text-gray-400 italic">No tienes notas favoritas aún.</p>
    {/if}
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
    <div id="create-note" class="mb-12">
        <h2 class="text-3xl font-bold text-center uppercase tracking-widest text-black">Crear Nota</h2>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card class="flex flex-col max-w-auto min-h-150 p-6 border-[#DECFFA]">
            <Input name="title" bind:value={title_T} class=" bg-transparent mb-2 border-transparent font-bold focus:border-[#808CFD] placeholder:text-gray-500 text-black" placeholder="Título..."></Input>
            <Textarea name="description" bind:value={description_T} rows={32} class="bg-transparent flex-1 h-full overflow-y-auto resize-none w-full border-[#DECFFA] placeholder:text-gray-500 text-black focus:border-[#808CFD]" placeholder="Descripción"></Textarea>
            <Button onclick={saveNote} class="mt-4 btn-notehub self-end w-auto h-auto">Guardar</Button>
        </Card>
        
        <Card class="max-w-auto p-6 border-[#DECFFA]">
            <form>
                <Input bind:value={searchQuery} id="search" placeholder="Search" class="bg-transparent focus:border-[#808CFD] border-[#DECFFA] text-black placeholder:text-gray-500 ps-9">
                    {#snippet left()}
                    <SearchOutline class="h-6 w-6 text-[#DECFFA]" />
                    {/snippet}
                </Input>
            </form>

            <div class="mt-4 flex flex-row items-center justify-start space-x-2">
                <Button onclick={filterByDate} class="btn-notehub">
                    Fecha
                    {#if filterDate}
                        <ArrowUpOutline class="h-5 w-5" />
                    {:else}
                        <ArrowDownOutline class="h-5 w-5" />
                    {/if}
                </Button>
                <Button onclick={filterByFav} class="btn-notehub">
                    Favoritas
                    {#if filterFav}
                        <StarSolid class="h-5 w-5" />
                    {:else}
                        <StarOutline class="h-5 w-5" />
                    {/if}
                </Button>
            </div>

            <div class="mt-4 flex flex-col items-center gap-6 max-h-160 overflow-y-auto pr-2 custom-scroll">
                {#each displayNotes as lN (lN.id)}
                    <CardC title={lN.title} description={lN.description} fecha={lN.fecha} showFav={lN.fav} onEdit={() => prepareEdit(lN)} onFav={() => btnFav(lN)} onDelete={() => deleteNote(lN.id)} class="w-full max-w-lg" />
                {/each}
            </div>
        </Card>
    </div>
</div>

<Footer showInf={true} />