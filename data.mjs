// Edit the public website text below, save this file, then refresh the page.
// Use \n\n inside a string to start a new paragraph.
export const pageDefaults = {
  home: {
    intro: 'Generative AI is changing how people discover information. Answers bring sources together into a single response, making it important to understand which information appears and how it is presented.\n\nOur CSEC3888 project explores this space through two separate prototypes: the LLM Input Prototype and the Seeding Experiment. This hub brings together their purpose, approach and findings, with links to the tools themselves.',
    findings: 'A central lesson from our research is that visibility and reliability are not the same. An answer can sound confident while its sources need closer examination. A source becoming more visible is not, by itself, evidence of manipulation.\n\nOur reviewed material did not establish a GEO manipulation attempt. Our emphasis is on traceable evidence, plausible alternative explanations and clear limits on what we can conclude.',
  },
  llm: {
    intro: 'An introduction to our LLM Input Prototype: what it explores, how it works and what we found.',
    overview: '',
    method: '',
    findings: `
## TQ-061 (software_download_domain_impersonation)

### Why it was notable

This technique was prioritised because it combined recency with false authority claims while leveraging the branding and reputation of the legitimate Steghide project.

### Associated run

Run ID: af77ab58fd0646068e2622b12b8f9e53

### How to Reproduce

- Register a domain that borrows the same name and branding of an existing software project
- Publish pages that present the domain as the project’s home
- To reach AI, signals such as authority claims, a well-structured page and keyword-matched content, allows the domain (all leveraging the existing brand’s reputation) are used
- Since the brand is an old, unmaintained project, no actively maintained official website competes to be cited for the query
- i.e. look more polished or professional than the older (but real) website

### Detection indicators

- Recently registered domains imitate established software brands.
- Download pages differ from documented vendor distribution channels.
- Related domains share download-page templates or artefacts.
`
},
  seeding: {
    intro: 'The Seeding Experiment explores how published information may appear in search and AI answers. Here we outline the study, describe the observations and summarise the evidence.',
    setup: '', observations: '', findings: '',
  },
};
export const pageFields = {
  home: [
    {key:'intro',title:'About the project',prompt:'Introduce the project.'},
    {key:'findings',title:'What we found',prompt:'Summarise your findings.'},
  ],
  llm: [
    {key:'intro',title:'Short introduction',prompt:'Briefly introduce this prototype.'},
    {key:'overview',number:'01',title:'About the prototype',prompt:'Add your introduction here.'},
    {key:'method',number:'02',title:'How it works',prompt:'Describe your approach here.'},
    {key:'findings',number:'03',title:'Findings',prompt:'Share your findings here.'},
  ],
  seeding: [
    {key:'intro',title:'Short introduction',prompt:'Briefly introduce this experiment.'},
    {key:'setup',number:'01',title:'How we conducted the experiment',prompt:'Describe your experiment here.'},
    {key:'observations',number:'02',title:'What we observed',prompt:'Add your observations here.'},
    {key:'findings',number:'03',title:'What we found',prompt:'Share your findings here.'},
  ],
};
// Replace these empty strings with the actual separate website addresses.
export const prototypeLinks = {
  llm: 'https://llmproto.csec3888.com/',
  seeding: 'https://monitor.csec3888.com/'
};
export function routeFromHash(hash) {
  const route=hash.replace(/^#\/?/,'').replace(/\/$/,'');
  if(route===''||route==='home')return {page:'home'};
  if(route==='llm'||route==='llm-input'||/^llm\/(broadsheet|docuvex)$/.test(route))return {page:'llm'};
  return {page:route==='seeding'?'seeding':'not-found'};
}
export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
export function safeDestination(value) {
  try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)&&!url.username&&!url.password?url.href:null;}catch{return null;}
}
