/* Reuses the saved site's service tab copy and links in a cleaner explorer. */
(()=>{
  const section=document.querySelector('.fusion-builder-row-5');
  const original=section?.querySelector('.services-tabbed-browsing');
  if(!original)return;
  const mainTablist=original.querySelector(':scope > .nav > .nav-tabs[role="tablist"]');
  const sourceTabs=[...(mainTablist?.querySelectorAll(':scope > li > a.tab-link')||[])];
  const sourcePanels=[...original.querySelectorAll(':scope > .tab-content > .tab-pane')];
  if(sourceTabs.length!==5||sourcePanels.length!==5)return;
  const explorer=document.createElement('div');
  explorer.className='scholz-services-explorer';
  const rail=document.createElement('div');
  rail.className='scholz-services-explorer__tabs';
  rail.setAttribute('role','tablist');
  rail.setAttribute('aria-label','Electrical service categories');
  const content=document.createElement('div');
  content.className='scholz-services-explorer__content';
  const buttons=[];
  const panels=[];
  sourceTabs.forEach((source,index)=>{
    const button=document.createElement('button');
    const label=source.textContent.replace(/\s+/g,' ').trim();
    const number=document.createElement('span');
    number.className='scholz-services-explorer__number';
    number.setAttribute('aria-hidden','true');
    number.textContent=String(index+1).padStart(2,'0');
    button.className='scholz-services-explorer__tab';
    button.type='button';
    button.id=`scholz-service-tab-${index+1}`;
    button.setAttribute('role','tab');
    button.setAttribute('aria-controls',`scholz-service-panel-${index+1}`);
    button.append(number,document.createTextNode(label));
    const panel=document.createElement('div');
    panel.className='scholz-services-explorer__panel';
    panel.id=`scholz-service-panel-${index+1}`;
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',button.id);
    panel.innerHTML=sourcePanels[index].innerHTML;
    rail.append(button);
    content.append(panel);
    buttons.push(button);
    panels.push(panel);
  });
  explorer.append(rail,content);
  original.after(explorer);
  original.hidden=true;
  original.setAttribute('aria-hidden','true');
  function select(index,focus=false){
    buttons.forEach((button,i)=>{
      const active=i===index;
      button.setAttribute('aria-selected',String(active));
      button.tabIndex=active?0:-1;
      panels[i].hidden=!active;
    });
    if(focus)buttons[index].focus();
  }
  buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>select(index));
    button.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=buttons.length-1;
      else return;
      event.preventDefault();
      select(next,true);
    });
  });
  const linkedIndex=sourcePanels.findIndex(panel=>location.hash==='#'+panel.id);
  select(linkedIndex>=0?linkedIndex:0);
})();
