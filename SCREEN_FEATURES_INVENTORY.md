# Jellyfin Web - Screens & Features Inventory (for HTMX Rewrite)

*Generated: 2026-11-02 | Version: 13.0.0*

## Overview

Jellyfin Web is the frontend for Jellyfin media server. It currently uses:
- **React 18** (modern app in `src/apps/modern/`) + **React Router 6**
- **Legacy jQuery-style views** (in `src/apps/legacy/`) loaded via ViewManager
- **Webpack/Vite** build system
- **Material UI/Emby-style components**
- API via `@jellyfin/sdk` and custom apiclient

This document catalogs all user-facing screens/routes and features to guide an HTMX rewrite.

---

## App Architecture

| App | Location | Purpose |
|---|---|---|
| **Modern App** | `src/apps/modern/` | New React-based UI (home, libraries, user prefs, etc.) |
| **Dashboard App** | `src/apps/dashboard/` | Server admin interface (settings, users, plugins, etc.) |
| **Legacy App** | `src/apps/legacy/` | Older jQuery/Emby-style views/controllers |
| **Wizard App** | `src/apps/wizard/` | First-time setup wizard |

---

## 1. Public Routes (Unauthenticated)

### Modern App Public
| Route | Page/Handler | Type | Description |
|---|---|---|---|
| `/forgotpassword` | `session/forgotPassword` (async) | Modern | Password recovery flow |

### Legacy App Public
| Route | Controller | View | Description |
|---|---|---|---|
| `/addserver` | `session/addServer/index` | `session/addServer/index.html` | Add/connect to a Jellyfin server |
| `/selectserver` | `session/selectServer/index` | `session/selectServer/index.html` | Choose from saved servers |
| `/login` | `session/login/index` | `session/login/index.html` | User login (username/password, quick connect) |
| `/forgotpasswordpin` | `session/resetPassword/index` | `session/resetPassword/index.html` | Reset password with PIN |

**Auth Features:**
- Server discovery/config
- User authentication
- Quick Connect
- Password reset via PIN
- Guest access (public connection level)

---

## 2. User Routes (Authenticated) - Modern App

### Library/Home Screens (Async - React)
| Route | Page | Description |
|---|---|---|
| `/home` | `home` | Home dashboard (latest media, resume, next up, recommendations) |
| `/movies` | `movies` | Movies library view |
| `/tv` / `/shows` | `shows` | TV Shows library view |
| `/music` | `music` | Music library view |
| `/books` | `books` | Books/eBooks library view |
| `/musicvideos` | `musicvideos` | Music Videos library view |
| `/homevideos` | `homevideos` | Home Videos & Photos library view |
| `/boxsets` | `boxsets` | Collections/Box Sets |
| `/playlists` | `playlists` | User playlists |
| `/mixed` | `mixed` | Mixed/all items view |
| `/livetv` | `livetv` | Live TV guide/suggested |

### User Preferences (Async - React)
| Route | Page | Description |
|---|---|---|
| `/mypreferencesdisplay` | `user/display` | Display preferences (theme, layout, etc.) |
| `/mypreferencesmenu` | `user/settings` | Settings menu hub |
| `/userprofile` | `user/userprofile` | User profile management |

### Other User Routes
| Route | Page | Description |
|---|---|---|
| `/quickconnect` | `quickConnect` | Quick Connect authorization |
| `/search` | `search` | Global search |

### Special Routes
| Route | Component | Description |
|---|---|---|
| `/video` | `VideoPage` (custom) | Video playback page with modern controls + legacy view integration |

---

## 3. User Routes (Authenticated) - Legacy App

These use the legacy ViewManager with jQuery-based controllers and HTML views.

