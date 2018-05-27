function focusLogin() {
	const crossroadsAccountsObject = window.crossroadsAccountsObject
	const anchorDiv = document.querySelector('#login-anchor')
	if(window.location.href.indexOf('force')>-1)
		anchorDiv.href = crossroadsAccountsObject.loginURIForced
	else
		anchorDiv.href = crossroadsAccountsObject.loginURI

	const buttonDiv = document.querySelector('#button')
	buttonDiv.classList.remove('login-button-loading')
	buttonDiv.classList.add('login-button-ready')

	const loginSpan = document.querySelector('#login-span')
	loginSpan.innerText = 'Sign in with Google'
}
window.focusLogin = focusLogin

function focusBundle(accounts) {
	window.crossroadsAccounts = accounts
	const loginDiv = document.querySelector('#login')
	loginDiv.parentNode.removeChild(loginDiv)
	const scriptDiv = document.createElement('script')
	scriptDiv.src = window.bundleSrc
	document.body.appendChild(scriptDiv)
}
window.focusBundle = focusBundle

function fetchCrossroadsAccounts(
	accountsEndpoints=window.crossroadsAccountsObject.accountsEndpoints,
	focusLogin=window.focusLogin,
	focusBundle=window.focusBundle
) {
	fetch(accountsEndpoints.get, {
		credentials: 'include'
	})
		.then(response => response.json())
		.then(json => {
			const {accounts} = json
			if(!accounts || !accounts.length) {
				focusLogin && focusLogin()
				return
			}
			focusBundle && focusBundle(accounts)
		})
}
window.fetchCrossroadsAccounts = fetchCrossroadsAccounts
const myDivSrc = document.querySelector('#crossroads-script-div').src
const queryString = myDivSrc.split('?')[1]
if(queryString !== 'false')
	fetchCrossroadsAccounts()
