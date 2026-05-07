import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    // ==== DATA MANAGEMENT ====
    const STORAGE_KEY = 'devcoach_data';
    let journalData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let selectedProcesses = [];

    // ==== VIEW MANAGEMENT ====
    const views = ['dashboard', 'logbook', 'evidence'];
    let currentView = 'dashboard';

    const switchView = (viewId) => {
        // Hide all views, show desired view
        views.forEach(v => {
            const el = document.getElementById(`view-${v}`);
            if (el) {
                // Determine layout class (dashboard and logbook can be block or flex depending on classlist)
                if (v === viewId) {
                    el.style.display = 'flex';
                } else {
                    el.style.display = 'none';
                }
            }
        });
        
        // Update nav active states (desktop)
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.dataset.view === viewId) {
                btn.classList.add('text-[#a855f7]', 'border-[#a855f7]', 'font-bold');
                btn.classList.remove('text-[#94a3b8]', 'border-transparent');
            } else {
                btn.classList.remove('text-[#a855f7]', 'border-[#a855f7]', 'font-bold');
                btn.classList.add('text-[#94a3b8]', 'border-transparent');
            }
        });

        // Mobile nav active states
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            if (btn.dataset.view === viewId) {
                btn.classList.add('bg-[#a855f7]', 'text-white', 'scale-110', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
                btn.classList.remove('text-[#94a3b8]', 'bg-transparent');
            } else {
                btn.classList.remove('bg-[#a855f7]', 'text-white', 'scale-110', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
                btn.classList.add('text-[#94a3b8]', 'bg-transparent');
            }
        });

        currentView = viewId;

        // When switching, update respective dynamic content
        if (viewId === 'dashboard') renderDashboard();
        if (viewId === 'evidence') renderEvidence();
    };

    // Attach View Nav Listeners
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('button');
            const view = viewBtn ? viewBtn.dataset.view : null;
            if (view) switchView(view);
        });
    });

    // ==== DASHBOARD & RENDER LOGIC ====
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

        // Auto-detect missing processes (from a static list)
        const allProcesses = ['B1-K1-W1', 'B1-K1-W2', 'B1-K1-W3', 'B1-K1-W4', 'B1-K1-W5'];
        const missing = allProcesses.filter(p => !coveredProcesses.has(p));
        document.getElementById('dashboard-missing-processes').textContent = missing.length > 0 ? missing.join(', ') : 'Alles gedekt!';
        
        if (totalLogs > 0) {
            document.getElementById('dashboard-analysis').textContent = `Fantastisch werk. Je hebt deze week ${totalHours} uren gemaakt en aan ${Array.from(coveredProcesses).length} processen gewerkt. Ga zo door.`;
        } else {
            document.getElementById('dashboard-analysis').textContent = 'Nog onvoldoende data voor een wekelijkse analyse. Vul meer logboeken in.';
        }

        // Recent Entries List
        const listEl = document.getElementById('dashboard-recent-list');
        listEl.innerHTML = '';
        if (journalData.length === 0) {
            listEl.innerHTML = '<p class="text-[#94a3b8] text-sm">Geen recente logs gevonden.</p>';
        } else {
            const recent = [...journalData].reverse().slice(0, 5); // top 5
            recent.forEach(entry => {
                listEl.innerHTML += `
                    <div class="flex flex-col gap-1 border-b border-white/5 pb-2">
                        <div class="flex justify-between items-center">
                            <span class="text-[#e2e8f0] text-sm font-bold">${entry.date}</span>
                            <span class="text-[#a855f7] text-xs font-mono">${entry.hours} uur</span>
                        </div>
                        <p class="text-[#94a3b8] text-xs truncate w-full" title="${entry.tasks}">${entry.tasks}</p>
                    </div>
                `;
            });
        }
    };

    const renderEvidence = () => {
        const listEl = document.getElementById('evidence-list');
        listEl.innerHTML = '';

        if (journalData.length === 0) {
            listEl.innerHTML = '<p class="text-[#94a3b8] text-sm lg:col-span-2">Je hebt nog geen bewijslast geüpload.</p>';
            return;
        }

        const entries = [...journalData].reverse();
        entries.forEach((entry, idx) => {
            const processesHTML = entry.processes.map(p => `<span class="bg-[#a855f7]/20 text-[#a855f7] px-2 py-0.5 rounded text-[10px] font-mono border border-[#a855f7]/30">${p}</span>`).join('');
            
            listEl.innerHTML += `
                <div class="bg-[rgba(16,20,21,0.4)] backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col gap-4">
                    <div class="flex justify-between items-start border-b border-white/10 pb-3">
                        <div>
                            <div class="text-[#e2e8f0] font-bold text-lg">${entry.date}</div>
                            <div class="text-[#94a3b8] text-xs font-mono">${entry.hours} uur besteed</div>
                        </div>
                        <div class="flex flex-wrap max-w-[150px] justify-end gap-1">
                            ${processesHTML}
                        </div>
                    </div>
                    <div>
                        <h4 class="text-xs uppercase tracking-wider text-[#94a3b8] mb-1">Taken</h4>
                        <p class="text-[#e2e8f0] text-sm whitespace-pre-wrap">${entry.tasks}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-black/20 p-3 rounded border border-white/5">
                            <h4 class="text-[10px] uppercase tracking-wider text-[#0ea5e9] mb-1">Wat ging goed:</h4>
                            <p class="text-[#e2e8f0] text-xs">${entry.good}</p>
                        </div>
                        <div class="bg-black/20 p-3 rounded border border-white/5">
                            <h4 class="text-[10px] uppercase tracking-wider text-[#0ea5e9] mb-1">Wat kan beter:</h4>
                            <p class="text-[#e2e8f0] text-xs">${entry.bad}</p>
                        </div>
                    </div>
                    <div class="bg-[#f43f5e]/10 border border-[#f43f5e]/20 p-4 rounded-lg mt-2 flex flex-col gap-2">
                        <h4 class="text-xs uppercase tracking-wider text-[#f43f5e] font-bold flex items-center gap-1">
                            <span class="material-symbols-outlined text-[16px]">evidence</span> Bewijs
                        </h4>
                        <p class="text-[#e2e8f0] text-sm">${entry.evidence_desc}</p>
                        <a href="${entry.evidence_link}" target="_blank" class="text-sm text-[#0ea5e9] hover:underline font-mono truncate break-all">${entry.evidence_link}</a>
                    </div>
                </div>
            `;
        });
    };

    // ==== LOGBOOK FORM LOGIC ====
    const dateInput = document.getElementById('input-date');
    if (dateInput) {
        // Set date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    const form = document.getElementById('form-logbook');
    const btnAddProcess = document.getElementById('btn-add-process');
    const processSelect = document.getElementById('input-process-select');
    const processTagsContainer = document.getElementById('process-tags');

    const renderProcessTags = () => {
        processTagsContainer.innerHTML = '';
        if (selectedProcesses.length === 0) {
            processTagsContainer.innerHTML = '<span class="text-xs text-[#94a3b8] mt-1">Nog geen geselecteerd</span>';
        }
        selectedProcesses.forEach((p, idx) => {
            const tag = document.createElement('div');
            tag.className = 'bg-[#a855f7]/20 text-[#a855f7] px-2 py-1 rounded text-xs flex items-center gap-1 border border-[#a855f7]/30';
            tag.innerHTML = `
                ${p}
                <button type="button" class="text-[#e2e8f0] hover:text-[#ef4444] ml-1" data-idx="${idx}"><span class="material-symbols-outlined text-[14px]">close</span></button>
            `;
            // Remove functionality
            tag.querySelector('button').addEventListener('click', (e) => {
                selectedProcesses.splice(idx, 1);
                renderProcessTags();
            });
            processTagsContainer.appendChild(tag);
        });
    };

    renderProcessTags(); // init

    if (btnAddProcess && processSelect) {
        btnAddProcess.addEventListener('click', () => {
            const val = processSelect.value;
            if (val && !selectedProcesses.includes(val)) {
                selectedProcesses.push(val);
                renderProcessTags();
                processSelect.value = '';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Task validation logic
            const tasks = document.getElementById('input-tasks').value;
            const taskFeedback = document.getElementById('task-feedback');
            
            // Basic specificty check: task must be at least 20 chars
            if (tasks.trim().length <= 20) {
                taskFeedback.classList.remove('hidden');
                document.getElementById('input-tasks').focus();
                return;
            } else {
                taskFeedback.classList.add('hidden');
            }

            const newEntry = {
                id: Date.now().toString(),
                date: document.getElementById('input-date').value,
                hours: document.getElementById('input-hours').value,
                tasks: tasks,
                good: document.getElementById('input-good').value,
                bad: document.getElementById('input-bad').value,
                evidence_link: document.getElementById('input-evidence-link').value,
                evidence_desc: document.getElementById('input-evidence-desc').value,
                processes: [...selectedProcesses]
            };

            journalData.push(newEntry);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(journalData));

            // Reset form
            form.reset();
            selectedProcesses = [];
            renderProcessTags();
            document.getElementById('input-date').value = new Date().toISOString().split('T')[0];
            
            alert('Logboek is succesvol opgeslagen!');
            switchView('evidence');
        });
    }

    // ==== EXPORT LOGIC ====
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', () => {
            // Simply use window.print to invoke print-to-pdf functionality built into browsers
            switchView('dashboard');
            setTimeout(() => {
                window.print();
            }, 300);
        });
    }

    const btnExportJson = document.getElementById('btn-export-json');
    if (btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(journalData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "devcoach_journal.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    }

    // Daily Reminder check logic (dummy notification)
    const checkReminder = () => {
        const lastLogin = localStorage.getItem('last_login_date');
        const today = new Date().toISOString().split('T')[0];
        if (lastLogin !== today) {
            setTimeout(() => {
                alert("Reminder: Vergeet niet om je logboek voor vandaag in te vullen!");
                localStorage.setItem('last_login_date', today);
            }, 2000);
        }
    };

    // Initial render
    checkReminder();
    renderDashboard(); // prepare data
    switchView(currentView);

});
