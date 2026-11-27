// One Word for Your Wi-Fi — entry program.
//
// The entry is a single word describing the entrant's home Wi-Fi —
// the way it vanishes right when you need it most, like a bad date
// that stops replying mid-conversation. This program holds that word,
// checks it against the competition gate, and writes it verbatim to
// entry.txt in the output directory.

const ENTRY_WORD = "ghosting";

// Where the entry file goes. The grader sets MAKEFUN_OUTPUT_DIR; without
// it we fall back to /output, the path the competition expects.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be 1 to 20 characters, not only whitespace, and
// exactly one word — no spaces or other whitespace anywhere inside it.
if (ENTRY_WORD.length < 1 || ENTRY_WORD.length > 20) {
  throw new Error(
    `entry word must be 1 to 20 characters, got ${ENTRY_WORD.length}`,
  );
}
if (ENTRY_WORD.trim() !== ENTRY_WORD || ENTRY_WORD.length === 0) {
  throw new Error("entry word must not be blank or padded with whitespace");
}
if (/\s/.test(ENTRY_WORD)) {
  throw new Error("entry must be exactly one word with no whitespace");
}
// A one-word entry is a single run of letters: no digits, punctuation,
// or hyphens smuggling a second word in.
if (!/^[A-Za-z]+$/.test(ENTRY_WORD)) {
  throw new Error("entry word must contain only letters");
}

const fs = require("node:fs");
const path = require("node:path");

fs.mkdirSync(outputDir, { recursive: true });
// Write the word exactly, with no trailing newline, so the file's bytes
// are the word and nothing else.
fs.writeFileSync(path.join(outputDir, "entry.txt"), ENTRY_WORD, "utf8");
