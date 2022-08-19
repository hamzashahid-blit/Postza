<script lang="ts">
  import { hideJsonEditor, showJsonEditor } from "./JsonEditor.svelte";
  import { selectedTab } from "./stores.js"

  function changeTab(i: number){
    if($selectedTab === 2 && i !== 2){
	  hideJsonEditor();
	} else if (i === 2){
      showJsonEditor();
	}
	selectedTab.set(i);
  }
</script>

<div class="flex justify-center items-center space-x-12 my-6 w-1/2">
  {#each ["Query Params", "Headers", "JSON"] as title, i}
    <button class="bg-orange-600 text-white hover:bg-orange-500 border-b-4 border-orange-800 hover:border-orange-700 px-4 py-2 rounded-lg"
		  class:selected="{$selectedTab === i}"
		  on:click="{() => changeTab(i)}">{title}</button>
  {/each}
</div>

<style>
  .selected { @apply bg-orange-500 border-orange-700 hover:border-orange-700 }
</style>
