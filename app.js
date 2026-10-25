import {routeFromHash,pageDefaults,pageFields,prototypeLinks,escapeHTML,safeDestination} from './data.mjs';

const main=document.querySelector('#main');
const arrow='<span aria-hidden="true">↗</span>';
const label=text=>`<span class="eyebrow">${text}</span>`;
const bread=title=>`<div class="breadcrumb"><a href="#/">Home</a><span>/</span><span>${title}</span></div>`;
const pageName={home:'Project overview',llm:'LLM Input Prototype',seeding:'Seeding Experiment'};
// All displayed copy comes from data.mjs; browser drafts are not loaded.
const content=pageDefaults;
function text(value, className = 'article-copy') {
  const html = escapeHTML(value)
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim();

      if (trimmed.startsWith('### ')) {
        return `<h3>${trimmed.slice(4)}</h3>`;
      }

      if (trimmed.startsWith('## ')) {
        return `<h2>${trimmed.slice(3)}</h2>`;
      }

      if (trimmed.startsWith('# ')) {
        return `<h1>${trimmed.slice(2)}</h1>`;
      }

      return `<p>${trimmed}</p>`;
    })
    .join('');

  return `<div class="${className}">${html}</div>`;
}
function projectCards(){return `<section class="simple-projects" aria-label="Our prototypes"><a class="project-tile input-tile" href="#/llm"><div class="tile-top"><span>01 / PROTOTYPE</span><span class="round-arrow">↗</span></div><div class="tile-art" aria-hidden="true"><div class="input-art-line">Aa<span>│</span></div><div class="art-lines"><i></i><i></i><i></i></div></div><h2>LLM Input<br>Prototype</h2><div class="tile-bottom"><span>Explore the prototype</span>${arrow}</div></a><a class="project-tile seed-tile" href="#/seeding"><div class="tile-top"><span>02 / EXPERIMENT</span><span class="round-arrow">↗</span></div><div class="tile-art" aria-hidden="true"><div class="seed-orbit"><span></span><span></span><span></span></div></div><h2>Seeding<br>Experiment</h2><div class="tile-bottom"><span>Follow the experiment</span>${arrow}</div></a></section>`;}
function home(){return `<div class="wrap"><section class="simple-hero">${label('CSEC3888 / research studio')}<h1>Two prototypes.<br><span class="serif">One place to explore.</span></h1><p>Discover the ideas, experiments and findings behind our work.</p></section><article class="project-story" aria-label="About our project"><div class="article-heading"><h2>About the project</h2></div>${text(content.home.intro)}<div class="findings-note"><h3>What we found</h3>${text(content.home.findings)}</div></article>${projectCards()}</div>`;}
function numberedSections(page){return `<div class="template-sections">${pageFields[page].filter(f=>f.number).map(f=>`<section class="template-section"><span class="template-number">${f.number}</span><div><h2>${f.title}</h2>${text(content[page][f.key]||f.prompt,content[page][f.key]?'template-copy':'template-placeholder')}</div></section>`).join('')}</div>`;}
function prototypeFooter(page){
  const llm=page==='llm';
  const destination=safeDestination(prototypeLinks[page]);
  const title=llm?'Open LLM Input Prototype':'Open Seeding Experiment';
  const link=destination?`<a class="button dark" href="${escapeHTML(destination)}" target="_blank" rel="noopener noreferrer">${title} ${arrow}</a>`:`<button class="button dark" data-prototype-link="${page}">${title} ${arrow}</button>`;
  return `<aside class="prototype-launch"><div>${label('Continue exploring')}<h2>Explore it <span class="serif">for yourself.</span></h2><p>${llm?'Visit the separate prototype website to create your own analysis.':'Visit the separate experiment website to explore the work.'}</p></div>${link}</aside>`;
}
function llm(){return `<div class="wrap template-page"><section class="page-hero">${bread('LLM Input Prototype')}${label('Prototype 01')}<h1>LLM Input<br><span class="serif">Prototype.</span></h1><div class="page-introduction">${text(content.llm.intro)}</div></section>${numberedSections('llm')}${prototypeFooter('llm')}</div>`;}
function seeding(){return `<div class="wrap template-page"><section class="page-hero">${bread('Seeding Experiment')}${label('Prototype 02')}<h1>Seeding<br><span class="serif">Experiment.</span></h1><div class="page-introduction">${text(content.seeding.intro)}</div></section><section class="story-top"><div><h2>From a published idea<br>to an AI answer.</h2><p>A clear path through the study: what was published, what appeared and what the evidence supports.</p></div><div class="story-diagram"><div><strong>Controlled content</strong><span>Published material</span></div><div><strong>Search & retrieval</strong><span>Observed discovery</span></div><div><strong>AI response</strong><span>Captured answer</span></div></div></section>${numberedSections('seeding')}${prototypeFooter('seeding')}</div>`;}
function render(){
  const {page}=routeFromHash(location.hash);
  main.innerHTML=page==='home'?home():page==='llm'?llm():page==='seeding'?seeding():`<div class="wrap"><section class="page-hero"><h1>Page not found.</h1><a class="button" href="#/">Back to home ↗</a></section></div>`;
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.title=`${pageName[page]||'Page not found'} · CSEC3888`;
  window.scrollTo(0,0);main.focus({preventScroll:true});
}
function showLinkPlaceholder(page){
  document.querySelector('#modal-content').innerHTML=`<h2 id="modal-title">${pageName[page]}</h2><p>This button will open the separate prototype website. Its address has not been added yet.</p>`;
  document.querySelector('#modal').showModal();
}
document.addEventListener('click',event=>{
  const el=event.target.closest('button,a');if(!el)return;
  if(el.dataset.prototypeLink)showLinkPlaceholder(el.dataset.prototypeLink);
  if(el.id==='close-modal')document.querySelector('#modal').close();
});
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();});
window.addEventListener('hashchange',render);render();