| Route | Controller | View | Description | Notes |
|---|---|---|---|---|
| `/details` | `itemDetails/index` | `itemDetails/index.html` | Item detail page (movie/show/album/track etc.) | Full metadata, cast, seasons/episodes, similar items, playback options |
| `/list` | `list` | `list.html` | Generic item list view | Used for various filtered lists |
| `/lyrics` | `lyrics` | `lyrics.html` | Lyrics display for music tracks | Synchronized lyrics support |
| `/queue` | `playback/queue/index` | `playback/queue/index.html` | Now playing queue | Fullscreen, no now playing bar | 
| `/mypreferencescontrols` | `user/controls/index` | `user/controls/index.html` | Playback/control preferences | Remote control, autoplay settings |
| `/mypreferenceshome` | `user/home/index` | `user/home/index.html` | Home screen customization | Sections, order, visibility |
| `/mypreferencesplayback` | `user/playback/index` | `user/playback/index.html` | Playback preferences | Streaming quality, subtitles, audio |
| `/mypreferencessubtitles` | `user/subtitles/index` | `user/subtitles/index.html` | Subtitle preferences | Style, language defaults |

---

## 4. Admin/Dashboard Routes

All under `/dashboard/*` with admin authentication required.

### Async Admin Routes (React - Modern/Dashboard)
| Route | Page | Description |
|---|---|---|
| `/dashboard` | `` (index) | Dashboard home/overview |
| `/dashboard/activity` | `activity` | Server activity log |
| `/dashboard/backups` | `backups` | Server backups management |
| `/dashboard/branding` | `branding` | Branding/customization (login screen, splash) |
| `/dashboard/devices` | `devices` | Connected devices/sessions |
| `/dashboard/settings` | `settings` | General server settings |
| `/dashboard/keys` | `keys` | API keys management |
| `/dashboard/libraries` | `libraries` | Library management |
| `/dashboard/libraries/display` | `libraries/display` | Library display settings |
| `/dashboard/libraries/metadata` | `libraries/metadata` | Metadata settings |
| `/dashboard/libraries/nfo` | `libraries/nfo` | NFO metadata settings |
| `/dashboard/livetv` | `livetv` | Live TV setup/config |
| `/dashboard/livetv/recordings` | `livetv/recordings` | DVR recordings management |
| `/dashboard/logs` | `logs` | Server logs |
| `/dashboard/logs/:file` | `logs/file` | Specific log file view |
| `/dashboard/networking` | `networking` | Network settings (ports, HTTPS, etc.) |
| `/dashboard/playback/resume` | `playback/resume` | Resume playback settings |
| `/dashboard/playback/streaming` | `playback/streaming` | Streaming/bitrate settings |
| `/dashboard/playback/transcoding` | `playback/transcoding` | Transcoding settings |
| `/dashboard/playback/trickplay` | `playback/trickplay` | Trickplay/seek preview settings |
| `/dashboard/plugins` | `plugins` | Installed plugins |
| `/dashboard/plugins/:pluginId` | `plugins/plugin` | Plugin details/config |
| `/dashboard/plugins/repositories` | `plugins/repositories` | Plugin repositories |
| `/dashboard/tasks` | `tasks` | Scheduled tasks |
| `/dashboard/tasks/:id` | `tasks/task` | Task details |
| `/dashboard/users` | `users` | User management |
| `/dashboard/users/add` | `users/add` | Add new user |
| `/dashboard/users/:userId/:tab` | `users/edit` | Edit user (profile, access, parental, etc.) |

### Legacy Admin Routes
| Route | Controller | View | Description |
|---|---|---|---|
| `/dashboard/livetv/guide` | `livetvguideprovider` | `livetvguideprovider.html` | Live TV guide provider setup |
| `/dashboard/livetv/tuner` | `livetvtuner` | `livetvtuner.html` | Live TV tuner setup |
| `/dashboard/metadata` | `edititemmetadata` | `edititemmetadata.html` | Metadata manager/editor |
| `/dashboard/configurationpage` | (ServerContentPage) | Remote config page | Plugin configuration pages (loaded from server) |

---

## 5. Wizard Routes (First-Time Setup)

| Route | Description |
|---|---|
| `/wizard/*` | Setup wizard for initial server configuration (language, user creation, library setup, etc.) - See `src/apps/wizard/` |

---

## 6. Core UI Components & Features

### Navigation & Layout
- **App Layout** (`src/apps/modern/AppLayout.tsx`) - Main app shell with drawer, toolbar, etc.
- **App Drawer** (`src/apps/modern/components/drawers/AppDrawer.tsx`, `MainDrawerContent.tsx`) - Navigation sidebar
- **App Toolbar** (`src/apps/modern/components/AppToolbar/`) - Top bar with search, sync play, remote play, user menu
- **User Views Nav** - Dynamic library shortcuts
- **Now Playing Bar** - Mini player at bottom (can be disabled on fullscreen pages like queue)

