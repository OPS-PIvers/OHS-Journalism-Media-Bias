# The Weekly Scout

An interactive journalism and bias tracking dashboard for students and teachers, built on Google Apps Script.

## Project Structure

This project uses a standard Google Apps Script structure with `clasp` for local development.

- `src/Code.js`: Main server-side logic (routing, auth, persistence).
- `src/Constants.js`: Configuration constants.
- `src/Utils.js`: Helper functions.
- `src/index.html`: Main HTML layout.
- `src/views/`: Individual page views (Dashboard, Submission, Teacher).
- `src/stylesheet.html`: CSS includes (Tailwind via CDN).
- `src/javascript.html`: Client-side JavaScript logic.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Login to Google:**
    ```bash
    npx clasp login
    ```

## Deployment

To push changes to the Google Apps Script project:

```bash
npm run deploy
```
(This runs `clasp push`)

## Development

Edit files in the `src/` directory. The project is structured to push directly from `src/` to the Apps Script project root.