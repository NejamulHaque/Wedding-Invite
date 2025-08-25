    const INVITE_CODES = ["FAM123", "FRIEND456", "VIP789"];
    const WEDDING = {
      couple: 'Adam & Alice',
      dateISO: '2025-12-15T17:00:00+05:30',
      venue: 'Royal Orchid Banquet, New Delhi',
      address: 'Royal Orchid Banquet, New Delhi',
      city: 'New Delhi, India'
    };
  
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){ root.setAttribute('data-theme', savedTheme); themeToggle.textContent = savedTheme==='dark'?'☀️':'🌙'; }
    themeToggle.addEventListener('click', ()=>{
      const now = root.getAttribute('data-theme')==='dark' ? 'light':'dark';
      root.setAttribute('data-theme', now);
      localStorage.setItem('theme', now);
      themeToggle.textContent = now==='dark'?'☀️':'🌙';
    });

    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');
    let target = new Date(WEDDING.dateISO).getTime();
    function tick(){
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000*60*60*24)); diff -= days*24*60*60*1000;
      const hrs = Math.floor(diff / (1000*60*60)); diff -= hrs*60*60*1000;
      const mins = Math.floor(diff / (1000*60)); diff -= mins*60*1000;
      const secs = Math.floor(diff / 1000);
      dEl.textContent = days.toString();
      hEl.textContent = String(hrs).padStart(2,'0');
      mEl.textContent = String(mins).padStart(2,'0');
      sEl.textContent = String(secs).padStart(2,'0');
    }
    tick(); setInterval(tick, 1000);

    const modal = document.getElementById('rsvpModal');
    const openers = [document.getElementById('openRSVP'), document.getElementById('fabRSVP'), document.getElementById('navRSVP')];
    const closer = document.getElementById('closeRSVP');
    openers.forEach(btn=> btn && btn.addEventListener('click',()=> openModal()));
    closer.addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
    function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.getElementById('name').focus(); }
    function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }

    const form = document.getElementById('rsvpForm');
    const toast = document.getElementById('toast');

    function showToast(msg, type='info'){
      toast.textContent = msg;
      toast.style.borderColor = type==='success'? 'var(--success)': type==='error'? 'var(--danger)': 'rgba(17,24,39,.12)';
      toast.classList.add('show');
      setTimeout(()=> toast.classList.remove('show'), 3000);
    }

    function getRSVPs(){
      try{ return JSON.parse(localStorage.getItem('rsvps')||'[]'); }catch{ return []; }
    }
    function saveRSVPs(list){ localStorage.setItem('rsvps', JSON.stringify(list)); }

   form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if(!data.name || !data.email || !data.attending){
    showToast('Please fill required fields.', 'error');
    return;
  }

  emailjs.send("service_daxyxsj","template_x8l5ph9", data)
    .then(()=>{
      showToast("Your RSVP has been emailed ✅", "success");
      form.reset();
      closeModal();
    })
    .catch((err)=>{
      console.error("EmailJS Error:", err);
      showToast("Failed to send RSVP. Please try again.", "error");
    });
});

    document.getElementById('exportCSV').addEventListener('click', ()=>{
      const rows = getRSVPs();
      if(!rows.length){ showToast('No RSVPs yet to export.'); return; }
      const headers = ['name','email','phone','attending','guests','diet','message','timestamp'];
      const csv = [headers.join(',')].concat(rows.map(r=> headers.map(h=> '"'+ String(r[h]??'').replaceAll('"','\"') +'"').join(','))).join('\n');
      const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='RSVPs.csv'; a.click(); URL.revokeObjectURL(url);
    });

    document.getElementById('addToCalendar').addEventListener('click', ()=>{
      const start = new Date(WEDDING.dateISO);
      const end = new Date(start.getTime() + 2*60*60*1000); // +2 hours
      const toICS = (d)=> d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Wedding Invite//EN\nBEGIN:VEVENT\nUID:${crypto.randomUUID()}\nDTSTAMP:${toICS(new Date())}\nDTSTART:${toICS(start)}\nDTEND:${toICS(end)}\nSUMMARY:${WEDDING.couple} — Wedding`+
        `\nLOCATION:${WEDDING.venue}\nDESCRIPTION:Join us for our wedding!\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([ics], {type:'text/calendar'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='wedding-invite.ics'; a.click(); URL.revokeObjectURL(url);
    });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });