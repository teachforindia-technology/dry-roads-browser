/* global crossroadsAccounts crossroadsAccountsObject*/
const Crossroads = require('crossroads-js')

module.exports = function actionCreators(config) {

	const crossroads = new Crossroads({
		apiKey: config.apiKey,
		host: config.host,
		port: config.port,
		tokenExpiryHandler: refreshAccessToken,
	})

	function refreshAccessToken(originalParams) {
		return fetch(crossroadsAccountsObject.accountsEndpoints.refresh, {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({accessToken: crossroads.accessToken}),
		})
			.then(response => response.json())
			.then(json => {
				const account = json.accounts[0]
				crossroads.dispatch(receiveAccessToken(account))
				const {options} = originalParams
				options.headers.Authorization = `Basic ${new Buffer(
					config.apiKey + ':' + crossroads.accessToken
				).toString('base64')}`
				return crossroads.call(options, originalParams.body)
			})
	}

	function requestAccessToken() {
		return {
			type: 'requestAccessToken',
		}
	}
	function fetchAccessToken() {
		return function(dispatch) {
			crossroads.dispatch = dispatch

			dispatch(requestAccessToken())
			const account = crossroadsAccounts[0]

			return dispatch(receiveAccessToken(account))
		}
	}
	function receiveAccessToken(json) {
		if (json.errors === true || json.errors === 'yes')
			return {
				type: 'errorReceiveAccessToken',
				errors: json.errors,
				errorMessage: json.errorMessage,
			}

		crossroads.updateAccessToken(json.accessToken)

		return {
			type: 'receiveAccessToken',
			accessToken: json.accessToken,
			loginURI: json.loginURI,
		}
	}

	function requestLogout() {
		return {
			type: 'requestLogout',
		}
	}
	function fetchLogout() {
		return function(dispatch) {
			dispatch(requestLogout())

			return fetch(crossroadsAccountsObject.accountsEndpoints.destroy, {
				credentials: 'same-origin',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({accessToken: crossroads.accessToken}),
			})
				.then(response => response.json())
				.then(json => dispatch(receiveAccessToken(json)))
		}
	}


	this.crossroads = crossroads

	this.requestAccessToken = requestAccessToken
	this.fetchAccessToken = fetchAccessToken
	this.receiveAccessToken = receiveAccessToken
	this.requestLogout = requestLogout
	this.fetchLogout = fetchLogout
}
