# Harbor AI - Architecture

**Last Updated:** 2026-03-24
**Version:** 10.1.0

---

## Overview

Harbor AI is the autonomous agent framework for Harbor platform development. It provides the master control system, agent definitions, workflows, and intelligence frameworks for AI-driven software development.

---

## Purpose

To enable autonomous, documentation-first development across all Harbor services with built-in cross-service intelligence and change impact analysis.

---

## Components

### Core Systems

1. **Master Control System** (global-agent-workflow.md)
   - 12-phase autonomous execution protocol
   - Documentation-first enforcement
   - Cross-service intelligence

2. **Agent Definitions** (agents/)
   - harbor-backend-agent.md
   - harbor-website-agent.md

3. **Workflows** (workflows/)
   - global-agent-workflow.md
   - frontend-workflow.md
   - pre-task-validation-hook.md

4. **Architecture** (architecture/)
   - System architecture docs
   - Frontend architecture

5. **Standards** (standards/)
   - Coding standards
   - Best practices

6. **Tools** (tools/)
   - Documentation validator
   - Analysis tools

7. **Intelligence** (intelligence/)
   - Service creation decision flow
   - Change impact analysis

---

## Version History

- **v10.1.0** (2026-03-24) - Documentation Reading Gate fix
- **v10.0.0** (2026-03-24) - Automated documentation enforcement
- **v9.0.0** - Cross-service intelligence
- **v8.0.0** - Runtime execution mandatory

---

## Integration

**This system integrates with:**
- All Harbor services (for deployment)
- Azure DevOps (for task management)
- harborSharedModels (for model consistency)

---

**End of ARCHITECTURE.md**
