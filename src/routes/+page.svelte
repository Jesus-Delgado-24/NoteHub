<script lang="ts">
    import { Carousel, Card, Input, Button, Textarea } from "flowbite-svelte"
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import CardC from "$lib/components/Card.svelte";
    import { SearchOutline, ArrowUpOutline, ArrowDownOutline, StarOutline, StarSolid } from "flowbite-svelte-icons";
    import { toast, Toaster } from 'svelte-sonner';
    import { onMount } from 'svelte';
    import { Modal } from "flowbite-svelte";
    import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

    let { data } = $props();

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

    let sortAscending = $state(false);
    let showOnlyFavs = $state(false);

    let title_T = $state("");
    let description_T = $state("");

    let listNotes = $state([]);
    let tempNotes = $state<Note[]>([]);
    let displayNotes = $derived(data.user ? listNotes : tempNotes);
    let editingId = $state<string | null>(null);

    interface Note {
        _id: string;
        user_id: string;
        title: string;
        content: string;
        created_at: string;
        fav: boolean;
    }

    async function handleSaveNote(event: SubmitEvent) {
        event.preventDefault();
        const method = editingId ? 'PUT' : 'POST';

        try {
            const now = new Date().toISOString();

            if (data.user) {
                const payload = {
                    title: title_T,
                    content: description_T,
                    created_at: now,
                    ...(editingId && { _id: editingId })
                };

                const response = await fetch('/api/note', {
                    method: method, 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success(editingId ? "Nota actualizada" : "Nota guardada");
                    resetForm();
                    getNotes();
                } else {
                    toast.error(result.error || "Error en el servidor");
                }

            } else {
                if (editingId) {
                    const updatedNotes = tempNotes.map(n => n._id === editingId 
                        ? { ...n, title: title_T, content: description_T, created_at: now } 
                        : n
                    );
                    
                    tempNotes = updatedNotes.sort((a, b) => 
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );

                    toast.info("Cambios temporales guardados");
                } else {
                    const newNote: Note = {
                        _id: crypto.randomUUID(),
                        user_id: 'guest',
                        title: title_T,
                        content: description_T,
                        created_at: now,
                        fav: false
                    };
                    tempNotes = [...tempNotes, newNote];
                    toast.info("Nota temporal creada");
                }

                sessionStorage.setItem('guest_notes', JSON.stringify(tempNotes));
                resetForm();
            }
        } catch (error) {
            toast.error("Error de conexión. Intenta de nuevo.");
        }
    }

    function resetForm() {
        editingId = null;
        title_T = "";
        description_T = "";
    }
    
    async function getNotes() {
        try {
            const response = await fetch('/api/note');
            if (response.ok) {
                listNotes = await response.json();
                console.log(listNotes);
            } else {
                console.error("Error al obtener notas");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    }

    onMount(() => {
        getNotes();
    });

    function prepareEdit(note: Note) {
        title_T = note.title;
        description_T = note.content;
        editingId = note._id;
        const section = document.getElementById('create-note');
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
    }

    async function btnFav(note: Note) {
        const newFavStatus = !note.fav;

        if (data.user) {
            try {
                const response = await fetch('/api/note', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        _id: note._id, 
                        fav: newFavStatus,
                        created_at: note.created_at 
                    })
                });

                if (response.ok) {
                    toast.success(newFavStatus ? "Añadido a favoritos" : "Quitado de favoritos");
                    getNotes();
                }
            } catch (error) {
                toast.error("Error al actualizar favorito");
            }
        } else {
            tempNotes = tempNotes.map(n => 
                n._id === note._id ? { ...n, fav: newFavStatus } : n
            );
            sessionStorage.setItem('guest_notes', JSON.stringify(tempNotes));
            toast.info(newFavStatus ? "Favorito temporal" : "Quitado de favoritos");
        }
    }

    async function deleteNote(id: string) {
        if (data.user) {
            try {
                const response = await fetch('/api/note', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: id })
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success(result.message);
                    getNotes();
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                toast.error("Error al conectar con el servidor");
            }
        } else {
            tempNotes = tempNotes.filter(n => n._id !== id);
            sessionStorage.setItem('guest_notes', JSON.stringify(tempNotes));
            toast.success("Nota temporal eliminada");
        }
    }

    let openDeleteModal = $state(false);
    let idToDelete = $state<string | null>(null);

    function askDelete(id: string) {
        idToDelete = id;
        openDeleteModal = true;
    }

    async function confirmDelete() {
        if (idToDelete) {
            await deleteNote(idToDelete);
            idToDelete = null;
            openDeleteModal = false;
        }
    }

    let topFavorites = $derived(
        displayNotes
            .filter(n => n.fav)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 3)
    );

    function toggleSortDate() {
        sortAscending = !sortAscending;
        filterDate = sortAscending; 
    }

    let finalNotes = $derived(
    displayNotes
        .filter(note => {
            // Filtro de Búsqueda
            const query = searchQuery.toLowerCase();
            const matchesSearch = note.title.toLowerCase().includes(query) || 
                                 note.content.toLowerCase().includes(query);
            
            // Filtro de Favoritos
            const matchesFav = showOnlyFavs ? note.fav : true;

            return matchesSearch && matchesFav;
        })
        .sort((a, b) => {
            // Orden por Fecha
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortAscending ? dateA - dateB : dateB - dateA;
        })
);

    function toggleFilterFav() {
        showOnlyFavs = !showOnlyFavs;
        filterFav = showOnlyFavs;
    }
