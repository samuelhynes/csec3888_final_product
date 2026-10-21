# CSEC3888 research website

Updated 22/10/2026. Source-edit-only version. The homepage introduces the project and summarises a research takeaway. Two separate pages introduce **LLM Input Prototype** and **Seeding Experiment**, with 01/02/03 sections and links to their separate websites. The logo returns home. There are no editing controls, forms or browser-saved content overrides.

## Run locally

From this directory:

```sh
python3 -m http.server 4318 --directory dist --bind 127.0.0.1
```

Open `http://127.0.0.1:4318` and keep the terminal running. This task does not configure the CSEC3888.com domain or upload the site.

## Replace the text

Open `dist/data.mjs` in VS Code. Change the strings inside `pageDefaults`:

- `home.intro` and `home.findings`: homepage article.
- `llm.intro`, `llm.overview`, `llm.method`, `llm.findings`: LLM page.
- `seeding.intro`, `seeding.setup`, `seeding.observations`, `seeding.findings`: seeding page.

Use `\n\n` within a string for a paragraph break. Escape an apostrophe as `\'` when using single-quoted strings. Save the file and refresh the browser. If changes appear cached, use a hard refresh.

For example:

```js
overview: 'Our prototype explores how people interact with language models.',
method: 'Describe your method here.\n\nAdd another paragraph here.',
```

Edit `pageFields` in the same file to change the numbered section headings and blank-section prompts. Edit `dist/app.js` for fixed headings and layout markup; `dist/styles.css` and `dist/simplified.css` control appearance. `dist/index.html` contains the navigation, page metadata and footer.

The homepage's initial text is suggested copy, not a new research result. Its bounded conclusion reflects the preserved 07/10/2026 corpus review; it does not assert measured outcomes for either separate prototype. The two prototype pages contain no monitoring case studies, invented experimental findings or statistics.

The website reads only source-file content. Old browser drafts are not loaded or deleted; copy any wanted text from the earlier version before relying on this version. Source edits are included when you package or publish the updated files. Nothing uploads automatically. Original copied research material remains separately under `reference/`, outside the served website.

## Connect the separate websites

Both pages have an **Open …** button at the bottom. Until supplied, a click displays a short address-not-added message instead of visiting a fake site. Set `prototypeLinks.llm` and `prototypeLinks.seeding` in `dist/data.mjs` to the actual HTTP(S) addresses. Configured links open in a new tab with opener isolation. Links with embedded credentials or unsafe schemes are rejected.

## Checks

```sh
node --test tests.mjs
node --check dist/app.js
```

The site makes no live model calls and contains no API credentials. It does not alter the monitoring pipeline or historical artefacts. Google Fonts is optional with local fallbacks. Publishing remains unapproved; this is a locally served site.
