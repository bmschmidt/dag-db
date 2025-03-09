<script lang="ts">
  import { onMount } from 'svelte';
  import {EditorView, keymap} from "@codemirror/view"
  import { EditorState } from '@codemirror/state';
  import { sql } from '@codemirror/lang-sql';

  let { value = $bindable(), onChange } : {value: string, onChange: (newValue: string) => void} = $props();

  let editor: HTMLDivElement;

  onMount(() => {
    const state = EditorState.create({
      doc: value,
      extensions: [
        sql(),
        EditorView.updateListener.of((update: any) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange?.(newValue);
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editor,
    });

    return () => {
      view.destroy();
    };
  });
</script>

<div bind:this={editor} class="editor-container"></div>

<style>
  .editor-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
  }
</style>