### Media Browsing (Modern)
- **LibraryPage** - Generic library browser for all media types
- **ItemsView** - Grid/list view of items with filtering/sorting
- **ViewSettings** - Display options (poster/banner/list, etc.)
- **SortButton** - Sort by name, date added, rating, etc.
- **Filter System** - Rich filtering (genres, years, studios, tags, ratings, status, etc.)
  - Genres, Years, Studios, Tags, Official Ratings
  - Features (subtitles, trailers, special features)
  - Video Types, Audio Languages, Subtitle Languages
  - Series Status, Episodes Status, Status (watched/unwatched)
- **AlphabetPicker** - Jump to letter
- **Pagination** - Page navigation
- **GenresView/GenresSection** - Browse by genre
- **SuggestionsSectionView** - Recommendations/suggestions
- **UpcomingView** - Upcoming episodes (for TV)
- **GuideView** - Live TV guide

### Media Playback
- **Video Player** - HTML5 video player with Jellyfin integration (`src/plugins/htmlVideoPlayer/`)
- **Audio Player** - HTML5 audio player (`src/plugins/htmlAudioPlayer/`)
- **Now Playing Queue** - Manage playback queue
- **SyncPlay** - Watch together feature (SyncPlayButton, SyncPlayMenu, SyncPlayGroupListItem)
- **Remote Play** - Cast to other devices (RemotePlayButton, RemotePlayMenu)
- **Chromecast** - Chromecast support (`src/plugins/chromecastPlayer/`)
- **Playback Controls** - Play/pause/seek/volume/subtitles/audio tracks/chapters

### Item Details
- **PlayOrResumeButton** - Play/resume action
- **PlayTrailerButton** - Trailer playback
- **ShuffleButton** - Shuffle play
- **InstantMixButton** - Instant mix radio
- **DownloadButton** - Download for offline (where supported)
- **SplitVersionsButton** - Manage multiple versions
- **MoreCommandsButton** - Context menu/actions
- **CancelTimerButton/CancelSeriesTimerButton** - DVR timer management
- **Seasons/Episodes** - Episode lists, season browsing
- **Cast & Crew** - People/actors display
- **Similar Items** - Recommendations
- **Metadata display** - Ratings, genres, studios, tags, overview, etc.

### User Features
- **Favorites** - Mark items as favorites
- **Watched/Unwatched** - Track watch status
- **Resume Playback** - Continue watching
- **Next Up** - Next episode to watch
- **Collections** - Box sets/collections
- **Playlists** - Create/manage playlists
- **User Profiles** - Multi-user support
- **Parental Controls** - Rating restrictions
- **Display Preferences** - Theme, card layout, etc.
- **Localization** - Multi-language support (`src/strings/`)

### Media Types Support
- Movies, TV Shows (series/seasons/episodes)
- Music (artists/albums/tracks)
- Music Videos
- Books/eBooks
- Home Videos & Photos
- Live TV (channels, guide, recordings, series timers)
- Playlists
- Box Sets/Collections
- Mixed libraries

---

## 7. Legacy App Details (jQuery-style)

### Legacy Controllers (40 files) - Key Screens
**Home & Recommendations:**
- `home.js`, `hometab.js` - Home screen
- `favorites.js` - Favorites

**Movies:**
- `movies/movies.js`, `movies/moviesrecommended.js` - Movie browsing

**TV Shows:**
- `shows/tvshows.js`, `shows/tvrecommended.js`, `shows/tvupcoming.js`, `shows/tvgenres.js`, `shows/tvstudios.js`, `shows/episodes.js`

**Music:**
- `music/musicalbums.js`, `music/musicartists.js`, `music/musicgenres.js`, `music/musicplaylists.js`, `music/songs.js`, `music/musicrecommended.js`, `music/music.html`

**Live TV:**
- `livetv.html`, `livetv/livetvsuggested.js`, `livetv/livetvchannels.js`, `livetv/livetvguide.js`, `livetv/livetvrecordings.js`, `livetv/livetvschedule.js`, `livetv/livetvseriestimers.js`

