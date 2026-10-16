/* Section navigation for the saved homepage mockup. Existing page copy is untouched. */
(()=>{
  const main=document.querySelector('#main');
  const insertionPoint=main?.querySelector('.fusion-builder-row-4');
  if(!main||!insertionPoint)return;
  const sections=[
    ['Services','Our Electrical Services','home-services'],
    ['Why Scholz','10 Reasons To Choose A Scholz Electrician','home-why-scholz'],
    ['Accreditations','Our Accreditations','home-accreditations'],
    ['Reviews','Want the Best Electricians In Brisbane?','home-reviews'],
    ['FAQs','Frequently Asked Questions','home-faqs'],
    ['Contact','Contact Our Master Electrician Today!','home-contact']
  ];
  const headings=[...main.querySelectorAll('h2')];
  const targets=sections.map(([label,text,id])=>{
    const heading=headings.find(node=>node.textContent.replace(/\s+/g,' ').trim().startsWith(text));
    if(!heading)return null;
    heading.id=id;
    heading.classList.add('scholz-nav-target');
    return {label,id,heading};
  }).filter(Boolean);
  if(!targets.length)return;
  const nav=document.createElement('nav');
  nav.className='scholz-section-nav';
  nav.setAttribute('aria-label','Homepage sections');
  const inner=document.createElement('div');
  inner.className='scholz-section-nav__inner';
  const links=document.createElement('div');
  links.className='scholz-section-nav__links';
  const anchors=targets.map(({label,id})=>{
    const anchor=document.createElement('a');
    anchor.href=`#${id}`;
    anchor.textContent=label;
    links.append(anchor);
    return anchor;
  });
  inner.append(links);
  nav.append(inner);
  insertionPoint.before(nav);
  const header=document.querySelector('.fusion-header-wrapper');
  function update(){
    const headerBottom=header?.getBoundingClientRect().bottom||0;
    const offset=Math.max(0,Math.min(160,headerBottom));
    document.documentElement.style.setProperty('--scholz-header-offset',`${Math.round(offset)}px`);
    const activeLine=offset+nav.getBoundingClientRect().height+30;
    let active=0;
    targets.forEach(({heading},index)=>{if(heading.getBoundingClientRect().top<=activeLine)active=index});
    anchors.forEach((anchor,index)=>{
      if(index===active)anchor.setAttribute('aria-current','location');
      else anchor.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update,{passive:true});
  update();
})();
