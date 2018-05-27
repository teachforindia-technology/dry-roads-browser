# DRY Roads - Browser Utilities :closed_umbrella:

Keep projects DRY. This repo contains code used or usable across multiple projects to interact with the crossroads API.

## Actions

	import dryRoads from 'dry-roads-browser'
	const {actionCreators} = dryRoads

	const actions = new actionCreators(crossroadsConfig)
	const {crossroads} = actions

	export default crossroads

	export function requestAccessToken() {
		return actions.requestAccessToken()
	}
	export function fetchAccessToken() {
		return actions.fetchAccessToken()
	}
	export function receiveAccessToken() {
		return actions.receiveAccessToken()
	}
	export function fetchLogout() {
		return actions.fetchLogout()
	}

## Fetch Accounts

	<script id ='crossroads-script-div' src="https://cdn.jsdelivr.net/npm/dry-roads-browser@0.0.1/dist/crossroads-fetch-accounts.js"></script>