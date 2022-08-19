<script lang="ts">
  import JsonEditor from "./JsonEditor.svelte";
  import KeyValuePairs from "./KeyValuePairs.svelte";
  import { headers, queryParams, selectedTab } from "./stores";
</script>

<!-- Query and Header Tabs -->
{#if $selectedTab !== 2}
  <div class="w-5/6 border-gray-200 border-4 rounded-lg py-3 px-4">
  {#each [queryParams, headers] as store, i}
    {#if $selectedTab === i}
      <KeyValuePairs store={store}/>
    {/if}
  {/each}
  </div>
{/if}

<!-- JSON Tab (Editor) -->
<JsonEditor />
