<script lang="ts">
  import DropDown from "../component/DropDown.svelte"
  import type { DropDownOption } from "../component/DropDownHelper.ts"

  export const prerender = true

  const options: DropDownOption[] = [
    { label: "Dog", value: 1 },
    { label: "Bird", value: 2 },
    { label: "Snake", value: 3 },
    { label: "Mouse", value: 4 },
    { label: "Bat", value: 5 },
  ]

  let modelSingle = options[0]
  let modelMultiple = [options[0], options[1]]
  let modelInItemSlot = options[0]

  function handleOnChangeSingle(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelSingle = value as DropDownOption
      console.log(value)
    }
  }

  function handleOnChangeMultiple(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelMultiple.splice(0, modelMultiple.length)
      modelMultiple = value as DropDownOption[]
      console.log(value)
    }
  }

  function handleOnChangeModelInItemSlot(value: DropDownOption | DropDownOption[] | undefined) {
    if (value !== undefined) {
      modelInItemSlot = value as DropDownOption
      console.log(value)
    }
  }
</script>

<h1>DropDown</h1>
<p></p>
<h5>Single</h5>
<DropDown
  options={options}
  searchable={true}
  clearable={true}
  multiple={false}
  model={modelSingle}
  onChange={handleOnChangeSingle}
/>
<p></p>
<h5>Multiple</h5>
<DropDown
  options={options}
  searchable={true}
  clearable={true}
  multiple={true}
  model={modelMultiple}
  onChange={handleOnChangeMultiple}
/>
<p></p>
<h5>Single with slot item</h5>
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
<style>
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(58, 57, 57, 0.87);
    background-color: #ffffff;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }


  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }
</style>
