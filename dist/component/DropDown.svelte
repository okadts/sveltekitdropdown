<script>import { onMount } from "svelte";
import { highlightText } from "./DropDownHelper.ts";
export let options = [];
export let searchable = false;
export let clearable = false;
export let multiple = false;
export let model;
export let zIndex = 1e3;
export let optionSelectedColor = "#CCC";
export let optionHighlightedColor = "#777";
export let onChange;
let listOptions = Array.isArray(options) ? [...options] : [];
let isListOpen = false;
let isSearch = false;
let searchKeyword = "";
let isEmptyModel = multiple ? model.length === 0 : !model;
let containerRef;
let inputRef;
let highlightedListIndex = 0;
$: if (searchKeyword) {
  listOptions = Array.isArray(options) ? options.filter((option) => option.label.toString().toLowerCase().includes(searchKeyword.toLowerCase())) : [];
} else {
  listOptions = options;
}
function clearDropDownOptions() {
  if (multiple) {
    onChange([]);
    isEmptyModel = true;
  } else {
    onChange(void 0);
    isEmptyModel = true;
  }
}
function processDropDownOption(option) {
  if (multiple) {
    if (Array.isArray(model) && model.includes(option)) {
      onChange(model.filter((opt) => opt !== option));
    } else if (Array.isArray(model)) {
      onChange([...model, option]);
    } else {
      onChange([option]);
    }
  } else {
    if (option !== model) onChange(option);
  }
}
function isDropDownOptionSelected(option) {
  if (!model) return false;
  return multiple ? model.includes(option) : model === option;
}
function checkModelIsEmpty(model2, multiple2) {
  if (multiple2 && Array.isArray(model2) && model2.length === 0) {
    isEmptyModel = true;
  } else if (multiple2 && Array.isArray(model2) && model2.length > 0) {
    isEmptyModel = false;
  } else if (!multiple2 && model2 === void 0) {
    isEmptyModel = true;
  } else {
    isEmptyModel = false;
  }
}
function handleClickOutside(event) {
  if (containerRef && !containerRef.contains(event.target)) {
    isListOpen = false;
  }
}
function handleClickOptions(option) {
  processDropDownOption(option);
  isListOpen = false;
}
function containerSelectedClicked(event) {
  isListOpen = !isListOpen;
}
$: if (isListOpen) {
  highlightedListIndex = 0;
}
$: checkModelIsEmpty(model, multiple);
onMount(() => {
  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});
function handleSearchInput(event) {
  const target = event.target;
  searchKeyword = target.value || "";
  isSearch = true;
}
</script>

<div
  bind:this={containerRef}
  class="container-dropdown"
  >
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="container-selected"
    on:click={containerSelectedClicked}
    tabIndex="0"
  >
    <span class="value">
      {#if multiple}
        {#if  Array.isArray(model)}
          {#each model as option}
            <button
              on:click={() => {
                processDropDownOption(option)
              }}
              class="option-badge"
            >
              { option.label }
              <span class="remove-btn">&times;</span>
            </button>
          {/each}
        {:else}
         ""
        {/if}
      {:else}
        {#if !isEmptyModel}
          {model?.label}
        {:else}
          <span style="color: #777;">Select an option</span>
        {/if}
      {/if}
    </span>
    {#if !isEmptyModel && clearable}
      <button
        on:click={e => {
          e.stopPropagation()
          clearDropDownOptions()
        }}
        class="clear-btn"
      >
        &times;
      </button>
    {/if}
    <div class="caret"></div>
  </div>
  {#if isListOpen}
    <div
      class="options"
      style="--dropdown-z-index: {zIndex};"
    >
      {#if searchable}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="search-input"
          on:click={e => {
            e.stopPropagation()
            inputRef.focus();
            isListOpen=true
          }}
        >
          <span class="search-icon">🔍</span>
          <input
            bind:this={inputRef}
            tabIndex=0
            type="text"
            bind:value={searchKeyword}
            on:input={handleSearchInput}
          />
          {#if searchKeyword.length > 0}
            <button
              class="clear-btn"
              on:click={(e) => {
                e.stopPropagation()
                searchKeyword = ''
                isSearch=false
              }}
            >
              &times;
            </button>
          {/if}
        </div>
        
      {/if}
      <ul>
        {#each listOptions as option, index}
          <slot name="dropdown-item" option={option} index={index} handleClickOptions={handleClickOptions}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
            on:click={() => handleClickOptions(option)}
            on:mouseenter={() => highlightedListIndex=index}
            class={`option ${isDropDownOptionSelected(option) ? "selected" : ""} ${index === highlightedListIndex ? "highlighted" : ""}`}
            style="
              --dropdown-option-selected: {optionSelectedColor};
              --dropdown-option-highlighted: {optionHighlightedColor};"
            >
            {#if isSearch}
              {@html highlightText(option.label, searchKeyword)}
            {:else}
              {option.label}
            {/if}
            </li>
          </slot>
        {/each}
      </ul>
    </div>
  {/if}
</div> 

<style>
  .container-dropdown {
    position: relative;
  }

  .container-selected {
    min-width: 20em;
    min-height: 1.5em;
    border: 0.05em solid #777;
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em;
    border-radius: 0.25em;
    outline: none;
    cursor: pointer;
  }

  .container-selected:focus {
    border-color: hsl(200, 100%, 50%);
  }

  .value {
    flex-grow: 1;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  .clear-btn {
    background: none;
    color: #777;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 1.25em;
  }

  .clear-btn:focus,
  .clear-btn:hover {
    color: #333;
  }

  .divider {
    background-color: #777;
    align-self: stretch;
    width: 0.05em;
  }

  .caret {
    translate: 0 25%;
    border: 0.25em solid transparent;
    border-top-color: #777;
  }

  .options {
    position: absolute;
    margin: 0;
    padding: 0;
    max-height: 15em;
    overflow-y: auto;
    border: 0.05em solid #777;
    border-radius: 0.25em;
    width: 100%;
    left: 0;
    top: calc(100% + 0.25em);
    background-color: white;
    z-index: var(--dropdown-z-index);
  }

  .options .search-input {
    display: flex;
    padding: 0.25rem;
    overflow-y: auto;
    align-items: center;
    color: rgb(0 0 0 / 50%);
  }

  .options .search-input input[type="text"] {
    display: block;
    border: 0;
    width: 100%;
    outline: none;
    height: 1.5rem;
    font-size: 1rem;
    padding: 0 0.4rem;
    border-radius: 0.4rem;
  }

  .options ul {
    display: block;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;
  }

  .options.show {
    display: block;
  }

  .option {
    padding: 0.25em 0.5em;
    cursor: pointer;
  }

  .option.selected {
    background-color: var(--dropdown-option-selected);
  }

  .option.highlighted {
    background-color: var(--dropdown-option-highlighted);
    color: white;
  }

  .option-badge {
    display: flex;
    align-items: center;
    border: 0.05em solid #777;
    border-radius: 0.25em;
    padding: 0.15em 0.25em;
    gap: 0.25em;
    cursor: pointer;
    background: none;
    outline: none;
  }

  .option-badge:hover,
  .option-badge:focus {
    background-color: hsl(0, 100%, 90%);
    border-color: hsl(0, 100%, 50%);
  }

  .option-badge:hover > .remove-btn,
  .option-badge:focus > .remove-btn {
    color: hsl(0, 100%, 50%);
  }

  .option-badge > .remove-btn {
    font-size: 1.25em;
    color: #777;
  }

  .highlightTextOption {
    background-color: yellow;
  }
</style>
