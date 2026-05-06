import './index.css';
import data from './data.json';

document.addEventListener('DOMContentLoaded', () => {
    // Icons setup (using Lucide icons if available, or just keeping the HTML svg fallback)
    
    const views = ['dashboard', 'logbook', 'evidence'];
    let currentView = 'dashboard';

    const renderData = () => {
        // Just an example of using the JSON data
        console.log('Loaded data from JSON:', data);
    };

    const switchView = (viewId) => {
        views.forEach(v => {
            const el = document.getElementById(`view-${v}`);
            if (el) {
                el.style.display = v === viewId ? 'block' : 'none';
            }
        });
        
        // Update nav active states
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.dataset.view === viewId) {
                btn.classList.add('text-primary', 'border-primary', 'font-bold');
                btn.classList.remove('text-on-surface-variant');
            } else {
                btn.classList.remove('text-primary', 'border-primary', 'font-bold');
                btn.classList.add('text-on-surface-variant');
            }
        });

        // Mobile nav active states
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            if (btn.dataset.view === viewId) {
                btn.classList.add('bg-primary', 'text-on-primary', 'scale-110', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
                btn.classList.remove('text-on-surface-variant', 'bg-transparent');
            } else {
                btn.classList.remove('bg-primary', 'text-on-primary', 'scale-110', 'shadow-[0_0_15px_rgba(168,85,247,0.4)]');
                btn.classList.add('text-on-surface-variant', 'bg-transparent');
            }
        });

        currentView = viewId;
    };

    // Attach event listeners
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
            if (view) {
                switchView(view);
            }
        });
    });

    // Initial render
    renderData();
    switchView(currentView);
});
