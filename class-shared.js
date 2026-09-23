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

  const CLASS_PROMPTS = [
    { id:'p1', askerCue:'Ask if they are hungry — use avere (tu)', askerReply:'{FORM} fame?', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Are you hungry?',
      replyCue:'Say you are hungry — avere fame (io)', replyText:'Sììì, {FORM} fameaaa!!!', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yesss, I am hungry!!!' },
    { id:'p2', askerCue:'Ask if they are thirsty — avere sete (tu)', askerReply:'Ehi, {FORM} sete? Prendiamo qualcosa', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Hey, are you thirsty?',
      replyCue:'Reply: we are thirsty — avere (noi)', replyText:'Bro, noi {FORM} sete dopo il calcio', replyAnswer:'abbiamo', replyVerb:'avere', replySubject:'noi', replyGloss:'Bro, we are thirsty after soccer' },
    { id:'p3', askerCue:'Ask if they are cold — avere freddo (tu)', askerReply:'Raga… {FORM} freddo? Qui è un freezer', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Are you cold?',
      replyCue:'Say you are cold — avere (io)', replyText:'Sì, {FORM} freddo — metto la felpa', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I am cold' },
    { id:'p4', askerCue:'Ask if they are hot — avere caldo (tu)', askerReply:'Dai, {FORM} caldo? Apriamo la finestra', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Are you hot?',
      replyCue:'Say you are hot — avere (io)', replyText:'{FORM} caldooo, spegni il termosifone', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'I am so hot' },
    { id:'p5', askerCue:'Ask if they are sleepy — avere sonno (tu)', askerReply:'{FORM} sonno? Sembravi zombie a lezione ahah', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Are you sleepy?',
      replyCue:'Say you are sleepy — avere (io)', replyText:'Anch’io {FORM} sonno. Caffè?', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'I’m sleepy too' },
    { id:'p6', askerCue:'Ask if they are free — essere (tu)', askerReply:'Ehi, {FORM} libero/a dopo scuola?', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'Are you free after school?',
      replyCue:'Say you are free — essere (io)', replyText:'Sì, {FORM} libero/a! Andiamo?', replyAnswer:'sono', replyVerb:'essere', replySubject:'io', replyGloss:'Yes, I am free' },
    { id:'p7', askerCue:'Say “we are ready” — essere (noi)', askerReply:'Raga, noi {FORM} pronti. Partiamo?', askerAnswer:'siamo', askerVerb:'essere', askerSubject:'noi', askerGloss:'We are ready',
      replyCue:'Agree: you all are ready — essere (voi)', replyText:'Sì, voi {FORM} i migliori', replyAnswer:'siete', replyVerb:'essere', replySubject:'voi', replyGloss:'You all are the best' },
    { id:'p8', askerCue:'Ask if they have homework — avere (tu)', askerReply:'{FORM} i compiti di italiano?', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Do you have Italian homework?',
      replyCue:'Say you have a ton — avere (io)', replyText:'Sì, {FORM} un sacco… help', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I have a ton' },
    { id:'p9', askerCue:'Push back: “You are wrong!” — essere (tu)', askerReply:'No no, {FORM} in errore! Guarda di nuovo', askerAnswer:'sei', askerVerb:'essere', askerSubject:'tu', askerGloss:'You are wrong',
      replyCue:'Admit lightly — essere (io)', replyText:'Ok ok, {FORM} io il problema ahah scusa', replyAnswer:'sono', replyVerb:'essere', replySubject:'io', replyGloss:'I am the problem lol sorry' },
    { id:'p10', askerCue:'Ask if they have water — avere (tu)', askerReply:'Dai, {FORM} acqua? Io sto morendo', askerAnswer:'hai', askerVerb:'avere', askerSubject:'tu', askerGloss:'Do you have water?',
      replyCue:'Say you have some — avere (io)', replyText:'Sì, {FORM} una bottiglia — tieni!', replyAnswer:'ho', replyVerb:'avere', replySubject:'io', replyGloss:'Yes, I have a bottle' }
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
  function fillForm(template, form) {
    return String(template || '').replace(/\{FORM\}/g, form);
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
    const header = ['Name', 'Partner', 'Score %', 'Completed Y/N', 'Timestamp', 'Help level', 'Scored turns'];
    const lines = [header.join(',')];
    rows.forEach((r) => {
      const vals = [r.name, r.partner, String(r.scorePct), r.completed, r.timestamp, r.helpLevel, String(r.turns)].map((v) => {
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
