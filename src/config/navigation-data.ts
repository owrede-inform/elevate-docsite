/**
 * Navigation configuration data converted from YAML
 * This is the static version of the navigation structure for reliable loading
 */
export interface NavigationSection {
  title: string
  pages: Array<{
    title?: string
    path: string
  }>
}

export const navigationSections: NavigationSection[] = [
  {
    title: 'Getting started',
    pages: [
      { title: 'Introduction', path: '/guides/introduction' },
      { title: 'Getting Started (Designers)', path: '/guides/designers/getting-started' },
      { title: 'Installation (Developers)', path: '/guides/developers/installation' }
    ]
  },
  {
    title: 'Foundations',
    pages: [
      { title: 'Colors', path: '/tokens/colors' }
    ]
  },
  {
    title: 'Patterns',
    pages: [
      { title: 'Login Form', path: '/patterns/login-form' }
    ]
  },
  {
    title: 'Resources',
    pages: [
      { title: 'Contributing', path: '/contributions' }
    ]
  },
  {
    title: 'Components',
    pages: [
      { title: 'Avatar', path: '/components/avatar' },
      { title: 'Badge', path: '/components/badge' },
      { title: 'Breadcrumb', path: '/components/breadcrumb' },
      { title: 'Breadcrumb Item', path: '/components/breadcrumb-item' },
      { title: 'Button', path: '/components/button' },
      { title: 'Button Group', path: '/components/button-group' },
      { title: 'Card', path: '/components/card' },
      { title: 'Charts', path: '/components/charts' },
      { title: 'Checkbox', path: '/components/checkbox' },
      { title: 'Chip', path: '/components/chip' },
      { title: 'Date Picker', path: '/components/date-picker' },
      { title: 'Dialog', path: '/components/dialog' },
      { title: 'Divider', path: '/components/divider' },
      { title: 'Drawer', path: '/components/drawer' },
      { title: 'Dropdown', path: '/components/dropdown' },
      { title: 'Empty State', path: '/components/empty-state' },
      { title: 'Expansion Panel', path: '/components/expansion-panel' },
      { title: 'File Dropzone', path: '/components/file-dropzone' },
      { title: 'Icon', path: '/components/icon' },
      { title: 'Icon Button', path: '/components/icon-button' },
      { title: 'Inline Notification', path: '/components/inline-notification' },
      { title: 'Input', path: '/components/input' },
      { title: 'Lightbox', path: '/components/lightbox' },
      { title: 'Link', path: '/components/link' },
      { title: 'List', path: '/components/list' },
      { title: 'Menu', path: '/components/menu' },
      { title: 'Menu Item', path: '/components/menu-item' },
      { title: 'Modal', path: '/components/modal' },
      { title: 'Mutation Observer', path: '/components/mutation-observer' },
      { title: 'Pagination', path: '/components/pagination' },
      { title: 'Progress Bar', path: '/components/progress-bar' },
      { title: 'Progress Stepper', path: '/components/progress-stepper' },
      { title: 'Radio', path: '/components/radio' },
      { title: 'Radio Button', path: '/components/radio-button' },
      { title: 'Radio Group', path: '/components/radio-group' },
      { title: 'Range Input', path: '/components/range-input' },
      { title: 'Resize Observer', path: '/components/resize-observer' },
      { title: 'Segmented Control', path: '/components/segmented-control' },
      { title: 'Select', path: '/components/select' },
      { title: 'Side Navigation', path: '/components/side-navigation' },
      { title: 'Skeleton', path: '/components/skeleton' },
      { title: 'Slider', path: '/components/slider' },
      { title: 'Split Panel', path: '/components/split-panel' },
      { title: 'Switch', path: '/components/switch' },
      { title: 'Tab', path: '/components/tab' },
      { title: 'Tab Group', path: '/components/tab-group' },
      { title: 'Table', path: '/components/table' },
      { title: 'Textarea', path: '/components/textarea' },
      { title: 'Time Picker', path: '/components/time-picker' },
      { title: 'Toast', path: '/components/toast' },
      { title: 'Toolbar', path: '/components/toolbar' },
      { title: 'Tooltip', path: '/components/tooltip' },
      { title: 'Top Navigation', path: '/components/top-navigation' },
      { title: 'Tree', path: '/components/tree' },
      { title: 'Tree Item', path: '/components/tree-item' },
      { title: 'Visually Hidden', path: '/components/visually-hidden' }
    ]
  }
]