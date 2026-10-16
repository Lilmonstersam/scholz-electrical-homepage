# Scholz Electrical homepage mockup

This is a static review copy of the current Scholz Electrical homepage with small navigation and enquiry improvements. It is separate from the live WordPress site.

## Deployment

GitHub Actions builds and deploys the mockup to GitHub Pages on every push to `main`. The source homepage remains in `homepage/`; `scripts/build.py` places a copy at the site root and adjusts local asset paths. The generated `_site/` directory is ignored by Git.

Live review URL: https://lilmonstersam.github.io/scholz-electrical-homepage/

Run `python3 scripts/build.py` to build locally. The output is static HTML, CSS, JavaScript and images. Search indexing is disabled for the review site.

## CRO preview

- [Homepage](homepage/Scholz%20Electrical%20_%20Brisbane%20Master%20Electricians.html)

The homepage has a section navigation bar beneath the hero. It stays available while scrolling, shows the current section, and scrolls horizontally on narrow screens. The **Our Electrical Services** area uses a category rail and a single content panel on desktop, with horizontally scrollable categories on mobile. Its original headings, descriptions, lists and links are reused. Existing page copy and brand colours are unchanged.

Scroll past the first screen to reveal the sticky call and enquiry actions. The **Quick enquiry** action opens the live booking form. A one-time prompt opens automatically when a downward scroll brings the footer close to the viewport. Escape and backdrop click close it. The action links use the existing live phone number and booking page.

The homepage is a saved site snapshot. The section menu uses [homepage navigation CSS](homepage/navigation.css) and [JavaScript](homepage/navigation.js); the services explorer uses [layout CSS](homepage/services-layout.css) and [JavaScript](homepage/services-layout.js); the enquiry UI uses [shared CSS](cro/enquiry.css) and [JavaScript](cro/enquiry.js). These are local mockup changes, not deployed WordPress changes.
