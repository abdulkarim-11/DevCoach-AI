import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    // ==== UI UTILS ====
    const showToast = (message, type = 'success') => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
        const colorClass = type === 'success' ? 'text-primary' : (type === 'error' ? 'text-error' : 'text-secondary');
        
        toast.className = `bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full px-4 py-2 flex items-center gap-2 text-sm text-on-surface transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto`;
        toast.innerHTML = `<span class="material-symbols-outlined text-[18px] ${colorClass}">${icon}</span> ${message}`;
        
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });
        
        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ==== DATA MANAGEMENT ====
    let journalData = [];
    let selectedProcesses = [];

    const loadData = async () => {
        try {
            const res = await fetch('/api/logs');
            journalData = await res.json();
            if (currentView === 'dashboard') renderDashboard();
            if (currentView === 'evidence') renderEvidence();
        } catch (err) {
            console.error("Failed to load logs:", err);
        }
    }

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
                btn.classList.add('text-primary', 'border-primary', 'font-bold');
                btn.classList.remove('text-on-surface-variant', 'border-transparent');
            } else {
                btn.classList.remove('text-primary', 'border-primary', 'font-bold');
                btn.classList.add('text-on-surface-variant', 'border-transparent');
            }
        });

        // Mobile nav active states
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            if (btn.dataset.view === viewId) {
                btn.classList.add('bg-primary', 'text-[var(--color-on-primary,white)]', 'scale-110', 'shadow-[0_0_15px_var(--color-primary)]');
                btn.classList.remove('text-on-surface-variant', 'bg-transparent');
            } else {
                btn.classList.remove('bg-primary', 'text-[var(--color-on-primary,white)]', 'scale-110', 'shadow-[0_0_15px_var(--color-primary)]');
                btn.classList.add('text-on-surface-variant', 'bg-transparent');
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

    const themeToggleBtn = document.getElementById('btn-theme-toggle');
    if (themeToggleBtn) {
        // Read stored theme preference or use default dark
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
            listEl.innerHTML = '<p class="text-on-surface-variant text-sm">Geen recente logs gevonden.</p>';
        } else {
            const recent = [...journalData].reverse().slice(0, 5); // top 5
            recent.forEach(entry => {
                listEl.innerHTML += `
                    <div class="flex flex-col gap-1 border-b border-border pb-2">
                        <div class="flex justify-between items-center">
                            <span class="text-on-surface text-sm font-bold">${entry.date}</span>
                            <span class="text-primary text-xs font-mono">${entry.hours} uur</span>
                        </div>
                        <p class="text-on-surface-variant text-xs truncate w-full" title="${entry.tasks}">${entry.tasks}</p>
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
            const processesHTML = entry.processes.map(p => `<span class="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-mono border border-primary/30">${p}</span>`).join('');
            
            listEl.innerHTML += `
                <div class="bg-surface-container backdrop-blur-xl border border-border rounded-xl p-6 flex flex-col gap-4">
                    <div class="flex justify-between items-start border-b border-border pb-3">
                        <div>
                            <div class="text-on-surface font-bold text-lg">${entry.date}</div>
                            <div class="text-on-surface-variant text-xs font-mono">${entry.hours} uur besteed</div>
                        </div>
                        <div class="flex flex-wrap max-w-[150px] justify-end gap-1">
                            ${processesHTML}
                        </div>
                    </div>
                    <div>
                        <h4 class="text-xs uppercase tracking-wider text-on-surface-variant mb-1">Taken</h4>
                        <p class="text-on-surface text-sm whitespace-pre-wrap">${entry.tasks}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-surface p-3 rounded border border-border">
                            <h4 class="text-[10px] uppercase tracking-wider text-secondary mb-1">Wat ging goed:</h4>
                            <p class="text-on-surface text-xs">${entry.good}</p>
                        </div>
                        <div class="bg-surface p-3 rounded border border-border">
                            <h4 class="text-[10px] uppercase tracking-wider text-secondary mb-1">Wat kan beter:</h4>
                            <p class="text-on-surface text-xs">${entry.bad}</p>
                        </div>
                    </div>
                    <div class="bg-tertiary/10 border border-tertiary/20 p-4 rounded-lg mt-2 flex flex-col gap-2">
                        <h4 class="text-xs uppercase tracking-wider text-tertiary font-bold flex items-center gap-1">
                            <span class="material-symbols-outlined text-[16px]">evidence</span> Bewijs
                        </h4>
                        <p class="text-on-surface text-sm">${entry.evidence_desc}</p>
                        <a href="${entry.evidence_link}" target="_blank" class="text-sm text-secondary hover:underline font-mono truncate break-all">${entry.evidence_link}</a>
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
            processTagsContainer.innerHTML = '<span class="text-xs text-on-surface-variant mt-1">Nog geen geselecteerd</span>';
        }
        selectedProcesses.forEach((p, idx) => {
            const tag = document.createElement('div');
            tag.className = 'bg-primary/20 text-primary px-2 py-1 rounded text-xs flex items-center gap-1 border border-primary/30';
            tag.innerHTML = `
                <span class="cursor-pointer hover:underline" title="Klik om te bewerken">${p}</span>
                <button type="button" class="text-on-surface hover:text-error ml-1" title="Verwijder"><span class="material-symbols-outlined text-[14px]">close</span></button>
            `;
            
            // Edit functionality
            tag.querySelector('span').addEventListener('click', () => {
                processSelect.value = p;
                selectedProcesses.splice(idx, 1);
                renderProcessTags();
                processSelect.focus();
            });

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
            const val = processSelect.value.trim();
            if (val && !selectedProcesses.includes(val)) {
                selectedProcesses.push(val);
                renderProcessTags();
                processSelect.value = '';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
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

            try {
                const res = await fetch('/api/logs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEntry)
                });
                
                if (!res.ok) throw new Error('Failed to save log');
                
                await loadData();

                // Reset form
                form.reset();
                selectedProcesses = [];
                renderProcessTags();
                document.getElementById('input-date').value = new Date().toISOString().split('T')[0];
                
                showToast('Logboek is succesvol opgeslagen in SQL!', 'success');
                switchView('evidence');
            } catch (err) {
                console.error(err);
                showToast("Er ging iets mis bij het opslaan.", 'error');
            }
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
                showToast("Reminder: Vergeet niet om je logboek voor vandaag in te vullen!", 'info');
                localStorage.setItem('last_login_date', today);
            }, 2000);
        }
    };

    // Initial render
    checkReminder();
    loadData(); // load data from API
    switchView(currentView);

});
