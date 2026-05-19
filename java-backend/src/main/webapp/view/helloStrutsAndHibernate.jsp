<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevCoach AI</title>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              background: 'var(--bg-color)',
              surface: 'var(--surface-color)',
              input: 'var(--input-bg)',
              primary: 'var(--primary-color)',
              'on-primary': 'var(--on-primary-color)',
              'on-surface': 'var(--text-color)',
              'on-surface-variant': 'var(--text-muted)',
              border: 'var(--border-color)',
              'border-hover': 'var(--border-hover-color)',
              error: 'var(--error-color)'
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              mono: ['JetBrains Mono', 'monospace'],
            }
          }
        }
      }
    </script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
      
      :root {
          --bg-color: #fafafa;
          --surface-color: #ffffff;
          --input-bg: #f5f5f5;
          --text-color: #171717;
          --text-muted: #737373;
          --primary-color: #000000;
          --on-primary-color: #ffffff;
          --border-color: #e5e5e5;
          --border-hover-color: #d4d4d4;
          --error-color: #ef4444;
      }
      .dark {
          --bg-color: #0a0a0a;
          --surface-color: #0a0a0a;
          --input-bg: #171717;
          --text-color: #ededed;
          --text-muted: #a3a3a3;
          --primary-color: #ffffff;
          --on-primary-color: #000000;
          --border-color: #262626;
          --border-hover-color: #404040;
          --error-color: #f87171;
      }
      body {
          background-color: var(--bg-color);
          color: var(--text-color);
          font-family: 'Inter', sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
      }
      :root .icon-light { display: none; }
      :root .icon-dark { display: block; }
      .dark .icon-light { display: block; }
      .dark .icon-dark { display: none; }
      
      @media print {
        body { background: white; color: black; }
        nav, header, button, .mobile-nav-btn { display: none !important; }
        .bg-background, .bg-surface { background: transparent !important; border: 1px solid #ccc; box-shadow: none !important; }
        .text-on-surface { color: black !important; }
      }
    </style>
  </head>
  <body class="bg-background text-on-surface min-h-screen flex flex-col antialiased selection:bg-primary/30">
    <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div class="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-[1440px] mx-auto">
        <div class="text-xl font-bold tracking-tight flex items-center gap-2">
          <span class="material-symbols-outlined text-[24px]">terminal</span>
          DevCoach AI
        </div>
        
        <nav class="hidden md:flex items-center gap-8">
          <button data-view="dashboard" class="nav-btn text-sm font-medium py-1 transition-colors border-b-2 border-primary text-on-surface">Overzicht</button>
          <button data-view="logbook" class="nav-btn text-sm font-medium py-1 text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent">Logboek Invullen</button>
          <button data-view="evidence" class="nav-btn text-sm font-medium py-1 text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent">Mijn Bewijzen</button>
        </nav>

        <div class="flex items-center gap-2 text-on-surface-variant">
          <button id="btn-theme-toggle" class="hover:text-primary transition-colors p-2 rounded-full hover:bg-border-hover" title="Toggle Theme">
             <span class="material-symbols-outlined text-[20px] icon-dark">dark_mode</span>
             <span class="material-symbols-outlined text-[20px] icon-light">light_mode</span>
          </button>
          <button id="btn-export-pdf" class="hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-border-hover border border-transparent hover:border-border" title="Exporteer naar PDF"><span class="material-symbols-outlined text-[18px]">picture_as_pdf</span></button>
        </div>
      </div>
    </header>

    <main id="app" class="flex-1 w-full max-w-[1440px] mx-auto pb-32 md:pb-16 flex flex-col relative z-10 px-4 md:px-10">
      
      <!-- DASHBOARD VIEW -->
      <div id="view-dashboard" class="view flex flex-col gap-10 w-full py-16 mx-auto" style="display: block;">
        <header class="flex flex-col gap-2">
          <h1 id="dashboard-title" class="text-4xl text-on-surface font-bold tracking-tight">Weekly Review</h1>
          <p id="dashboard-subtitle" class="text-on-surface-variant text-sm max-w-2xl">Jouw voortgang en ontwikkeling als software developer van deze week.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          <div class="bg-surface border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
             <div class="text-sm font-medium text-on-surface-variant mb-2">Totaal Uren</div>
             <div id="stat-hours" class="text-4xl font-semibold tracking-tight text-on-surface">0</div>
          </div>
          <div class="bg-surface border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
             <div class="text-sm font-medium text-on-surface-variant mb-2">Aantal Logs</div>
             <div id="stat-logs" class="text-4xl font-semibold tracking-tight text-on-surface">0</div>
          </div>
          <div class="bg-surface border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
             <div class="text-sm font-medium text-on-surface-variant mb-2">Bewijsstukken</div>
             <div id="stat-evidence" class="text-4xl font-semibold tracking-tight text-on-surface">0</div>
          </div>
          <div class="bg-surface border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
             <div class="text-sm font-medium text-on-surface-variant mb-2">Gedekte Processen</div>
             <div id="stat-processes" class="text-2xl font-semibold tracking-tight text-on-surface mt-2 truncate">Geen</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <!-- Ontwikkeling & Tips -->
          <div class="bg-surface border border-border rounded-lg overflow-hidden flex flex-col p-6">
             <h2 class="font-semibold text-on-surface mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-primary">insights</span> Analyse & Tips
             </h2>
             <div class="text-sm text-on-surface flex flex-col gap-6">
                <p id="dashboard-analysis" class="text-on-surface-variant leading-relaxed">Nog onvoldoende data voor een wekelijkse analyse. Vul meer logboeken in.</p>
                <div class="flex flex-col gap-4">
                   <div class="bg-input p-4 rounded-md border border-border">
                      <h3 class="font-semibold text-on-surface mb-1 flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">warning</span> Ontbrekende Werkprocessen</h3>
                      <p id="dashboard-missing-processes" class="text-on-surface-variant">B1-K1-W1 (Analyseren), B1-K1-W4 (Opleveren)</p>
                   </div>
                   <div class="bg-input p-4 rounded-md border border-border">
                      <h3 class="font-semibold text-on-surface mb-1 flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">lightbulb</span> Tip voor verbetering</h3>
                      <p class="text-on-surface-variant">Zorg dat je bewijslast visueel maakt ter onderbouwing van je gerealiseerde code. Gebruik de STARR-methode beter in je reflectie.</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- Recente Activiteit -->
          <div class="bg-surface border border-border rounded-lg flex flex-col p-6">
             <h2 class="font-semibold text-on-surface mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-primary">history</span> Recente Entries
             </h2>
             <div id="dashboard-recent-list" class="flex flex-col gap-3 overflow-y-auto max-h-[300px]">
             </div>
          </div>
        </div>
      </div>

      <!-- LOGBOOK VIEW -->
      <div id="view-logbook" class="view flex flex-col gap-8 w-full py-8 md:py-16 mx-auto" style="display: none;">
        <header class="flex flex-col gap-2 mb-4">
          <h1 class="text-4xl text-on-surface font-bold tracking-tight">Logboek Invullen</h1>
          <p class="text-on-surface-variant max-w-2xl">Registreer je uren, specifieke taken, reflectie en bewijs.</p>
        </header>

        <form id="form-logbook" action="saveText.action" method="POST" class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="hidden" name="textObject.processes" id="hidden-processes" value="" />
          <!-- Kolom 1 -->
          <div class="flex flex-col gap-6">
             <div class="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
                <h3 class="font-semibold tracking-tight text-lg text-on-surface mb-2">Basis Info</h3>
                <div class="flex gap-4">
                   <div class="flex-1">
                      <label class="block text-sm font-medium text-on-surface mb-1.5">Datum</label>
                      <input type="date" id="input-date" name="textObject.date" required class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none transition-colors" />
                   </div>
                   <div class="w-32">
                      <label class="block text-sm font-medium text-on-surface mb-1.5">Uren</label>
                      <input type="number" id="input-hours" name="textObject.hours" required min="0.5" step="0.5" placeholder="bijv. 4.5" class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none transition-colors" />
                   </div>
                </div>

                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5 flex justify-between items-center">
                     <span>Concrete Taken <span class="text-on-surface-variant font-normal">(Wees specifiek)</span></span>
                   </label>
                   <textarea id="input-tasks" name="textObject.tasks" required rows="4" class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none resize-none transition-colors"></textarea>
                </div>
             </div>

             <div class="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
                <h3 class="font-semibold tracking-tight text-lg text-on-surface mb-2">Reflectie</h3>
                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5">Wat ging er goed?</label>
                   <textarea id="input-good" name="textObject.good" required rows="3" class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none resize-none transition-colors"></textarea>
                </div>
                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5">Wat kan er beter?</label>
                   <textarea id="input-bad" name="textObject.bad" required rows="3" class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none resize-none transition-colors"></textarea>
                </div>
             </div>
          </div>

          <!-- Kolom 2 -->
          <div class="flex flex-col gap-6">
             <div class="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
                <h3 class="font-semibold tracking-tight text-lg text-on-surface mb-2 flex justify-between items-center">
                   Bewijslast
                </h3>
                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5">Link (GitHub, Figma, etc)</label>
                   <input type="url" id="input-evidence-link" name="textObject.evidenceLink" required placeholder="https://..." class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm font-mono text-on-surface focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5">Korte toelichting bewijs</label>
                   <textarea id="input-evidence-desc" name="textObject.evidenceDesc" required rows="2" class="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface focus:border-primary outline-none resize-none transition-colors"></textarea>
                </div>
             </div>

             <div class="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
                <h3 class="font-semibold tracking-tight text-lg text-on-surface mb-2">Werkprocessen</h3>
                <div>
                   <label class="block text-sm font-medium text-on-surface mb-1.5">Koppel werkprocessen</label>
                   <div class="flex gap-2 mb-3">
                       <input list="process-list" id="input-process-select" placeholder="Zoek of typ..." class="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm text-on-surface outline-none focus:border-primary transition-colors" autocomplete="off" />
                       <datalist id="process-list">
                           <option value="B1-K1-W1 (Requirements)"></option>
                           <option value="B1-K1-W2 (Ontwerp maken)"></option>
                           <option value="B1-K1-W3 (Realiseren)"></option>
                           <option value="B1-K1-W4 (Testen)"></option>
                           <option value="B1-K1-W5 (Opleveren)"></option>
                       </datalist>
                       <button type="button" id="btn-add-process" class="bg-primary text-[var(--color-on-primary,white)] hover:opacity-90 px-4 py-2 rounded-md text-sm font-medium transition-opacity cursor-pointer">Toevoegen</button>
                   </div>
                   <div id="process-tags" class="flex flex-wrap gap-2 min-h-[42px] p-3 bg-input rounded-md border border-border">
                   </div>
                </div>
             </div>
             
             <div class="mt-auto">
                <button type="submit" class="w-full bg-primary hover:opacity-90 text-[var(--color-on-primary,white)] font-semibold py-3.5 rounded-md transition-opacity flex justify-center items-center gap-2 cursor-pointer border border-transparent">
                   <span class="material-symbols-outlined text-[20px]">save</span> Opslaan & Indienen
                </button>
             </div>
          </div>
        </form>
      </div>

      <!-- EVIDENCE VIEW -->
      <div id="view-evidence" class="view flex flex-col gap-6 w-full py-8 md:py-16 mx-auto" style="display: none;">
        <header class="flex flex-col gap-2 mb-6">
          <h1 class="text-4xl text-on-surface font-bold tracking-tight">Opgeslagen Bewijslast</h1>
          <p class="text-on-surface-variant text-sm max-w-2xl">Al jouw gekoppelde werkprocessen, taken en bewijzen op één plek.</p>
        </header>

        <div id="evidence-list" class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        </div>
      </div>
    </main>

    <nav class="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full px-4 py-2 border border-border shadow-lg bg-surface/90 backdrop-blur-lg">
      <button data-view="dashboard" class="mobile-nav-btn p-2.5 flex flex-col items-center justify-center rounded-full transition-all bg-primary text-[var(--color-on-primary,white)]"><span class="material-symbols-outlined text-[20px]">terminal</span></button>
      <button data-view="evidence" class="mobile-nav-btn p-2.5 flex flex-col items-center justify-center rounded-full transition-all text-on-surface-variant hover:text-on-surface hover:bg-border-hover bg-transparent"><span class="material-symbols-outlined text-[20px]">description</span></button>
      <button data-view="logbook" class="mobile-nav-btn p-2.5 flex flex-col items-center justify-center rounded-full transition-all text-on-surface-variant hover:text-on-surface hover:bg-border-hover bg-transparent"><span class="material-symbols-outlined text-[20px]">menu_book</span></button>
    </nav>

    <script>
      let journalData = [
          <s:iterator value="textObjects" var="t">
          {
              id: '<s:property value="#t.id" escapeJavaScript="true"/>',
              date: '<s:property value="#t.date" escapeJavaScript="true"/>',
              hours: '<s:property value="#t.hours" escapeJavaScript="true"/>',
              tasks: '<s:property value="#t.tasks" escapeJavaScript="true"/>',
              good: '<s:property value="#t.good" escapeJavaScript="true"/>',
              bad: '<s:property value="#t.bad" escapeJavaScript="true"/>',
              evidence_link: '<s:property value="#t.evidenceLink" escapeJavaScript="true"/>',
              evidence_desc: '<s:property value="#t.evidenceDesc" escapeJavaScript="true"/>',
              processes: JSON.parse('<s:property value="#t.processes" escapeJavaScript="true"/>' || '[]')
          },
          </s:iterator>
      ];
      
      let selectedProcesses = [];

      const views = ['dashboard', 'logbook', 'evidence'];
      let currentView = localStorage.getItem('currentView') || 'dashboard';

      const switchView = (viewId) => {
          views.forEach(v => {
              const el = document.getElementById(`view-${v}`);
              if (el) el.style.display = (v === viewId) ? 'flex' : 'none';
          });
          
          document.querySelectorAll('.nav-btn').forEach(btn => {
              if (btn.dataset.view === viewId) {
                  btn.classList.add('text-on-surface', 'border-primary');
                  btn.classList.remove('text-on-surface-variant', 'border-transparent');
              } else {
                  btn.classList.remove('text-on-surface', 'border-primary');
                  btn.classList.add('text-on-surface-variant', 'border-transparent');
              }
          });

          document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
              if (btn.dataset.view === viewId) {
                  btn.classList.add('bg-primary', 'text-[var(--color-on-primary,white)]');
                  btn.classList.remove('text-on-surface-variant', 'bg-transparent');
              } else {
                  btn.classList.remove('bg-primary', 'text-[var(--color-on-primary,white)]');
                  btn.classList.add('text-on-surface-variant', 'bg-transparent');
              }
          });

          currentView = viewId;
          localStorage.setItem('currentView', currentView);

          if (viewId === 'dashboard') renderDashboard();
          if (viewId === 'evidence') renderEvidence();
      };

      document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              const viewBtn = e.target.closest('button');
              const view = viewBtn ? viewBtn.dataset.view : null;
              if (view) switchView(view);
          });
      });

      const themeToggleBtn = document.getElementById('btn-theme-toggle');
      if (themeToggleBtn) {
          if (localStorage.getItem('theme') === 'light') {
              document.documentElement.classList.remove('dark');
          } else {
              document.documentElement.classList.add('dark');
          }

          themeToggleBtn.addEventListener('click', () => {
              document.documentElement.classList.toggle('dark');
              const isDark = document.documentElement.classList.contains('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
          });
      }

      const renderDashboard = () => {
          let totalHours = 0;
          let totalLogs = journalData.length;
          let coveredProcesses = new Set();
          let totalEvidence = 0;

          journalData.forEach(entry => {
              totalHours += parseFloat(entry.hours) || 0;
              if (entry.evidence_link) totalEvidence++;
              if (entry.processes) {
                  entry.processes.forEach(p => coveredProcesses.add(p));
              }
          });

          document.getElementById('stat-hours').textContent = totalHours;
          document.getElementById('stat-logs').textContent = totalLogs;
          document.getElementById('stat-evidence').textContent = totalEvidence;
          document.getElementById('stat-processes').textContent = coveredProcesses.size > 0 ? Array.from(coveredProcesses).length : 'Geen';

          const allProcesses = ['B1-K1-W1', 'B1-K1-W2', 'B1-K1-W3', 'B1-K1-W4', 'B1-K1-W5'];
          const missing = allProcesses.filter(p => !coveredProcesses.has(p));
          document.getElementById('dashboard-missing-processes').textContent = missing.length > 0 ? missing.join(', ') : 'Alles gedekt!';
          
          if (totalLogs > 0) {
              document.getElementById('dashboard-analysis').textContent = `Fantastisch werk. Je hebt deze week ${totalHours} uren gemaakt en aan ${Array.from(coveredProcesses).length} processen gewerkt. Ga zo door.`;
          } else {
              document.getElementById('dashboard-analysis').textContent = 'Nog onvoldoende data voor een wekelijkse analyse. Vul meer logboeken in.';
          }

          const listEl = document.getElementById('dashboard-recent-list');
          listEl.innerHTML = '';
          if (journalData.length === 0) {
              listEl.innerHTML = '<p class="text-on-surface-variant text-sm">Geen recente logs gevonden.</p>';
          } else {
              const recent = [...journalData].reverse().slice(0, 5);
              recent.forEach(entry => {
                  listEl.innerHTML += `
                      <div class="flex flex-col gap-1.5 border-b border-border pb-3">
                          <div class="flex justify-between items-center">
                              <span class="text-on-surface font-medium">${entry.date}</span>
                              <span class="text-on-surface-variant text-sm font-mono bg-input px-2 py-0.5 rounded-md border border-border">${entry.hours} uur</span>
                          </div>
                          <p class="text-on-surface-variant text-sm truncate w-full">${entry.tasks}</p>
                      </div>
                  `;
              });
          }
      };

      const renderEvidence = () => {
          const listEl = document.getElementById('evidence-list');
          listEl.innerHTML = '';

          if (journalData.length === 0) {
              listEl.innerHTML = '<p class="text-on-surface-variant text-sm lg:col-span-2">Je hebt nog geen bewijslast geüpload.</p>';
              return;
          }

          const entries = [...journalData].reverse();
          entries.forEach((entry, idx) => {
              const processesHTML = (entry.processes || []).map(p => `<span class="bg-input text-on-surface-variant px-2 py-0.5 rounded-md text-[11px] uppercase font-bold tracking-wider border border-border mt-1">${p}</span>`).join('');
              
              listEl.innerHTML += `
                  <div class="bg-surface border border-border hover:border-border-hover transition-colors rounded-lg p-6 flex flex-col gap-5 shadow-sm">
                      <div class="flex justify-between items-start border-b border-border pb-4">
                          <div>
                              <div class="text-on-surface font-bold text-lg">${entry.date}</div>
                              <div class="text-on-surface-variant font-medium text-sm mt-1">${entry.hours} uur besteed</div>
                          </div>
                          <div class="flex flex-wrap max-w-[200px] justify-end gap-1.5">
                              ${processesHTML}
                          </div>
                      </div>
                      <div>
                          <h4 class="text-xs uppercase font-bold tracking-wider text-on-surface-variant mb-2">Taken</h4>
                          <p class="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">${entry.tasks}</p>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                          <div class="bg-input p-4 rounded-md border border-border">
                              <h4 class="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5"><span class="material-symbols-outlined text-[14px] text-green-500">thumb_up</span> Wat ging goed</h4>
                              <p class="text-on-surface text-sm leading-relaxed">${entry.good}</p>
                          </div>
                          <div class="bg-input p-4 rounded-md border border-border">
                              <h4 class="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant mb-2 flex items-center gap-1.5"><span class="material-symbols-outlined text-[14px] text-orange-500">trending_up</span> Wat kan beter</h4>
                              <p class="text-on-surface text-sm leading-relaxed">${entry.bad}</p>
                          </div>
                      </div>
                      <div class="bg-input border border-border p-4 rounded-md mt-2 flex flex-col gap-2 relative overflow-hidden">
                          <div class="absolute inset-y-0 left-0 w-1 bg-primary"></div>
                          <h4 class="text-xs uppercase font-bold tracking-wider text-on-surface mb-1 flex items-center gap-1.5">
                              <span class="material-symbols-outlined text-[16px]">evidence</span> Bewijs
                          </h4>
                          <p class="text-on-surface-variant text-sm block mb-1">${entry.evidence_desc}</p>
                          <a href="${entry.evidence_link}" target="_blank" class="text-sm text-primary hover:underline font-mono truncate break-all">${entry.evidence_link}</a>
                      </div>
                  </div>
              `;
          });
      };

      const dateInput = document.getElementById('input-date');
      if (dateInput && !dateInput.value) {
          dateInput.value = new Date().toISOString().split('T')[0];
      }

      const form = document.getElementById('form-logbook');
      const btnAddProcess = document.getElementById('btn-add-process');
      const processSelect = document.getElementById('input-process-select');
      const processTagsContainer = document.getElementById('process-tags');

      const renderProcessTags = () => {
          processTagsContainer.innerHTML = '';
          if (selectedProcesses.length === 0) {
              processTagsContainer.innerHTML = '<span class="text-xs text-on-surface-variant mt-1">Nog geen geselecteerd</span>';
          }
          selectedProcesses.forEach((p, idx) => {
              const tag = document.createElement('div');
              tag.className = 'bg-surface text-on-surface font-medium px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 border border-border';
              tag.innerHTML = `
                  <span class="cursor-pointer hover:underline" title="Klik om te bewerken">${p}</span>
                  <button type="button" class="text-on-surface-variant hover:text-error transition-colors flex items-center" title="Verwijder"><span class="material-symbols-outlined text-[14px]">close</span></button>
              `;
              
              tag.querySelector('span').addEventListener('click', () => {
                  processSelect.value = p;
                  selectedProcesses.splice(idx, 1);
                  renderProcessTags();
                  processSelect.focus();
              });

              tag.querySelector('button').addEventListener('click', () => {
                  selectedProcesses.splice(idx, 1);
                  renderProcessTags();
              });
              processTagsContainer.appendChild(tag);
          });
          document.getElementById('hidden-processes').value = JSON.stringify(selectedProcesses);
      };

      if (btnAddProcess && processSelect) {
          btnAddProcess.addEventListener('click', () => {
              const val = processSelect.value.trim();
              if (val && !selectedProcesses.includes(val)) {
                  selectedProcesses.push(val);
                  renderProcessTags();
                  processSelect.value = '';
              }
          });
      }

      if (form) {
          form.addEventListener('submit', (e) => {
              localStorage.setItem('currentView', 'evidence');
              document.getElementById('hidden-processes').value = JSON.stringify(selectedProcesses);
          });
      }
      
      const btnExportPdf = document.getElementById('btn-export-pdf');
      if (btnExportPdf) {
          btnExportPdf.addEventListener('click', () => {
              switchView('dashboard');
              setTimeout(() => {
                  window.print();
              }, 300);
          });
      }

      renderProcessTags();
      switchView(currentView);

    </script>
  </body>
</html>
