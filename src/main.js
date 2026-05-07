import './index.css';
import data from './data.json';

document.addEventListener('DOMContentLoaded', () => {
    // API KEY van gebruiker (Opgelet: Dit is normaal onveilig aan de client-side, maar we volgen de instructies)
    const API_KEY = "AIzaSyBKstS_qibxv8YSsnarMNKUHTtExC_tDuo";
    
    const views = ['dashboard', 'logbook', 'evidence'];
    let currentView = 'dashboard';

    const renderData = () => {
        if (!data || !data.dashboard) return;
        
        // Update Dashboard text
        const titleEl = document.getElementById('dashboard-title');
        const subtitleEl = document.getElementById('dashboard-subtitle');
        const syntheseEl = document.getElementById('dashboard-synthese');
        const deltaEl = document.getElementById('dashboard-delta');

        if (titleEl) titleEl.textContent = data.dashboard.title;
        if (subtitleEl) subtitleEl.textContent = data.dashboard.subtitle;
        if (syntheseEl) syntheseEl.textContent = data.dashboard.synthese;
        if (deltaEl) deltaEl.textContent = data.dashboard.delta;
    };

    const addTerminalLine = (text, type = 'info') => {
        const terminalContent = document.getElementById('terminal-content');
        if (!terminalContent) return;

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        let colorClass = 'text-[#e2e8f0]';
        if (type === 'cmd') colorClass = 'text-[#a855f7]';
        if (type === 'success') colorClass = 'text-[#0ea5e9]';
        if (type === 'error') colorClass = 'text-[#ef4444]';

        const line = document.createElement('div');
        line.className = 'flex gap-4';
        
        const prefix = type === 'cmd' ? '&gt; ' : '';
        
        line.innerHTML = `
            <span class="text-[#475569] shrink-0">${timeStr}</span>
            <span class="${colorClass}">${prefix}${text}</span>
        `;
        
        // Optionally prepend pulse if it exists, otherwise just append
        terminalContent.appendChild(line);
        terminalContent.scrollTop = terminalContent.scrollHeight;
    };

    const simulateAPI = async () => {
        addTerminalLine('Verifiëren API Key...', 'info');
        
        setTimeout(() => {
            if (API_KEY && API_KEY.startsWith('AIzaSy')) {
                addTerminalLine('API Key geaccepteerd: ' + API_KEY.substring(0, 10) + '***', 'success');
                addTerminalLine('CONNECTIE_GEMINI_API', 'cmd');
                setTimeout(() => {
                    addTerminalLine('Ontvangen antwoord van AI Coach...', 'info');
                    addTerminalLine('"De dashboard systemen werken nu correct, kapitein. Geen verdere afwijkingen gedetecteerd."', 'success');
                    
                    const pulse = document.createElement('div');
                    pulse.className = 'flex gap-4 mt-auto text-[#a855f7]';
                    pulse.innerHTML = `<span class="animate-pulse">_</span>`;
                    document.getElementById('terminal-content').appendChild(pulse);
                    document.getElementById('terminal-content').scrollTop = document.getElementById('terminal-content').scrollHeight;
                }, 1500);
            } else {
                addTerminalLine('Ongeldige API Key!', 'error');
            }
        }, 1000);
    };

    const switchView = (viewId) => {
        views.forEach(v => {
            const el = document.getElementById(`view-${v}`);
            if (el) {
                el.style.display = v === viewId ? 'block' : 'none';
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
    };

    // Attach event listeners
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Need to get dataset from the button, sometimes target is inner span
            const viewBtn = e.target.closest('button');
            const view = viewBtn ? viewBtn.dataset.view : null;
            if (view) switchView(view);
        });
    });

    // Initial render
    renderData();
    switchView(currentView);
    simulateAPI();
});