</script>

<Toaster richColors position="bottom-right" expand={true} />

<div class="sticky top-0 z-50">
    {#if data.user}
        <Navbar showBtnI={false} user={data.user.username}/>
    {:else}
        <Navbar showBtnI={true}/>
    {/if}
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
        {#each topFavorites as fN (fN._id)}
            <CardC 
                title={fN.title} 
                description={fN.content} 
                fecha={fN.created_at} 
                showFav={fN.fav} 
                onEdit={() => prepareEdit(fN)} 
                onFav={() => btnFav(fN)} 
                onDelete={() => deleteNote(fN._id)} 
                class="w-full max-w-lg" 
            />
        {:else}
            <div class="col-span-full">
                <p class="text-center text-gray-400 italic">No tienes notas favoritas aún.</p>
            </div>
        {/each}
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">
    <div id="create-note" class="mb-12">
        <h2 class="text-3xl font-bold text-center uppercase tracking-widest text-black">Crear Nota</h2>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card class="flex flex-col max-w-auto min-h-150 p-6 border-[#DECFFA]">
            <form onsubmit={handleSaveNote} class="w-full flex flex-col items-stretch">
                <Input required name="title" bind:value={title_T} class=" bg-transparent mb-2 border-transparent font-bold focus:border-[#808CFD] placeholder:text-gray-500 text-black" placeholder="Título..."></Input>
                <Textarea required name="content" bind:value={description_T} rows={32} class="bg-transparent flex-1 h-full overflow-y-auto resize-none w-full border-[#DECFFA] placeholder:text-gray-500 text-black focus:border-[#808CFD]" placeholder="Descripción"></Textarea>
                <Button type="submit" class="mt-4 btn-notehub self-end w-auto h-auto">Guardar</Button>
            </form>
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
                <Button onclick={toggleSortDate} class="btn-notehub">
                    Fecha
                    {#if sortAscending}
                        <ArrowUpOutline class="ms-2 h-5 w-5" />
                    {:else}
                        <ArrowDownOutline class="ms-2 h-5 w-5" />
                    {/if}
                </Button>
                <Button onclick={toggleFilterFav} class="btn-notehub">
                    Favoritas
                    {#if filterFav}
                        <StarSolid class="h-5 w-5" />
                    {:else}
                        <StarOutline class="h-5 w-5" />
                    {/if}
                </Button>
            </div>

            <div class="mt-4 flex flex-col items-center gap-6 max-h-160 overflow-y-auto pr-2 custom-scroll">
                {#each finalNotes as lN (lN._id)}
                    <CardC 
                        title={lN.title} 
                        description={lN.content} 
                        fecha={lN.created_at} 
                        showFav={lN.fav} 
                        onEdit={() => prepareEdit(lN)} 
                        onFav={() => btnFav(lN)} 
                        onDelete={() => askDelete(lN._id)} 
                        class="w-full max-w-lg" 
                    />
                {:else}
                    <div class="col-span-full text-center py-10">
                        <p class="text-gray-400 italic">
                            {searchQuery ? "No se encontraron notas con ese nombre" : "No hay notas todavía"}
                        </p>
                    </div>
                {/each}
            </div>
        </Card>
    </div>
</div>

<Modal bind:open={openDeleteModal} size="xs" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-4 w-14 h-14 text-red-500" />
        <h3 class="mb-5 text-lg font-normal text-gray-500">
            ¿Estás seguro de que deseas eliminar esta nota?
        </h3>
        <div class="flex justify-center gap-4">
            <Button color="red" onclick={confirmDelete}>
                Sí, eliminar
            </Button>
            <Button color="alternative">
                No, cancelar
            </Button>
        </div>
    </div>
</Modal>

<Footer showInf={true} />