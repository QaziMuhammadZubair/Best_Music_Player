# 🎵 Best Music Player

A mobile music player built with **React Native** and **Expo**. It scans your device for audio files and plays them with simple controls: play, pause, resume and auto-play the next track.

---

## ✨ Features

- 📂 **Loads local audio automatically.** Finds every audio file on the device with `expo-media-library`.
- 🔐 **Handles permissions.** Asks for media access, prompts again if you deny it, and shows an error screen if access is permanently blocked.
- ⚡ **Fast list.** Uses `recyclerlistview` so large music libraries scroll smoothly.
- ▶️ **Playback controls.** Tap a track to play it, tap it again to pause or resume, or tap another track to switch.
- ⏭️ **Auto-play next.** The next track starts when the current one ends. After the last track, playback stops and resets to the first track.
- 🎚️ **Player screen.** Shows the current track title, a progress bar, the track position (e.g. `3 / 120`) and an icon that changes when music is playing.
- 📋 **Options menu.** A bottom sheet for each track with **Play** and **Add to Playlist**.
- 🧭 **Bottom tab navigation.** Three tabs: Music List, Player and Playlist.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Expo SDK 46](https://docs.expo.dev/) | App framework and tooling |
| React Native 0.69 / React 18 | UI |
| `expo-av` | Audio playback |
| `expo-media-library` | Reading audio files on the device |
| `@react-navigation/bottom-tabs` | Tab navigation |
| `recyclerlistview` | Fast list rendering |
| `@react-native-community/slider` | Progress bar |
| `@expo/vector-icons` | Icons |

---

## 📁 Project Structure

```
Best_Music_Player/
├── App.js                      # Entry point (AudioProvider + NavigationContainer)
├── app.json                    # Expo configuration
├── package.json
├── assets/                     # Icons & splash screen
└── app/
    ├── Context/
    │   └── Audioprovider.js    # Global audio state, permissions & file loading
    ├── Screen/
    │   ├── Music_list.js       # Audio list + playback logic
    │   ├── Player.js           # Now-playing screen
    │   └── Play_list.js        # Playlist screen (WIP)
    ├── components/
    │   ├── AudioListItem.js    # Single row in the audio list
    │   ├── OptionModal.js      # Bottom-sheet options modal
    │   ├── PlayerButton.js     # Prev / Play / Pause / Next buttons
    │   └── Screen.js           # Common screen wrapper
    ├── misc/
    │   ├── audioController.js  # play / pause / resume / playNext helpers
    │   └── color.js            # App color palette
    └── navigation/
        └── App_navigation.js   # Bottom tab navigator
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm or yarn
- The **Expo Go** app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)), or an Android emulator / iOS simulator

### Installation

```bash
# Clone the repository
git clone https://github.com/QaziMuhammadZubair/Best_Music_Player.git
cd Best_Music_Player

# Install dependencies
npm install
```

### Running the App

```bash
npm start          # Start the Expo dev server
npm run android    # Open on Android device/emulator
npm run ios        # Open on iOS simulator (macOS only)
npm run web        # Run in the browser
```

Scan the QR code shown in the terminal with **Expo Go** to open the app on your phone.

> **Note:** The app needs permission to read media files. Grant it when asked, or your audio files won't appear. Use a real device with music on it for the best results.

---

## 🧩 How It Works

1. **`Audioprovider`** asks for media permission when the app starts, gets all audio assets, and shares the playback state (`playbackObj`, `soundObj`, `currentAudio`, `isPlaying`, `currentAudioIndex`, position and duration) through React Context.
2. **`Music_list`** shows the tracks. Tapping a track calls `handleAudioPress`, which plays, pauses, resumes or switches tracks using the helpers in **`audioController.js`**.
3. A playback status listener updates the position and duration (used by the Player's progress bar) and moves to the next track when one finishes.
4. **`Player`** reads the shared state to show the current track and its progress.

---

## 🗺️ Roadmap

- [ ] Make the Player screen's Previous / Play-Pause / Next buttons work
- [ ] Seek by dragging the progress bar
- [ ] Create and manage playlists ("Add to Playlist")
- [ ] Shuffle & repeat modes
- [ ] Background playback & lock-screen controls
- [ ] Save the last played track

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Add a `LICENSE` file (e.g. MIT) to set the terms.

