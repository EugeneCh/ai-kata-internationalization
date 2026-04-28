# AI Kata — MCP Instructions

## Setup

1. Clone the repo: https://github.com/EugeneCh/ai-kata-internationalization
2. Switch to branch: [`ai-kata-mcp`](https://github.com/EugeneCh/ai-kata-internationalization/tree/ai-kata-mcp)
3. Inspect `.mcp.json`
4. **Mac/Linux only** — replace the `chrome-devtools` entry in `.mcp.json` with:
   ```json
   "chrome-devtools": {
     "command": "npx",
     "args": ["-y", "chrome-devtools-mcp@latest"]
   }
   ```
5. Install [Astral (uv)](https://docs.astral.sh/uv/getting-started/installation/) — Python package manager
6. Verify `uvx` is available: `uvx --version`
7. Generate API tokens for Jira and Confluence (see PDF instruction)
8. Fill in the corresponding fields in `.mcp.json`

**GitHub Copilot users** — copy the MCP configuration from `.mcp.json` into `.vscode/mcp.json` (VS Code reads MCP servers from `.vscode/mcp.json`)

## References

- **Jira ticket:** https://jiraeu.epam.com/browse/EPMGDLT-1565
- **Confluence space:** https://kb.epam.com/pages/viewpage.action?pageId=2816174014&spaceKey=GDOKB&title=AI%2BKATA%2BMCP

## Task

1. Launch Claude Code / Cursor / Copilot
2. Read the Jira ticket and implement the feature

## Testing Checklist

Run through these steps to verify the implementation:

- [ ] Open the app
- [ ] Save a destination — confirm the button changes from **Save** → **Saved**
- [ ] Confirm a saved count appears or increments
- [ ] Reload the page — confirm the destination is still saved (via `localStorage`)
- [ ] Switch language (English → Lithuanian or Chinese) — saved state persists, labels update
- [ ] Remove the favorite — confirm the count updates and `localStorage` changes
- [ ] Use chrome-devtools to inspect behavior

## Deliverable — Release Notes

Once all tests pass, create a Confluence page with release notes:

- **Location:** `GDOKB` space → Europe East → EPAM Lithuania → Lithuania Organizational Network → Lithuania Practices Nodes → AI KATA MCP (create a child page)
- **Page title:** `<Your Name> — EPMGDLT-1565 — Release Notes`
- **Content:** Release notes describing the Favorites feature implemented in the Jira ticket
