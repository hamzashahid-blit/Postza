<script lang="ts">
  import { v4 } from "uuid";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let id = v4();
  export let key = "";
  export let value = "";

  function remove() {
    dispatch("remove", id)
  }
</script>

<div class="flex justify-center w-full mb-3">
    <input class="border-x-2 rounded-l-sm" type="text" placeholder="Key" bind:value={key}>
    <input type="text" placeholder="Value" bind:value={value}>
    <button class="border-red-600 border-2 border-r-2 px-3 py-1 rounded-r-sm text-red-600 hover:bg-red-600 hover:text-white"
			on:click="{remove}">Remove</button>
</div>

<style>
  input {
    @apply border-gray-300 border-y-2 p-2 w-full
  }
</style>
