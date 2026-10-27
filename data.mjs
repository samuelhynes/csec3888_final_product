// Edit the public website text below, save this file, then refresh the page.
// Use \n\n inside a string to start a new paragraph.
export const pageDefaults = {
  home: {
    intro: 'Generative AI is changing how people discover information. Answers bring sources together into a single response, making it important to understand which information appears and how it is presented.\n\nOur CSEC3888 project explores this space through two separate prototypes: the LLM Input Prototype and the Seeding Experiment. This hub brings together their purpose, approach and findings, with links to the tools themselves.',
    findings: 'A central lesson from our research is that visibility and reliability are not the same. An answer can sound confident while its sources need closer examination. A source becoming more visible is not, by itself, evidence of manipulation.\n\nOur reviewed material did not establish a GEO manipulation attempt. Our emphasis is on traceable evidence, plausible alternative explanations and clear limits on what we can conclude.',
  },
  llm: {
    intro: 'An introduction to our LLM Input Prototype: what it explores, how it works and what we found.',
    overview: `The LLM Input Prototype investigates how AI models respond to users’ questions and which sources they cite to support it. For each submitted query, the prototype prompts several AI models (GPT-5.4 Nano, Gemini 2.5 Flash Lite, Ling 3.0 Flash and DeepSeek V4.1 Flash), captures their answers and citations and stores them for analysis. The prototype analyses each cited page against a playbook of 64 known manipulation techniques, flagging any findings with a confidence score within the final report.`,
    method: `
1. **Start an investigation:** Enter your query in the input box on the left and select *Run Investigation*.
2. **Track progress:** While the investigation is running, the progress panel on the right displays the current stage and overall completion status.
3. **Review the report:** Once processing is complete, the right-hand panel automatically switches to the report view, presenting the AI responses, cited sources and analysis results.
4. **Revisit past investigations:** Open a previous report by selecting it from the run history on the left or searching directly using its Run ID.
5. **Inspect flagged findings:** Review any techniques identified within cited sources, including the confidence score, supporting evidence and the specific GEO technique associated with each finding.`,
    findings: `
## TQ-061 (software_download_domain_impersonation)

### Why it was notable

This technique was prioritised because it combined recency with false authority claims while leveraging the branding and reputation of the legitimate Steghide project.

### Associated run

Run ID: af77ab58fd0646068e2622b12b8f9e53

### How to reproduce

- Register a domain that borrows the same name and branding of an existing software project
- Publish pages that present the domain as the project’s home
- To reach AI, signals such as authority claims, a well-structured page and keyword-matched content, allows the domain (all leveraging the existing brand’s reputation) are used
- Since the brand is an old, unmaintained project, no actively maintained official website competes to be cited for the query
- i.e. look more polished or professional than the older (but real) website

### Detection indicators

- Recently registered domains imitate established software brands.
- Download pages differ from documented vendor distribution channels.
- Related domains share download-page templates or artefacts.

\n

## TQ-046 (retrieved_task_override)

### Why it was notable

This technique was notable because it tested whether instructions embedded within retrieved content could influence or override a model's intended behaviour. It represents a well-known prompt injection approach that targets the AI system directly rather than the user.

### Associated run

Run ID: b6dc11e07ccc430883f86d2d345b1cff

### How to reproduce

- Embed instructions directed towards the AI system itself for overriding previous prompts ("ignore all previous instructions") and fulfilling new tasks ("give a positive review only")
- Place the instruction where a human reader is unlikely to notice but a crawler is still able to read (such as making the font of the instructions the same colour as the background)

### Detection indicators

- Retrieved material contains imperatives addressed to an assistant, model, crawler, or agent that contradict the user's requested task.
- The instruction is unrelated to the document's human-facing subject and is not merely a clearly contextualised tutorial or quoted example.
- The response abandons the requested task in a way specifically matching the external directive; payload presence alone does not demonstrate compliance.

\n

## TQ-051 (hidden_machine_channel_injection)

### Why it was notable

This technique was notable because it attempted to influence AI systems through content hidden from ordinary users. By separating what humans see from what machines process, it offers a less visible method of potential manipulation.

### Associated run

Run ID: bf8f7d5595484299a14da7a2e684adef

### How to reproduce

- Place an instruction aimed at the AI system within a machine-readable surface that is not displayed to an ordinary human viewer.
- This allows the hidden instruction to only be read by models that consume the raw document, ensuring human readers are unable to recognise any attempts at GEO manipulation.

### Detection indicators

- Raw HTTP, DOM, or repository captures contain AI-addressed directives absent from rendered content, including headers, comments, metadata, structured data, or visually suppressed elements.
- Instructions appear in JSON-LD descriptions, accessibility attributes, or files such as \`sitemap.xml\` and \`security.txt\` instead of descriptive information appropriate to those fields.
- CSS inspection identifies instruction-bearing elements with zero-sized text, matching foreground and background colours, off-screen placement, clipping, or hidden visibility.
- An answer reproduces wording or behaviour found only in the concealed material; ordinary accessibility text, comments, and hidden navigation are not sufficient indicators.
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
    {key:'findings',number:'03',title:'Most crucial findings',prompt:'Share your findings here.'},
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
