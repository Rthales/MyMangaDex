var CHROME = false;
window.browser = (function () {
	if (window.chrome && window.browser === undefined) {
		CHROME = true;
	}
	return window.msBrowser || window.browser || window.chrome;
})();
const domainName = window.location.hostname.split('.')[1] || 'org';
const domain = 'https://mangadex.org/?api=MyV3rYStr0ng@piK3y'; // [window.location.origin, '/'].join('')
const version = {
	major: parseFloat(browser.runtime.getManifest().version),
	minor: (() => {
		const parts = browser.runtime.getManifest().version.split('.');
		return parts.length == 3 ? parseInt(parts[2]) : 0;
	})(),
};

// Object containing all options
// Is initialized with the default options
let defaultOptions = {
	lastReadColor: 'rgba(75, 180, 60, 0.6)',
	lowerChaptersColor: 'rgba(180, 102, 75, 0.4)',
	higherChaptersColor: 'transparent',
	nextChapterColor: 'rgba(199, 146, 2, 0.4)',
	lastOpenColors: ['rgba(28, 135, 141, 0.8)', 'rgba(22, 65, 87, 0.8)', 'rgba(28, 103, 141, 0.8)'],
	openedChaptersColor: 'rgba(28, 135, 141, 0.4)',
	hideLowerChapters: true,
	hideHigherChapters: false,
	hideLastRead: false,
	saveOnlyHigher: true,
	saveOnlyNext: false,
	confirmChapter: true,
	saveOnLastPage: false,
	saveAllOpened: true,
	maxChapterSaved: 100,
	updateHistoryPage: false,
	updateOnlyInList: false,
	historySize: 100,
	checkHistoryLatest: false,
	updateMDList: false,
	updateOnFollows: false,
	showTooltips: true,
	showFullCover: false,
	coverMaxHeight: 80,
	highlightChapters: true,
	showNotifications: true,
	separateLanguages: true,
	defaultLanguage: 'all',
	showErrors: true,
	onlineSave: false,
	onlineURL: 'https://mmd.nikurasu.org/api/',
	username: '',
	isLoggedIn: false,
	token: '',
	version: version.major,
	subVersion: version.minor,
};
