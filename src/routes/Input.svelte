<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let method: string;
  export let url: string = "https://jsonplaceholder.typicode.com/todos/1";

  const dispatch = createEventDispatcher();
  function send(){
	dispatch("send")
  }
</script>

<div class="p-4 flex justify-center text-lg">
	<select bind:value={method} class="main-input border-t border-l border-b rounded-l-lg">
	  <option value="get">GET</option>
	  <option value="post">POST</option>
	  <option value="put">PUT</option>
	  <option value="patch">PATCH</option>
	  <option value="delete">DELETE</option>
	</select>
	<input bind:value={url} class="main-input border w-1/2 lg:w-1/3" type="text" placeholder="https://localhost:8080">
	<button class="main-input border-y border-r rounded-r-lg bg-orange-600 text-white hover:bg-orange-500"
			type="submit"
			on:click="{send}">Send</button>
</div>

<style>
  .main-input {
	@apply border-gray-300 px-4 py-2
  }
</style>
