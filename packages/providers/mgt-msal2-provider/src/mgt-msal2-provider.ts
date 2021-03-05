/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { customElement, property } from 'lit-element';
import { Providers, LoginType, MgtBaseProvider } from '@microsoft/mgt-element';
import { Msal2Config, Msal2Provider } from './Msal2Provider';
/**
 * Authentication Library Provider for Microsoft personal accounts
 *
 * @export
 * @class MgtMsalProvider
 * @extends {MgtBaseProvider}
 */
@customElement('mgt-msal2-provider')
export class MgtMsal2Provider extends MgtBaseProvider {
  /**
   * String alphanumerical value relation to a specific user
   *
   * @memberof MgtMsalProvider
   */
  @property({
    attribute: 'client-id',
    type: String
  })
  public clientId = '';

  /**
   * The login type that should be used: popup or redirect
   *
   * @memberof MgtMsalProvider
   */
  @property({
    attribute: 'login-type',
    type: String
  })
  public loginType;

  /**
   * The authority to use.
   *
   * @memberof MgtMsalProvider
   */
  @property() public authority;

  /**
   * Comma separated list of scopes
   *
   * @memberof MgtMsalProvider
   */
  @property({
    attribute: 'scopes',
    type: String
  })
  public scopes;

  /**
   * The redirect uri to use
   *
   * @memberof MgtMsalProvider
   */
  @property({
    attribute: 'redirect-uri',
    type: String
  })
  public redirectUri;

  /**
   * Gets whether this provider can be used in this environment
   *
   * @readonly
   * @memberof MgtMsalProvider
   */
  public get isAvailable() {
    return true;
  }

  /**
   * method called to initialize the provider. Each derived class should provide their own implementation.
   *
   * @protected
   * @memberof MgtMsalProvider
   */
  protected initializeProvider() {
    console.log('Inside the provider');
    if (this.clientId) {
      const config: Msal2Config = {
        clientId: this.clientId
      };

      if (this.loginType && this.loginType.length > 1) {
        let loginType: string = this.loginType.toLowerCase();
        loginType = loginType[0].toUpperCase() + loginType.slice(1);
        const loginTypeEnum = LoginType[loginType];
        config.loginType = loginTypeEnum;
      }

      //TODO: Add authority
      // if (this.authority) {
      //   config.authority = this.authority;
      // }

      if (this.scopes) {
        const scope = this.scopes.split(',');
        if (scope && scope.length > 0) {
          config.scopes = scope;
        }
      }

      if (this.redirectUri) {
        config.redirectUri = this.redirectUri;
      }

      this.provider = new Msal2Provider(config);
      Providers.globalProvider = this.provider;
    }
  }
}
