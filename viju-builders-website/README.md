# Viju Builders — Website

A responsive, static website starter for **Viju Builders**. It is inspired by the clean architectural layout in the reference screenshots and is ready to publish with GitHub Pages.

## Preview locally
Open `index.html` in a browser. For the best local preview, use VS Code's Live Server extension.

## Folder structure
```text
viju-builders-website/
├── index.html
├── README.md
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── js/config.js
│   ├── js/main.js
│   └── images/             # Put your own photo1.jpg, photo2.jpg, etc. here
└── IMAGE-SOURCES.md
```

## First edits before publishing
1. Open `assets/js/config.js`.
2. Add the business phone number, email address and actual business location.
3. Replace the sample image URLs under `images` with Viju Builders' own image URLs, or download approved photographs into `assets/images/` and update the HTML/CSS to use those local files.
4. Check the service list and remove any service Viju Builders does not provide.
5. Replace the sample project captions with real project names, locations and descriptions. Do not present sample photographs as completed Viju Builders projects.
6. Add the company's actual logo if one is available.

### Image replacement guide
The image keys are deliberately named `photo1`, `photo2`, `photo3`, and `photo4` in `assets/js/config.js`.

- `photo1`: main homepage hero photograph (set in `assets/css/style.css` as well as config).
- `photo2`: residential project card.
- `photo3`: construction/site-work project card.
- `photo4`: commercial/architecture project card.

For a fully local image setup, create these files:
- `assets/images/photo1.jpg`
- `assets/images/photo2.jpg`
- `assets/images/photo3.jpg`
- `assets/images/photo4.jpg`

Then change the corresponding image URLs in `config.js` to `assets/images/photoN.jpg`. For the hero image, change the URL in `.hero-image` in `assets/css/style.css` to `url("../images/photo1.jpg")`. Local images are preferable for long-term reliability and page speed.

## Publish on GitHub Pages
1. Sign in to GitHub and create a new repository, for example `viju-builders-website`.
2. Upload **the contents of this folder** to the repository root. `index.html` must be at the root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then click **Save**.
6. Wait for the Pages deployment to finish. GitHub will show the published website address in Settings → Pages.

GitHub's official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Custom domain later
Buy a domain after choosing and checking the final company name/domain availability. In the repository, go to **Settings → Pages → Custom domain**, enter the domain and save. Then add the DNS records required by GitHub at the domain registrar. Follow the official guide:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Important
- GitHub Pages serves static HTML, CSS and JavaScript. This project has no server-side code.
- The WhatsApp enquiry button needs a valid phone number in `config.js`.
- The website currently uses sample stock photographs from Unsplash URLs. Review the image-source notes and current licence terms before commercial publication. Replace these with company-owned photographs as soon as possible.
- The company details, services, project descriptions and contact information must be verified by Viju Builders before the site goes live.
