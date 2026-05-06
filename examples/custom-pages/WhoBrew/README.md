# WhoBrew — Custom Page Example

This is a worked example of a custom route. It shows how to add a standalone page
(beyond the default home / project detail views) to the portfolio template.

## How to use

1. Copy this entire folder into `src/components/` so the path becomes
   `src/components/WhoBrew/WhoBrew.tsx`. (The sibling `whobrew.css` is imported
   via a relative path, so it travels with the component.)
2. Import the component in `src/App.tsx`:

   ```tsx
   import WhoBrew from "./components/WhoBrew/WhoBrew";
   ```

3. Add a `<Route>` entry inside the `<Routes>` block:

   ```tsx
   <Route
     path="/whobrew"
     element={
       <Layout cards={cards} projects={projects}>
         <WhoBrew />
       </Layout>
     }
   />
   ```

4. Optional: add a card to `public/cardinfo.json` whose `link` field is `/whobrew`.
   The `Card` and `Timeline` components will render an internal `<Link>` for any
   `link` value that begins with `/`.

## Customizing

Rename the component, the CSS file, the CSS class names, the route path, and the
copy inside `WhoBrew.tsx` to fit your own page. Nothing here is magic — it is a
plain React component rendered through React Router like any other.
