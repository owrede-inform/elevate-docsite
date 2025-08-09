## Licensing Considerations
- Do not offer the site with an MIT license. The project actually has no license at all.
- Remember to commit, push, merge and deploy, when I enter "/deploy" as command.
- The "site" is the GitHub page at https://owrede-inform.github.io/elevate-docsite/
- Remmber to reuse the dev server that is already started at localhost:3000 (if it is running) and avoid spawning many new servers withouth need!
- Always read the documentation and the API for each ELEVATE component before you try to use it. For instance you tried to generate different buttons with the variant-Attribute while the actual attribute is "tone". Without thouroughly reading and investigating the API you will not be able to use ELEVATE.
- Try to use ELEVATE Components if possible. Read the real API from the installed package elevate-core-ui first and undertand the API. Never rely on information in the /data folder as specification. If it was requested to use an ESDS component instead of the ELEVATE component, thatn remember that and keep that override permanent.
- If you want to use an ELEVATE Component, always read the API documentation in the elevate-core-ui package first.
- The deployment site (GitHub pages) uses the subdirectory /elevate-docsite in the URL. Make sure all references and links can work correctly when site is deployed (use existing mechanism for that!)
- The tone attributes for ELEVATE components are\
\
Tone
The tone attribute controls the colors of an component. It can have the following values:

Value    Description
neutral    Neutral, default with no specific tone
emphasized    Emphasize, moimportant feedback
subtle    Dismissive, less important feedback
primary    Primary action, very strphasize
success    Success feedback, positive confirmation
warning    Warning feedback, slightly dangerous action
danger    Critical feedback, dangerous (possible destructive) action
The allowed tones depend on the component. Not all components will tones, but they will always represent the same concept.

Neutral
Neutral tone is the bread and butter style of a component. This will be default if the attribute is not specified. It should make up the majority of your components.

Emphasized
A slightly stronger display. This can be used to highlight an action/element/content.

Subtle
Mainly used for dismissive actions that give users a way out of something, letting them do nothing, dismiss, or skip.

Primary
A primary action or important feedback. A context should not have more than a single primary action. For feedback this acts as an highlight.

Success
Information about an success or actions with an explicitly positive context.

Warning
An action that the user should be careful with or information about potential problems.

Danger
A destructive action or critical information.have all ong emre  style
- Do not start new dev servers if there is one running at :3000 already