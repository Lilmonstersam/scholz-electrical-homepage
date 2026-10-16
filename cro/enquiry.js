/* Shared CRO mockup interaction for the homepage and service pages. */
(()=>{
  const config=document.currentScript?.dataset||{};
  const service=config.service||'your electrical job';
  const logo=config.logo||'';
  const booking='https://scholzelectrical.com.au/book-an-electrician/';
  const phone='tel:1300369633';
  const icon='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const bar=document.createElement('aside');
  bar.className='scholz-cro-bar';
  bar.setAttribute('aria-label','Quick enquiry options');
  bar.innerHTML=`<span class="scholz-cro-bar__mark" aria-hidden="true"></span><div class="scholz-cro-bar__copy"><strong>Ready to talk about ${service}?</strong><span>Speak to the Brisbane team or send the details online.</span></div><div class="scholz-cro-bar__actions"><a class="scholz-cro-bar__call" href="${phone}">Call 1300 369 633</a><a class="scholz-cro-bar__enquire" href="${booking}">Quick enquiry</a></div>`;
  const overlay=document.createElement('div');
  overlay.className='scholz-cro-overlay';
  overlay.innerHTML=`<section class="scholz-cro-dialog" role="dialog" aria-modal="true" aria-labelledby="scholz-cro-title"><div class="scholz-cro-dialog__aside">${logo?`<img src="${logo}" alt="Scholz Electrical">`:''}<div><p>Brisbane electricians since 1970. Tell us what you need and we’ll look after you.</p><span>Scholz Electrical</span></div></div><div class="scholz-cro-dialog__main"><span class="scholz-cro-dialog__eyebrow">Before you go</span><h2 id="scholz-cro-title">Need a hand with ${service}?</h2><p>Get straight to our team. Call now, or use the enquiry form to tell us about the job.</p><div class="scholz-cro-dialog__actions"><a class="scholz-cro-dialog__primary" href="${booking}">Send an enquiry ${icon}</a><a class="scholz-cro-dialog__secondary" href="${phone}">Call 1300 369 633 ${icon}</a></div><span class="scholz-cro-dialog__note">The enquiry form opens on the live Scholz Electrical website.</span></div><button class="scholz-cro-dialog__close" type="button" aria-label="Close enquiry window">×</button></section>`;
  document.body.append(bar,overlay);
  document.body.classList.add('scholz-cro-active');
  const dialog=overlay.querySelector('.scholz-cro-dialog');
  const close=overlay.querySelector('.scholz-cro-dialog__close');
  let previousFocus=null;
  let autoPrompted=false;
  let lastY=window.scrollY;
  const footer=document.querySelector('.site-footer, #footer, .fusion-footer');
  function open(){
    autoPrompted=true;
    previousFocus=document.activeElement;
    overlay.classList.add('is-open');
    document.body.classList.add('scholz-cro-modal-open');
    close.focus();
  }
  function dismiss(){
    overlay.classList.remove('is-open');
    document.body.classList.remove('scholz-cro-modal-open');
    if(previousFocus&&previousFocus.focus)previousFocus.focus();
  }
  close.addEventListener('click',dismiss);
  overlay.addEventListener('click',e=>{if(e.target===overlay)dismiss()});
  document.addEventListener('keydown',e=>{
    if(!overlay.classList.contains('is-open'))return;
    if(e.key==='Escape'){dismiss();return}
    if(e.key==='Tab'){
      const nodes=[...dialog.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length);
      const first=nodes[0],last=nodes[nodes.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  function onScroll(){
    const y=window.scrollY;
    const viewport=window.innerHeight;
    const height=document.documentElement.scrollHeight;
    bar.classList.toggle('is-visible',y>Math.min(420,viewport*.55));
    const scrollingDown=y>lastY;
    lastY=y;
    const nearBottom=footer
      ? footer.getBoundingClientRect().top<=viewport+Math.min(240,viewport*.28)
      : height-(y+viewport)<=Math.min(500,viewport*.6);
    if(!autoPrompted&&!overlay.classList.contains('is-open')&&scrollingDown&&y>Math.min(500,viewport*.65)&&nearBottom){open()}
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  onScroll();
})();
