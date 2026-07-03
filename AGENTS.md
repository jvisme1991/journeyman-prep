<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Workflow: after every task

After completing any code change I ask for, always do the following before ending the session:

1. Run `npm run lint`
2. Run `npm run build`
3. If both succeed: `git add -A`, commit with a clear, descriptive message summarizing the change, and `git push`
4. If either lint or build fails: do NOT commit or push. Report the errors to me and stop.
