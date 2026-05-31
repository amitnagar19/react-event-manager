# React Event Manager

A demo app showcasing three reusable React components: DataGrid, Timeline, and EventForm.

## Getting Started

  ```bash
  npm install
  npm run dev
  ```

## Components

### DataGrid

Built on TanStack Table v8 (headless) — all markup and styling is custom. Supports client-side sorting, column
filtering, pagination with configurable page size, and column visibility toggle. Columns are
configured via a `ColumnConfig` interface that abstracts TanStack internals from consumers.

### Timeline

Custom-built vertical timeline grouping events by day. Day grouping was chosen over month (too many events per group) or
hour (too sparse) — 200 events over ~60 days produces readable chunks of 3-5 events per
group.

Keyboard navigable: Left/Right moves between day groups, Up/Down moves between items within a group. Uses `useRef` for
stale-closure-free keyboard handling and callback refs for DOM focus management. Screen
reader announcements via `aria-live` region.

### EventForm

Controlled form using React Hook Form. Validates required title and date fields. Focuses first invalid field on submit (
RHF default). Opens in a modal with cancel/save flow and an `aria-live` success region.

Date validation prevents past dates — events are always scheduled in the future.

## State & Data

**Zustand** manages shared event state. All three components consume the same `useEventStore` — new events added via the
form appear in both DataGrid and Timeline without prop drilling.

**Mock data** is generated with `@faker-js/faker` (dev dependency) — 200 realistic events spread across two months.
Faker is dev-only since mock data is never used in production.

## Tech Stack

| Concern | Library           |
  |---------|-------------------|
| Table   | TanStack Table v8 |
| Form    | React Hook Form   |
| State   | Zustand           |
| Dates   | date-fns          |
| Icons   | Lucide React      |
| Styling | Tailwind CSS      |

## Project Structure

  ```
  src/
  ├── components/
  │   ├── DataGrid/       # DataGrid, ColumnToggle, DataGridPagination, types
  │   ├── Timeline/       # Timeline, TimelineItem, types
  │   └── EventForm/      # EventForm, types
  ├── store/
  │   └── useEventStore.ts
  └── data/
      └── mockEvents.ts
  ```

## Notes

- App runs on `http://localhost:5173` (Vite default)
- No backend — all data is mock and lives in memory, resets on page refresh
- No unit tests — per task requirements