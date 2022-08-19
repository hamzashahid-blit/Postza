<script context="module" lang="ts">
  let editor: EditorView;
  let editorDiv: HTMLDivElement;

  export function showJsonEditor(){
	if(editor) editorDiv.style.display = "block";
  }
  export function hideJsonEditor(){
	if(editor) editorDiv.style.display = "none";
  }
</script>

<script lang="ts">
  import { basicSetup, EditorView } from "codemirror";
  import { EditorState } from "@codemirror/state";
  import { json } from "@codemirror/lang-json";
  import type { ViewUpdate } from "@codemirror/view";
  import { onMount } from "svelte";
  import { jsonData } from "./stores";

  onMount(() => {
    editor = new EditorView({
	  state: EditorState.create({
		doc: '{\n  \n}',
		extensions: [
		  basicSetup,
		  json(),
		  // Update jsonData when editor changes.
		  EditorView.updateListener.of((update: ViewUpdate) => {
			jsonData.set(update.state.doc);
		  })
		],
	  }),
	  parent: document.body
	});
	editorDiv.append(editor.dom);
  })

</script>

<div class="w-5/6 border-gray-200 border-4 rounded-lg py-3 px-4"
	 id="jsonEditor"
	 style="display: none"
	 bind:this={editorDiv}>
</div>
