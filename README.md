# For Shivani — A Birthday Surprise

A responsive, frontend-only birthday experience built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and canvas-confetti.

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`; preview it with `npm run preview`.

## Personalize the website

Most of the personal content lives in [`src/config.ts`](./src/config.ts):

- `birthdayDate` is set to `"10-29"` for Shivani's October 29 birthday. Month-day dates repeat annually and use the visitor's local calendar; the birthday celebration appears on the day itself. For a one-time countdown instead, use a full date and time such as `"2027-01-15T00:00:00"`.
- Edit the birthday message, letter, extra note, timeline text, song list, and 100 reasons.
- The site is set to Midnight Love mode with no theme toggle.
- To add or change a photo:
  1. Copy the image file into `public/photos/` (for example, `public/photos/my-photo.jpg`).
  2. Add or edit an item inside the `photos` array in `src/config.ts`:
     ```ts
     { src: "/photos/my-photo.jpg", caption: "My favorite photo", date: "A special day", album: "Beautiful smile" },
     ```
  3. Use the URL path `"/photos/my-photo.jpg"`—do not include `public` in the URL. The filename, including its extension and capitalization, must match the file.
  4. To change the large hero image, set `heroPhoto` to that same URL. Set `giftPhoto` for the gift reveal and update the three paths in `finalPhotos` for the ending collage.
- The photos currently in `public/photos/` are already connected in the gallery. Change their captions, dates, and album names in the `photos` array. Use an album name that matches an entry in `albums`, or add a new album there.
- Change the album names and emojis in `config.albums`. Gallery entries, captions, dates, and categories are in `config.photos`.
- The music player is set to **Alfaaz** and uses `public/audio/alfaaz.mp3`. To change it, replace that file with your authorized audio file (keeping the name `alfaaz.mp3`), or change the song entry's title, artist, and `src` in `config.songs`. The player never starts audio automatically.
- Edit `giftMessage`, `giftPhoto`, `heroMessage`, `birthdayMessage`, and `displayName` for your preferred wording and presentation.

The relationship timeline includes the dates and moments provided, plus an open-ended future milestone. A local illustration remains as a fallback if a photo path cannot be loaded.

## Deployment

### Vercel

1. Push the project to a Git provider and import the repository in Vercel.
2. Keep the framework preset as **Vite**. Use `npm run build` as the build command and `dist` as the output directory.
3. Deploy. Vercel will provide a shareable URL; deploy again after changing the content or photos.

### Netlify

1. Import the Git repository in Netlify.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. Deploy to receive a shareable site URL.

No backend, account, or personal-data collection is used. Google Fonts are requested over the network; the site falls back to local serif and sans-serif fonts if they are unavailable.

## Project layout

```text
public/
  audio/             Add authorized audio files here
  photos/            Add personal photos here
src/
  App.tsx             Page sections and interactions
  config.ts           Personalization data and editable sample content
  index.css           Responsive design, themes, and motion
  main.tsx            React entry point
```
