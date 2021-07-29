# webx-linkeo

## About:
A simple interface to facilitate commenting on Jira. Jira follows a set of keywords to style comments.
Due to more than 150 lines of text to add as a comment in Jira, I developed this extension to do the task in simple clicks.

## How it works:
- A specific HTML structure established for future elements to be added.
- Ids are set on button 'Terminer' click, so that we can get the correct text and convert accordingly.
- All textes are added with checkboxes. If not checked, the Jira code "(x)" will be added after the texte.
- On button 'Terminer' clicked, loop through all texts and get the check status. 
- Unchecked/Checked texts converted to Jira comment code.
- All copied to clipboard so that you can paste them in the Jira comment section.


## Design:



