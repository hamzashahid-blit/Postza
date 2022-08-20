<script lang="ts">
  // EVERYTHING is REALLY finniky with codemirror. There are a lot of issues, I am finding an alternative.

  import { rawResponse, timeTaken } from "./stores";
  import prettyBytes from "pretty-bytes";
  import { onMount } from "svelte";
  import { basicSetup, EditorView } from "codemirror";
  import { keymap } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import { indentWithTab, indentSelection } from '@codemirror/commands';
  import { json } from "@codemirror/lang-json";
  import { html } from "@codemirror/lang-html";

  let status = 0, time = 0, size = 0;
  let jsonEditor: EditorView, htmlEditor: EditorView;
  let jsonDiv: HTMLDivElement, htmlDiv: HTMLDivElement;
  let showHtml = false;

  onMount(() => {
    jsonEditor = new EditorView({
	  state: EditorState.create({
		doc: '{}',
		extensions: [basicSetup, json(), EditorView.editable.of(false)],
	  }),
	  parent: document.body
	});
	jsonDiv.append(jsonEditor.dom);

    htmlEditor = new EditorView({
	  state: EditorState.create({
		doc: "lskjdf",
		extensions: [
		  basicSetup,
		  html(),
		  EditorView.editable.of(false), // Non-editable (Still doesn't work with pasting...)
		  keymap.of([indentWithTab]),    // Hitting tab will indent instead of going to next elemnt
		  EditorView.lineWrapping
		],
	  }),
	  parent: document.body
	});
	// Select all document to indent later
	htmlEditor.dispatch({
	  selection: {
		anchor: 0,
		head: htmlEditor.state.doc.length
	  }
	})
	htmlDiv.append(htmlEditor.dom);
  })

  // Check if response is valid and not {}
  $: if($rawResponse && Object.keys($rawResponse).length > 0){
	   let data = JSON.stringify($rawResponse.data)
  	   status = $rawResponse.status;
       size = data.length + JSON.stringify($rawResponse.headers).length
	   time = $timeTaken;
	   // Putting data into editor>
	   jsonEditor.dispatch({
	   	 changes: {
	       from: 0,
	   	   to: jsonEditor.state.doc.length,
	   	   insert: JSON.stringify($rawResponse.data, null, 2)
	   	 }
	   });
	   htmlEditor.dispatch({
	   	 changes: {
	       from: 0,
	   	   to: htmlEditor.state.doc.length,
	   	   insert: $rawResponse.data.contents,
	   	 }
	   });
	   // WARNING: I Couldn't figure out indentRange soooo, this is a non-solution.
       setTimeout(() => {
		 // Indent all HTML
	     indentSelection({
	       state: htmlEditor.state,
	       dispatch: transaction => (
	   	     htmlEditor.update([transaction])
	       )
	     });
		 // deselect buffer
	     htmlEditor.dispatch({
	       selection: {
		     anchor: 0,
		     head: 0
	       }
	     });
       }, 500);
     }
</script>

<div class="m-10">
  <h1 class="text-4xl mb-2">Response</h1>
  <div class="flex space-x-8 text-gray-600 mb-4">
	<div>Status: <span>{status}</span></div>
	<div>Time: <span>{time}ms</span></div>
	<div>Size: <span>{prettyBytes(size)}</span></div>
  </div>
  <div bind:this={jsonDiv} class="mb-5"></div>
  <label for="toggleHtml">
  <input type="checkbox" name="toggleHtml" bind:checked={showHtml}>
  <div bind:this={htmlDiv}
       style={`display: ${showHtml ? "block" : "none"}`}
  ></div>
</div>

<style>
  span {
    @apply text-gray-800
  }
</style>
