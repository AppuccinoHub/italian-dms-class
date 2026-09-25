/* Italian DMs Class — shared prompts + helpers (no cloud login) */
(function (root) {
  'use strict';

  const ESSERE = {
    io: 'sono', tu: 'sei', 'lui/lei': 'è', lui: 'è', lei: 'è',
    noi: 'siamo', voi: 'siete', loro: 'sono'
  };
  const AVERE = {
    io: 'ho', tu: 'hai', 'lui/lei': 'ha', lui: 'ha', lei: 'ha',
    noi: 'abbiamo', voi: 'avete', loro: 'hanno'
  };
  const ALL_FORMS = ['sono','sei','è','siamo','siete','ho','hai','ha','abbiamo','avete','hanno'];

  /* 10 rounds. Every template names its subject (tu / io / voi / Marco e Leo …) so a
     random wrong chip can never also be grammatical. Roles alternate each round
     (see index.html), so both partners practise questions and answers.
     The student sees their sentence as an unsent draft with the blank (…Reply /
     replyText), its English with ___ (…Blank), and one instruction line built from
     …Subject / …SubjectLabel (names, nouns) / …Verb, plus …Idiom for avere expressions.
     …Gloss is the full English. */
  const CLASS_PROMPTS = [
    { id:'p1', askerReply:'Ehi, tu {FORM} fame? 🍕', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Hey, are you hungry?',
      askerBlank:'Hey, ___ you hungry?', askerSubjectLabel:null, askerIdiom:'avere fame = to be hungry',
      replyText:'Sì, io {FORM} una fame pazzesca!', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I’m super hungry!',
      replyBlank:'Yes, I ___ super hungry!', replySubjectLabel:null, replyIdiom:'avere fame = to be hungry' },
    { id:'p2', askerReply:'Tu dove {FORM} adesso? 👀', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'Where are you right now?',
      askerBlank:'Where ___ you right now?', askerSubjectLabel:null, askerIdiom:null,
      replyText:'Io {FORM} a casa, e tu?', replyAnswer:'sono', replyVerb:'essere', replySubject:'io', replyGloss:'I’m at home, and you?',
      replyBlank:'I ___ at home, and you?', replySubjectLabel:null, replyIdiom:null },
    { id:'p3', askerReply:'Mia sorella {FORM} a scuola fino alle cinque', askerAnswer:'è', askerVerb:'essere', askerSubject:'lei', askerGloss:'My sister is at school until five',
      askerBlank:'My sister ___ at school until five', askerSubjectLabel:'mia sorella (= lei)', askerIdiom:null,
      replyText:'E mio fratello {FORM} una partita stasera ⚽', replyAnswer:'ha', replyVerb:'avere', replySubject:'lui', replyGloss:'And my brother has a game tonight',
      replyBlank:'And my brother ___ a game tonight', replySubjectLabel:'mio fratello (= lui)', replyIdiom:null },
    { id:'p4', askerReply:'Scusa, quanti anni {FORM} tu?', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Sorry, how old are you?',
      askerBlank:'Sorry, how old ___ you?', askerSubjectLabel:null, askerIdiom:'avere … anni = to be … years old',
      replyText:'Io {FORM} sedici anni 🎂', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'I’m sixteen',
      replyBlank:'I ___ sixteen', replySubjectLabel:null, replyIdiom:'avere … anni = to be … years old' },
    { id:'p5', askerReply:'Raga, voi {FORM} freddo? Qui è un freezer 🥶', askerAnswer:'avete', askerVerb:'avere', askerSubject:'voi', askerGloss:'Guys, are you cold? It’s a freezer in here',
      askerBlank:'Guys, ___ you cold? It’s a freezer in here', askerSubjectLabel:null, askerIdiom:'avere freddo = to be cold',
      replyText:'Sì, noi {FORM} tutti freddo!', replyAnswer:'abbiamo', replyVerb:'avere', replySubject:'noi', replyGloss:'Yes, we’re all cold!',
      replyBlank:'Yes, we ___ all cold!', replySubjectLabel:null, replyIdiom:'avere freddo = to be cold' },
    { id:'p6', askerReply:'Marco e Leo {FORM} al parco? 🏀', askerAnswer:'sono', askerVerb:'essere', askerSubject:'loro', askerGloss:'Are Marco and Leo at the park?',
      askerBlank:'___ Marco and Leo at the park?', askerSubjectLabel:'Marco e Leo (= loro)', askerIdiom:null,
      replyText:'Sì, e loro {FORM} il pallone. Andiamo!', replyAnswer:'hanno', replyVerb:'avere', replySubject:'loro', replyGloss:'Yes, and they have the ball. Let’s go!',
      replyBlank:'Yes, and they ___ the ball. Let’s go!', replySubjectLabel:null, replyIdiom:null },
    { id:'p7', askerReply:'Noi {FORM} pronti. Partiamo? 🚀', askerAnswer:'siamo', askerVerb:'essere', askerSubject:'noi', askerGloss:'We’re ready. Shall we go?',
      askerBlank:'We ___ ready. Shall we go?', askerSubjectLabel:null, askerIdiom:null,
      replyText:'Aspetta! Voi {FORM} i biglietti? 🎫', replyAnswer:'avete', replyVerb:'avere', replySubject:'voi', replyGloss:'Wait! Do you guys have the tickets?',
      replyBlank:'Wait! You guys ___ the tickets?', replySubjectLabel:null, replyIdiom:null },
    { id:'p8', askerReply:'Tu {FORM} i compiti di italiano? 📚', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Do you have Italian homework?',
      askerBlank:'You ___ Italian homework?', askerSubjectLabel:null, askerIdiom:null,
      replyText:'Sì, ma i compiti {FORM} facili 😎', replyAnswer:'sono', replyVerb:'essere', replySubject:'loro', replyGloss:'Yes, but the homework is easy',
      replyBlank:'Yes, but the homework ___ easy', replySubjectLabel:'i compiti (= loro)', replyIdiom:null },
    { id:'p9', askerReply:'Tu {FORM} a pezzi? Sembri uno zombie ahah 🧟', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'Are you wiped out? You look like a zombie lol',
      askerBlank:'___ you wiped out? You look like a zombie lol', askerSubjectLabel:null, askerIdiom:null,
      replyText:'Sì, io {FORM} troppo sonno 😴', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I’m way too sleepy',
      replyBlank:'Yes, I ___ way too sleepy', replySubjectLabel:null, replyIdiom:'avere sonno = to be sleepy' },
    { id:'p10', askerReply:'Raga, voi {FORM} incredibili! 💛', askerAnswer:'siete', askerVerb:'essere', askerSubject:'voi', askerGloss:'Guys, you’re amazing!',
      askerBlank:'Guys, you ___ amazing!', askerSubjectLabel:null, askerIdiom:null,
      replyText:'Grazie! Tu {FORM} ragione, siamo un team 😎', replyAnswer:'hai', replyVerb:'avere', replySubject:'tu', replyGloss:'Thanks! You’re right, we’re a team',
      replyBlank:'Thanks! You ___ right, we’re a team', replySubjectLabel:null, replyIdiom:'avere ragione = to be right' }
  ];

  function normalize(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z']/g, '').trim();
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  /* Chips per help level match Solo exactly: More help 2, Just right 4, Challenge 4
     (the right form + 1 / 3 / 3 wrong forms). Every template states its subject,
     so any other form is clearly wrong. */
  const CHIP_COUNTS = { more: 2, mid: 4, challenge: 4 };
  function chipCount(helpLevel) {
    return CHIP_COUNTS[helpLevel] || CHIP_COUNTS.mid;
  }
  function uniqueChips(answer, helpLevel) {
    const ans = normalize(answer);
    const pool = ALL_FORMS.filter((f) => normalize(f) !== ans);
    const n = chipCount(helpLevel) - 1;
    return shuffle([answer].concat(shuffle(pool).slice(0, n)));
  }
  /* Fill the form in; capitalise it when it starts a sentence. */
  function fillForm(template, form) {
    return String(template || '').replace(/(^|[.!?]\s+)\{FORM\}|\{FORM\}/g, (m, lead) =>
      lead !== undefined ? lead + form.charAt(0).toUpperCase() + form.slice(1) : form);
  }
  function makeCode(len) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < (len || 6); i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    return out;
  }
  function teacherPeerId(code) {
    return 'idms-' + String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  }
  function studentPeerId(code, sid) {
    return teacherPeerId(code) + '-s-' + String(sid || '').replace(/[^a-zA-Z0-9]/g, '');
  }
  function makeStudentId() {
    return Math.random().toString(36).slice(2, 10);
  }
  function scorePct(correct, tried) {
    if (!tried) return 0;
    return Math.round((100 * correct) / tried);
  }
  function rowsToCsv(rows) {
    const header = ['Name', 'Partner', 'Score %', 'Correct', 'Scored turns', 'Turned in Y/N', 'Pair score %', 'Timestamp', 'Help level'];
    const lines = [header.join(',')];
    rows.forEach((r) => {
      const vals = [r.name, r.partner, String(r.scorePct), String(r.correct), String(r.turns), r.completed, String(r.pairPct), r.timestamp, r.helpLevel].map((v) => {
        const s = String(v == null ? '' : v);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      });
      lines.push(vals.join(','));
    });
    return lines.join('\n');
  }
  function encodeSubmission(payload) {
    try { return 'IDMS1.' + btoa(unescape(encodeURIComponent(JSON.stringify(payload)))); }
    catch (e) { return ''; }
  }
  function decodeSubmission(text) {
    const t = String(text || '').trim();
    if (!t) return null;
    try {
      if (t.indexOf('IDMS1.') === 0) {
        return JSON.parse(decodeURIComponent(escape(atob(t.slice(6)))));
      }
      return JSON.parse(t);
    } catch (e) { return null; }
  }

  root.ItalianDMsClass = {
    ESSERE, AVERE, ALL_FORMS, CLASS_PROMPTS,
    TARGET_ROUNDS: CLASS_PROMPTS.length,
    SCORED_TURNS: CLASS_PROMPTS.length * 2,
    normalize, shuffle, uniqueChips, chipCount, CHIP_COUNTS, fillForm, makeCode,
    teacherPeerId, studentPeerId, makeStudentId, scorePct,
    rowsToCsv, encodeSubmission, decodeSubmission
  };
})(typeof window !== 'undefined' ? window : globalThis);
