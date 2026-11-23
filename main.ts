// Entry for make.fun's "Real-Life Patch Notes: The Comedy Changelog".
//
// The whole program is one job: put a single one-line patch note for a bug
// in real life / human biology into entry.txt inside the output directory,
// byte for byte the same on every run. The grader points MAKEFUN_OUTPUT_DIR
// at its own scratch output folder; on a plain machine the fallback is
// /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the patch note lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the entire
// entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The patch note itself. The bug is real and universal: the brain keeps a
// highlight reel of your most embarrassing moments and replays one, unasked,
// at 3 a.m. — filed here in the terse register of a real release note, with
// a version tag, a past-tense fix, and a specific year so the punchline
// lands on something concrete instead of a vague "long ago".
const NOTE =
  'v2.0.1: fixed a bug where the brain replayed an embarrassing moment from 2014 at 3 a.m. for no reason.';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("Real-Life Patch Notes"): the entry must be a single
// line of 1–160 characters. Enforced here so a bad edit fails loudly
// instead of silently producing an entry the judge rejects.
const MIN_NOTE_LENGTH = 1;
const MAX_NOTE_LENGTH = 160;

function validateNote(note) {
  if (note.length < MIN_NOTE_LENGTH || note.length > MAX_NOTE_LENGTH) {
    throw new Error(
      `Patch note must be ${MIN_NOTE_LENGTH}-${MAX_NOTE_LENGTH} characters, got ${note.length}.`,
    );
  }
  if (note.includes('\n') || note.includes('\r')) {
    throw new Error('Patch note must be a single line (no newline characters).');
  }
  if (note.trim() !== note) {
    throw new Error('Patch note must not have leading or trailing whitespace.');
  }
  if (!/^v\d+\.\d+\.\d+:/.test(note)) {
    throw new Error('Patch note must open with a release version tag (e.g. v2.0.1:).');
  }
  if (/ {2,}/.test(note)) {
    throw new Error('Patch note must not contain padded double spaces.');
  }
}

validateNote(NOTE);

writeFileSync(join(outputDir, 'entry.txt'), NOTE, 'utf8');
