<script lang="ts">
    import { Card, Button } from "flowbite-svelte";
    import { StarOutline, StarSolid, TrashBinOutline } from "flowbite-svelte-icons";

    let { title, description, fecha, onEdit, onFav, onDelete, showFav, class: className = '', ...rest } = $props();

</script>

<Card {...rest} class="p-4 sm:p-8 md:p-5 bg-[#E9ECFF] {className} border-none shadow-md">
    <div class="flex flex-row items-start justify-between mb-4">
        <div class="flex flex-col items-start overflow-hidden me-4">
            <h5 class="text-xl font-bold text-gray-900 dark:text-white truncate w-full">{title}</h5>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-tight">{fecha}</p>
        </div>

        <div class="flex flex-row items-center space-x-2 shrink-0">
            <Button onclick={onFav} class="btn-notehub p-2">
                {#if showFav}
                    <StarSolid class="h-5 w-5" />
                {:else}
                    <StarOutline class="h-5 w-5" />
                {/if}
            </Button>
            <Button onclick={onDelete} class="btn-notehub p-2">
                <TrashBinOutline class="h-5 w-5" />
            </Button>
        </div>
    </div>
    
    <div class="flex flex-col items-start mb-4">
        <p class="text-black leading-relaxed line-clamp-3 text-justify text-sm">{description}</p>
    </div>

    <div class="flex justify-end pt-2">
        <Button onclick={onEdit} class="btn-notehub px-4 py-2 text-sm">Editar</Button>
    </div>
</Card>