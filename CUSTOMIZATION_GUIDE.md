# Adrian Co-pilot Customization Guide

## Current Status
✅ Extension renamed to "Adrian Co-pilot"
✅ Publisher changed to "RidelinkSystems"
✅ Successfully built and packaged
✅ Installed in Cursor

## Authentication Issue

The extension currently tries to authenticate with GitHub's Copilot servers. You have several options:

### Option 1: Use GitHub Authentication (Temporary)
- Sign in with a GitHub account that has Copilot access
- This allows you to test the extension functionality
- Later, you can replace the authentication backend

### Option 2: Implement Custom Authentication
You need to modify these files:

1. **`src/platform/authentication/vscode-node/session.ts`**
   - Replace GitHub authentication with your own auth provider
   - Modify `getAuthSession()`, `getAnyAuthSession()`, `getAlignedSession()`

2. **`src/platform/authentication/common/authentication.ts`**
   - Update authentication scopes and provider IDs

3. **API Endpoints** - Update these to point to your servers:
   - Model API endpoints
   - Billing/subscription endpoints
   - Telemetry endpoints

### Option 3: Create a Mock Authentication Provider (Development)
For local testing, create a mock auth provider that returns a fake token.

## Next Steps for Full Customization

### 1. Authentication System
- [ ] Implement custom authentication provider
- [ ] Replace GitHub OAuth with your own OAuth/API key system
- [ ] Update token validation logic

### 2. API Integration
- [ ] Point to your custom model API endpoints
- [ ] Implement your billing/subscription system
- [ ] Configure rate limiting

### 3. Model Configuration
- [ ] Configure custom AI models
- [ ] Update model selection UI
- [ ] Modify prompt templates

### 4. Branding
- [ ] Replace icon (`assets/copilot.png`)
- [ ] Update colors and themes
- [ ] Customize UI strings in `package.nls.json`

### 5. Features
- [ ] Remove/modify GitHub-specific features
- [ ] Add custom features
- [ ] Update command palette entries

## Key Files to Modify

```
src/
├── platform/
│   ├── authentication/          # Authentication logic
│   └── api/                     # API endpoints
├── extension/
│   ├── chat/                    # Chat functionality
│   └── completions/             # Code completions
└── common/
    └── config/                  # Configuration
```

## Testing

After making changes:
1. `npm run build`
2. `npx @vscode/vsce package --allow-package-secrets sendgrid`
3. `code --uninstall-extension ridelinksystems.adrian-copilot`
4. `code --install-extension adrian-copilot-0.1.0.vsix --force`
5. Restart Cursor

## Documentation

- Original repo: https://github.com/microsoft/vscode-copilot-chat
- VS Code Extension API: https://code.visualstudio.com/api
