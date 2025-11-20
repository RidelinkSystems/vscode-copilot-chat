/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------
 *  Mock Authentication Service for Adrian Co-pilot Local Testing
 *  This bypasses GitHub authentication for development purposes
 *--------------------------------------------------------------------------------------------*/

import { AuthenticationGetSessionOptions, AuthenticationSession } from 'vscode';
import { IConfigurationService } from '../../configuration/common/configurationService';
import { ILogService } from '../../log/common/logService';
import { BaseAuthenticationService } from '../common/authentication';
import { ICopilotTokenManager } from '../common/copilotTokenManager';
import { ICopilotTokenStore } from '../common/copilotTokenStore';

// Mock authentication session
const MOCK_SESSION: AuthenticationSession = {
	id: 'mock-session-id',
	accessToken: 'mock-access-token-for-adrian-copilot-local-testing',
	account: {
		id: 'mock-user-id',
		label: 'Adrian Co-pilot Test User'
	},
	scopes: ['user:email', 'read:user']
};

export class MockAuthenticationService extends BaseAuthenticationService {
	constructor(
		@IConfigurationService configurationService: IConfigurationService,
		@ILogService logService: ILogService,
		@ICopilotTokenStore tokenStore: ICopilotTokenStore,
		@ICopilotTokenManager tokenManager: ICopilotTokenManager
	) {
		super(logService, tokenStore, tokenManager, configurationService);
		this._logService.info('🔧 Using Mock Authentication Service for local testing');

		// Simulate authentication on startup
		void this._handleAuthChangeEvent();
	}

	async getAnyGitHubSession(options?: AuthenticationGetSessionOptions): Promise<AuthenticationSession | undefined> {
		this._logService.debug('Mock: getAnyGitHubSession called');
		this._anyGitHubSession = MOCK_SESSION;
		return MOCK_SESSION;
	}

	async getPermissiveGitHubSession(options: AuthenticationGetSessionOptions): Promise<AuthenticationSession | undefined> {
		this._logService.debug('Mock: getPermissiveGitHubSession called');
		this._permissiveGitHubSession = MOCK_SESSION;
		return MOCK_SESSION;
	}

	protected async getAnyAdoSession(options?: AuthenticationGetSessionOptions): Promise<AuthenticationSession | undefined> {
		this._logService.debug('Mock: getAnyAdoSession called');
		this._anyAdoSession = MOCK_SESSION;
		return MOCK_SESSION;
	}

	async getAdoAccessTokenBase64(options?: AuthenticationGetSessionOptions): Promise<string | undefined> {
		this._logService.debug('Mock: getAdoAccessTokenBase64 called');
		return Buffer.from(`PAT:${MOCK_SESSION.accessToken}`, 'utf8').toString('base64');
	}
}
