# necesito

**¿Qué necesitas, mi amor?**

A tiny bilingual sick-day request page. My wife was sick in bed while we were on vacation, so I built her a page of big papel picado buttons. She taps one, her iPhone opens a text to me with the words already written, and she presses send.

No server. No login. One HTML file. No phone number in the code.

**Live:** https://earlgreyhot1701d.github.io/necesito/

## What she sees

| Button | English helper | Text I get |
|---|---|---|
| 🍵 Té, por favor | Tea, please | 🍵 Té, por favor (Tea, please) |
| 🥤 Agua o jugo | Water or juice | 🥤 Agua o jugo, por favor (Water or juice) |
| 🛌 Otra cobija | Extra blanket | 🛌 Otra cobija, por favor (Extra blanket) |
| 🍲 Sopita o algo de comer | Soup or a snack | 🍲 Algo de comer, por favor (Soup or a snack) |
| 🌙 Luz baja y silencio | Lights down, quiet | 🌙 Luz baja y silencio, por favor (Lights down, quiet) |
| 🤍 Ven a sentarte conmigo | Come sit with me | 🤍 Ven a sentarte conmigo (Come sit with me) |
| 💬 Otra cosa | Something else | A blank text, she types her own |

The page is in Spanish with a small English line under everything, so she always knows what she's tapping.

## How it works

1. I text her the link once, with my number on the end: `https://earlgreyhot1701d.github.io/necesito/#5551234567`
2. When she needs something, she scrolls to that text and taps the link.
3. She taps a button.
4. Messages opens with the text already written. She presses **send**.
5. My phone buzzes. That text is the notification.

### Where the number lives

Not in this repo. The number rides in the link after the `#`. Browsers never send that part to the server, so GitHub never sees it either. A few lines of script on the page:

- read the part after `#`
- accept it only if it's 10 to 15 digits, nothing else
- build each button as an iPhone text link: `sms:NUMBER&body=TEXT`

A link with no number, or anything that isn't digits, shows a friendly "ask Shara for the link again" note and the buttons stay off.

## Make your own

1. Fork this repo.
2. Edit the `items` list in `build.js` to change buttons, emoji, or messages.
3. Run `node build.js` to regenerate `index.html`.
4. Turn on GitHub Pages: **Settings → Pages → Deploy from branch → main / root**.
5. Text your person the link with your number after the `#`. A 10-digit US number gets `+1` added. For other countries, put the full number with country code, digits only.

## Limitations

- **She still has to press send.** iPhones don't let a web page send a text on its own. That's a safety rule, not a bug.
- **The text link format is iPhone-first.** Android usually wants `?body=` instead of `&body=`. Not tested on Android.
- **It only works where Messages works.** If her phone can't text, the page can't either. The footer shows the number as a backup.
- **The number is in the link.** It's not in the repo, but anyone she forwards the link to can see it.
- **No number, no buttons.** If the `#` part gets lost, the buttons turn off and the page asks for the link again.
- **It doesn't check that I read the text.** It's a request button, not a pager.

## v2 notes

Not built yet. Notes for the next pass.

- **Prefill "Otra cosa."** Her first tap was the blank button, and an empty text left her unsure what to do. v2 opens it with `Necesito... (I need...)` already typed, so the cursor lands in a sentence instead of a void.
- **Watch SMS length once messages get longer.** A dev.to reader pointed out that one emoji switches a text from GSM-7 to UCS-2 encoding, which drops a single text from 160 characters to 70. The pre-written texts all fit today:

| Button | Characters |
|---|---|
| Té, por favor | 30 |
| Agua o jugo | 42 |
| Otra cobija | 41 |
| Sopita o algo de comer | 45 |
| Luz baja y silencio | 54 (longest) |
| Ven a sentarte conmigo | 44 |

The open-ended "Otra cosa" text is where a long request could split into two. If she sends over iMessage, this limit doesn't apply. It only matters if a text goes out as plain SMS.

## Files

| File | Job |
|---|---|
| `index.html` | The page. Generated, don't hand-edit. |
| `build.js` | Builds `index.html` from the button list. |
| `og.png` | Social card. The pretty preview in iMessage when you text the link. |
| `apple-touch-icon.png` | Favicon and iPhone icon. |
| `robots.txt` | Keeps search engines out. Someone's resting. |
| `humans.txt` | Who made this. |

## Credits

Built on a Chromebook, on vacation, in about an hour, with Claude. Papel picado flags are pure CSS.

AI assisted. Human approved. Powered by NLP.

MIT License
