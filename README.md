# Svelte 4 + Sveltekit 2 + TypeScript + Dropdown

First attemp to create svelte dropdown select component

Component Features:

- Searchable Dropdown - help filter long options list
- Single or Multiple Selection
- Customizable Option Rendering aka you can supplay your own options component
- Toggle Features (support search or non search, single or multiple)
- Z-Index Compatibility (z-index on options list can be adjust using props for better layout)

Working Demo:

- [storybook](https://svelte4ddstorybook.pages.dev/)
- [Svelte 4 + Sveltekit 2](https://svelte4dropdown.pages.dev/) currently not compatible in dark mode yet

## How to use it?

Docs and demo [storybook](https://svelte4ddstorybook.pages.dev/)

How to install:

```shell
npm install okadts/sveltekitdropdown
```
or clone the repo and use the code on lib folder

Import the component

```ts
	import { DropDown, highlightText } from '@okadts/sveltedropdown'
	import type { DropDownOption, OptionsComponentProps } from '@okadts/sveltedropdown'
```

options sample:

```ts
const options: DropDownOption[] = [
  { label: "Dog", value: 1 },
  { label: "Bird", value: 2 },
  { label: "Snake", value: 3 },
  { label: "Mouse", value: 4 },
  { label: "Bat", value: 5 },
]
```

Single Component sample:

```svelte
<script lang="ts">
  ...
  let modelSingle = options[0]

  function handleOnChangeSingle(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelSingle = value as DropDownOption
      console.log(value)
    }
  }
</script>

<DropDown
  options={options}
  searchable={true}
  clearable={true}
  multiple={false}
  model={modelSingle}
  onChange={handleOnChangeSingle}
/>
```

Multiple Component sample:

```svelte
<script lang="ts">
  ...
  let modelMultiple = [options[0], options[1]]

  function handleOnChangeMultiple(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelMultiple.splice(0, modelMultiple.length)
      modelMultiple = value as DropDownOption[]
      console.log(value)
    }
  }
</script>

<DropDown
  options={options}
  searchable={true}
  clearable={true}
  multiple={true}
  model={modelMultiple}
  onChange={handleOnChangeMultiple}
/>
```

Fexible rendering options using new Options Component:

```svelte
<script lang="ts">
  ...
  let modelInItemSlot = options[0]

  function handleOnChangeModelInItemSlot(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelInItemSlot = value as DropDownOption
      console.log(value)
    }
  }
</script>

<DropDown
  options={options}
  searchable={true}
  clearable={true}
  multiple={false}
  model={modelInItemSlot}
  onChange={handleOnChangeModelInItemSlot}
  >
  <div slot="dropdown-item" let:option let:index let:handleClickOptions>
    <!-- Custom content for each dropdown item -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li
      on:click={() => handleClickOptions(option)}
      class={`custom-option ${index % 2 === 0 ? 'even' : 'odd'}`}
    >
      {option.label}
    </li>
  </div>
</DropDown>
```