import Gettext from 'node-gettext';

const i18n = new Gettext();
export const languages: string[] = process.env.LANGUAGES || ['en'];

languages.forEach((locale: string) => {
	try {
		i18n.addTranslations(locale, 'messages', require(`locales/messages.${locale}.po`));
	} catch (err) {
		console.log(`Missing locales: ${locale}`);
	}
});

i18n.setLocale(languages[0]);

export const __ = i18n.gettext.bind(i18n);
export const setLocale = i18n.setLocale.bind(i18n);
