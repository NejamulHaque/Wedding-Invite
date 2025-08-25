# 💌 Wedding Invitation Website — Adam 💝 Alice

An elegant, responsive online wedding invitation website with RSVP form, countdown timer, gallery, and Google Maps directions.  
Built with **HTML, CSS, and JavaScript**.

---

## ✨ Features
- 🎉 Beautiful hero section with countdown timer
- 👫 Couple’s love story timeline
- 📅 Wedding schedule (Mehndi, Nikah, Reception)
- 🖼️ Gallery with lazy-loaded photos
- 📍 Embedded Google Maps for directions
- 💌 RSVP form with:
  - EmailJS integration (sends RSVP via email)
  - Local storage saving + CSV export
- 🌙 Light/Dark mode toggle
- 📱 Fully responsive (mobile-first design)

---

## 🚀 Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/wedding-invitation.git
cd wedding-invitation
```
## Open in Browser
Simply open index.html in your browser.

## 📧 EmailJS Setup
	1.	Go to EmailJS, create an account.
	2.	Get your Service ID, Template ID, and Public Key.
	3.	In script.js, update this line with your public key:
```bash
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```
## 📍 Google Maps Embed
The venue map uses Google Maps Embed API inside an iframe:
```bash
<iframe 
  class="venue-map"
  title="Google Map"
  src="https://www.google.com/maps?q=Royal%20Orchid%20Banquet%20Delhi&output=embed"
  width="100%" height="380">
</iframe>
```
You can change the venue by updating the query in the src URL.

## 📂 Project Structure
-----------------|
|├── index.html  |     # Main page
|├── style.css   |    # Styling
|├── script.js   |   # Functionality (countdown, RSVP, CSV export, EmailJS)
|└── README.md   |  # Documentation

## 🛠️ Technologies Used
	•	HTML5 for structure
	•	CSS3 (with custom properties & responsive design)
	•	JavaScript (ES6) for interactivity
	•	EmailJS for email-based RSVP
	•	Google Maps Embed API

 ## 📸 Preview
 	•	Hero with countdown
	•	RSVP modal form
	•	Gallery section
	•	Directions map

 ## 👨‍💻 Author
 Built with 💛 by Nejamul Haque
