# Luxe Wedding Theme

Ein luxuriöses, theatralisches Hochzeitswebsite-Theme mit eleganten Gold-Akzenten, dramatischen Animationen und einem aristokratischen Ästhetik.

## ✨ Features

- **23 vollständige Komponenten** für alle Hochzeitsbedürfnisse
- **Theatralisches Design** mit Vorhang-Animationen und Schimmer-Effekten
- **Responsives Layout** für alle Geräte
- **Supabase Integration** für Gästebuch, RSVP, Musikwünsche
- **Cloudinary Integration** für Foto-Uploads
- **Admin Dashboard** zur Gästeverwaltung
- **Barrierefreie Navigation** mit Keyboard-Support

## 🎨 Design-Elemente

- **Farbpalette**: Schwarz (#0A0A0A), Anthrazit (#1A1A1A), Gold (#D4AF37), Champagner (#F4E4BC)
- **Schriften**: Cormorant Garamond (Überschriften) + Montserrat (Text)
- **Animationen**: Vorhang-Reveals, Gold-Shimmer, Scroll-Fade-Ins
- **Dekorative Elemente**: Eck-Rahmen, Punkt-Muster, Gold-Linien

## 📦 Komponenten

| Komponente | Beschreibung |
|------------|--------------|
| Navigation | Fixierte Navigationsleiste mit Scroll-Effekt |
| Hero | Vollbild-Hero mit Vorhang-Animation |
| Countdown | Live-Countdown zum Hochzeitstag |
| LoveStory | Kapitel-basierte Liebesgeschichte |
| Timeline | Tagesablauf mit Icons |
| Locations | Zeremonie- und Empfangsort |
| Directions | Anfahrtsbeschreibung mit Karte |
| Accommodations | Hotel-Empfehlungen |
| Dresscode | Kleiderordnung mit Farbpalette |
| RSVP | Zusage-Formular mit Menüauswahl |
| Gallery | Foto-Galerie mit Lightbox |
| PhotoUpload | Gäste-Foto-Upload mit Drag & Drop |
| Guestbook | Digitales Gästebuch |
| MusicWishes | Musikwünsche der Gäste |
| Gifts | Geschenkewünsche & Bankverbindung |
| ContactWitnesses | Kontakt zu Trauzeugen |
| FAQ | Häufig gestellte Fragen |
| WeddingABC | Hochzeits-ABC von A-Z |
| Contact | Allgemeines Kontaktformular |
| Footer | Footer mit Links & Herz-Animation |
| AdminDashboard | Gäste- und RSVP-Verwaltung |
| ArchivePage | Post-Wedding Foto-Archiv |
| SaveTheDate | Pre-Wedding Landing Page |

## 🚀 Installation

```bash
# Repository klonen
git clone [repository-url]
cd luxe-wedding

# Dependencies installieren
npm install

# Environment-Variablen konfigurieren
cp .env.example .env
# .env mit eigenen Werten ausfüllen

# Entwicklungsserver starten
npm start
```

## ⚙️ Konfiguration

### Environment Variables

```env
# Supabase
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Cloudinary
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# Google Maps (optional)
REACT_APP_GOOGLE_MAPS_API_KEY=your-api-key
```

### Supabase Tabellen

```sql
-- RSVP Einträge
create table rsvps (
  id uuid default gen_random_uuid() primary key,
  guest_name text not null,
  email text,
  attending boolean,
  guests_count integer default 1,
  dietary_requirements text,
  menu_choice text,
  message text,
  created_at timestamp with time zone default now()
);

-- Gästebuch
create table guestbook_entries (
  id uuid default gen_random_uuid() primary key,
  guest_name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Musikwünsche
create table music_wishes (
  id uuid default gen_random_uuid() primary key,
  guest_name text not null,
  song_title text not null,
  artist text,
  note text,
  created_at timestamp with time zone default now()
);

-- Kontakt-Nachrichten
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Gäste-Fotos
create table guest_photos (
  id uuid default gen_random_uuid() primary key,
  guest_name text,
  photo_url text not null,
  created_at timestamp with time zone default now()
);

-- Archiv-Fotos (Post-Wedding)
create table archive_photos (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  category text,
  caption text,
  photographer text,
  created_at timestamp with time zone default now()
);
```

### Wedding Configuration

Die Hochzeitsdaten werden in `App.js` konfiguriert:

```javascript
const weddingConfig = {
  couple: {
    partner1: 'Emma',
    partner2: 'Alexander',
    // ...
  },
  date: {
    full: '15. August 2025',
    time: '14:00 Uhr',
    // ...
  },
  locations: {
    ceremony: { /* ... */ },
    reception: { /* ... */ }
  },
  // Weitere Konfiguration...
};
```

## 📱 Responsive Breakpoints

- Desktop: > 1200px
- Tablet Landscape: 900px - 1200px
- Tablet Portrait: 768px - 900px
- Mobile Large: 600px - 768px
- Mobile: < 600px

## 🔧 Scripts

```bash
npm start      # Entwicklungsserver
npm build      # Production Build
npm test       # Tests ausführen
npm run eject  # CRA eject (nicht empfohlen)
```

## 📁 Projektstruktur

```
luxe-wedding/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Accommodations.js
│   │   ├── AdminDashboard.js
│   │   ├── ArchivePage.js
│   │   ├── Contact.js
│   │   ├── ContactWitnesses.js
│   │   ├── Countdown.js
│   │   ├── Directions.js
│   │   ├── Dresscode.js
│   │   ├── FAQ.js
│   │   ├── Footer.js
│   │   ├── Gallery.js
│   │   ├── Gifts.js
│   │   ├── Guestbook.js
│   │   ├── Hero.js
│   │   ├── Locations.js
│   │   ├── LoveStory.js
│   │   ├── MusicWishes.js
│   │   ├── Navigation.js
│   │   ├── PhotoUpload.js
│   │   ├── RSVP.js
│   │   ├── SaveTheDate.js
│   │   ├── Timeline.js
│   │   └── WeddingABC.js
│   ├── lib/
│   │   ├── cloudinary.js
│   │   └── supabase.js
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── App.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## 🎭 Theme-Anpassung

Das Luxe-Theme verwendet durchgehend CSS-Variablen und styled-components. Die Hauptfarben können in `GlobalStyles.js` angepasst werden:

```javascript
:root {
  --luxe-black: #0A0A0A;
  --luxe-charcoal: #1A1A1A;
  --luxe-gold: #D4AF37;
  --luxe-champagne: #F4E4BC;
  --luxe-cream: #FAF8F5;
}
```

## 📄 Lizenz

Proprietär - S&I Weddings

---

Mit 💛 erstellt von S&I Weddings
