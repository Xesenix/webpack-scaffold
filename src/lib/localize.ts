import Gettext from 'node-gettext';

export const i18n = new Gettext();
export const languages: string[] = process.env.LANGUAGES || ['en'];

languages.forEach((locale: string) => {
	try {
		i18n.addTranslations(locale, 'messages', require(`locales/messages.${locale}.po`));
	} catch (err) {
		console.warn(`Missing locales: ${locale}`);
	}
});
i18n.setLocale(languages[0]);

export const __ = i18n.gettext.bind(i18n);
