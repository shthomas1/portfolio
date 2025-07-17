Thank you for checking out my portfolio. The site loads project data from JSON
files so it can be easily extended.

## Adding or Editing Projects

Project summaries and timeline entries are stored in
`public/cardinfo.json`. More detailed data for each project lives in
`public/projects.json` under the same `id` value.

To add a new project:

1. Append an object to `public/cardinfo.json` with the basic information
   (`id`, `title`, `year`, `description`, etc.).
2. Add a matching entry in `public/projects.json` that contains the
   extended details shown on the single project page.

Once these files are updated the site will display the new project on the
timeline and the project detail page will be automatically available at
`/project/<id>`.

The Projects tab has been removed now that the timeline links directly to
each project.