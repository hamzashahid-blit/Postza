<script lang="ts">
  import { rawResponse, timeTaken } from "./stores";
  import prettyBytes from "pretty-bytes";
  import { onMount } from "svelte";
  import { basicSetup, EditorView } from "codemirror";
  import { EditorState } from "@codemirror/state"
  import { json } from "@codemirror/lang-json";

  let status: number = 0;
  let time: number = 0;
  let size: number = 0;
  let editor: EditorView;
  let editorDiv: HTMLDivElement;

  onMount(() => {
    editor = new EditorView({
	  state: EditorState.create({
		doc: '{}',
		extensions: [basicSetup, json(), EditorView.editable.of(false)],
	  }),
	  parent: document.body
	});;
	editorDiv.append(editor.dom);
  })

  $: if(responseExists()){
	   let data = JSON.stringify($rawResponse.data)
  	   status = $rawResponse.status;
       size = data.length + JSON.stringify($rawResponse.headers).length
	   time = $timeTaken;
	   editor.dispatch({
	   	 changes: {
	       from: 0,
	   	   to: editor.state.doc.length,
	   	   insert: JSON.stringify($rawResponse.data, null, 2)
	   	 }
	   })
     }

  function responseExists(){
    return $rawResponse && Object.keys($rawResponse).length > 0
  }
</script>

<div class="m-10">
  <h1 class="text-4xl mb-2">Response</h1>
  <div class="flex space-x-8 text-gray-600 mb-4">
	<div>Status: <span>{status}</span></div>
	<div>Time: <span>{time}ms</span></div>
	<div>Size: <span>{prettyBytes(size)}</span></div>
  </div>
  <div id="responseEditor" bind:this={editorDiv}></div>
</div>

<style>
  span {
    @apply text-gray-800
  }
</style>
