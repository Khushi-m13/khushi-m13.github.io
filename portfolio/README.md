# Khushi — Portfolio Website

A fully responsive, animated personal portfolio built with vanilla **HTML, CSS, and JavaScript** for a Data Scientist / Java Developer profile.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js        # nav, library init, filters, scroll-spy
│   ├── particles.js      # particles.js background config
│   └── animation.js      # loader, cursor glow, counters, skill bars
├── assets/
│   ├── images/           # profile photo, OG image
│   ├── certificates/     # certificate images/PDFs
│   ├── icons/            # optional custom icons
│   └── resume/           # Khushi_Resume.pdf
└── README.md
```

## 1. Before you run it

The site is fully coded, but a few personal assets need to be dropped in:

1. **Resume** — add your PDF at `assets/resume/Khushi_Resume.pdf` (the Resume section and navbar button already link here).
2. **Profile photo (optional)** — the hero currently uses a styled monogram avatar. To use a real photo, drop it in `assets/images/`, then swap the `.hero__avatar` `<div>` in `index.html` for an `<img>` tag pointing to it.
3. **Real contact details** — update the placeholder email, phone, GitHub and LinkedIn links in the Contact section and footer of `index.html`.
4. **Certificate files (optional)** — if you want clickable certificate proof, add files to `assets/certificates/` and link them from the certification cards.

## 2. Run it locally

No build tools or installs required — it's static HTML/CSS/JS.

**Option A — just open it**
Double-click `index.html`, or right-click → "Open with" your browser.

**Option B — local server (recommended, avoids some browser file:// restrictions)**

With Python installed:
```bash
cd portfolio
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

With Node.js installed:
```bash
npx serve portfolio
```

**Option C — VS Code Live Server**
Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".

## 3. Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio` or `yourusername.github.io`).
2. Push this project to it:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, select the `main` branch and `/ (root)` folder, then **Save**.
5. GitHub will publish the site at:
   - `https://<your-username>.github.io/<repo-name>/` (regular repo), or
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`)
6. Changes are re-deployed automatically a minute or two after every push to `main`.

## 4. Tech used

- **Structure/Style:** Semantic HTML5, CSS custom properties, CSS Grid & Flexbox
- **Fonts:** Poppins (display), Inter (body), Montserrat (labels/utility) — hosted **locally** in `assets/vendor/fonts`
- **Icons:** Font Awesome 6 — hosted **locally** in `assets/vendor/fontawesome`
- **Libraries:** AOS-style scroll reveal (hand-written, no external dependency), Typed.js (typing effect), particles.js (background), Vanilla-Tilt.js (3D hover tilt) — all vendored **locally** in `assets/vendor`
- **Accessibility:** semantic landmarks, visible focus states, `prefers-reduced-motion` support
- **Performance:** IntersectionObserver-driven animations, zero external network requests — the whole site works fully offline once the files are on disk

> **No CDN dependency.** Earlier drafts pulled fonts/icons/animation libraries from CDNs, which meant the site could show a blank page or stuck loading screen on a machine with no internet access or a blocked network. Every library and font file now lives inside the project itself, so the site renders identically online or fully offline.

## 5. Customizing content

All copy lives directly in `index.html` — search for the section comments (`<!-- ================= SECTION ================= -->`) to find Hero, About, Skills, Projects, Certifications, Timeline, Resume, and Contact quickly. Colors and type live as CSS custom properties at the top of `css/style.css` under `:root`, so retheming is a matter of changing a handful of variables.
