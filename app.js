(function () {
  'use strict';
  var SKLEP = 'https://akcesoria-plandekowe.pl/';
  var BG = window.PBG || {};
  function fot(id) { var c = BG[id]; return c ? ' style="background:' + c + '"' : ' data-pelne'; }
  var BYID = {};
  PROD.forEach(function (p) { BYID[p.id] = p; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var zl = function (v) { return v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł'; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- menu ---------- */
  var ham = $('#ham'), panel = $('#panel');
  ham.addEventListener('click', function () {
    var otw = panel.hidden;
    panel.hidden = !otw;
    ham.setAttribute('aria-expanded', otw ? 'true' : 'false');
  });
  panel.addEventListener('click', function (e) { if (e.target.tagName === 'A') { panel.hidden = true; ham.setAttribute('aria-expanded', 'false'); } });

  /* ---------- kategorie ---------- */
  var KSLUG = { 7: '7-artykuly-gumowe', 8: '8-elementy-zabudowy', 10: '10-folie-odblaskowe', 11: '11-haki', 12: '12-oczka', 13: '13-uchwyty', 14: '14-paski', 15: '15-linki-ekspandory', 16: '16-nity-sruby-podkladki', 17: '17-pasy-transportowe', 18: '18-systemy-zaslonowe', 19: '19-narzedzia-reczne', 20: '20-maszyny-i-osprzet', 23: '23-rolki-dachowe' };
  var KIMG = { 23: 144, 18: 181, 8: 122, 13: 33, 12: 1, 11: 102, 14: 4, 15: 54, 16: 57, 17: 65, 19: 87, 20: 95, 10: 16, 7: 185 };
  var KOLEJ = [23, 18, 8, 13, 12, 11, 14, 15, 16, 17, 19, 20, 10, 7];
  var licz = {};
  PROD.forEach(function (p) { licz[p.k] = (licz[p.k] || 0) + 1; });
  var odm = function (n) { return n === 1 ? 'produkt' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'produkty' : 'produktów'; };
  $('#katGrid').innerHTML = KOLEJ.map(function (k) {
    return '<a class="kat" href="' + SKLEP + KSLUG[k] + '" target="_blank" rel="noopener"><span class="kat-img"' + fot(KIMG[k]) + '><img src="img/p/' + KIMG[k] + '.webp" alt="" loading="lazy"></span><span class="kat-t"><b>' + esc(KAT[k]) + '</b>' + (licz[k] ? '<span>' + licz[k] + ' ' + odm(licz[k]) + '</span>' : '<span>w sklepie</span>') + '</span></a>';
  }).join('');

  /* ---------- karta produktu ---------- */
  var IPLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>', IOK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function addTxt(w) { return w ? IOK + 'Na liście' : IPLUS + 'Do listy'; }
  var lista = {};
  try { lista = JSON.parse(localStorage.getItem('ap_lista') || '{}') || {}; } catch (e) { lista = {}; }
  Object.keys(lista).forEach(function (id) { if (!BYID[id]) delete lista[id]; });

  function karta(p) {
    var w = !!lista[p.id];
    return '<article class="pk">' +
      '<a class="pk-img"' + fot(p.id) + ' href="' + SKLEP + p.u + '" target="_blank" rel="noopener" tabindex="-1">' + (p.img ? '<img src="img/p/' + p.id + '.webp" alt="' + esc(p.n) + '" loading="lazy">' : '') + '</a>' +
      '<div class="pk-b"><a class="pk-n" href="' + SKLEP + p.u + '" target="_blank" rel="noopener">' + esc(p.n) + '</a>' +
      (p.r ? '<span class="pk-r">kod: ' + esc(p.r) + (p.oe ? ' · OE ' + esc(p.oe) : '') + '</span>' : (p.oe ? '<span class="pk-r">OE ' + esc(p.oe) + '</span>' : '')) +
      (p.d ? '<p class="pk-d">' + esc(p.d) + '</p>' : '') +
      '<div class="pk-dol"><span class="pk-c">' + zl(p.c) + '</span><button type="button" class="pk-add' + (w ? ' on' : '') + '" data-id="' + p.id + '">' + addTxt(w) + '</button></div></div></article>';
  }

  /* ---------- polecane ---------- */
  $('#polecaneGrid').innerHTML = [104, 95, 87, 16, 159, 60, 78, 100].map(function (id) { return karta(BYID[id]); }).join('');

  /* ---------- dobieracz ---------- */
  var LADUNEK = { v: 'ladunek', t: 'Mocowanie ładunku: pasy, grzechotki', ids: [65, 61, 9, 62, 63, 64, 60, 59, 58, 8, 110, 185, 189] };
  var ODBLASK = { v: 'odblask', t: 'Oznakowanie odblaskowe', ids: [16, 17] };
  var CELNA = { v: 'celna', t: 'Linka celna TIR', ids: [51, 107, 50, 49, 94, 48], uwaga: 'Linkę celną zakutą (fi 6) dobieramy na długość: 34,5 m, 36 m lub 42 m. Końcówki zakujesz zakuwakiem uniwersalnym fi 6 i fi 8.' };
  var ZAPIECIE = { v: 'zapiecie', t: 'Zapinanie plandeki: paski, ekspandory', ids: [54, 47, 48, 6, 55, 39, 4, 36, 37, 41, 40, 102, 101, 5, 43, 44, 45, 174, 106, 53] };
  var PROB = {
    firanka: [
      { v: 'rolki', t: 'Dach suwany się zacina, pękła rolka', sys: 'rolki' },
      { v: 'lacznik', t: 'Pęknięty łącznik dachu', sys: 'lacznik' },
      { v: 'napinacz', t: 'Firanka słabo napięta, napinacz', ids: [181, 11, 75, 105, 104, 103, 173, 78, 79, 77, 190], uwaga: 'Napinacze K i R oraz PWP występują w wersji lewej i prawej - przy zamówieniu podaj stronę naczepy. Adapter dobierz do średnicy profilu: 27 mm albo 34 mm.' },
      { v: 'szyna', t: 'Firanka ciężko chodzi po szynie', ids: [122, 71, 170, 67, 10, 121, 120, 69, 177, 70, 68, 178, 171], uwaga: 'Rolka tandem i podkładka pod rolkę pasują do naczep Schmitz, wózki z linii Edscha do profili Edscha.' },
      LADUNEK, ODBLASK
    ],
    skrzynia: [
      { v: 'oczka', t: 'Wyrwane oczko lub uchwyt plandeki', ids: [1, 24, 23, 57, 3, 28, 33, 34, 32, 31, 30, 26, 25, 2, 192, 35, 87, 12], uwaga: 'Oczko okrągłe mamy w średnicach 10-40 mm (mierzone wewnątrz). Do wymiany w terenie wystarczy wycinak i zakuwak o tej samej średnicy.' },
      CELNA, ZAPIECIE,
      { v: 'burty', t: 'Stelaż, burty, drzwi', ids: [162, 161, 66, 118, 72] },
      LADUNEK, ODBLASK
    ],
    pracownia: [
      { v: 'zgrzewanie', t: 'Zgrzewanie plandek', ids: [13, 95, 100, 97, 96, 180, 111, 112] },
      { v: 'material', t: 'Materiał plandekowy HEYTEX', ids: [82, 42, 111, 112], uwaga: 'HEYTEX: gramatury 650 i 680 g/m², szerokości 2,5 / 2,75 / 3,00 m, nawoje 65 mb; panama 3 m x 30 mb. Kolor i ilość potwierdzamy telefonicznie lub mailowo.' },
      { v: 'oczkowanie', t: 'Wycinanie otworów, zakuwanie oczek', ids: [12, 83, 84, 86, 85, 87, 88, 89, 90, 91, 92, 93, 109, 117, 98, 1, 24, 23, 57, 56, 7] },
      CELNA, ZAPIECIE, ODBLASK
    ]
  };
  var SYS = {
    rolki: [
      { v: 'versus', t: 'Versus', re: /versus/i }, { v: 'kogel', t: 'Kogel', re: /kogel/i }, { v: 'edscha', t: 'Edscha', re: /edscha/i },
      { v: 'sesam', t: 'Sesam', re: /sesam/i }, { v: 'etes', t: 'ETES', re: /etes/i }, { v: 'tse', t: 'Schmitz / TSE', re: /tse|schmitz|shmitz/i },
      { v: 'mix', t: 'Mixliner', re: /mixliner/i }, { v: 'eco', t: 'Eco Lite Plus', re: /eco lite/i }, { v: 'x', t: 'Nie wiem', re: null }
    ],
    lacznik: [
      { v: 'edscha', t: 'Edscha', ids: [113, 114, 176] }, { v: 'sesam', t: 'Sesam', ids: [116] }, { v: 'versus', t: 'Versus', ids: [163] },
      { v: 'x', t: 'Inny / nie wiem', ids: [113, 114, 116, 163, 123, 176] }
    ]
  };
  var POJ_T = { firanka: 'naczepa firankowa', skrzynia: 'skrzynia z plandeką', pracownia: 'pracownia plandek' };
  var stan = { poj: null, prob: null, sys: null };

  function chipy(el, arr, wybr) {
    el.innerHTML = arr.map(function (o) { return '<button type="button" data-v="' + o.v + '"' + (o.v === wybr ? ' class="on"' : '') + '>' + esc(o.t) + '</button>'; }).join('');
  }
  function zaznacz(box, v) { box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === v); }); }

  function aktProb() { return stan.poj ? PROB[stan.poj].filter(function (o) { return o.v === stan.prob; })[0] : null; }

  function rysuj() {
    var q = $('#q').value.trim();
    var wyn = $('#wynik'), tyt = $('#wynikT'), lic = $('#wynikN');
    $('#qx').style.display = q ? 'block' : 'none';
    var lista2 = [], tytul = '', uw = '';
    if (q.length >= 2) {
      var nq = norm(q);
      lista2 = PROD.filter(function (p) { return norm(p.n + ' ' + p.r + ' ' + p.oe + ' ' + p.d).indexOf(nq) > -1 || norm(p.r + p.oe).replace(/[^a-z0-9]/g, '').indexOf(nq.replace(/[^a-z0-9]/g, '')) > -1 && nq.replace(/[^a-z0-9]/g, '').length > 2; });
      tytul = 'Wyniki dla „' + q + '”';
      if (!lista2.length) uw = 'Nie znaleźliśmy takiej części w sklepie. Zadzwoń pod 602 409 645 albo wyślij zdjęcie starej części na sklep@akcesoria-plandekowe.pl - sprawdzimy, czy możemy ją sprowadzić.';
    } else {
      var pr = aktProb();
      if (!stan.poj) { tytul = 'Wybierz rodzaj zabudowy, a pokażemy pasujące części.'; }
      else if (!pr) { tytul = 'Wybierz, co trzeba zrobić (' + POJ_T[stan.poj] + ').'; }
      else if (pr.sys && !stan.sys) { tytul = 'Wybierz system dachu - zawęzimy listę.'; }
      else {
        if (pr.sys === 'rolki') {
          var s = SYS.rolki.filter(function (o) { return o.v === stan.sys; })[0];
          lista2 = PROD.filter(function (p) { return p.k === '23' && (!s.re || s.re.test(p.d)); });
          if (s.re) lista2.push(BYID[140]);
          tytul = 'Rolki dachowe' + (s.re ? ' - system ' + s.t : ' - wszystkie');
          uw = s.re ? 'Porównaj numer OE z rolką zdjętą z naczepy. Rolka 609CS na końcu listy jest uniwersalna, do nitowania.' : 'Nie znasz systemu? Wpisz numer OE ze starej rolki w wyszukiwarkę albo zadzwoń z jej zdjęciem pod 602 409 645.';
        } else if (pr.sys === 'lacznik') {
          var s2 = SYS.lacznik.filter(function (o) { return o.v === stan.sys; })[0];
          lista2 = s2.ids.map(function (id) { return BYID[id]; });
          tytul = 'Łączniki dachu' + (s2.v !== 'x' ? ' - ' + s2.t : '');
          uw = 'Łączniki Edscha mają długość 570 lub 650 mm (UltraLine 620 mm), Sesam 600 lub 700 mm, Versus od 400 do 700 mm. Zmierz stary łącznik przed zamówieniem.';
        } else {
          lista2 = pr.ids.map(function (id) { return BYID[id]; }).filter(Boolean);
          tytul = pr.t;
          uw = pr.uwaga || '';
        }
      }
    }
    tyt.textContent = tytul;
    lic.textContent = lista2.length ? lista2.length + ' ' + odm(lista2.length) : '';
    wyn.innerHTML = (uw ? '<p class="uwaga">' + esc(uw) + '</p>' : '') + (lista2.length ? lista2.map(karta).join('') : (uw ? '' : '<div class="pusto2"><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="14" width="24" height="18" rx="2"/><path d="M30 20h7l5 6v6H30z"/><circle cx="14" cy="34" r="4"/><circle cx="36" cy="34" r="4"/></svg><p>Tu pojawią się części z cenami ze sklepu.</p></div>'));
  }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l'); }

  $('#k1 .chipy').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    ustaw(b.dataset.v, null, null);
  });
  $('#probChipy').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    ustaw(stan.poj, b.dataset.v, null);
  });
  $('#sysChipy').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    stan.sys = b.dataset.v; zaznacz($('#sysChipy'), stan.sys); rysuj(); przewinWynik();
  });
  function ustaw(poj, prob, sys) {
    stan.poj = poj; stan.prob = prob; stan.sys = sys;
    $('#q').value = '';
    zaznacz($('#k1 .chipy'), poj);
    $('#k2').hidden = !poj;
    if (poj) chipy($('#probChipy'), PROB[poj], prob);
    var pr = aktProb();
    $('#k3').hidden = !(pr && pr.sys);
    if (pr && pr.sys) chipy($('#sysChipy'), SYS[pr.sys], sys);
    rysuj();
    if (pr && !pr.sys) przewinWynik();
  }
  function przewinWynik() {
    if (innerWidth > 960) return;
    var w = $('.wynik-h');
    var y = w.getBoundingClientRect().top + scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh')) - 8;
    scrollTo({ top: y, behavior: 'smooth' });
  }
  $('#q').addEventListener('input', rysuj);
  $('#qx').addEventListener('click', function () { $('#q').value = ''; rysuj(); $('#q').focus(); });

  document.querySelectorAll('[data-skok]').forEach(function (a) {
    a.addEventListener('click', function () { var s = a.dataset.skok.split('|'); ustaw(s[0], s[1], null); });
  });

  /* ---------- lista zapytania ---------- */
  function zapisz() { try { localStorage.setItem('ap_lista', JSON.stringify(lista)); } catch (e) { } }
  function rysujListe() {
    var ids = Object.keys(lista);
    $('#listaN').textContent = '(' + ids.length + ')';
    var suma = 0;
    $('#listaPoz').innerHTML = ids.length ? ids.map(function (id) {
      var p = BYID[id], q = lista[id]; suma += p.c * q;
      return '<li data-id="' + id + '"><span class="ln">' + esc(p.n) + '<small>' + (p.r ? 'kod ' + esc(p.r) + ' · ' : '') + zl(p.c) + ' / szt.</small></span>' +
        '<span class="ilosc"><button type="button" data-d="-1" aria-label="Mniej">−</button><input type="number" min="1" max="9999" value="' + q + '" aria-label="Ilość"><button type="button" data-d="1" aria-label="Więcej">+</button></span>' +
        '<span class="lc">' + zl(p.c * q) + '</span><button type="button" class="lu" aria-label="Usuń z listy">×</button></li>';
    }).join('') : '<li class="pusto">Lista jest pusta. Dodaj części z dobieracza albo z „Wybranych produktów”.</li>';
    $('#suma').textContent = zl(suma);
    var mc = $('#mobCta'); if (mc) { mc.textContent = ids.length ? 'Twoja lista (' + ids.length + ')' : 'Dobierz część'; mc.href = ids.length ? '#lista' : '#dobieracz'; }
    $('#wyslij').href = 'mailto:sklep@akcesoria-plandekowe.pl?subject=' + encodeURIComponent('Zapytanie o części - lista ze strony') + '&body=' + encodeURIComponent(tekstListy());
  }
  function tekstListy() {
    var ids = Object.keys(lista); if (!ids.length) return '';
    var s = 'Dzień dobry,\nproszę o potwierdzenie dostępności i kosztu wysyłki:\n\n', suma = 0;
    ids.forEach(function (id, i) { var p = BYID[id], q = lista[id]; suma += p.c * q; s += (i + 1) + '. ' + p.n + (p.r ? ' (kod ' + p.r + ')' : '') + ' - ' + q + ' szt. x ' + zl(p.c) + '\n'; });
    s += '\nRazem wg cen sklepu: ' + zl(suma) + '\n\nImię i nazwisko / firma:\nTelefon:\nAdres dostawy lub odbiór osobisty:\n';
    return s;
  }
  function przelacz(id) {
    if (lista[id]) delete lista[id]; else lista[id] = 1;
    zapisz(); rysujListe();
    document.querySelectorAll('.pk-add[data-id="' + id + '"]').forEach(function (b) { b.classList.toggle('on', !!lista[id]); b.innerHTML = addTxt(!!lista[id]); });
    toast(lista[id] ? 'Dodano do listy: ' + BYID[id].n : 'Usunięto z listy');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.pk-add'); if (b) przelacz(b.dataset.id);
  });
  $('#listaPoz').addEventListener('click', function (e) {
    var li = e.target.closest('li[data-id]'); if (!li) return;
    var id = li.dataset.id;
    if (e.target.closest('.lu')) { przelacz(id); return; }
    var d = e.target.closest('[data-d]');
    if (d) { lista[id] = Math.max(1, Math.min(9999, lista[id] + Number(d.dataset.d))); zapisz(); rysujListe(); }
  });
  $('#listaPoz').addEventListener('change', function (e) {
    var li = e.target.closest('li[data-id]'); if (!li || e.target.tagName !== 'INPUT') return;
    var v = parseInt(e.target.value, 10); lista[li.dataset.id] = isNaN(v) ? 1 : Math.max(1, Math.min(9999, v)); zapisz(); rysujListe();
  });
  $('#wyslij').addEventListener('click', function (e) { if (!Object.keys(lista).length) { e.preventDefault(); toast('Najpierw dodaj części do listy'); } });
  $('#kopiuj').addEventListener('click', function () {
    var t = tekstListy(); if (!t) { toast('Najpierw dodaj części do listy'); return; }
    var ok = function () { toast('Lista skopiowana - wklej ją w SMS lub mail'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, function () { toast('Nie udało się skopiować'); });
    else toast('Przeglądarka nie pozwala kopiować');
  });
  var tt;
  function toast(t) { var el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { el.classList.remove('on'); }, 1800); }

  rysujListe();
  rysuj();

  /* ---------- dolny pasek na telefonie ---------- */
  var mob = $('#mob'), cta = $('#heroCta');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      var e = en[0];
      mob.classList.toggle('widac', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(cta);
  } else { mob.classList.add('widac'); }
})();
