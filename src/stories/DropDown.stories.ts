import { useArgs } from '@storybook/preview-api'
import { DropDown } from '@okadts/sveltedropdown'
import { fn } from '@storybook/test'
const options = [
  { label: "Dog", value: 1 },
  { label: "Bird", value: 2 },
  { label: "Snake", value: 3 },
  { label: "Mouse", value: 4 },
  { label: "Bat", value: 5 },
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DropDown',
  component: DropDown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    optionSelectedColor: { control: 'color' },
    optionHighlightedColor: { control: 'color' },
    optionsComponent: { table: { disable: true }},
    onClick: { table: { disable: true }},
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
}

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SvelteDropDown = {
  args: {
    multiple: true,
    options,
    model: [options[0]],
    searchable: true,
    clearable: true
  },
  render: function Render(args: any) {
    const [{ multiple }, updateArgs] = useArgs()

    function onChange(value: any) {
      multiple ? updateArgs({ model: [...value] }) : updateArgs({ model: value });
    }

    return {
      Component: DropDown,
      props: {
        ...args,
        onChange: (value: any) => onChange(value),
      },
    }
  }
}