**Playback:**
- `playback/video/index.js`, `playback/queue/index.js` - Video playback & queue

**User:**
- `user/controls/`, `user/display/`, `user/home/`, `user/playback/`, `user/subtitles/` - Preferences
- `user/profile/` (various user pages)

**Other:**
- `itemDetails/index.js` - Item details
- `list.js` - Generic lists
- `lyrics.js` - Lyrics
- `edititemmetadata.js` - Metadata editing (also in dashboard)

### Legacy Views (.html files - 20 files)
Corresponding HTML templates for the controllers above.

---

## 8. Plugins & Extensions

**Player Plugins:**
- `htmlVideoPlayer` - HTML5 video
- `htmlAudioPlayer` - HTML5 audio  
- `chromecastPlayer` - Chromecast
- `sessionPlayer` - Remote session playback
- `comicsPlayer` - Comic book reader
- `bookPlayer` - eBook reader
- `pdfPlayer` - PDF viewer
- `photoPlayer` - Photo viewer
- `youtubePlayer` - YouTube integration

**Other Plugins:**
- `syncPlay` - Watch together
- `logoScreensaver`, `backdropScreensaver` - Screensavers
- `stillWatching` - Still watching detection
- `playAccessValidation` - Playback access control
- `experimentalWarnings` - Experimental feature warnings

---

## 9. Key Technologies & Patterns

| Technology | Usage |
|---|---|
| **React 18** | Modern app UI components |
| **React Router 6** | Routing |
| **TypeScript** | Modern app (mixed with JS in legacy) |
| **Material UI / JSS** | Component styling (some MUI usage) |
| **Sass/SCSS** | Styling |
| **jQuery** | Legacy app/controllers |
| **Webpack** | Bundling (main build) |
| **Vite** | Also configured (`vite.config.ts`) |
| **@jellyfin/sdk** | Official Jellyfin API client |
| **dompurify** | HTML sanitization |
| **sortablejs** | Drag & drop |
| **date-fns** | Date formatting |
| **lodash-es** | Utilities |

**Architecture Patterns:**
- App-based architecture (modern/dashboard/legacy/wizard)
- Route-based code splitting
- Plugin system for players/screensavers
- ViewManager for legacy views
- Connection/auth level guards
- Theme system (`src/themes/`)

---

## 10. HTMX Rewrite Considerations

For rewriting to HTMX, key areas to focus on:

### High Priority (Core User Flows)
1. **Authentication** - Login, server select, add server
2. **Home** - Dashboard with resume/next up/latest
3. **Library Browsing** - Movies/TV/Music with filters/sort
4. **Item Details** - Metadata, play buttons, seasons/episodes
5. **Video Playback** - Core player functionality
6. **Search** - Global search

### Medium Priority
7. **Live TV** - Guide, channels, recordings
8. **Music** - Album/artist views, now playing
9. **User Preferences** - Settings pages
10. **Playlists/Collections**

### Lower Priority (Admin/Complex)
11. **Dashboard/Admin** - Server management (complex forms/tables)
12. **Metadata Editor** - Complex editing UI
13. **SyncPlay** - Real-time collaboration features

### Technical Considerations
- **API**: Jellyfin has REST API (`/Users/{userId}/Items`, etc.) - HTMX can call directly or through backend proxy
- **State**: Replace React state with server-side state + HTMX swaps
- **Real-time**: WebSocket for playback sync, activity, etc. may need JS or SSE
- **Player**: HTML5 video/audio players will still need JS
- **Routing**: HTMX can use `hx-push-url` or traditional routing
- **Authentication**: Session/token auth with Jellyfin API
- **Theming**: CSS-based theming system exists

---

## Summary Stats

| Category | Count |
|---|---|
| Modern App Routes (async) | ~22 user routes + admin routes |
| Legacy App Routes | ~12 user routes + 2 admin routes |
| Public Routes | ~5 routes |
| Dashboard Admin Routes | ~30+ routes |
| Legacy Controllers | 40 JS files |
| Legacy Views | 20 HTML files |
| React Components (non-test) | ~211 TSX files |
| Plugins | ~15 plugins |
| Media Libraries Supported | Movies, TV, Music, Books, Home Videos, Photos, Live TV |

---
