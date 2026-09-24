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
     (see index.html), so both partners practise questions and answers. */
  const CLASS_PROMPTS = [
    { id:'p1', askerCue:'Ask if they are hungry — avere fame (tu)', askerReply:'Ehi, tu {FORM} fame? 🍕', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Hey, are you hungry?',
      replyCue:'Say yes, you are really hungry — avere fame (io)', replyText:'Sì, io {FORM} una fame pazzesca!', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I’m super hungry!' },
    { id:'p2', askerCue:'Ask where they are right now — essere (tu)', askerReply:'Tu dove {FORM} adesso? 👀', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'Where are you right now?',
      replyCue:'Say you are at home — essere (io)', replyText:'Io {FORM} a casa, e tu?', replyAnswer:'sono', replyVerb:'essere', replySubject:'io', replyGloss:'I’m at home, and you?' },
    { id:'p3', askerCue:'Say your sister is at school until five — essere (lei)', askerReply:'Mia sorella {FORM} a scuola fino alle cinque', askerAnswer:'è', askerVerb:'essere', askerSubject:'lei', askerGloss:'My sister is at school until five',
      replyCue:'Say your brother has a game tonight — avere (lui)', replyText:'E mio fratello {FORM} una partita stasera ⚽', replyAnswer:'ha', replyVerb:'avere', replySubject:'lui', replyGloss:'And my brother has a game tonight' },
    { id:'p4', askerCue:'Ask how old they are — avere … anni (tu)', askerReply:'Scusa, quanti anni {FORM} tu?', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Sorry, how old are you?',
      replyCue:'Say you are 16 — avere … anni (io)', replyText:'Io {FORM} sedici anni 🎂', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'I’m sixteen' },
    { id:'p5', askerCue:'Ask if you guys are cold — avere freddo (voi)', askerReply:'Raga, voi {FORM} freddo? Qui è un freezer 🥶', askerAnswer:'avete', askerVerb:'avere', askerSubject:'voi', askerGloss:'Guys, are you cold? It’s a freezer in here',
      replyCue:'Say you are all cold — avere freddo (noi)', replyText:'Sì, noi {FORM} freddo tutti!', replyAnswer:'abbiamo', replyVerb:'avere', replySubject:'noi', replyGloss:'Yes, we’re all cold!' },
    { id:'p6', askerCue:'Ask if Marco and Leo are at the park — essere (loro)', askerReply:'Marco e Leo {FORM} al parco? 🏀', askerAnswer:'sono', askerVerb:'essere', askerSubject:'loro', askerGloss:'Are Marco and Leo at the park?',
      replyCue:'Say yes, and they have the ball — avere (loro)', replyText:'Sì, e loro {FORM} il pallone. Andiamo!', replyAnswer:'hanno', replyVerb:'avere', replySubject:'loro', replyGloss:'Yes, and they have the ball. Let’s go!' },
    { id:'p7', askerCue:'Say “we are ready” — essere (noi)', askerReply:'Noi {FORM} pronti. Partiamo? 🚀', askerAnswer:'siamo', askerVerb:'essere', askerSubject:'noi', askerGloss:'We’re ready. Shall we go?',
      replyCue:'Ask if you all have the tickets — avere (voi)', replyText:'Aspetta! Voi {FORM} i biglietti? 🎫', replyAnswer:'avete', replyVerb:'avere', replySubject:'voi', replyGloss:'Wait! Do you guys have the tickets?' },
    { id:'p8', askerCue:'Ask if they have Italian homework — avere (tu)', askerReply:'Tu {FORM} i compiti di italiano? 📚', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Do you have Italian homework?',
      replyCue:'Say yes, but the homework is easy — essere (loro: i compiti)', replyText:'Sì, ma i compiti {FORM} facili 😎', replyAnswer:'sono', replyVerb:'essere', replySubject:'loro', replyGloss:'Yes, but the homework is easy' },
    { id:'p9', askerCue:'Ask if they are wiped out — essere (tu)', askerReply:'Tu {FORM} a pezzi? Sembri uno zombie ahah 🧟', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'Are you wiped out? You look like a zombie lol',
      replyCue:'Say you are so sleepy — avere sonno (io)', replyText:'Sì, io {FORM} troppo sonno 😴', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I’m way too sleepy' },
    { id:'p10', askerCue:'Tell the group “you guys are the best” — essere (voi)', askerReply:'Raga, voi {FORM} i migliori! 💛', askerAnswer:'siete', askerVerb:'essere', askerSubject:'voi', askerGloss:'Guys, you’re the best!',
      replyCue:'Say thanks, you are right — avere ragione (tu)', replyText:'Grazie! Tu {FORM} ragione, siamo un team 😎', replyAnswer:'hai', replyVerb:'avere', replySubject:'tu', replyGloss:'Thanks! You’re right, we’re a team' }
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
  function uniqueChips(answer, helpLevel) {
    const ans = normalize(answer);
    const pool = ALL_FORMS.filter((f) => normalize(f) !== ans);
    let n = 3;
    if (helpLevel === 'more') n = 2;
    if (helpLevel === 'challenge') n = 4;
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
    normalize, shuffle, uniqueChips, fillForm, makeCode,
    teacherPeerId, studentPeerId, makeStudentId, scorePct,
    rowsToCsv, encodeSubmission, decodeSubmission
  };
})(typeof window !== 'undefined' ? window : globalThis);
