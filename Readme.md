## Introduction
This project is a demonstration of a flexible, context-based selection list component for React applications. It showcases the extensive use of React's Context API and the Compound Component Pattern. The primary aim is to present an example of a highly customizable and intuitive interface, serving as a practical implementation of these advanced React design patterns.

## Patterns used
### Provider pattern
The Provider Pattern leverages React's Context API to allow state to be "provided" to a tree of components. The `SelectionList` component wraps its children in a `SelectionListContext.Provider` which holds the state and functions that the selection list requires. This pattern allows child components to access and manipulate shared state, making state management centralized and predictable.

### Compound component pattern
The Compound Component Pattern in React allows you to create a parent component (in this case, `SelectionList`) that pairs with its children, giving you a more intuitive and flexible way to manage complex component structures. `SelectionList` has sub-components (`List`, `Item`, `InputSearch`, and `SubmitButton`) which can be used and configured individually, providing great flexibility and customizability.

These patterns combine to create a flexible, modular, and intuitive interface for creating and managing selection lists in a React application.

## How it works
* The `SelectionList` component provides a context (via Provider Pattern) that all its children can access, which holds the state and functions necessary for the selection list's operation.
* Child components use the `useSelectionListContext` hook to access this context and its state/actions.
* The `List`, `Item`, `InputSearch`, and `SubmitButton` sub-components (implementing Compound Component Pattern) allow for customization and configuration on a per-component basis.

```jsx
import SelectionList from "./components/SelectionList.jsx";

// inside your component
<SelectionList isSingleSelection={false}>
  <SelectionList.InputSearch />
  <SelectionList.List>
    {items.map((item) => (
      <SelectionList.Item key={item.id} value={item.id} text={item.name} />
    ))}
  </SelectionList.List>
  <SelectionList.SubmitButton text="Confirm" onSubmit={handleConfirm}/>
</SelectionList>
```
Here, `items` is an array of objects, where each object has an `id` and `name`. The `handleConfirm` function is called when the 'Confirm' button is clicked, and it receives the array of selected ids as an argument.

## Requirements
* React 16.8 or later (for hooks support).
* Node.js v18.16.0 or later.
* npm or yarn to install dependencies.
* Vite as a build tool and dev server.

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## Note
The goal of this project was to create a simplified and adaptable example of a selection list using advanced React patterns. It's important to note that while the project serves this goal effectively, there are areas that could be enhanced for more complex or production-ready applications.
* **State Management:** The state management in this project has been kept simple and could be improved to handle more complex scenarios.
* **Design:** The user experience could be further improved with enhanced design and UX considerations.
* **Prop type validation:** The project doesn't currently employ prop type validation with PropTypes or TypeScript, but these would be valuable additions for robustness and maintainability in a more comprehensive project.
* **Large Data Support:** For applications with large datasets, implementing features like lazy loading or virtualization for the list could improve performance.

Despite these simplifications, the project serves as a demonstration of how the Compound Component Pattern and the Provider Pattern can be implemented together in React to create a flexible, customizable, and intuitive interface. By leveraging these patterns, this project presents a solid foundation for creating more sophisticated and scalable selection lists, tailored to accommodate specific needs in a variety of applications.





