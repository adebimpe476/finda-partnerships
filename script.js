'use strict';
// FINDA Partnerships: no customer data is transmitted by this page.
const partnerInfo = {
  inventory: {
    label:'PARTNERSHIP / 01', mark:'⌂', heading:'Turn quality inventory into meaningful interest.',
    intro:'Bring your properties. FINDA proposes a more organised pathway from credible listings to interested renters and coordinated follow-up.',
    audience:'Developers, landlords and property managers', you:'Authorised, up-to-date property inventory.', finda:'Discovery tools, listing presentation and enquiry pathways.',
    benefits:['Clearer presentation of listings and total costs','A structured channel for incoming interest','Opportunities for a measured inventory pilot'],
    disclaimer:'Listing inclusion, fees and lead sharing are subject to verification, owner authority and a written agreement.'
  },
  agents: {
    label:'PARTNERSHIP / 02', mark:'◇', heading:'Give your agency a smarter operating layer.',
    intro:'You know your local market. FINDA wants to help consenting agents present homes, respond to interest and maintain stronger renter relationships.',
    audience:'Independent agents, agencies and brokerages', you:'Local market knowledge, authorised listings and service.', finda:'Agent OS tools, property presentation and connected tenancy journeys.',
    benefits:['Listings remain linked to the real agent','A cleaner path for enquiries and follow-up','Explore supported listing workflows with agent consent'],
    disclaimer:'Agent authority, eligibility, approval and marketing permission remain essential. No one can list for an agent without proper consent.'
  },
  finance: {
    label:'PARTNERSHIP / 03', mark:'₦', heading:'Meet housing demand with responsible finance.',
    intro:'Co-design a future Move-In Pay Later referral pilot that connects qualified housing interest to lending expertise — with clear roles and consumer safeguards.',
    audience:'Licensed financial institutions and authorised lenders', you:'Capital, underwriting, approvals, contracts and collections.', finda:'Consented applicant introductions and relevant property context.',
    benefits:['Explore a more contextual housing-finance use case','Define lead qualification and conversion measures together','Consider a negotiated success-based commercial model'],
    disclaimer:'No loan product, lender partnership or commission arrangement is live. Any pilot depends on licensing, consumer protection, approvals and signed contracts.'
  },
  employers: {
    label:'PARTNERSHIP / 04', mark:'◎', heading:'Make housing support part of the employee experience.',
    intro:'Explore voluntary housing-discovery and rent-planning support for staff who are relocating, newly hired or navigating a new city.',
    audience:'HR teams, employers and relocation programmes', you:'Employee benefit context and opt-in programme access.', finda:'A housing discovery and self-directed rent-planning experience.',
    benefits:['Propose relocation and employee housing information journeys','Support staff choice with clearer housing information','Measure engagement only with an agreed privacy approach'],
    disclaimer:'No payroll deductions, salary advances, employee-record imports or financial guarantees are included in this proposal.'
  },
  services: {
    label:'PARTNERSHIP / 05', mark:'✳', heading:'Be there for the moments after move-in.',
    intro:'The relationship does not end at the keys. Explore coordinated maintenance, inspection, moving, utilities and other housing services.',
    audience:'Maintenance teams, movers, utilities and housing service brands', you:'Professional delivery, service coverage and agreed standards.', finda:'Potential service discovery and issue-reporting pathways.',
    benefits:['Define geographic and service coverage clearly','Propose service standards and dispute-resolution paths','Pilot a transparent, consent-led referral experience'],
    disclaimer:'Service providers are not currently endorsed or guaranteed business. Scope, pricing, fulfilment and complaints handling require agreement.'
  }
};
const $ = (id)=>document.getElementById(id);
const tabs = [...document.querySelectorAll('[role="tab"][data-partner]')];
function selectPartner(key, focus=false){
  const p=partnerInfo[key];if(!p)return;
  tabs.forEach(t=>{const is=t.dataset.partner===key;t.setAttribute('aria-selected',String(is));t.tabIndex=is?0:-1;if(is&&focus)t.focus();});
  $('partnerPanel').setAttribute('aria-labelledby',`tab-${key}`);
  $('panelLabel').textContent=p.label;$('partnerMark').textContent=p.mark;$('panelHeading').textContent=p.heading;
  $('panelIntro').textContent=p.intro;$('panelAudience').textContent=p.audience;
  $('panelYou').textContent=p.you;$('panelFinda').textContent=p.finda;
  $('panelNumber').textContent=`0${tabs.findIndex(t=>t.dataset.partner===key)+1} / 05`;
  $('panelBenefits').replaceChildren(...p.benefits.map(line=>{const div=document.createElement('div');const span=document.createElement('span');span.textContent='↗';div.append(span,document.createTextNode(line));return div;}));
  $('panelDisclaimer').textContent=p.disclaimer;
  $('sector').value=key;
}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectPartner(t.dataset.partner));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectPartner(tabs[n].dataset.partner,true);});});
$('panelCta').addEventListener('click',()=>{const current=document.querySelector('[role="tab"][aria-selected="true"]');if(current)$('sector').value=current.dataset.partner;$('connect').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
document.querySelectorAll('[data-prefill]').forEach(a=>a.addEventListener('click',()=>{$('sector').value=a.dataset.prefill;}));
const menu=$('menuToggle'), nav=$('mobileNav');
function closeMenu(){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';nav.hidden=open;menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open menu':'Close menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!nav.hidden&&!nav.contains(e.target)&&!menu.contains(e.target))closeMenu();});
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;$('readingProgress').style.transform=`scaleX(${max<=0?1:scrollY/max})`;}
window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
$('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('js');
  const obs=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>obs.observe(el));
  // Safety fallback for readers if observer is suppressed after navigating back to the tab.
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')document.querySelectorAll('[data-reveal]').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight&&el.getBoundingClientRect().bottom>0)el.classList.add('visible');});});
}
// These counters describe sourced historical estimates. No fabricated impact metric.
const countEl=document.querySelector('[data-count]');
if(countEl&&'IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const numberObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;numberObserver.unobserve(entry.target);const start=performance.now(),target=Number(entry.target.dataset.count),decimals=Number(entry.target.dataset.decimals)||0;function tick(now){const progress=Math.min(1,(now-start)/1350),ease=1-Math.pow(1-progress,3);entry.target.textContent=(target*ease).toFixed(decimals);if(progress<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);});},{threshold:.2});numberObserver.observe(countEl);}
const briefForm=$('briefForm');
const sectorNames={inventory:'Property owner / developer',agents:'Estate agent / brokerage',finance:'Bank / lending institution',employers:'Employer / HR team',services:'Housing service provider',other:'Potential collaboration'};
function getBrief(){const sector=$('sector').value,org=$('org').value.trim(),location=$('location').value.trim(),goal=$('goal').value.trim();return {subject:`FINDA partnership proposal — ${sectorNames[sector]||'New opportunity'}${org?' | '+org:''}`,body:`Hello FINDA Partnerships,\n\nI'd like to explore a potential collaboration.\n\nPartnership type: ${sectorNames[sector]||sector}\nOrganisation: ${org||'Not provided'}\nLocation/coverage: ${location||'Not provided'}\n\nOur idea:\n${goal}\n\nCould we discuss how a responsible pilot might work?\n\nThank you.`};}
function validateBrief(){let ok=true;const goal=$('goal').value.trim();$('goalError').hidden=!!goal;if(!goal)ok=false;$('consentError').hidden=$('consent').checked;if(!$('consent').checked)ok=false;if(!ok)(!goal?$('goal'):$('consent')).focus();return ok;}
function inform(message){$('briefStatus').textContent=message;}
briefForm.addEventListener('submit',e=>{e.preventDefault();if(!validateBrief())return;const b=getBrief();const url=`mailto:hello@findahq.com?subject=${encodeURIComponent(b.subject)}&body=${encodeURIComponent(b.body)}`;inform('Your email app will open with a draft. Review it, then press Send to contact FINDA.');window.location.href=url;});
$('waButton').addEventListener('click',()=>{if(!validateBrief())return;const b=getBrief();const link=`https://wa.me/2348140233467?text=${encodeURIComponent(b.subject+'\n\n'+b.body)}`;inform('WhatsApp will open with a draft. Review it, then press Send to contact FINDA.');const a=document.createElement('a');a.href=link;a.target='_blank';a.rel='noopener noreferrer';document.body.append(a);a.click();a.remove();});
$('copyButton').addEventListener('click',async()=>{if(!validateBrief())return;const b=getBrief(),content=b.subject+'\n\n'+b.body;try{await navigator.clipboard.writeText(content);inform('Partnership brief copied. Paste it into your preferred email or chat app.');}catch{const ta=document.createElement('textarea');ta.value=content;ta.style.position='fixed';ta.style.opacity='0';document.body.append(ta);ta.select();let worked=false;try{worked=document.execCommand('copy');}catch{}ta.remove();inform(worked?'Partnership brief copied.':'Copy is unavailable in this browser. You can use the email option instead.');}});
