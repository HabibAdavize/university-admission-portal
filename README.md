# University Admission Portal | ICS 206 GROUP 6

A modern, responsive web dummy application for managing university admissions, built with HTML, CSS, and JavaScript.

---

## Features

- **Student Dashboard**: Personalized dashboard with progress tracking and quick navigation.
- **Sidebar Navigation**: Responsive sidebar injected dynamically on every page for easy updates.
- **Authentication**: Login/logout with session management using localStorage.
- **Application Progress**: Visual progress steps for application completion.
- **Payments**: Secure, responsive payment form with validation and card formatting.
- **Fees & Receipts**: Searchable transaction history and printable receipts.
- **Document Management**: Upload, view, and download required documents.
- **Transfer Requests**: Submit and track program transfer requests.
- **Admission Status**: View and print admission letters.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.
- **Accessible UI**: Keyboard navigation, ARIA labels, and color contrast.

---

## Project Structure

```
university-admission-portal/
│
├── components/
│   └── sidebar.html         # Sidebar partial, injected into every dashboard page
│
├── styles/
│   ├── application.css
│   ├── dashboard.css
│   ├── login.css
│   ├── ...                  # Other page-specific styles
│   
│
├── images/                  # All images and icons
│
├── dashboard.html
├── program.html
├── application.html
├── payments.html
├── fees-receipts.html
├── admission-status.html
├── profile.html
├── documents.html
├── transfer-requests.html
├── login.html
├── index.html
│── styles.css           # Global styles (layout, sidebar, header,  etc.)
└── script.js                # All global JS logic
```

---

## How It Works

### 1. Sidebar Injection
- The sidebar is defined once in `components/sidebar.html`.
- On every dashboard page, a `<div id="sidebar-placeholder"></div>` is placed where the sidebar should appear.
- On page load, JavaScript fetches and injects the sidebar HTML into this placeholder.
- The sidebar includes a toggle button and backdrop for mobile responsiveness.

### 2. Responsive Layout
- The layout uses Flexbox for the dashboard: sidebar and main content are siblings inside `.dashboard-body`.
- On desktop, the sidebar is fixed and `.dashboard-main` has a left margin.
- On mobile, the sidebar slides in/out and overlays the main content.

### 3. Navigation & Active State
- The active sidebar link is highlighted automatically based on the current page.
- The sidebar toggle icon switches between hamburger and close icons depending on state.

### 4. Authentication
- Login form validates input and stores session info in `localStorage`.
- Protected pages redirect to login if not authenticated.
- Logout clears session and redirects to home.

### 5. Forms & Validation
- All forms (login, payment, transfer, etc.) have client-side validation.
- Payment form includes card number formatting and expiry validation.

### 6. Notifications & Modals
- Custom notifications appear for actions (success, error, info).
- Modals are used for document viewing and transfer requests, with keyboard and click-outside support.

### 7. Accessibility
- All interactive elements have ARIA labels.
- Keyboard shortcuts (e.g., ESC to close modals, Ctrl+L to logout).
- Focus states and color contrast are considered.

---

## Running the Project Locally

**Because the sidebar is injected via AJAX, you must use a local web server.**

### Quick Start with Python (no install needed if you have Python 3):

```sh
cd university-admission-portal
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Or use VS Code Live Server:

- Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
- Right-click `index.html` and select **"Open with Live Server"**.

---

## Responsive Design

- All layouts adapt for mobile, tablet, and desktop.
- Sidebar and navigation collapse into toggles on small screens.
- Images and tables become scrollable or stack vertically.

---

## Customization

- **Sidebar:** Edit `components/sidebar.html` to change navigation for all pages.
- **Styles:** Update `styles.css` for global changes, or page-specific CSS for individual pages.
- **JS Logic:** All global logic is in `script.js`. Add new features or tweak behaviors here.

---

## Best Practices Used

- DRY principle: Sidebar and navigation are defined once and reused everywhere.
- Modular CSS: Global and page-specific styles are separated.
- Semantic HTML and ARIA for accessibility.
- Responsive and mobile-first design.
- Clean, commented JavaScript.

---

## FAQ

**Q: Why doesn’t the sidebar appear when I open HTML files directly?**  
A: You must use a local web server because AJAX/fetch doesn’t work with `file://` URLs.

**Q: How do I add a new dashboard page?**  
A: Create a new HTML file, add `<div id="sidebar-placeholder"></div>` inside `.dashboard-body`, and the sidebar will appear automatically.

**Q: How do I change the sidebar links?**  
A: Edit `components/sidebar.html` and refresh your pages.

---

## Credits

- UI icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts - Raleway](https://fonts.google.com/specimen/Raleway)

---

**GROUP 6 University Admission Portal!**  
If you have any questions or need further help, just ask.
