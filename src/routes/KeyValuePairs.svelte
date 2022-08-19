<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import KeyValue from "./KeyValue.svelte";
  import type { createKeyValuePairs } from "./stores";

  export let store: ReturnType<typeof createKeyValuePairs>;
</script>

<div class="flex flex-col justify-center my-2 w-full">
  {#each $store as {id, key, value}}
    <KeyValue bind:key bind:value bind:id on:remove="{(e) => store.remove(e.detail)}"/>
	<!-- {id}: {key} = {value} -->
	<!-- <br/> -->
  {/each}

  <button
	class="border-green-600 border-2 px-3 py-1 rounded-sm text-green-600 hover:bg-green-600 hover:text-white align-self w-28"
	on:click="{() => store.add()}"
  >
	<div class="flex justify-center items-center">
	  <Fa class="mr-1" icon={faPlus}/> Add
	</div>
  </button>
</div>
